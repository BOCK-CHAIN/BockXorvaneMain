/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_subscriptionId_fkey";

-- DropIndex
DROP INDEX "Transaction_subscriptionId_key";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "transactionId" TEXT;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "subscriptionId";

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_transactionId_key" ON "Subscription"("transactionId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
