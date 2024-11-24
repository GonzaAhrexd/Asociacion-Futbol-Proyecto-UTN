/*
  Warnings:

  - You are about to drop the column `edad_maximan` on the `Categoria` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categoria" (
    "nombre" TEXT NOT NULL PRIMARY KEY,
    "edad_minima" INTEGER NOT NULL,
    "edad_maxima" INTEGER NOT NULL DEFAULT 100
);
INSERT INTO "new_Categoria" ("edad_minima", "nombre") SELECT "edad_minima", "nombre" FROM "Categoria";
DROP TABLE "Categoria";
ALTER TABLE "new_Categoria" RENAME TO "Categoria";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
