"use client"

import { useEffect, useState } from "react"
import {  useCurrentUser } from "@/hooks/use-auth-user"
import Loader from "@/components/ui/loader/index"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const products = [
  {
    name: "Xorvane Web Build",
    description: "Build powerful web applications with ease.",
    domain: "https://webbuild.xorvane.com",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Workman",
    description: "Streamline your workflow and boost productivity.",
    domain: "https://workman.xorvane.com",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "AutoFlow",
    description: "Automate your business processes effortlessly.",
    domain: "https://autoflow.xorvane.com",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function DashboardPage() {
  const { user, isLoading } = useCurrentUser()
  const [loading, setLoading] = useState(true)
  const [currentUser, setUser] = useState<Record<string, any> | null>(null)

  useEffect(() => {
    if (user) {
      setUser(user)
      setLoading(isLoading)
    }
    setLoading(isLoading)
  }, [user, isLoading])

  if (loading) {
    return (
      <div className="h-screen w-full justify-center items-center flex">
        <Loader state color="primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Current Plan: {currentUser?.plan || "No active plan"}</p>
            <p>Days Left: {currentUser?.daysLeft || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No recent transactions</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.name} className="flex flex-col h-full">
            <CardHeader>
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">{/* Add more product details here if needed */}</CardContent>
            <CardFooter>
              <Button onClick={() => window.open(product.domain, "_blank")} className="w-full">
                Go to {product.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

