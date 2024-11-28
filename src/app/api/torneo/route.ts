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

    export async function POST(req: Request, res: any) {
      try{
        // Obtener los datos del body
        const { nombre, categoria_fk, inscripciones_inicio, inscripciones_fin, inicio_torneo, fin_torneo, esta_habilitado } = await req.json();

        // Crear un torneo
        const torneo = await prisma.$queryRaw`INSERT INTO Torneo (nombre, categoria_fk, inscripciones_inicio, inscripciones_fin, inicio_torneo, fin_torneo, esta_habilitado) VALUES (${nombre}, ${categoria_fk}, ${inscripciones_inicio}, ${inscripciones_fin}, ${inicio_torneo}, ${fin_torneo}, ${esta_habilitado})`;
        // Devolver el torneo creado
        return NextResponse.json(torneo);
      } catch (error) {
        return handleError('Error al crear el torneo');
      }
    }


    export async function PUT(req: Request, res: any) {
      try{
        // Obtener los datos del body
        const { nombreOriginal, nombreNuevo, categoria_fk, inscripciones_inicio, inscripciones_fin, inicio, fin, esta_habilitado } = await req.json();
    
        // Actualizar el torneo
        const torneo = await prisma.$queryRaw`UPDATE Torneo SET nombre = ${nombreNuevo}, categoria_fk = ${categoria_fk}, inscripciones_inicio = ${inscripciones_inicio}, inscripciones_fin = ${inscripciones_fin}, inicio = ${inicio}, fin = ${fin}, esta_habilitado = ${esta_habilitado} WHERE nombre = ${nombreOriginal}`;
        // Devolver el torneo actualizado
        return NextResponse.json(torneo);
      }catch(error){
        return handleError('Error al actualizar el torneo');
      }
    }

    export async function DELETE(req: Request, res: any) {
      try{
        // Obtener el nombre del torneo a eliminar
        const { nombre } = await req.json();
    
        // Eliminar el torneo
        const torneo = await prisma.$queryRaw`DELETE FROM Torneo WHERE nombre = ${nombre}`;
        // Devolver el torneo eliminado
        return NextResponse.json(torneo);
      }catch(error){
        return handleError('Error al eliminar el torneo');
      }
    }

  