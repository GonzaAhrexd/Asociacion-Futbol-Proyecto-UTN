import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { DateTime } from 'next-auth/providers/kakao';

const prisma = new PrismaClient();

interface Persona {
    nombre: string;
    fecha_nacimiento: DateTime;
    direccion:string;
    telefono_contacto:number;
    pass: string;
    es_encargado:boolean;
  }
  

// Método GET: Obtiene todas las categorías de la base de datos
export async function GET() {
  try {
    const personas = await prisma.persona.findMany();
    return NextResponse.json(personas);
  } catch (error){
    return NextResponse.json({error});
  }
}

// // Método GET por nombre: Obtiene una categoría por su nombre
// export async function GET_BY_NAME(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const nombre = searchParams.get('nombre'); // Obtenemos el parámetro "nombre" desde la URL
    
//     if (!nombre) {
//       return handleError('Se requiere el nombre de la categoría', 400);
//     }

//     // Busca la categoría por nombre
//     const categoria = await prisma.categoria.findUnique({
//       where: { nombre },
//     });

//     if (!categoria) {
//       return handleError(`No se encontró una categoría con el nombre "${nombre}"`, 404);
//     }

//     return NextResponse.json(categoria);  // Devuelve la categoría encontrada
//   } catch {
//     return handleError('Error al obtener la categoría por nombre');
//   }
// }

// // Método POST: Crea una nueva categoría en la base de datos
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const validationError = validarDatosCategoria(body);

//     if (validationError) {
//       return handleError(validationError, 400);
//     }

//     const nuevaCategoria = await prisma.categoria.create({
//       data: body,
//     });

//     return NextResponse.json(nuevaCategoria, { status: 201 });
//   } catch {
//     return handleError('Error al crear la categoría');
//   }
// }

// // Método PUT: Actualiza una categoría existente
// export async function PUT(req: Request, res: any) {
//   try {

//     const body = await req.json();
    
//     console.log(body);
        
//     const { nombre_original, nombre_nuevo, edad_maxima, edad_minima } = body;
    
//     // return res.json("Hola");
//     if (!nombre_original) {
//         return handleError('El nombre de la categoría es requerido para actualizar', 400);
//       }
      
//       const validationError = validarDatosCategoria(body);
      
//       console.log(validationError)
      
//       if (validationError) {
//           return handleError(validationError, 400);
//         }
        
//         // return NextResponse.json({ message: 'Categoría actualizada exitosamente' }, { status: 200 });
        
//     const categoriaExistente = await prisma.categoria.findUnique({
//       where: { nombre: nombre_original },
//     });

//     if (!categoriaExistente) {
//       return handleError(`No se encontró una categoría con el nombre "${nombre_original}"`, 404);
//     }

//     const categoriaActualizada = await prisma.categoria.update({
//       where: { nombre: nombre_original },
//       data: {
//         nombre: nombre_nuevo,
//         edad_minima: edad_minima,
//         edad_maxima: edad_maxima,
//       },
//     });

//     return NextResponse.json(
//       { message: 'Categoría actualizada exitosamente', categoria: categoriaActualizada },
//       { status: 200 }
//     );
//   } catch {
//     return handleError('Error al actualizar la categoría');
//   }
// }

// // Método DELETE: Elimina una categoría por su nombre
// export async function DELETE(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const nombre = searchParams.get('nombre');

//     if (!nombre) {
//       return handleError('Se requiere un nombre para eliminar la categoría', 400);
//     }

//     await prisma.categoria.delete({
//       where: { nombre },
//     });

//     return NextResponse.json(
//       { message: `Categoría con nombre "${nombre}" eliminada exitosamente` },
//       { status: 200 }
//     );
//   } catch {
//     return handleError('Error al eliminar la categoría');
//   }
// }
