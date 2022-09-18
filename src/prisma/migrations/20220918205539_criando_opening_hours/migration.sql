/*
  Warnings:

  - The `in` column on the `OpeningHours` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "OpeningHours" DROP COLUMN "in",
ADD COLUMN     "in" "DAYS_WEEK"[];
