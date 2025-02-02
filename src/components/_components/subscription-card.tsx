"use client"
import { useEffect, useState } from "react"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { Check } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { captureOrder, createOrder } from "@/utils/paypal"
import { useCurrentUser } from "@/hooks/use-auth-user"
import { saveOrder, savePaymentToDb } from "@/actions/order"
import SubscriptionInfo from "./subscription-info"
import { Switch } from "../ui/switch"
import { useQueryClient } from "@tanstack/react-query"
import type { User } from "@/schemas/user.types"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { plans } from "@/constants/products"

const benefits = ["WebBuild", "AutoWork", "WorkMan"]

export function SubscriptionCard() {
  const { user } = useCurrentUser()
  const [currentUser, setCurrentUser] = useState<User | null>()
  const [selectedPlan, setSelectedPlan] = useState(plans[1]) 
  const [showPayPalButtons, setShowPayPalButtons] = useState(false)
  const [showPlans, setShowPlans] = useState(false)
  const query = useQueryClient()
  const { theme } = useTheme()
  const lightmode = theme === "light"

  useEffect(() => {
    setCurrentUser(user ?? null)
  }, [user])

  if (!currentUser) return null

  const handlePay = () => {
    if (!currentUser) {
      toast.error("Please log in to proceed.")
      return
    }
    if (currentUser.subscription?.plan !== "NONE") {
      toast.info("You are already subscribed.")
      return
    }
    setShowPayPalButtons(true)
  }

  const savePayment = async (paymentId: string) => {
    try {
      const { error } = await savePaymentToDb(currentUser.id, paymentId)

      await query.invalidateQueries({
        queryKey: ["User"],
      })

      if (error) {
        console.log(error)
        toast.error("An error occurred while saving the payment.")
        return
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred while saving the payment.")
    }
  }

  const saveOrderToDatabase = async (subscriptionData: {
    transaction: {
      orderId: string
      amount: number
    }
    expiryDate: Date
    startDate: Date
    plan: "NONE" | "MONTHLY" | "YEARLY"
  }) => {
    try {
      const { error } = await saveOrder(currentUser.id, subscriptionData)

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
    <Card
      className={cn(
        "w-full max-w-sm",
        lightmode ? "bg-zinc-50 text-black border-gray-300" : "bg-card border border-border",
      )}
    >
      <CardHeader className="space-y-1 p-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className={cn("h-3 w-3", lightmode ? "text-gray-800" : "text-primary")} />
            </div>
            <div className={cn("text-sm", lightmode ? "text-gray-600" : "text-muted-foreground")}>
              {selectedPlan.name} billing
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={cn("text-sm", lightmode ? "text-gray-600" : "text-muted-foreground")}>Monthly</span>
            <Switch
              checked={selectedPlan.name === "Yearly"}
              onCheckedChange={() => {
                const nextPlan = selectedPlan.name === "Yearly" ? plans[0] : plans[1]
                setSelectedPlan(nextPlan)
              }}
              className={cn(lightmode ? "bg-gray-300 data-[state=checked]:bg-gray-800" : "")}
            />
            <span className={cn("text-sm", lightmode ? "text-gray-600" : "text-muted-foreground")}>Yearly</span>
          </div>
        </div>
        <div className="flex items-baseline">
          <span className={cn("text-3xl font-bold", lightmode ? "text-gray-800" : "")}>$</span>
          <span className={cn("text-4xl font-bold", lightmode ? "text-gray-800" : "")}>
            {selectedPlan.price!.toFixed(2)}
          </span>
          <span className={cn("ml-1", lightmode ? "text-gray-600" : "text-muted-foreground")}>/mo</span>
        </div>
        {selectedPlan.name === "Yearly" && (
          <div className={cn("text-sm", lightmode ? "text-gray-600" : "text-muted-foreground")}>
            ${selectedPlan.yearlyPrice!.toFixed(2)} per year
            <span className="text-emerald-500 ml-2">save 33%</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ul className="space-y-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2">
              <div className={cn("h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center", lightmode? "bg-zinc-300":"")}>
                <Check className={cn("h-3 w-3", lightmode ? "text-gray-800 " : "text-primary")} />
              </div>
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex w-full justify-center items-center">
        {currentUser?.subscription?.plan !== "NONE" ? (
          <Button
            className={cn(
              "w-full",
              lightmode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-black hover:bg-gray-200",
            )}
            disabled
          >
            Already Subscribed
          </Button>
        ) : showPayPalButtons ? (
          <div className="w-full">
            <PayPalButtons
              style={{ layout: "horizontal", height: 40, color: lightmode?"black":"white", label: "pay", tagline: false }}
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
                    transaction: {
                      orderId: data.orderID,
                      amount: selectedPlan.name === "Yearly" ? selectedPlan.yearlyPrice! : selectedPlan.price,
                    },
                    plan: selectedPlan.name.toUpperCase() as "NONE" | "MONTHLY" | "YEARLY",
                    startDate: new Date(),
                    expiryDate: new Date(new Date().setMonth(new Date().getMonth() + selectedPlan.durationInMonths)),
                  }
                  orderData.expiryDate.setDate(orderData.expiryDate.getDate() + 1);
                  orderData.expiryDate.setHours(0, 0, 0, 0);
                  await saveOrderToDatabase(orderData)

                  const response = await captureOrder(data.orderID)
                  if (response.httpStatusCode === 404) {
                    toast.error("Failed to capture the order.")
                    return
                  }

                  await savePayment(response.jsonResponse.purchase_units[0].payments.captures[0].id)

                  await query.invalidateQueries({
                    queryKey: ["User"],
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
          <Button
            className={cn(
              "w-full",
              lightmode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-black hover:bg-gray-200",
            )}
            onClick={handlePay}
          >
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
        {currentUser.subscription?.plan !== "NONE" ? (
          <>
            <SubscriptionInfo subscription={currentUser.subscription} />
            {showPlans ? renderPlansCard() : <Button onClick={() => setShowPlans(true)}>Show Plans</Button>}
          </>
        ) : (
          renderPlansCard()
        )}
      </div>
    </PayPalScriptProvider>
  )
}

