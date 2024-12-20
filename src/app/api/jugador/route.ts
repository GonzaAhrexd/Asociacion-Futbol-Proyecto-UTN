// Utilizando SQL puro con Prisma, necesito que hagas las rutas para que se pueda asignar personas a jugadores
/*


model Persona {
  dni Int @id // PK
  nombre String
  fecha_nacimiento DateTime
  direccion String @default("sin direccion")
  telefono_contacto Int @default(0)
  pass String
  es_encargado Boolean @default(false)
  
  jugador       Jugador?
  directorTecnico DirectorTecnico?
  arbitro       Arbitro?
}


model Jugador {
  dni_jugador_fk Int @id // PK y FK
  nro_equipo Int
  categoria_fk String
  nro_socio Int
  foto String
  es_responsable Boolean @default(false)

  persona   Persona   @relation(fields: [dni_jugador_fk], references: [dni])
  categoria Categoria @relation(fields: [categoria_fk], references: [nombre])
  equipo    Equipo?   @relation(fields: [nro_equipo], references: [nro_equipo])
  partidos  JugadorPartido[]
}

*/

import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

function handleError(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(req: Request, res: any) {
  try {
    // Realizar una consulta cruda para obtener todos los jugadores
    const jugadores = await prisma.$queryRaw`SELECT * FROM Jugador`;

    // Devolver los jugadores como respuesta
    return NextResponse.json(jugadores);
  } catch (error) {
    return handleError("Error al obtener los jugadores");
  }
}

export async function POST(req: Request, res: any) {
  try {
    const {
      dni_jugador_fk,
      nro_equipo,
      categoria_fk,
      nro_socio,
      foto,
      es_responsable,
    } = await req.json();

    console.log(req.body);

    // Insertar un nuevo jugador
    await prisma.$executeRaw`INSERT INTO Jugador (dni_jugador_fk, nro_equipo, categoria_fk, nro_socio, foto, es_responsable) VALUES (${dni_jugador_fk}, ${nro_equipo}, ${categoria_fk}, ${nro_socio}, ${foto}, ${es_responsable})`;

    return NextResponse.json({ message: "Jugador creado" });
  } catch (error) {
    return handleError("Error al crear el jugador");
  }
}

export async function PATCH(req: Request, res: any) {
  try {
    const {
      dni_jugador_fk, // Identificador único del jugador
      nro_equipo,
      categoria_fk,
      nro_socio,
      foto,
      es_responsable,
    } = await req.json();

    // Verifica que se haya proporcionado el identificador principal
    if (!dni_jugador_fk) {
      return NextResponse.json(
        { error: "El dni_jugador_fk es obligatorio" },
        { status: 400 }
      );
    }

    console.log(req.body);

    // Actualiza el jugador con los campos proporcionados
    await prisma.$executeRaw`
      UPDATE Jugador 
      SET 
        nro_equipo = ${nro_equipo},
        categoria_fk = ${categoria_fk},
        nro_socio = ${nro_socio},
        foto = ${foto},
        es_responsable = ${es_responsable}
      WHERE dni_jugador_fk = ${dni_jugador_fk}
    `;

    return NextResponse.json({ message: "Jugador actualizado" });
  } catch (error) {
    console.error("Error al actualizar el jugador:", error);
    return handleError("Error al actualizar el jugador");
  }
}
