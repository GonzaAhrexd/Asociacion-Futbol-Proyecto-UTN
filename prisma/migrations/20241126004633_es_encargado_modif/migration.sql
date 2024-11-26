-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Persona" (
    "dni" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "fecha_nacimiento" DATETIME NOT NULL,
    "direccion_calle" TEXT NOT NULL,
    "direccion_altura" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "es_encargado" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Persona" ("direccion_altura", "direccion_calle", "dni", "fecha_nacimiento", "nombre", "pass") SELECT "direccion_altura", "direccion_calle", "dni", "fecha_nacimiento", "nombre", "pass" FROM "Persona";
DROP TABLE "Persona";
ALTER TABLE "new_Persona" RENAME TO "Persona";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
