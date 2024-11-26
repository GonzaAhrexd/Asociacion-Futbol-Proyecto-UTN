/*
  Warnings:

  - The primary key for the `Arbitro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dni_arbitro` on the `Arbitro` table. All the data in the column will be lost.
  - The primary key for the `DT` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dni_dt` on the `DT` table. All the data in the column will be lost.
  - The primary key for the `Encargado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dni` on the `Encargado` table. All the data in the column will be lost.
  - The primary key for the `Jugador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dni_jugador` on the `Jugador` table. All the data in the column will be lost.
  - Added the required column `dni_arbitro_fk` to the `Arbitro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni_dt_fk` to the `DT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni_encargado_fk` to the `Encargado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni_jugador_fk` to the `Jugador` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Arbitro" (
    "dni_arbitro_fk" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nivel_experiencia" TEXT NOT NULL,
    "tiene_certificacion" BOOLEAN NOT NULL
);
INSERT INTO "new_Arbitro" ("nivel_experiencia", "tiene_certificacion") SELECT "nivel_experiencia", "tiene_certificacion" FROM "Arbitro";
DROP TABLE "Arbitro";
ALTER TABLE "new_Arbitro" RENAME TO "Arbitro";
CREATE TABLE "new_DT" (
    "dni_dt_fk" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "experiencia" INTEGER NOT NULL,
    "estilo" TEXT NOT NULL
);
INSERT INTO "new_DT" ("estilo", "experiencia") SELECT "estilo", "experiencia" FROM "DT";
DROP TABLE "DT";
ALTER TABLE "new_DT" RENAME TO "DT";
CREATE TABLE "new_Encargado" (
    "dni_encargado_fk" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cant_torneos_creados" INTEGER NOT NULL,
    "cant_torneos_habilitados" INTEGER NOT NULL
);
INSERT INTO "new_Encargado" ("cant_torneos_creados", "cant_torneos_habilitados") SELECT "cant_torneos_creados", "cant_torneos_habilitados" FROM "Encargado";
DROP TABLE "Encargado";
ALTER TABLE "new_Encargado" RENAME TO "Encargado";
CREATE TABLE "new_Jugador" (
    "dni_jugador_fk" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nro_equipo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "nro_socio" INTEGER NOT NULL,
    "foto" TEXT NOT NULL,
    "es_responsable" BOOLEAN NOT NULL
);
INSERT INTO "new_Jugador" ("categoria", "es_responsable", "foto", "nro_equipo", "nro_socio") SELECT "categoria", "es_responsable", "foto", "nro_equipo", "nro_socio" FROM "Jugador";
DROP TABLE "Jugador";
ALTER TABLE "new_Jugador" RENAME TO "Jugador";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
