
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
model Fecha {
  nro_fecha Int @id // PK
  cant_partidos Int

  ruedas RuedaFecha[]
  partidos Partido[]
}
*/

function handleError(message: string, status: number = 500) {
    return NextResponse.json({ error: message }, { status });
  }


export async function GET(req: Request) {
    try{
        // Realizar una consulta cruda para obtener todas las fechas
        const fechas = await prisma.$queryRaw`SELECT * FROM Fecha`;

        // Devolver las fechas como respuesta
        return NextResponse.json(fechas, { status: 200 });
    }catch(error){
        console.error('Error al obtener las fechas:', error);
        return NextResponse.json(
            { error: 'Error al obtener las fechas' },
            { status: 500 }
        );
    }
}


export async function POST(req: Request, res: any){
    try{
        // Obtener el cuerpo de la solicitud
        const body = await req.json();

        // Extraer los datos del cuerpo
        const { cant_partidos } = body;

        // Insertar una nueva fecha en la base de datos
        const fecha = await prisma.$queryRaw`
        INSERT INTO Fecha (cant_partidos)
        VALUES (${Number(cant_partidos)})`;
        return NextResponse.json("Fecha creada");
        // Devolver la fecha creada
    }catch(error){
        console.log(error)
        return handleError('Error al crear la fecha');
    }
}

export async function PUT(req: Request) {
    try{
        // Obtener los datos del body
        const body = await req.json();

        const { nro_fecha, cant_partidos } = body;

        // Actualizar la fecha
        const fecha = await prisma.$queryRaw`
        UPDATE Fecha
        SET cant_partidos = ${Number(cant_partidos)}
        WHERE nro_fecha = ${Number(nro_fecha)}`;
        return NextResponse.json("Fecha actualizada");
    }catch(error){
        console.log(error)
        return handleError('Error al actualizar la fecha');
    }
}

export async function DELETE(req: Request) {
    try{
        // Obtener el nro_fecha de la fecha a eliminar
        const { nro_fecha } = await req.json();

        // Eliminar la fecha
        const fecha = await prisma.$queryRaw`
        DELETE FROM Fecha
        WHERE nro_fecha = ${Number(nro_fecha)}`;
        return NextResponse.json("Fecha eliminada");
    }catch(error){
        console.log(error)
        return handleError('Error al eliminar la fecha');
    }
}