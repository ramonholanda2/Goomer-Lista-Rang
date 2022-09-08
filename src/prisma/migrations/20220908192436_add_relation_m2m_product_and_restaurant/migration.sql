/*
  Warnings:

  - Added the required column `productId` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "RestaurantOnProduct" (
    "restaurantId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    PRIMARY KEY ("restaurantId", "productId"),
    CONSTRAINT "RestaurantOnProduct_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RestaurantOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("product_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Promotion" (
    "promotion_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "price_promotional" DECIMAL NOT NULL,
    "opening_hours_promotion" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "Promotion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("product_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Promotion" ("description", "opening_hours_promotion", "price_promotional", "promotion_id") SELECT "description", "opening_hours_promotion", "price_promotional", "promotion_id" FROM "Promotion";
DROP TABLE "Promotion";
ALTER TABLE "new_Promotion" RENAME TO "Promotion";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
