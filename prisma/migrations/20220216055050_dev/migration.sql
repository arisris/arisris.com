/*
  Warnings:

  - You are about to alter the column `count` on the `page_view` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to drop the column `created_at` on the `guestbook` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `guestbook` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `guestbook` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `guestbook` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `guestbook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `guestbook` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "detail" TEXT
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostToTags" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_page_view" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "count" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_page_view" ("count", "slug") SELECT "count", "slug" FROM "page_view";
DROP TABLE "page_view";
ALTER TABLE "new_page_view" RENAME TO "page_view";
CREATE TABLE "new_guestbook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "guestbook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_guestbook" ("body", "id") SELECT "body", "id" FROM "guestbook";
DROP TABLE "guestbook";
ALTER TABLE "new_guestbook" RENAME TO "guestbook";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTags_AB_unique" ON "_PostToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTags_B_index" ON "_PostToTags"("B");
