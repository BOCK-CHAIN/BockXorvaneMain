import { authConfig } from "@/app/amplify-cognito-config";
import { createServerRunner, NextServer } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession,getCurrentUser } from "aws-amplify/auth/server";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (amplifyContext) => {
      try {
        const session = await fetchAuthSession(amplifyContext);

        if (!session?.tokens) {
          return null;
        }
        const user = await getCurrentUser(amplifyContext);
      } catch (err) {
        console.error("Error fetching authenticated user:", err);
        return null;
      }
    },
  });
}
