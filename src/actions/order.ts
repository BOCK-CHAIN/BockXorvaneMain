"use server";
import prisma from "@/lib/prisma";

export const saveOrder = async (
  userId: string,
  orderData:
     {
        amount: number;
        expiryDate: Date;
        orderId: string;
        paymentId: null;
        startDate: Date;
        plan: "NONE" | "MONTHLY" | "YEARLY";
      }
    | {
        paymentId: string;
      }
) => {
  try {
    const response = await prisma.subscription.update({
      where: {
        userId: userId,
      },
      data: orderData,
    });

    return { response };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
