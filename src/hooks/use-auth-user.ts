"use client";

import { fetchCurrentUser } from "@/actions/user";
import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "@aws-amplify/auth";
import { useQuery } from "@tanstack/react-query";

export const fetchUserData = async () => {
  const session = await fetchAuthSession();
  if (!session.tokens) {
    return null;
  }
  const user = {
    ...(await getCurrentUser()),
    ...(await fetchUserAttributes()),
  };
  return user;
};

export const useAuthuser = () => {
  const query = useQuery({
    queryKey: ["AuthUser"],
    queryFn: async () => {
      try {
        return await fetchUserData();
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  return { ...query, authUser: query.data };
};

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["User"],
    queryFn: async () => {
      try {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          return null;
        }
        const authUser = await fetchUserAttributes();
        if (!authUser || !authUser.email) return null;
        const user = await fetchCurrentUser(authUser.email);
        return user;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  });
  return { ...query, user: query.data };
};
