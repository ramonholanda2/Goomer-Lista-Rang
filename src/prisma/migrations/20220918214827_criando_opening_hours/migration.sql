/*
  Warnings:

  - You are about to drop the column `in` on the `OpeningHours` table. All the data in the column will be lost.
  - You are about to drop the column `of` on the `OpeningHours` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `OpeningHours` table. All the data in the column will be lost.
  - Added the required column `hour_close` to the `OpeningHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour_open` to the `OpeningHours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OpeningHours" DROP COLUMN "in",
DROP COLUMN "of",
DROP COLUMN "to",
ADD COLUMN     "days_week" TEXT[],
ADD COLUMN     "hour_close" TEXT NOT NULL,
ADD COLUMN     "hour_open" TEXT NOT NULL;
