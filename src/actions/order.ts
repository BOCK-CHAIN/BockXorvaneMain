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

export const deleteExpiredOrders = async () => {
  try {
    const response = await prisma.subscription.deleteMany({
      where: {
        expiryDate: {
          lt: new Date(), // Delete where expiryDate is in the past
        },
      },
    });

    console.log(`Deleted ${response.count} expired orders.`);
    return { deleted: response.count };
  } catch (error) {
    console.error("Error deleting expired orders:", error);
    return { error };
  }
};

export const resetExpiredSubscriptions = async () => {
  try {
    const response = await prisma.subscription.updateMany({
      where: {
        expiryDate: {
          lt: new Date(), 
        },
      },
      data: {
        orderId: null,
        paymentId: null,
        amount: null,
        startDate: null,
        expiryDate: null,
        plan: "NONE",
      },
    });

    console.log(`Updated ${response.count} expired subscriptions.`);
    return { updated: response.count };
  } catch (error) {
    console.error("Error resetting expired subscriptions:", error);
    return { error };
  }
};
