"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

export default function SubscriptionInfo({ user }: { user: Record<string, any> }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    if (!user?.subscription?.expiryDate) return

    const updateTimeLeft = () => {
      const now = new Date()
      const expiryDate = new Date(user.subscription.expiryDate)
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
  }, [user?.subscription?.expiryDate])

  if (!user?.subscription) return null

  return (
    <Card className="w-full max-w-md h-fit" >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Subscription Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>Plan:</strong> {user.subscription.plan}
        </p>
        <p>
          <strong>Start Date:</strong> {new Date(user.subscription.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Expiry Date:</strong> {new Date(user.subscription.expiryDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Time Left:</strong> {timeLeft}
        </p>
      </CardContent>
    </Card>
  )
}

