import {
  Enabled,
  QueryFunction,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";

export const useQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: Enabled
) => {
  const { data, isPending, isLoading, isFetched, refetch, isFetching } =
    useQuery({
      queryKey,
      queryFn,
    });
  return { data, isPending, isFetched, refetch, isFetching, isLoading };
};
