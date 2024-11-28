/*
  Warnings:

  - You are about to drop the column `fin` on the `Torneo` table. All the data in the column will be lost.
  - You are about to drop the column `inicio` on the `Torneo` table. All the data in the column will be lost.
  - Added the required column `fin_torneo` to the `Torneo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inicio_torneo` to the `Torneo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Torneo" (
    "nombre" TEXT NOT NULL PRIMARY KEY,
    "categoria_fk" TEXT NOT NULL,
    "inscripciones_inicio" DATETIME NOT NULL,
    "inscripciones_fin" DATETIME NOT NULL,
    "inicio_torneo" DATETIME NOT NULL,
    "fin_torneo" DATETIME NOT NULL,
    "esta_habilitado" BOOLEAN NOT NULL,
    CONSTRAINT "Torneo_categoria_fk_fkey" FOREIGN KEY ("categoria_fk") REFERENCES "Categoria" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Torneo" ("categoria_fk", "esta_habilitado", "inscripciones_fin", "inscripciones_inicio", "nombre") SELECT "categoria_fk", "esta_habilitado", "inscripciones_fin", "inscripciones_inicio", "nombre" FROM "Torneo";
DROP TABLE "Torneo";
ALTER TABLE "new_Torneo" RENAME TO "Torneo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
