-- CreateTable
CREATE TABLE "Restaurant" (
    "restaurant_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "opening_hours" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Promotion" (
    "promotion_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "price_promotional" DECIMAL NOT NULL,
    "opening_hours_promotion" TEXT NOT NULL
);
