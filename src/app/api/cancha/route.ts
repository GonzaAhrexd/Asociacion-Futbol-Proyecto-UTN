
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
    model Cancha {
  nombre String @id // PK
  direccion String

  partidos Partido[]
}


*/

function handleError(message: string, status: number = 500) {
    return NextResponse.json({ error: message }, { status });
  }

export async function GET(req: Request) {
    try{
        // Realizar una consulta cruda para obtener todos los torneos
        const canchas = await prisma.$queryRaw`SELECT * FROM Cancha`;

        // Devolver los torneos como respuesta
        return NextResponse.json(canchas, { status: 200 });
    }catch(error){
        console.error('Error al obtener las canchas:', error);
        return NextResponse.json(
            { error: 'Error al obtener las canchas' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request, res: any){
    try{
        // Obtener el cuerpo de la solicitud
        const body = await req.json();

        // Extraer los datos del cuerpo
        const { nombre, direccion } = body;

        // Insertar una nueva cancha en la base de datos
        const cancha = await prisma.$queryRaw`
        INSERT INTO Cancha (nombre, direccion)
        VALUES (${nombre}, ${direccion})`;
        return NextResponse.json("Cancha creada");
        // Devolver la cancha creada
    }catch(error){
        console.log(error)
        return handleError('Error al crear la cancha');
    }
}

export async function PUT(req: Request) {
    try{
        // Obtener los datos del body
        const body = await req.json();

        const { nombre, direccion } = body;

        // Actualizar la cancha
        const cancha = await prisma.$queryRaw`
        UPDATE Cancha
        SET direccion = ${direccion}
        WHERE nombre = ${nombre}`;
        return NextResponse.json("Cancha actualizada");
    }catch(error){
        console.log(error)
        return handleError('Error al actualizar la cancha');
    }
}


export async function DELETE(req: Request) {
    try{
        // Obtener el nombre de la cancha
        const { nombre } = await req.json();

        // Eliminar la cancha
        const cancha = await prisma.$queryRaw`
        DELETE FROM Cancha
        WHERE nombre = ${nombre}`;

        return NextResponse.json("Cancha eliminada");

    }catch(error){
        console.log(error)
        return handleError('Error al eliminar la cancha');
    }
}
