
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
model Partido {
  nro_partido Int @id // PK
  nro_fecha_fk Int
  dni_arbitro_fk Int
  cancha_fk String
  fecha_hora DateTime

  fecha   Fecha   @relation(fields: [nro_fecha_fk], references: [nro_fecha])
  arbitro Arbitro @relation(fields: [dni_arbitro_fk], references: [dni_arbitro_fk])
  cancha  Cancha  @relation(fields: [cancha_fk], references: [nombre])
  equipos EquipoPartido[]
  jugadores JugadorPartido[]
}


*/

function handleError(message: string, status: number = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET(req: Request) {
    try{
        // Realizar una consulta cruda para obtener todos los partidos
        const partidos = await prisma.$queryRaw`SELECT * FROM Partido`;

        // Devolver los partidos como respuesta
        return NextResponse.json(partidos, { status: 200 });
    }catch(error){
        console.error('Error al obtener los partidos:', error);
        return NextResponse.json(
            { error: 'Error al obtener los partidos' },
            { status: 500 }
        );
    }
}


export async function POST(req: Request, res: any){
    try{

        // Obtener el cuerpo de la solicitud
        const body = await req.json();

        // Extraer los datos del cuerpo
        const { nro_fecha_fk, dni_arbitro_fk, cancha_fk, fecha_hora } = body;

        // Insertar un nuevo partido en la base de datos
        const partido = await prisma.$queryRaw`
        INSERT INTO Partido (nro_fecha_fk, dni_arbitro_fk, cancha_fk, fecha_hora)
        VALUES (${Number(nro_fecha_fk)}, ${Number(dni_arbitro_fk)}, ${cancha_fk}, ${fecha_hora})`;

        // Devolver el partido creado
        return NextResponse.json("Partido creado", { status: 201 });
    }catch(error){
        console.log(error)
        return handleError('Error al crear el partido');
    }

}
