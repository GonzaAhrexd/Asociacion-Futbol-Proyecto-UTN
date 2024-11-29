import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


function handleError(message: string, status: number = 500) {
    return NextResponse.json({ error: message }, { status });
}

/*
  nro_equipo_fk Int
  nro_partido_fk Int
  se_presentaron Boolean
  goles_realizados Int


*/

export async function GET(req: Request) {
    try{
        // Realizar una consulta cruda para obtener todos los equipos
        const equipos = await prisma.$queryRaw`SELECT * FROM EquipoPartido`;

        // Devolver los equipos como respuesta
        return NextResponse.json(equipos, { status: 200 });
    }catch(error){
        console.error('Error al obtener los equipos:', error);
        return NextResponse.json(
            { error: 'Error al obtener los equipos' },
            { status: 500 }
        );
    }
}   

export async function POST(req: Request, res: any){
    try{
        // Obtener el cuerpo de la solicitud
        const body = await req.json();

        // Extraer los datos del cuerpo
        const { nro_equipo_fk, nro_partido_fk, se_presentaron, goles_realizados } = body;

        // Insertar un nuevo equipo en la base de datos
        const equipo = await prisma.$queryRaw`INSERT INTO EquipoPartido (nro_equipo_fk, nro_partido_fk, se_presentaron, goles_realizados) VALUES (${nro_equipo_fk}, ${nro_partido_fk}, ${se_presentaron}, ${goles_realizados})`;

        // Devolver el equipo creado
        return NextResponse.json("Equipo creado", { status: 201 });
    }catch(error){
        console.log(error)
        return handleError('Error al crear el equipo');
    }
}