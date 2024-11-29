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
        const { nro_fecha_fk, dni_arbitro_fk, cancha_fk, fecha, hora } = body;

        // Combina la fecha y la hora en un solo string que sea compatible con sql lite para date time

        const fechaHora = new Date(`${fecha}T${hora}:00`);

        let fecha_horaModif = fechaHora.toISOString();



        const partido = await prisma.$queryRaw`

        INSERT INTO Partido (nro_fecha_fk, dni_arbitro_fk, cancha_fk, fecha_hora)
        VALUES (${Number(nro_fecha_fk)}, ${Number(dni_arbitro_fk)}, ${cancha_fk}, ${fecha_horaModif})`;

        return NextResponse.json("Partido creado", { status: 201 });
    }catch(error){
        console.log(error)
        return handleError('Error al crear el partido');
    }

}

export async function PUT(req: Request, res: any){
   try{
         // Obtener los datos del body
         const body = await req.json();
    
         const { nro_partido, nro_fecha_fk, dni_arbitro_fk, cancha_fk, fecha, hora } = body;
    
         // Combina la fecha y la hora en un solo string que sea compatible con sql lite para date time
    
         const fechaHora = new Date(`${fecha}T${hora}:00`);
    
         let fecha_horaModif = fechaHora.toISOString();
    
         // Actualizar el partido
         const partido = await prisma.$queryRaw`
    
         UPDATE Partido SET nro_fecha_fk = ${Number(nro_fecha_fk)}, dni_arbitro_fk = ${Number(dni_arbitro_fk)}, cancha_fk = ${cancha_fk}, fecha_hora = ${fecha_horaModif} WHERE nro_partido = ${Number(nro_partido)}`;
    
         return NextResponse.json("Partido actualizado");

   }catch(error){
    console.log(error)
        return handleError('Error al actualizar el partido');
   }
}


export async function DELETE(req: Request, res: any){
    try{
        // Obtener el cuerpo de la solicitud
        const { nro_partido } = await req.json();

        // Eliminar el partido de la base de datos
        const partido = await prisma.$queryRaw`DELETE FROM Partido WHERE nro_partido = ${Number(nro_partido)}`;

        // Devolver el partido eliminado
        return NextResponse.json("Partido eliminado", { status: 201 });
    } catch (error) {
        return handleError('Error al eliminar el partido');
    }
}

