"use server";
import prisma from "../lib/prisma";

export const saveOrder = async (
  userId: string,
  orderData: {
    transaction: {
      orderId: string;
      amount: number;
    };
    plan: "NONE" | "MONTHLY" | "YEARLY";
    startDate: Date;
    expiryDate: Date;
  }
) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!subscription) {
      return { error: "Subscription not found." };
    }
    const transaction = await prisma.transaction.create({
      data: {
        userId: userId,
        orderId: orderData.transaction.orderId,
        amount: orderData.transaction.amount,
      },
    });
    const response = await prisma.subscription.update({
      where: {
        userId: userId,
      },
      data: {
        transactionId: transaction.id,
        plan: orderData.plan,
        startDate: orderData.startDate,
        expiryDate: orderData.expiryDate,
      },
    });

    return { response };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const savePaymentToDb = async (userId: string, paymentId: string) => {
  try {
    const response = await prisma.subscription.update({
      where: {
        userId: userId,
      },
      data: {
        transaction: {
          update: {
            paymentId: paymentId,
          },
        },
      },
    });

    return { response };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

// export const deleteExpiredOrders = async () => {
//   try {
//     const response = await prisma.subscription.deleteMany({
//       where: {
//         expiryDate: {
//           lt: new Date(), // Delete where expiryDate is in the past
//         },
//       },
//     });

//     console.log(`Deleted ${response.count} expired orders.`);
//     return { deleted: response.count };
//   } catch (error) {
//     console.error("Error deleting expired orders:", error);
//     return { error };
//   }
// };

export const resetExpiredSubscriptions = async () => {
  try {
    const response = await prisma.subscription.updateMany({
      where: {
        expiryDate: {
          lte: new Date(),
        },
      },
      data: {
        transactionId: null,
        plan: "NONE",
        startDate: null,
        expiryDate: null,
      },
    });

    console.log(`Updated ${response.count} expired subscriptions.`);
    return { updated: response.count };
  } catch (error) {
    console.error("Error resetting expired subscriptions:", error);
    return { error };
  }
};

export const fetchTransactions = async (userId: string) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
    });

    return transactions;
  } catch (error) {
    console.error(error);
    return null;
  }
}
