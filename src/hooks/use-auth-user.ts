'use client';

import { fetchAuthSession, fetchUserAttributes, getCurrentUser } from "@aws-amplify/auth";
import { useQuery } from "@tanstack/react-query";

export const fetchUserData = async () => {
  const session = await fetchAuthSession();
  if (!session.tokens) {
    // throw new Error("No session tokens available");
    return null;
  }

  const user = {
    ...(await getCurrentUser()),
    ...(await fetchUserAttributes()),
  };

  return user;
};

export const useAuthuser = () => {
  const query = useQuery(
    {
      queryKey: ["User"], 
      queryFn: async()=>await fetchUserData(),
      staleTime: 1000 * 60 * 5, 
    }
  );

  return { ...query, user: query.data };
};
