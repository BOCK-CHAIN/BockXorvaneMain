"use client"

import { useEffect, useState } from "react"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { Check } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { captureOrder, createOrder } from "@/utils/paypal"
import { useCurrentUser } from "@/hooks/use-auth-user"
import { saveOrder } from "@/actions/order"
import SubscriptionInfo from "./subscription-info"
import { Switch } from "../ui/switch"
import { useQueryClient } from "@tanstack/react-query"

const benefits = ["WebBuild", "AutoWork", "WorkMan"]

const plans = [
  { name: "Monthly", price: 5.99, durationInMonths: 1 },
  { name: "Yearly", price: 3.99, yearlyPrice: 47.88, durationInMonths: 12 },
]

export function SubscriptionCard() {
  const { user } = useCurrentUser()
  const [currentUser, setCurrentUser] = useState<Record<string, any> | null>()
  const [selectedPlan, setSelectedPlan] = useState(plans[1]) // Default to yearly
  const [showPayPalButtons, setShowPayPalButtons] = useState(false)
  const [showPlans, setShowPlans] = useState(false)
  const query = useQueryClient();

  useEffect(() => {
    setCurrentUser(user ?? null)
  }, [user])

  if (!currentUser) return null

  const handlePay = () => {
    if (!currentUser) {
      toast.error("Please log in to proceed.")
      return
    }
    if (currentUser.subscription.plan !== "NONE") {
      toast.info("You are already subscribed.")
      return
    }
    setShowPayPalButtons(true)
  }

  const saveOrderToDatabase = async (
    subscriptionData:
      | {
        amount: number
        expiryDate: Date
        paymentId: null
        orderId: string
        startDate: Date
        plan: "NONE" | "MONTHLY" | "YEARLY";
      }
      | {
        paymentId: string
      },
  ) => {
    try {
      const { error } = await saveOrder(currentUser.id, subscriptionData)

      await query.invalidateQueries({
        queryKey: ["User"]
      })

      if (error) {
        console.log(error)
        toast.error("An error occurred while saving the subscription.")
        return
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred while saving the subscription.")
    }
  }

  const renderPlansCard = () => (
    <Card className="w-full max-w-sm bg-card border border-border">
      <CardHeader className="space-y-1 p-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedPlan.name} billing
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Monthly</span>
            <Switch
              checked={selectedPlan.name === "Yearly"}
              onCheckedChange={() => {
                const nextPlan = selectedPlan.name === "Yearly" ? plans[0] : plans[1]
                setSelectedPlan(nextPlan)
              }}
            />
            <span className="text-sm text-muted-foreground">Yearly</span>
          </div>
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">$</span>
          <span className="text-4xl font-bold">{selectedPlan.price!.toFixed(2)}</span>
          <span className="text-muted-foreground ml-1">/mo</span>
        </div>
        {selectedPlan.name === "Yearly" && (
          <div className="text-sm text-muted-foreground">
            ${selectedPlan.yearlyPrice!.toFixed(2)} per year
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
        {currentUser.subscription.plan !== "NONE" ? (
          <Button className="w-full bg-gray-400 cursor-not-allowed" disabled>
            Already Subscribed
          </Button>
        ) : showPayPalButtons ? (
          <div className="w-full">
            <PayPalButtons
              style={{ layout: "horizontal", height: 40, color: "white", label: "pay", tagline: false }}
              createOrder={async () => {
                try {
                  const response = await createOrder({
                    email: currentUser?.email,
                    name: currentUser?.name,
                    price: selectedPlan.name === "Yearly" ? selectedPlan.yearlyPrice! : selectedPlan.price!,
                    description: `Subscription to ${selectedPlan.name} Plan`,
                  })

                  if (response.jsonResponse.id) {
                    return response.jsonResponse.id
                  } else {
                    throw new Error("Order creation failed.")
                  }
                } catch (error) {
                  console.error(error)
                  toast.error("Failed to create the order.")
                  return Promise.reject()
                }
              }}
              onApprove={async (data) => {
                try {
                  const orderData = {
                    plan: selectedPlan.name.toUpperCase() as "NONE" | "MONTHLY" | "YEARLY",
                    orderId: data.orderID,
                    amount: selectedPlan.name === "Yearly" ? selectedPlan.yearlyPrice! : selectedPlan.price,
                    paymentId: null,
                    startDate: new Date(),
                    expiryDate: new Date(
                      new Date().setMonth(
                        new Date().getMonth() + selectedPlan.durationInMonths,
                      ),
                    ),
                  }
                  await saveOrderToDatabase(orderData)

                  const response = await captureOrder(data.orderID)
                  if (response.httpStatusCode === 404) {
                    toast.error("Failed to capture the order.")
                    return
                  }

                  await saveOrderToDatabase({
                    paymentId: response.jsonResponse.purchase_units[0].payments.captures[0].id,
                  })

                  await query.invalidateQueries({
                    queryKey: ["User"]
                  })
                  toast.success("Payment successful and subscription activated!")

                } catch (error) {
                  console.error(error)
                  toast.error("Failed to capture the order.")
                }
              }}
              onError={(err) => {
                console.log(err)
                toast.error("An error occurred with the payment process.")
              }}
            />
          </div>
        ) : (
          <Button className="w-full bg-white hover:bg-white/90 text-black" onClick={handlePay}>
            {selectedPlan.name === "Yearly" ? "Purchase Yearly" : "Purchase Monthly"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
        vault: true,
      }}
    >
      <div className="flex gap-5">
        {currentUser?.subscription.plan !== "NONE" ? (
          <>
            <SubscriptionInfo user={currentUser} />
            {showPlans ? renderPlansCard() : <Button onClick={() => setShowPlans(true)}>Show Plans</Button>}
          </>
        ) : (
          renderPlansCard()
        )}
      </div>
    </PayPalScriptProvider>
  )
}
