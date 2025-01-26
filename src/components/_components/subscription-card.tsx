"use client";

import { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { captureOrder, createOrder } from "@/utils/paypal";
import { useCurrentUser } from "@/hooks/use-auth-user";
import { saveOrder } from "@/actions/order";

const benefits = [
  "Enhance your focus",
  "Finish work faster",
  "Accelerate your career",
  "Develop positive habits",
  "Boundaries for work-life balance",
];

export function SubscriptionCard() {
  const { user } = useCurrentUser();
  const [currentUser, setCurrentUser] = useState<Record<string, any> | null>();
  const [isYearly, setIsYearly] = useState(true);
  const [showPayPalButtons, setShowPayPalButtons] = useState(false);

  useEffect(() => {
    setCurrentUser(user ?? null);
  }, [user]);

  if (!currentUser) return null;

  const monthlyPrice = 5.99;
  const yearlyPrice = 3.99;
  const currentPrice = isYearly ? yearlyPrice : monthlyPrice;

  const handlePay = () => {
    if (!currentUser) {
      toast.error("Please log in to proceed.");
      return;
    }
    setShowPayPalButtons(true);
  };


  const saveOrderToDatabase = async (subscriptionData: {
    amount: number;
    expiryDate: Date;
    paymentId: null;
    orderId: string;
    plan: "YEARLY" | "MONTHLY";
  } | {
    paymentId: string;
  }) => {
    try {
      const { error } = await saveOrder(currentUser.id, subscriptionData);

      if (error) {
        toast.error("An error occurred while saving the subscription.");
        return;
      }

    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the subscription.");
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
        vault: true,
      }}
    >
      <Card className="w-full max-w-sm bg-card border border-border ">
        <CardHeader className="space-y-1 p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground">
                {isYearly ? "Annual" : "Monthly"} billing
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Monthly</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <span className="text-sm text-muted-foreground">Yearly</span>
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">$</span>
            <span className="text-4xl font-bold">{currentPrice.toFixed(2)}</span>
            <span className="text-muted-foreground ml-1">
              {isYearly ? "/mo" : "/month"}
            </span>
          </div>
          {isYearly && (
            <div className="text-sm text-muted-foreground">
              ${(yearlyPrice * 12).toFixed(2)} per year
              <span className="text-emerald-500 ml-2">save 33%</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <ul className="space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex w-full justify-center items-center">
          {showPayPalButtons ? (
            <div className="w-full">
              <PayPalButtons
                style={
                  {
                    layout: "horizontal",
                    color: "white",
                    shape: "rect",
                    label: "pay",
                    height: 40,
                    tagline: false,
                    // disableMaxWidth: false,
                  }
                }
                createOrder={async () => {
                  try {
                    const response = await createOrder({
                      email: currentUser?.email,
                      name: currentUser?.name,
                      price: isYearly ? currentPrice * 12 : currentPrice,
                      description: `Subscription to ${isYearly ? "Yearly" : "Monthly"} Plan`,
                    });

                    if (response.jsonResponse.id) {
                      return response.jsonResponse.id;
                    } else {
                      throw new Error("Order creation failed.");
                    }
                  } catch (error) {
                    console.error(error);
                    toast.error("Failed to create the order.");
                    return Promise.reject();
                  }
                }}
                onApprove={async (data) => {
                  try {
                    const orderData = {
                      plan: isYearly ? "YEARLY" : "MONTHLY" as "YEARLY" | "MONTHLY",
                      orderId: data.orderID as string,
                      amount: isYearly ? currentPrice * 12 : currentPrice,
                      paymentId: null,
                      expiryDate: isYearly
                        ? new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                        : new Date(new Date().setMonth(new Date().getMonth() + 1)),
                    };
                    await saveOrderToDatabase(orderData);
                    const response = await captureOrder(data.orderID);
                    if (response.httpStatusCode == 404) {
                      console.error("Error capturing order:", response.jsonResponse);
                      toast.error("Failed to capture the order.");
                      return;
                    }
                    const body = response.jsonResponse;
                    await saveOrderToDatabase({ paymentId: body.purchase_units[0].payments.captures[0].id as string, }
                    );

                    toast.success("Payment successful and subscription activated!");
                    return;
                  } catch (error) {
                    console.error("Error capturing order:", error);
                    toast.error("Failed to capture the order.");
                  }
                }}
                onError={(err) => {
                  console.error("PayPal Button Error:", err);
                  toast.error("An error occurred with the payment process.");
                }}
              />
            </div>
          ) : (
            <Button
              className="w-full bg-white hover:bg-white/90 text-black"
              onClick={handlePay}
            >
              {isYearly ? "Purchase Yearly" : "Purchase Monthly"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </PayPalScriptProvider>
  );
}
