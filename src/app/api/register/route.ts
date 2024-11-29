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
      // rol,
      // nro_socio,
      // foto,
      // nivel_exp,
      // tiene_cert,
    } = body;
    // Guardalo en Persona

    console.log(body);

    // return NextResponse.json("Fecha actualizada");

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

  // function calcularEdad(fecha_nacimiento: Date): number {
  //   const hoy = new Date(); // Fecha actual
  //   const nacimiento = new Date(fecha_nacimiento); // Fecha de nacimiento

  //   // Calcular la diferencia en años
  //   let edad = hoy.getFullYear() - convertToDate.getFullYear();

  //   // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
  //   const mesActual = hoy.getMonth();
  //   const diaActual = hoy.getDate();
  //   const mesNacimiento = nacimiento.getMonth();
  //   const diaNacimiento = nacimiento.getDate();

  //   // Si aún no ha llegado el cumpleaños de este año, resta 1
  //   if (
  //     mesActual < mesNacimiento ||
  //     (mesActual === mesNacimiento && diaActual < diaNacimiento)
  //   ) {
  //     edad--;
  //   }

  //   return edad;
  // }

  // const edadJugador = calcularEdad(fecha_nacimiento);
  // let categoriaJugador = "";

  // if (edadJugador >= 41 && edadJugador <= 45) {
  //   categoriaJugador = "Maxi";
  // } else if (edadJugador >= 46 && edadJugador <= 50) {
  //   categoriaJugador = "Super";
  // } else if (edadJugador >= 51 && edadJugador <= 55) {
  //   categoriaJugador = "Master";
  // } else {
  //   categoriaJugador = "Master";
  // }

  // if (rol == "Jugador") {
  //   const nuevoJugador = await prisma.jugador.create({
  //     data: {
  //       dni_jugador_fk: Number(dni),
  //       nro_socio: Number(nro_socio),
  //       foto: "foto",
  //       categoria_fk: categoriaJugador,
  //     },
  //   });

  //   return NextResponse.json({ nuevaPersona, nuevoJugador }, { status: 201 });
  // }

  // return NextResponse.json({ message: "Datos recibidos", data: body });
}
