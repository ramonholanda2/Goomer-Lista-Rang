/*
  Warnings:

  - The `in` column on the `OpeningHours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `opening_hours` on the `Restaurant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurantId]` on the table `OpeningHours` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `and` to the `OpeningHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantId` to the `OpeningHours` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DAYS_WEEK" AS ENUM ('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO');

-- AlterTable
ALTER TABLE "OpeningHours" ADD COLUMN     "and" TEXT NOT NULL,
ADD COLUMN     "restaurantId" INTEGER NOT NULL,
DROP COLUMN "in",
ADD COLUMN     "in" "DAYS_WEEK"[];

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "opening_hours";

-- CreateIndex
CREATE UNIQUE INDEX "OpeningHours_restaurantId_key" ON "OpeningHours"("restaurantId");

-- AddForeignKey
ALTER TABLE "OpeningHours" ADD CONSTRAINT "OpeningHours_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
