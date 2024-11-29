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
    export async function PUT(req: Request, res: any) {
      try{
        // Obtener los datos del body
        const { nombre } = await req.json();
    
        // Actualizar el torneo
        const torneo = await prisma.$queryRaw`UPDATE Torneo SET esta_habilitado = ${true} WHERE nombre = ${nombre}`;
        // Devolver el torneo actualizado
        return NextResponse.json(torneo);
      }catch(error){
        return handleError('Error al actualizar el torneo');
      }
    }

