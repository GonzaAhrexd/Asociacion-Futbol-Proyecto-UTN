
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function handleError(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: any, { params }: any) {
    try {
        // const body = await req.json();
        // console.log(body)
        const { categoria } = params; // Usamos req.params para obtener el valor de 'categoria'
        console.log('Categoría:', categoria);

    
        // Consulta cruda para obtener todos los torneos
        const torneos = await prisma.$queryRaw`SELECT * FROM Torneo WHERE categoria_fk = ${categoria}`;
        // Devolver los torneos como respuesta
        return NextResponse.json(torneos, { status: 200 });
    }
    catch (error) {
        console.error('Error al obtener los torneos:', error);
        return NextResponse.json(
            { error: 'Error al obtener los torneos' },
            { status: 500 }
        );
    }
}