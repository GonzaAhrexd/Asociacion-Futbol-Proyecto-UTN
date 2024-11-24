import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Utilidad común para manejar errores
const handleError = (message: string, status: number = 500) => 
  NextResponse.json({ error: message }, { status });

// Validación básica para los datos de categorías
const validateCategoryData = (data) => {
  const { nombre, edad_minima, edad_maxima } = data;

  if (!nombre || typeof edad_minima !== 'number' || typeof edad_maxima !== 'number') {
    return 'Datos inválidos: "nombre", "edad_minima" y "edad_maxima" son requeridos';
  }
  if (edad_maxima <= edad_minima) {
    return 'La edad máxima debe ser mayor que la edad mínima';
  }
  return null;
};

// Método GET: Obtiene todas las categorías de la base de datos
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany();
    return NextResponse.json(categorias);
  } catch {
    return handleError('Error al obtener categorías');
  }
}

// Método POST: Crea una nueva categoría en la base de datos
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validationError = validateCategoryData(body);

    if (validationError) {
      return handleError(validationError, 400);
    }

    const nuevaCategoria = await prisma.categoria.create({
      data: body,
    });

    return NextResponse.json(nuevaCategoria, { status: 201 });
  } catch {
    return handleError('Error al crear la categoría');
  }
}

// Método PUT: Actualiza una categoría existente
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { nombre } = body;

    if (!nombre) {
      return handleError('El nombre de la categoría es requerido para actualizar', 400);
    }

    const validationError = validateCategoryData(body);
    if (validationError) {
      return handleError(validationError, 400);
    }

    const categoriaExistente = await prisma.categoria.findUnique({
      where: { nombre },
    });

    if (!categoriaExistente) {
      return handleError(`No se encontró una categoría con el nombre "${nombre}"`, 404);
    }

    const categoriaActualizada = await prisma.categoria.update({
      where: { nombre },
      data: body,
    });

    return NextResponse.json(
      { message: 'Categoría actualizada exitosamente', categoria: categoriaActualizada },
      { status: 200 }
    );
  } catch {
    return handleError('Error al actualizar la categoría');
  }
}

// Método DELETE: Elimina una categoría por su nombre
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const nombre = searchParams.get('nombre');

    if (!nombre) {
      return handleError('Se requiere un nombre para eliminar la categoría', 400);
    }

    await prisma.categoria.delete({
      where: { nombre },
    });

    return NextResponse.json(
      { message: `Categoría con nombre "${nombre}" eliminada exitosamente` },
      { status: 200 }
    );
  } catch {
    return handleError('Error al eliminar la categoría');
  }
}
