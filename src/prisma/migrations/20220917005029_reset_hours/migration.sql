/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `OpeningHours` table. All the data in the column will be lost.
  - Added the required column `opening_hours` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OpeningHours" DROP CONSTRAINT "OpeningHours_restaurantId_fkey";

-- DropIndex
DROP INDEX "OpeningHours_restaurantId_key";

-- AlterTable
ALTER TABLE "OpeningHours" DROP COLUMN "restaurantId";

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "opening_hours" TEXT NOT NULL;
