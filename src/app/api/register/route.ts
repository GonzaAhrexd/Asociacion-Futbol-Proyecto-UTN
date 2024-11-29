import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prisma";

export async function POST(req: Request) {
  try {
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

    console.log(body);

    const convertToDate = new Date(fecha_nacimiento);

    const hashedPassword = await bcrypt.hash(pass, 10);

    console.log("Body recibido:", req.body);

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
  } catch (error) {
    return NextResponse.json({ error });
  }
}
