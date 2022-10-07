/*
  Warnings:

  - You are about to drop the column `productId` on the `Promotion` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `Promotion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_productId_fkey";

-- DropIndex
DROP INDEX "Promotion_productId_key";

-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "productId",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Promotion_product_id_key" ON "Promotion"("product_id");

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
