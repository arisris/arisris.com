/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tags";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "detail" TEXT
);

-- CreateTable
CREATE TABLE "tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_post" ("body", "categoryId", "createdAt", "id", "status", "title", "updatedAt", "userId") SELECT "body", "categoryId", "createdAt", "id", "status", "title", "updatedAt", "userId" FROM "post";
DROP TABLE "post";
ALTER TABLE "new_post" RENAME TO "post";
CREATE TABLE "new__PostToTags" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__PostToTags" ("A", "B") SELECT "A", "B" FROM "_PostToTags";
DROP TABLE "_PostToTags";
ALTER TABLE "new__PostToTags" RENAME TO "_PostToTags";
CREATE UNIQUE INDEX "_PostToTags_AB_unique" ON "_PostToTags"("A", "B");
CREATE INDEX "_PostToTags_B_index" ON "_PostToTags"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
