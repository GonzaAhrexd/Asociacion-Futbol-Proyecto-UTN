import { NextResponse } from 'next/server';
import prisma from "@/libs/prisma"; // Importa el cliente de Prisma configurado

// funcion común para manejar errores
function handleError(message: string, status: number = 500) {
  NextResponse.json({ error: message }, { status });
}

export async function GET() {
  try {
    // Realiza la consulta a la base de datos
    const equipos = await prisma.equipo.findMany();

    // Devuelve los datos serializados
    return NextResponse.json(equipos, { status: 200 });
  } catch (error) {
    console.error("Error fetching equipos:", error);

    // Devuelve un mensaje de error más detallado
    return NextResponse.json(
      { message: "Error fetching equipos", error: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
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

export async function PUT(req: Request) {
  try{
    // Obtener el cuerpo de la solicitud
    const body = await req.json();


    // Extraer los datos del cuerpo
    const { nro_equipo,dni_dt_fk, categoria_fk, nombre, division } = body;

    // Actualizar el equipo en la base de datos
    // const equipoActualizado = await prisma.$queryRaw`UPDATE Equipo SET dni_dt_fk = ${dni_dt_fk}, categoria_fk = ${categoria_fk}, nombre = ${nombre}, division = ${division} WHERE nro_equipo = ${nro_equipo}`;

    // Actualizar el equipo en la base de datos
    const equipoActualizado = await prisma.equipo.update({
      where: { nro_equipo },
      data: {
        nombre,
        dni_dt_fk:BigInt(dni_dt_fk),
        categoria_fk: categoria_fk,
        division,
      },
    });

    // Devolver el equipo actualizado
    return NextResponse.json(
      { message: 'Equipo actualizado exitosamente', equipo: equipoActualizado },
      { status: 200 }
    );

  } catch (error){
    return handleError('Error al actualizar el equipo');
  }
}



// export async function DELETE(req: Request) {
//   try{

//     const { searchParams } = new URL(req.url);
//     const nombre = searchParams.get('nombre');


//     // Eliminar el equipo de la base de datos
//     const equipo = await prisma.$queryRaw`DELETE FROM Equipo WHERE nombre = ${nombre}`;

//     // Devolver el equipo eliminado
//     return NextResponse.json(equipo, { status: 201 });

//   } catch (error) {
//     return NextResponse.json({ error });
//   }
// }

