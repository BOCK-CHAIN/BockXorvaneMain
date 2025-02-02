/*
  Warnings:

  - You are about to drop the column `amount` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `expiryDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "amount",
DROP COLUMN "expiryDate",
DROP COLUMN "orderId",
DROP COLUMN "paymentId",
DROP COLUMN "startDate",
ADD COLUMN     "transactionId" TEXT;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "orderId" TEXT,
    "paymentId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_transactionId_key" ON "Subscription"("transactionId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
