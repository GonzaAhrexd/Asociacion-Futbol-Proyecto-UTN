-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Jugador" (
    "dni_jugador_fk" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
