/*
  Warnings:

  - You are about to drop the column `opening_hours` on the `Restaurant` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DAYS_WEEK" AS ENUM ('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO');

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "opening_hours";

-- CreateTable
CREATE TABLE "OpeningHours" (
    "opening_hours_id" SERIAL NOT NULL,
    "of" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "in" "DAYS_WEEK"[],
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "OpeningHours_pkey" PRIMARY KEY ("opening_hours_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OpeningHours_restaurant_id_key" ON "OpeningHours"("restaurant_id");

-- AddForeignKey
ALTER TABLE "OpeningHours" ADD CONSTRAINT "OpeningHours_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
