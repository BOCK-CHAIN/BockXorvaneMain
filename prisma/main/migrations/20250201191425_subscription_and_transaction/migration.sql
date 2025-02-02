/*
  Warnings:

  - You are about to drop the column `expiryDate` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Transaction` table. All the data in the column will be lost.
  - Made the column `orderId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paymentId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "expiryDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "expiryDate",
DROP COLUMN "startDate",
ALTER COLUMN "orderId" SET NOT NULL,
ALTER COLUMN "paymentId" SET NOT NULL;
