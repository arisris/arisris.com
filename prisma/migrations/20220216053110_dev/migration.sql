-- CreateTable
CREATE TABLE "guestbook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "page_view" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "count" BIGINT NOT NULL DEFAULT 1
);
