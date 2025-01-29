import { resetExpiredSubscriptions } from "@/actions/order";

const runCleanup = async () => {
  console.log("Running subscription cleanup job...");
  await resetExpiredSubscriptions();
  console.log("Cleanup job completed.");
  process.exit(); // Exit the script after execution
};

runCleanup().catch((err) => {
  console.error("Error running cleanup job:", err);
  process.exit(1);
});
