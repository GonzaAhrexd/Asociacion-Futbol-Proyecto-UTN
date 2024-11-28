/*
  Warnings:

  - You are about to drop the column `nombre_torneo` on the `Equipo` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipo" (
    "nro_equipo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dni_dt_fk" INTEGER NOT NULL,
    "categoria_fk" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    CONSTRAINT "Equipo_categoria_fk_fkey" FOREIGN KEY ("categoria_fk") REFERENCES "Categoria" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equipo_dni_dt_fk_fkey" FOREIGN KEY ("dni_dt_fk") REFERENCES "DirectorTecnico" ("dni_dt_fk") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equipo" ("categoria_fk", "division", "dni_dt_fk", "nombre", "nro_equipo") SELECT "categoria_fk", "division", "dni_dt_fk", "nombre", "nro_equipo" FROM "Equipo";
DROP TABLE "Equipo";
ALTER TABLE "new_Equipo" RENAME TO "Equipo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
