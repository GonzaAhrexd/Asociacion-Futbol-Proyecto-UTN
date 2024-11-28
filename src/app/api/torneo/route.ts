// Utilizando SQL puro con Prisma, necesito que hagas las rutas para que se pueda crear, modificar y eliminar torneos 


/*
 nombre String @id // PK
  categoria_fk String
  inscripciones_inicio DateTime
  inscripciones_fin DateTime
  inicio DateTime
  fin DateTime
  esta_habilitado Boolean
*/

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function handleError(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status });
}


export async function GET(req: Request, res: any) {
    try {
        // Realizar una consulta cruda para obtener todos los torneos
        const torneos = await prisma.$queryRaw`SELECT * FROM Torneo`;
    
        // Devolver los torneos como respuesta
        return NextResponse.json(torneos);
    } catch (error) {
        return handleError('Error al obtener los torneos');
    }
    }
