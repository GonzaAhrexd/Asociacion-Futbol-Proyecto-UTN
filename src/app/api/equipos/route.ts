import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function handleError(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status });
}

/*


model Equipo {
  nro_equipo Int @id // PK
  dni_dt_fk Int
  categoria_fk String
  nombre String
  division String

  categoria Categoria @relation(fields: [categoria_fk], references: [nombre])
  directorTecnico DirectorTecnico @relation(fields: [dni_dt_fk], references: [dni_dt_fk])
  jugadores Jugador[]
  torneos   EquipoTorneo[]
  partidos  EquipoPartido[]
}


*/

export async function GET(req: Request, res: any) {
  try {
    // Realizar una consulta cruda para obtener todos los equipos
    const equipos = await prisma.$queryRaw`SELECT * FROM Equipo`;

    // Devolver los equipos como respuesta
    return NextResponse.json(equipos);
  } catch (error) {
    return handleError('Error al obtener los equipos');
  }
}


export async function POST(req: Request, res: any) {
  try{
    // Obtener el cuerpo de la solicitud
    const body = await req.json();

    // Extraer los datos del cuerpo
    const {  dni_dt_fk, categoria_fk, nombre, division } = body;

    // Insertar un nuevo equipo en la base de datos
    const equipo = await prisma.$queryRaw`INSERT INTO Equipo (dni_dt_fk, categoria_fk, nombre, division) VALUES ( ${dni_dt_fk}, ${categoria_fk}, ${nombre}, ${division})`;

    // Devolver el equipo creado
    return NextResponse.json("Equipo creado", { status: 201 });
  
}catch ( error ){
  console.log(error)
  return handleError('Error al crear el equipo');
}
}

export async function PUT(req: Request, res: any) {
  try{
    // Obtener el cuerpo de la solicitud
    const body = await req.json();

    // Extraer los datos del cuerpo
    const { nro_equipo, dni_dt_fk, categoria_fk, nombre, division } = body;

    // Actualizar el equipo en la base de datos
    const equipo = await prisma.$queryRaw`UPDATE Equipo SET dni_dt_fk = ${dni_dt_fk}, categoria_fk = ${categoria_fk}, nombre = ${nombre}, division = ${division} WHERE nro_equipo = ${nro_equipo}`;

    // Devolver el equipo actualizado
    return NextResponse.json("Equipo actualizado", { status: 201 });

  } catch (error) {
    return handleError('Error al actualizar el equipo');
  }
}

export async function DELETE(req: Request, res: any) {
  try{
    // Obtener el cuerpo de la solicitud
    const body = await req.json();

    // Extraer los datos del cuerpo
    const { nro_equipo } = body;

    // Eliminar el equipo de la base de datos
    const equipo = await prisma.$queryRaw`DELETE FROM Equipo WHERE nro_equipo = ${nro_equipo}`;

    // Devolver el equipo eliminado
    return NextResponse.json(equipo, { status: 201 });

  } catch (error) {
    return handleError('Error al eliminar el equipo');
  }
}
