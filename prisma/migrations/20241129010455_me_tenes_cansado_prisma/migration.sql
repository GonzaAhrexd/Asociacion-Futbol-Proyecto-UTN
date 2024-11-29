/*
  Warnings:

  - The primary key for the `Fecha` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nro_fecha` on the `Fecha` table. All the data in the column will be lost.
  - You are about to drop the column `nro_fecha_fk` on the `Partido` table. All the data in the column will be lost.
  - The primary key for the `Rueda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RuedaFecha` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nro_fecha_fk` on the `RuedaFecha` table. All the data in the column will be lost.
  - You are about to drop the column `nro_rueda_fk` on the `RuedaFecha` table. All the data in the column will be lost.
  - Added the required column `codigo_fecha` to the `Fecha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo_fecha_fk` to the `Partido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo_rueda` to the `Rueda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo_fecha_fk` to the `RuedaFecha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo_rueda_fk` to the `RuedaFecha` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fecha" (
    "codigo_fecha" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cant_partidos" INTEGER NOT NULL,
    "nro_fecha_rueda" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Fecha" ("cant_partidos") SELECT "cant_partidos" FROM "Fecha";
DROP TABLE "Fecha";
ALTER TABLE "new_Fecha" RENAME TO "Fecha";
CREATE TABLE "new_Partido" (
    "nro_partido" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo_fecha_fk" INTEGER NOT NULL,
    "dni_arbitro_fk" INTEGER NOT NULL,
    "cancha_fk" TEXT NOT NULL,
    "fecha_hora" DATETIME NOT NULL,
    CONSTRAINT "Partido_codigo_fecha_fk_fkey" FOREIGN KEY ("codigo_fecha_fk") REFERENCES "Fecha" ("codigo_fecha") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Partido_dni_arbitro_fk_fkey" FOREIGN KEY ("dni_arbitro_fk") REFERENCES "Arbitro" ("dni_arbitro_fk") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Partido_cancha_fk_fkey" FOREIGN KEY ("cancha_fk") REFERENCES "Cancha" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Partido" ("cancha_fk", "dni_arbitro_fk", "fecha_hora", "nro_partido") SELECT "cancha_fk", "dni_arbitro_fk", "fecha_hora", "nro_partido" FROM "Partido";
DROP TABLE "Partido";
ALTER TABLE "new_Partido" RENAME TO "Partido";
CREATE TABLE "new_Rueda" (
    "codigo_rueda" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nro_fixture_fk" INTEGER NOT NULL,
    "cant_fechas" INTEGER NOT NULL,
    "nro_rueda" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Rueda_nro_fixture_fk_fkey" FOREIGN KEY ("nro_fixture_fk") REFERENCES "Fixture" ("nro_fixture") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rueda" ("cant_fechas", "nro_fixture_fk", "nro_rueda") SELECT "cant_fechas", "nro_fixture_fk", "nro_rueda" FROM "Rueda";
DROP TABLE "Rueda";
ALTER TABLE "new_Rueda" RENAME TO "Rueda";
CREATE TABLE "new_RuedaFecha" (
    "codigo_rueda_fk" INTEGER NOT NULL,
    "codigo_fecha_fk" INTEGER NOT NULL,

    PRIMARY KEY ("codigo_rueda_fk", "codigo_fecha_fk"),
    CONSTRAINT "RuedaFecha_codigo_fecha_fk_fkey" FOREIGN KEY ("codigo_fecha_fk") REFERENCES "Fecha" ("codigo_fecha") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RuedaFecha_codigo_rueda_fk_fkey" FOREIGN KEY ("codigo_rueda_fk") REFERENCES "Rueda" ("codigo_rueda") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "RuedaFecha";
ALTER TABLE "new_RuedaFecha" RENAME TO "RuedaFecha";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
