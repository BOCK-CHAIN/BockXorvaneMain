"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import type { User } from "@/schemas/user.types"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function SubscriptionInfo({ subscription }: { subscription: User["subscription"] }) {
  const [timeLeft, setTimeLeft] = useState("")
  const { theme } = useTheme()
  const isLightMode = theme === "light"

  useEffect(() => {
    if (!subscription?.expiryDate) return

    const updateTimeLeft = () => {
      const now = new Date()
      const expiryDate = subscription.expiryDate ? new Date(subscription.expiryDate) : new Date()
      const timeDiff = expiryDate.getTime() - now.getTime()

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

      if (timeDiff <= 0) {
        setTimeLeft("Expired")
      } else if (days > 1) {
        setTimeLeft(`${days} days`)
      } else if (days === 1) {
        setTimeLeft(`1 day and ${hours} hours`)
      } else {
        setTimeLeft(`${hours} hours and ${minutes} minutes`)
      }
    }

    updateTimeLeft()
    const timer = setInterval(updateTimeLeft, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [subscription?.expiryDate])

  if (!subscription) return null

  return (
    <Card className={cn("w-full max-w-md h-fit", isLightMode ? "bg-white border-gray-200" : "")}>
      <CardHeader>
        <CardTitle className={cn("flex items-center gap-2", isLightMode ? "text-gray-800" : "")}>
          <Clock className={cn("h-5 w-5", isLightMode ? "text-gray-600" : "")} />
          Subscription Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className={cn(isLightMode ? "text-gray-700" : "")}>
          <strong>Plan:</strong> {subscription.plan}
        </p>
        <p className={cn(isLightMode ? "text-gray-700" : "")}>
          <strong>Start Date:</strong>{" "}
          {subscription.startDate ? new Date(subscription.startDate).toLocaleDateString() : "N/A"}
        </p>
        <p className={cn(isLightMode ? "text-gray-700" : "")}>
          <strong>Expires Before:</strong>{" "}
          {subscription.expiryDate ? new Date(subscription.expiryDate).toLocaleDateString() : "N/A"}
        </p>
        <p className={cn(isLightMode ? "text-gray-700" : "")}>
          <strong>Time Left:</strong> {timeLeft}
        </p>
      </CardContent>
    </Card>
  )
}

