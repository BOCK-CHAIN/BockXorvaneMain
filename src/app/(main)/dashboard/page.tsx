"use client"

import { useEffect, useState } from "react"
import { useCurrentUser } from "@/hooks/use-auth-user"
import Loader from "@/components/ui/loader/index"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { User } from "@/schemas/user.types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { products } from "@/constants/products"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const { user, isLoading } = useCurrentUser()
  const [loading, setLoading] = useState(true)
  const [currentUser, setUser] = useState<User | null>(null)

  const { theme } = useTheme()
  const isLightMode = theme === "light"

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
    <div
      className={cn("container mx-auto py-8 px-4 space-y-8", isLightMode ? "text-gray-800" : "text-muted-foreground")}
    >
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card className={cn(isLightMode ? "bg-white border-gray-200" : "")}>
          <CardHeader>
            <CardTitle className={cn(isLightMode ? "text-gray-800" : "text-muted-foreground")}>Your Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={cn(isLightMode ? "text-gray-600" : "")}>
              Current Plan: {currentUser?.subscription?.plan || "No active plan"}
            </p>
            <p className={cn(isLightMode ? "text-gray-600" : "")}>
              Expires On:{" "}
              {currentUser?.subscription?.expiryDate instanceof Date
                ? currentUser.subscription.expiryDate.toDateString()
                : currentUser?.subscription?.expiryDate || "N/A"}
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/subscription" passHref>
              <Button
                variant="outline"
                className={cn("w-full", isLightMode ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : "")}
              >
                Manage Subscription
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className={cn("col-span-1 md:col-span-2", isLightMode ? "bg-white border-gray-200" : "")}>
          <CardHeader>
            <CardTitle className={cn(isLightMode ? "text-gray-800" : "text-muted-foreground")}>
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentUser?.transactions ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={cn(isLightMode ? "text-gray-600" : "")}>Order ID</TableHead>
                    <TableHead className={cn(isLightMode ? "text-gray-600" : "")}>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUser.transactions.map((transaction) => (
                    <TableRow key={transaction.orderId}>
                      <TableCell className={cn(isLightMode ? "text-gray-800" : "")}>{transaction.orderId}</TableCell>
                      <TableCell className={cn(isLightMode ? "text-gray-800" : "")}>
                        ${transaction.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className={cn(isLightMode ? "text-gray-600" : "")}>No recent transactions</p>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/transactions" passHref>
              <Button
                variant="outline"
                className={cn("w-full", isLightMode ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : "")}
              >
                View All Transactions
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.name}
            className={cn("flex flex-col h-full", isLightMode ? "bg-white border-gray-200" : "")}
          >
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
              <CardTitle className={cn(isLightMode ? "text-gray-800" : "")}>{product.name}</CardTitle>
              <CardDescription className={cn(isLightMode ? "text-gray-600" : "")}>
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">{/* Add more product details here if needed */}</CardContent>
            <CardFooter>
              <Button
                onClick={() => window.open(product.domain, "_blank")}
                className={cn("w-full", isLightMode ? "bg-gray-800 text-white hover:bg-gray-700" : "")}
              >
                Go to {product.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

