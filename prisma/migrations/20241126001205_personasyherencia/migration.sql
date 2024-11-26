-- CreateTable
CREATE TABLE "Persona" (
    "dni" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "fecha_nacimiento" DATETIME NOT NULL,
    "direccion_calle" TEXT NOT NULL,
    "direccion_altura" TEXT NOT NULL,
    "pass" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Jugador" (
    "dni_jugador" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nro_equipo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "nro_socio" INTEGER NOT NULL,
    "foto" TEXT NOT NULL,
    "es_responsable" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "DT" (
    "dni_dt" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "experiencia" INTEGER NOT NULL,
    "estilo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Arbitro" (
    "dni_arbitro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nivel_experiencia" TEXT NOT NULL,
    "tiene_certificacion" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Encargado" (
    "dni" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cant_torneos_creados" INTEGER NOT NULL,
    "cant_torneos_habilitados" INTEGER NOT NULL
);
