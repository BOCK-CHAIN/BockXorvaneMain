"use client"

import { useEffect, useState } from "react"
import { useCurrentUser } from "@/hooks/use-auth-user"
import Loader from "@/components/ui/loader/index"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetTransactions } from "@/hooks/sub"
import type { Transaction } from "@/schemas/user.types"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function TransactionsPage() {
  const { user } = useCurrentUser()
  const [loading, setLoading] = useState(true)
  const { transactions, isLoading } = useGetTransactions(user!.id)
  const [transactionsdata, setTransactions] = useState<Transaction[] | null>([])
  const { theme } = useTheme()
  const isLightMode = theme === "light"

  useEffect(() => {
    if (transactions) {
      setTransactions(transactions)
      setLoading(isLoading)
    } else {
      setLoading(isLoading)
    }
  }, [isLoading, transactions])

  if (loading) {
    return (
      <div className="h-screen w-full justify-center items-center flex">
        <Loader state color="primary" />
      </div>
    )
  }

  return (
    <div className={cn("container mx-auto py-8 px-4 space-y-8", isLightMode ? "text-gray-800" : "")}>
      <h1 className="text-3xl font-bold">Your Transactions</h1>
      <Card className={cn(isLightMode ? "bg-white border-gray-200" : "")}>
        <CardHeader>
          <CardTitle className={cn(isLightMode ? "text-gray-800" : "")}>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactionsdata && transactionsdata.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={cn(isLightMode ? "text-gray-600" : "")}>Payment ID</TableHead>
                  <TableHead className={cn(isLightMode ? "text-gray-600" : "")}>Order ID</TableHead>
                  <TableHead className={cn(isLightMode ? "text-gray-600" : "")}>Amount</TableHead>
                  <TableHead className={cn(isLightMode ? "text-gray-600" : "")}>Payment Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionsdata.map((transaction: Transaction) => (
                  <TableRow key={transaction.orderId}>
                    <TableCell className={cn(isLightMode ? "text-gray-800" : "")}>
                      {transaction.paymentId || "N/A"}
                    </TableCell>
                    <TableCell className={cn(isLightMode ? "text-gray-800" : "")}>{transaction.orderId}</TableCell>
                    <TableCell className={cn(isLightMode ? "text-gray-800" : "")}>
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className={cn(isLightMode ? "text-gray-800" : "")}>

                      {transaction.createdAt ? new Date(transaction.createdAt).toLocaleString() : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className={cn(isLightMode ? "text-gray-600" : "")}>No transactions found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

