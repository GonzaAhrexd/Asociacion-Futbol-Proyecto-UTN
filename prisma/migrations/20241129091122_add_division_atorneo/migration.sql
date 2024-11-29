-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Torneo" (
    "nombre" TEXT NOT NULL PRIMARY KEY,
    "categoria_fk" TEXT NOT NULL,
    "division" TEXT NOT NULL DEFAULT 'A',
    "inscripciones_inicio" DATETIME NOT NULL,
    "inscripciones_fin" DATETIME NOT NULL,
    "inicio_torneo" DATETIME NOT NULL,
    "fin_torneo" DATETIME NOT NULL,
    "esta_habilitado" BOOLEAN NOT NULL,
    CONSTRAINT "Torneo_categoria_fk_fkey" FOREIGN KEY ("categoria_fk") REFERENCES "Categoria" ("nombre") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Torneo" ("categoria_fk", "esta_habilitado", "fin_torneo", "inicio_torneo", "inscripciones_fin", "inscripciones_inicio", "nombre") SELECT "categoria_fk", "esta_habilitado", "fin_torneo", "inicio_torneo", "inscripciones_fin", "inscripciones_inicio", "nombre" FROM "Torneo";
DROP TABLE "Torneo";
ALTER TABLE "new_Torneo" RENAME TO "Torneo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
