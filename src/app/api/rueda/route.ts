
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


function handleError(message: string, status: number = 500) {
    return NextResponse.json({ error: message }, { status });
  }

  
export async function GET(req: Request) {
     try{
        // Realizar una consulta cruda para obtener todos los torneos
        const ruedas = await prisma.$queryRaw`SELECT * FROM Rueda`;

        // Devolver los torneos como respuesta
        return NextResponse.json(ruedas, { status: 200 });
     }catch(error){
        console.error('Error al obtener las ruedas:', error);
        return NextResponse.json(
            { error: 'Error al obtener las ruedas' },
            { status: 500 }
        );
     }  
    }

    export async function POST(req: Request, res: any){
        try{
            // Obtener el cuerpo de la solicitud
            const body = await req.json();
    
            // Extraer los datos del cuerpo
            const { nro_fixture_fk, cant_fechas  } = body;
    

            console.log(nro_fixture_fk, cant_fechas)
            // Insertar una nueva rueda en la base de datos
            const rueda = await prisma.$queryRaw`
            INSERT INTO Rueda (nro_fixture_fk, cant_fechas)
            VALUES (${Number(nro_fixture_fk)}, ${Number(cant_fechas)})`;
            return NextResponse.json("Rueda creada");
            // Devolver la rueda creada
            // return NextResponse.json("Rueda creada", { status: 201 });
        }catch(error){
            console.log(error)
            return handleError('Error al crear la rueda');
        }
    }

    export async function PUT(req: Request) {
        try{
            // Obtener los datos del body
            const body = await req.json();
    
            const { nro_rueda, nro_fixture_fk, cant_fechas } = body;
    
            // Actualizar la rueda
            const rueda = await prisma.$queryRaw`
            UPDATE Rueda
            SET nro_fixture_fk = ${Number(nro_fixture_fk)}, cant_fechas = ${Number(cant_fechas)}
            WHERE nro_rueda = ${Number(nro_rueda)}`;
    
            // Devolver la rueda actualizada
            return NextResponse.json("Rueda actualizada");

        }catch(error){
            console.log(error)
            return handleError('Error al actualizar la rueda');
        }   
    }

    export async function DELETE(req: Request) {
        try{
            // Obtener el cuerpo de la solicitud
            const { nro_rueda } = await req.json();
    
            // Eliminar la rueda
            const rueda = await prisma.$queryRaw`
            DELETE FROM Rueda
            WHERE nro_rueda = ${Number(nro_rueda)}`;
    
            // Devolver la rueda eliminada
            return NextResponse.json("Rueda eliminada");
        }catch(error){
            console.log(error)
            return handleError('Error al eliminar la rueda');
        }
    }