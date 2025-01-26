"use client";

import { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const benefits = [
  "Enhance your focus",
  "Finish work faster",
  "Accelerate your career",
  "Develop positive habits",
  "Boundaries for work-life balance",
];

export function SubscriptionCard() {
  const [isYearly, setIsYearly] = useState(true);
  const [showPayPalButtons, setShowPayPalButtons] = useState(false);

  const monthlyPrice = 5.99;
  const yearlyPrice = 3.99;
  const currentPrice = isYearly ? yearlyPrice : monthlyPrice;

  const handlePay = async () => {
    setShowPayPalButtons(true);
  };

  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string }}
    >
      <Card className="w-full max-w-sm bg-card border border-border">
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
        <CardFooter className="p-6 pt-0">
          {showPayPalButtons ? (
            <PayPalButtons
              createSubscription={(data, actions) => {
                return actions.subscription.create({
                  plan_id: isYearly
                    ? "YOUR_YEARLY_PLAN_ID"
                    : "YOUR_MONTHLY_PLAN_ID",
                });
              }}
              onApprove={async (data, actions) => {
                console.log(actions)
                console.log("Subscription successful:", data);
                return Promise.resolve();
              }}
              onError={(err) => console.error(err)}
            />
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
