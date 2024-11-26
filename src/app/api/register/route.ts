import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export async function GET() {
//   return NextResponse.json({ message: 'Respuesta a GET' });
// }

export async function POST(req: Request) {
  const body = await req.json();
  const { nombre, apellido, dni, fecha_nacimiento, direccion_calle, direccion_altura, pass } = body;
  // Guardalo en Persona

  const convertToDate = new Date(fecha_nacimiento)

  
  console.log(body)

  const nuevaPersona = await prisma.persona.create({
    data: {
      dni: Number(dni),
    nombre:  nombre + apellido,
    fecha_nacimiento: convertToDate,
    direccion_calle: direccion_calle, 
    direccion_altura:  direccion_altura,
    pass: pass
    }
  }); 


  return NextResponse.json(nuevaPersona, { status: 201 });

  // return NextResponse.json({ message: 'Datos recibidos', data: body });

}
