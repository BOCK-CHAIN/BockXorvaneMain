"use client"

import { useEffect, useState } from "react"
import { useCurrentUser } from "@/hooks/use-auth-user"
import Loader from "@/components/ui/loader/index"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetTransactions } from "@/hooks/sub"
import { Transaction, User } from "@/schemas/user.types"

export default function TransactionsPage() {
    const { user } = useCurrentUser()
    const [loading, setLoading] = useState(true)
    const { transactions, isLoading } = useGetTransactions(user!.id)
    const [transactionsdata, setTransactions] = useState<Transaction[] | null>([])

    useEffect(() => {
        if (transactions) {
            setTransactions(transactions)
            setLoading(isLoading)
        } else {
            setLoading(isLoading)
        }
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
            <h1 className="text-3xl font-bold">Your Transactions</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    {transactionsdata && transactionsdata.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Payment ID</TableHead>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactionsdata.map((transaction: Transaction) => (
                                    <TableRow key={transaction.orderId}>
                                        <TableCell>{transaction.paymentId || "N/A"}</TableCell>
                                        <TableCell>{transaction.orderId}</TableCell>
                                        <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No transactions found.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

