import { fetchTransactions } from "@/actions/order";
import { useQuery } from "@tanstack/react-query"

export const useGetTransactions = (userId: string) => {
    const query = useQuery({
        queryKey: ['transactions', userId],
        queryFn: async () => {
            const response = await fetchTransactions(userId);
            return response
        },
    })
    return {...query, transactions: query.data}
}