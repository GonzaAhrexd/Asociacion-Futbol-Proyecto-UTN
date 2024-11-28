// Utilizando SQL puro con Prisma, necesito que hagas las rutas para que se pueda crear, modificar y eliminar torneos 


/*
  nro_fixture Int @id // PK
  nombre_torneo_fk String
  cant_ruedas Int

*/

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function handleError(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(req: Request) {
    try {
        // Consulta cruda para obtener todos los torneos
        const fixtures = await prisma.$queryRaw`SELECT * FROM Fixture`;

        // Devolver los torneos como respuesta
        return NextResponse.json(fixtures, { status: 200 });
    }
    catch (error) {
        console.error('Error al obtener los fixtures:', error);
        return NextResponse.json(
            { error: 'Error al obtener los fixtures' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request, res: any) {
    try{
        // Obtener el cuerpo de la solicitud
        const body = await req.json();

        // Extraer los datos del cuerpo
        const { nombre_torneo_fk, cant_ruedas } = body;


        // Insertar un nuevo fixture en la base de datos
        const fixture = await prisma.$queryRaw`INSERT INTO Fixture (nombre_torneo_fk, cant_ruedas) VALUES ( ${nombre_torneo_fk}, ${Number(cant_ruedas)})`;

        // Devolver el fixture creado
        return NextResponse.json("Fixture creado", { status: 201 });
    }
    catch ( error ){
        console.log(error)
        return handleError('Error al crear el fixture');
    }
}

export async function PUT(req: Request) {
    try {
        // Obtener los datos del body

        const body = await req.json();

        const { nro_fixture, nombre_torneo_fk, cant_ruedas } = body;

      
        const fixture = await prisma.$queryRaw`
            UPDATE Fixture 
            SET nombre_torneo_fk = ${nombre_torneo_fk}, cant_ruedas = ${Number(cant_ruedas)}
            WHERE nro_fixture = ${(nro_fixture)}`;

        return NextResponse.json({ message: "Fixture actualizado correctamente" });
    } catch (error) {
        console.log(error)
        return handleError("Error al actualizar el fixture");
    }
}


export async function DELETE(req: Request, res: any) {
    try{
        // Obtener el cuerpo de la solicitud
        const { nro_fixture } = await req.json();

        // Eliminar el fixture de la base de datos
        const fixture = await prisma.$queryRaw`DELETE FROM Fixture WHERE nro_fixture = ${Number(nro_fixture)}`;

        // Devolver el fixture eliminado
        return NextResponse.json("Fixture eliminado", { status: 201 });
    } catch (error) {
        return handleError('Error al eliminar el fixture');
    }
}
