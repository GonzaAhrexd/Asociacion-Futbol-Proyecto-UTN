// Haz el GET, POST, PUT, DELETE para Arbitro usando Prisma y consultas en SQL Crudas, la estructura es :

import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

// Haz el GET y POST con SQL PURO
/*
    
model Arbitro {
  dni_arbitro_fk Int @id // PK y FK
  nivel_experiencia String
  tiene_certificacion Boolean

  persona Persona @relation(fields: [dni_arbitro_fk], references: [dni])
  partidos Partido[]
}
*/

export const GET = async () => {
  const arbitro = await prisma.$queryRaw`SELECT * FROM Arbitro`;
  return NextResponse.json(arbitro);
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const { dni_arbitro_fk, nivel_experiencia, tiene_certificacion } = body;

  if (!dni_arbitro_fk || !nivel_experiencia || !tiene_certificacion) {
    return NextResponse.json(
      {
        error:
          "Faltan campos requeridos" +
          dni_arbitro_fk +
          " " +
          nivel_experiencia +
          " " +
          tiene_certificacion,
      },
      { status: 400 }
    );
  }
  console.log(
    dni_arbitro_fk + " " + nivel_experiencia + " " + tiene_certificacion
  );

  try {
    const arbitro = await prisma.$queryRaw`
    INSERT INTO Arbitro (dni_arbitro_fk, nivel_experiencia, tiene_certificacion)
    VALUES (${dni_arbitro_fk}, ${nivel_experiencia}, ${tiene_certificacion})
  `;
    return NextResponse.json(arbitro, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un problema al crear el árbitro" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const { dni_arbitro_fk, nivel_experiencia, tiene_certificacion } = body;

    const arbitro =
      await prisma.$queryRaw`UPDATE Arbitro SET nivel_experiencia = ${nivel_experiencia}, tiene_certificacion = ${tiene_certificacion} WHERE dni_arbitro_fk = ${dni_arbitro_fk}`;
    return NextResponse.json(arbitro, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Error al actualizar", error: e });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const { dni_arbitro_fk } = body;

    const arbitro =
      await prisma.$queryRaw`DELETE FROM Arbitro WHERE dni_arbitro_fk = ${dni_arbitro_fk}`;
    return NextResponse.json(arbitro, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Error al eliminar", error: e });
  }
};
