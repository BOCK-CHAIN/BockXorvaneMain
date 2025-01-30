import { PrismaClient } from "../prisma/generated/main";

const prisma = new PrismaClient();

const runCleanup = async () => {
  console.log("Running subscription cleanup job...");
  const response = await prisma.subscription.updateMany({
    where: {
      expiryDate: {
        lte: new Date(), 
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
  console.log("Cleanup job completed.");
  process.exit(); // Exit the script after execution
};

runCleanup().catch((err) => {
  console.error("Error running cleanup job:", err);
  process.exit(1);
});
