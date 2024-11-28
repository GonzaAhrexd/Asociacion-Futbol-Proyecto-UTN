import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// export async function GET() {
//   return NextResponse.json({ message: 'Respuesta a GET' });
// }

export async function POST(req: Request) {
  const body = await req.json();
  const {
    nombre,
    apellido,
    dni,
    fecha_nacimiento,
    direccion_calle,
    direccion_altura,
    pass,
  } = body;
  // Guardalo en Persona

  const convertToDate = new Date(fecha_nacimiento);

  console.log(body);

  const hashedPassword = await bcrypt.hash(pass, 10);

  console.log(req.body)


  const nuevaPersona = await prisma.persona.create({
    data: {
      dni: Number(dni),
      nombre: nombre + " " + apellido,
      fecha_nacimiento: convertToDate,
      direccion: direccion_calle + " " + direccion_altura,
      pass: hashedPassword,
      es_encargado: false,
    },
  });

  return NextResponse.json(nuevaPersona, { status: 201 });

  // return NextResponse.json({ message: 'Datos recibidos', data: body });
}

