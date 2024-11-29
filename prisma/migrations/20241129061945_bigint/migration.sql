/*
  Warnings:

  - The primary key for the `Arbitro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `dni_arbitro_fk` on the `Arbitro` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `DirectorTecnico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `dni_dt_fk` on the `DirectorTecnico` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `dni_dt_fk` on the `Equipo` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `Jugador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `dni_jugador_fk` on the `Jugador` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `JugadorPartido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `dni_jugador_fk` on the `JugadorPartido` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `dni_arbitro_fk` on the `Partido` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `Persona` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `dni` on the `Persona` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Arbitro" (
    "dni_arbitro_fk" BIGINT NOT NULL PRIMARY KEY,
    "nivel_experiencia" TEXT NOT NULL,
    "tiene_certificacion" BOOLEAN NOT NULL,
    CONSTRAINT "Arbitro_dni_arbitro_fk_fkey" FOREIGN KEY ("dni_arbitro_fk") REFERENCES "Persona" ("dni") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Arbitro" ("dni_arbitro_fk", "nivel_experiencia", "tiene_certificacion") SELECT "dni_arbitro_fk", "nivel_experiencia", "tiene_certificacion" FROM "Arbitro";
DROP TABLE "Arbitro";
ALTER TABLE "new_Arbitro" RENAME TO "Arbitro";
CREATE TABLE "new_DirectorTecnico" (
    "dni_dt_fk" BIGINT NOT NULL PRIMARY KEY,
    "nivel_experiencia" TEXT NOT NULL,
    "estilo" TEXT NOT NULL,
    CONSTRAINT "DirectorTecnico_dni_dt_fk_fkey" FOREIGN KEY ("dni_dt_fk") REFERENCES "Persona" ("dni") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DirectorTecnico" ("dni_dt_fk", "estilo", "nivel_experiencia") SELECT "dni_dt_fk", "estilo", "nivel_experiencia" FROM "DirectorTecnico";
DROP TABLE "DirectorTecnico";
ALTER TABLE "new_DirectorTecnico" RENAME TO "DirectorTecnico";
CREATE TABLE "new_Equipo" (
    "nro_equipo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dni_dt_fk" BIGINT NOT NULL,
    "categoria_fk" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    CONSTRAINT "Equipo_categoria_fk_fkey" FOREIGN KEY ("categoria_fk") REFERENCES "Categoria" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equipo_dni_dt_fk_fkey" FOREIGN KEY ("dni_dt_fk") REFERENCES "DirectorTecnico" ("dni_dt_fk") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equipo" ("categoria_fk", "division", "dni_dt_fk", "nombre", "nro_equipo") SELECT "categoria_fk", "division", "dni_dt_fk", "nombre", "nro_equipo" FROM "Equipo";
DROP TABLE "Equipo";
ALTER TABLE "new_Equipo" RENAME TO "Equipo";
CREATE TABLE "new_Jugador" (
    "dni_jugador_fk" BIGINT NOT NULL PRIMARY KEY,
    "nro_equipo" INTEGER,
    "categoria_fk" TEXT NOT NULL,
    "nro_socio" INTEGER NOT NULL,
    "foto" TEXT NOT NULL,
    "es_responsable" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Jugador_dni_jugador_fk_fkey" FOREIGN KEY ("dni_jugador_fk") REFERENCES "Persona" ("dni") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Jugador_categoria_fk_fkey" FOREIGN KEY ("categoria_fk") REFERENCES "Categoria" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Jugador_nro_equipo_fkey" FOREIGN KEY ("nro_equipo") REFERENCES "Equipo" ("nro_equipo") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Jugador" ("categoria_fk", "dni_jugador_fk", "es_responsable", "foto", "nro_equipo", "nro_socio") SELECT "categoria_fk", "dni_jugador_fk", "es_responsable", "foto", "nro_equipo", "nro_socio" FROM "Jugador";
DROP TABLE "Jugador";
ALTER TABLE "new_Jugador" RENAME TO "Jugador";
CREATE TABLE "new_JugadorPartido" (
    "dni_jugador_fk" BIGINT NOT NULL,
    "nro_partido_fk" INTEGER NOT NULL,
    "cant_faltas" INTEGER NOT NULL,
    "cant_goles" INTEGER NOT NULL,
    "cant_tarjetas_amarillas" INTEGER NOT NULL,
    "fue_expulsado" BOOLEAN NOT NULL,

    PRIMARY KEY ("dni_jugador_fk", "nro_partido_fk"),
    CONSTRAINT "JugadorPartido_nro_partido_fk_fkey" FOREIGN KEY ("nro_partido_fk") REFERENCES "Partido" ("nro_partido") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JugadorPartido_dni_jugador_fk_fkey" FOREIGN KEY ("dni_jugador_fk") REFERENCES "Jugador" ("dni_jugador_fk") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_JugadorPartido" ("cant_faltas", "cant_goles", "cant_tarjetas_amarillas", "dni_jugador_fk", "fue_expulsado", "nro_partido_fk") SELECT "cant_faltas", "cant_goles", "cant_tarjetas_amarillas", "dni_jugador_fk", "fue_expulsado", "nro_partido_fk" FROM "JugadorPartido";
DROP TABLE "JugadorPartido";
ALTER TABLE "new_JugadorPartido" RENAME TO "JugadorPartido";
CREATE TABLE "new_Partido" (
    "nro_partido" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo_fecha_fk" INTEGER NOT NULL,
    "dni_arbitro_fk" BIGINT NOT NULL,
    "cancha_fk" TEXT NOT NULL,
    "fecha_hora" DATETIME NOT NULL,
    CONSTRAINT "Partido_codigo_fecha_fk_fkey" FOREIGN KEY ("codigo_fecha_fk") REFERENCES "Fecha" ("codigo_fecha") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Partido_dni_arbitro_fk_fkey" FOREIGN KEY ("dni_arbitro_fk") REFERENCES "Arbitro" ("dni_arbitro_fk") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Partido_cancha_fk_fkey" FOREIGN KEY ("cancha_fk") REFERENCES "Cancha" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Partido" ("cancha_fk", "codigo_fecha_fk", "dni_arbitro_fk", "fecha_hora", "nro_partido") SELECT "cancha_fk", "codigo_fecha_fk", "dni_arbitro_fk", "fecha_hora", "nro_partido" FROM "Partido";
DROP TABLE "Partido";
ALTER TABLE "new_Partido" RENAME TO "Partido";
CREATE TABLE "new_Persona" (
    "dni" BIGINT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "fecha_nacimiento" DATETIME NOT NULL,
    "direccion" TEXT NOT NULL DEFAULT 'sin direccion',
    "telefono_contacto" INTEGER NOT NULL DEFAULT 0,
    "pass" TEXT NOT NULL,
    "es_encargado" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Persona" ("direccion", "dni", "es_encargado", "fecha_nacimiento", "nombre", "pass", "telefono_contacto") SELECT "direccion", "dni", "es_encargado", "fecha_nacimiento", "nombre", "pass", "telefono_contacto" FROM "Persona";
DROP TABLE "Persona";
ALTER TABLE "new_Persona" RENAME TO "Persona";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
