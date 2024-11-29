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


export async function GET(req: Request) {
  try {
    // Consulta cruda para obtener todos los torneos
//    const torneos = await prisma.$queryRaw`SELECT * FROM Torneo`;
    const jugadores = await prisma.$queryRaw`SELECT * FROM Torneo`;

    // Devolver los torneos como respuesta
    return NextResponse.json(jugadores, { status: 200 });
  } catch (error) {
    console.error('Error al obtener los torneos:', error);
    return NextResponse.json(
      { error: 'Error al obtener los torneos' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, res: any) {
  try {
    // Realizar una consulta cruda para obtener todos los equipos
    const { nombre, categoria_fk, inscripciones_inicio, inscripciones_fin, inicio_torneo, fin_torneo, esta_habilitado } = await req.json();
    // Devolver los equipos como respuesta

      // Haz que las fechas tengan este formato 2024-11-25T23:59:59.000Z
    const inicioInsc = new Date(inscripciones_inicio).toISOString();
    const finInsc = new Date(inscripciones_fin).toISOString();
    const inicioTorneo = new Date(inicio_torneo).toISOString();
    const finTorneo = new Date(fin_torneo).toISOString();


    // Hazlo con una consulta SQL Cruda para subir los datos a la tabla Torneo

    const torneo = await prisma.$queryRaw`INSERT INTO Torneo (nombre, categoria_fk, inscripciones_inicio, inscripciones_fin, inicio_torneo, fin_torneo, esta_habilitado) VALUES (${nombre}, ${categoria_fk}, ${inicioInsc}, ${finInsc}, ${inicioTorneo}, ${finTorneo}, ${esta_habilitado})`;


      return NextResponse.json("Torneo creado");
  } catch (error) {
    console.log(error)
    return handleError('Error al obtener los equipos');
  }
}


    export async function PUT(req: Request, res: any) {
      try{
        // Obtener los datos del body
        const { nombreOriginal, nombreNuevo, categoria_fk, inscripciones_inicio, inscripciones_fin, inicio_torneo, fin_torneo, esta_habilitado } = await req.json();
        // Actualizar el torne
        const torneo = await prisma.$queryRaw`UPDATE Torneo SET nombre = ${nombreNuevo}, categoria_fk = ${categoria_fk}, inscripciones_inicio = ${inscripciones_inicio}, inscripciones_fin = ${inscripciones_fin}, inicio_torneo = ${inicio_torneo}, fin_torneo = ${fin_torneo}, esta_habilitado = ${esta_habilitado} WHERE nombre = ${nombreOriginal}`;
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

  