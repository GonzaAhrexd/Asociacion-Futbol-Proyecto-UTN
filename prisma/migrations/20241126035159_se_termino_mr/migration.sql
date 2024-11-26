/*
  Warnings:

  - You are about to drop the `DT` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Encargado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `categoria` on the `Jugador` table. All the data in the column will be lost.
  - You are about to alter the column `nro_equipo` on the `Jugador` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `direccion_altura` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `direccion_calle` on the `Persona` table. All the data in the column will be lost.
  - Added the required column `categoria_fk` to the `Jugador` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DT";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Encargado";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DirectorTecnico" (
    "dni_dt_fk" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nivel_experiencia" TEXT NOT NULL,
    "estilo" TEXT NOT NULL,
    CONSTRAINT "DirectorTecnico_dni_dt_fk_fkey" FOREIGN KEY ("dni_dt_fk") REFERENCES "Persona" ("dni") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipo" (
    "nro_equipo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_torneo" TEXT NOT NULL,
    "dni_dt_fk" INTEGER NOT NULL,
    "categoria_fk" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    CONSTRAINT "Equipo_categoria_fk_fkey" FOREIGN KEY ("categoria_fk") REFERENCES "Categoria" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equipo_dni_dt_fk_fkey" FOREIGN KEY ("dni_dt_fk") REFERENCES "DirectorTecnico" ("dni_dt_fk") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EquipoPartido" (
    "nro_equipo_fk" INTEGER NOT NULL,
    "nro_partido_fk" INTEGER NOT NULL,
    "se_presentaron" BOOLEAN NOT NULL,
    "goles_realizados" INTEGER NOT NULL,

    PRIMARY KEY ("nro_equipo_fk", "nro_partido_fk"),
    CONSTRAINT "EquipoPartido_nro_equipo_fk_fkey" FOREIGN KEY ("nro_equipo_fk") REFERENCES "Equipo" ("nro_equipo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EquipoPartido_nro_partido_fk_fkey" FOREIGN KEY ("nro_partido_fk") REFERENCES "Partido" ("nro_partido") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Partido" (
    "nro_partido" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nro_fecha_fk" INTEGER NOT NULL,
    "dni_arbitro_fk" INTEGER NOT NULL,
    "cancha_fk" TEXT NOT NULL,
    "fecha_hora" DATETIME NOT NULL,
    CONSTRAINT "Partido_nro_fecha_fk_fkey" FOREIGN KEY ("nro_fecha_fk") REFERENCES "Fecha" ("nro_fecha") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Partido_dni_arbitro_fk_fkey" FOREIGN KEY ("dni_arbitro_fk") REFERENCES "Arbitro" ("dni_arbitro_fk") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Partido_cancha_fk_fkey" FOREIGN KEY ("cancha_fk") REFERENCES "Cancha" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cancha" (
    "nombre" TEXT NOT NULL PRIMARY KEY,
    "direccion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EquipoTorneo" (
    "nro_equipo_fk" INTEGER NOT NULL,
    "nombre_torneo_fk" TEXT NOT NULL,

    PRIMARY KEY ("nro_equipo_fk", "nombre_torneo_fk"),
    CONSTRAINT "EquipoTorneo_nro_equipo_fk_fkey" FOREIGN KEY ("nro_equipo_fk") REFERENCES "Equipo" ("nro_equipo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EquipoTorneo_nombre_torneo_fk_fkey" FOREIGN KEY ("nombre_torneo_fk") REFERENCES "Torneo" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Torneo" (
    "nombre" TEXT NOT NULL PRIMARY KEY,
    "categoria_fk" TEXT NOT NULL,
    "inscripciones_inicio" DATETIME NOT NULL,
    "inscripciones_fin" DATETIME NOT NULL,
    "inicio" DATETIME NOT NULL,
    "fin" DATETIME NOT NULL,
    "esta_habilitado" BOOLEAN NOT NULL,
    CONSTRAINT "Torneo_categoria_fk_fkey" FOREIGN KEY ("categoria_fk") REFERENCES "Categoria" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fixture" (
    "nro_fixture" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_torneo_fk" TEXT NOT NULL,
    "cant_ruedas" INTEGER NOT NULL,
    CONSTRAINT "Fixture_nombre_torneo_fk_fkey" FOREIGN KEY ("nombre_torneo_fk") REFERENCES "Torneo" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rueda" (
    "nro_rueda" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nro_fixture_fk" INTEGER NOT NULL,
    "cant_fechas" INTEGER NOT NULL,
    CONSTRAINT "Rueda_nro_fixture_fk_fkey" FOREIGN KEY ("nro_fixture_fk") REFERENCES "Fixture" ("nro_fixture") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fecha" (
    "nro_fecha" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cant_partidos" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "RuedaFecha" (
    "nro_rueda_fk" INTEGER NOT NULL,
    "nro_fecha_fk" INTEGER NOT NULL,

    PRIMARY KEY ("nro_rueda_fk", "nro_fecha_fk"),
    CONSTRAINT "RuedaFecha_nro_fecha_fk_fkey" FOREIGN KEY ("nro_fecha_fk") REFERENCES "Fecha" ("nro_fecha") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RuedaFecha_nro_rueda_fk_fkey" FOREIGN KEY ("nro_rueda_fk") REFERENCES "Rueda" ("nro_rueda") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JugadorPartido" (
    "dni_jugador_fk" INTEGER NOT NULL,
    "nro_partido_fk" INTEGER NOT NULL,
    "cant_faltas" INTEGER NOT NULL,
    "cant_goles" INTEGER NOT NULL,
    "cant_tarjetas_amarillas" INTEGER NOT NULL,
    "fue_expulsado" BOOLEAN NOT NULL,

    PRIMARY KEY ("dni_jugador_fk", "nro_partido_fk"),
    CONSTRAINT "JugadorPartido_nro_partido_fk_fkey" FOREIGN KEY ("nro_partido_fk") REFERENCES "Partido" ("nro_partido") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JugadorPartido_dni_jugador_fk_fkey" FOREIGN KEY ("dni_jugador_fk") REFERENCES "Jugador" ("dni_jugador_fk") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Arbitro" (
    "dni_arbitro_fk" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nivel_experiencia" TEXT NOT NULL,
    "tiene_certificacion" BOOLEAN NOT NULL,
    CONSTRAINT "Arbitro_dni_arbitro_fk_fkey" FOREIGN KEY ("dni_arbitro_fk") REFERENCES "Persona" ("dni") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Arbitro" ("dni_arbitro_fk", "nivel_experiencia", "tiene_certificacion") SELECT "dni_arbitro_fk", "nivel_experiencia", "tiene_certificacion" FROM "Arbitro";
DROP TABLE "Arbitro";
ALTER TABLE "new_Arbitro" RENAME TO "Arbitro";
CREATE TABLE "new_Jugador" (
    "dni_jugador_fk" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nro_equipo" INTEGER NOT NULL,
    "categoria_fk" TEXT NOT NULL,
    "nro_socio" INTEGER NOT NULL,
    "foto" TEXT NOT NULL,
    "es_responsable" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Jugador_dni_jugador_fk_fkey" FOREIGN KEY ("dni_jugador_fk") REFERENCES "Persona" ("dni") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Jugador_categoria_fk_fkey" FOREIGN KEY ("categoria_fk") REFERENCES "Categoria" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Jugador_nro_equipo_fkey" FOREIGN KEY ("nro_equipo") REFERENCES "Equipo" ("nro_equipo") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Jugador" ("dni_jugador_fk", "es_responsable", "foto", "nro_equipo", "nro_socio") SELECT "dni_jugador_fk", "es_responsable", "foto", "nro_equipo", "nro_socio" FROM "Jugador";
DROP TABLE "Jugador";
ALTER TABLE "new_Jugador" RENAME TO "Jugador";
CREATE TABLE "new_Persona" (
    "dni" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "fecha_nacimiento" DATETIME NOT NULL,
    "direccion" TEXT NOT NULL DEFAULT 'sin direccion',
    "telefono_contacto" INTEGER NOT NULL DEFAULT 0,
    "pass" TEXT NOT NULL,
    "es_encargado" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Persona" ("dni", "es_encargado", "fecha_nacimiento", "nombre", "pass") SELECT "dni", "es_encargado", "fecha_nacimiento", "nombre", "pass" FROM "Persona";
DROP TABLE "Persona";
ALTER TABLE "new_Persona" RENAME TO "Persona";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
