/*
  Warnings:

  - You are about to alter the column `price_promotional` on the `Promotion` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - A unique constraint covering the columns `[productId]` on the table `Promotion` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Promotion" ALTER COLUMN "price_promotional" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Promotion_productId_key" ON "Promotion"("productId");
