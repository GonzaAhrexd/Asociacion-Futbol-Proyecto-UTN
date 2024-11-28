// Haz el GET, POST, PUT, DELETE para Director Técnico usando Prisma y consultas en SQL Crudas, la estructura es :

/* 



model DirectorTecnico {
  dni_dt_fk Int @id // PK y FK
  nivel_experiencia String
  estilo String

  persona Persona @relation(fields: [dni_dt_fk], references: [dni])
  equipos Equipo[]
}


*/


import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Haz el GET y POST con SQL PURO

export const GET = async () => {
    const dt = await prisma.$queryRaw`SELECT * FROM DirectorTecnico`;
    return NextResponse.json(dt);
}

export const POST = async (req: Request) => {
    const body = await req.json();
    const { dni_dt_fk, nivel_experiencia, estilo } = body;

    const dt = await prisma.$queryRaw`INSERT INTO DirectorTecnico (dni_dt_fk, nivel_experiencia, estilo) VALUES (${dni_dt_fk}, ${nivel_experiencia}, ${estilo})`;
    return NextResponse.json(dt, { status: 201 });
}

export const PUT = async (req: Request) => {
    try {

        const body = await req.json();
        const { dni_dt_fk, nivel_experiencia, estilo } = body;

        const dt = await prisma.$queryRaw`UPDATE DirectorTecnico SET nivel_experiencia = ${nivel_experiencia}, estilo = ${estilo} WHERE dni_dt_fk = ${dni_dt_fk}`;
        return NextResponse.json(dt, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: 'Error al actualizar', error: e });
    }
}

export const DELETE = async (req: Request) => {
    try {
        const body = await req.json();
        const { dni_dt_fk } = body;

        const dt = await prisma.$queryRaw`DELETE FROM DirectorTecnico WHERE dni_dt_fk = ${dni_dt_fk}`;
        return NextResponse.json(dt, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: 'Error al eliminar', error: e });
    }
}

