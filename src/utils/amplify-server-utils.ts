import { authConfig } from "@/constants/authConfig";
import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        let session = await fetchAuthSession(contextSpec);
        if (!session.tokens) {
          return;
        }
        let user = {
          ...(await getCurrentUser(contextSpec)),
          isAdmin: false,
        };
        let groups = session.tokens.accessToken.payload["cognito:groups"];
        // @ts-ignore
        user.isAdmin = Boolean(groups && groups.includes("Admin"));
        return user;
      } catch (error) {
        console.log("Error",error);
      }
    },
  });
}


