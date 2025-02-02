/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subscriptionId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_transactionId_fkey";

-- DropIndex
DROP INDEX "Subscription_transactionId_key";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "transactionId";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "subscriptionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_subscriptionId_key" ON "Transaction"("subscriptionId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
