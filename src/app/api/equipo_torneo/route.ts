import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function handleError(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status });
}



export async function POST(req: Request, res: any) {
  try {

    const body = await req.json();

    const { nro_equipo_fk, nombre_torneo_fk } = body

    console.log(body)

    const torneo = await prisma.$queryRaw`INSERT INTO EquipoTorneo (nro_equipo_fk, nombre_torneo_fk) VALUES (${Number(nro_equipo_fk)}, ${nombre_torneo_fk})`;

    return NextResponse.json("Equipo inscrito");

    } catch (error) {
    console.log(error)
    return handleError('Error al inscribir equipo');
    }
}