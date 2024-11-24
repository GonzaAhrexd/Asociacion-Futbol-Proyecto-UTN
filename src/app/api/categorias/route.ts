import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Método GET: Obtiene todas las categorías de la base de datos
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany();
    return NextResponse.json(categorias);
  } catch  {
    return NextResponse.json({ error: 'Error al obtener categorías' }, { status: 500 });
  }
}

// Método POST: Crea una nueva categoría en la base de datos
export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { nombre, edad_minima, edad_maxima } = body;
  
      // Validación básica de datos
      if (!nombre || typeof edad_minima !== 'number' || typeof edad_maxima !== 'number') {
        return NextResponse.json(
          { error: 'Datos inválidos: nombre, edad_minima y edad_maxima son requeridos' },
          { status: 400 }
        );
      }
  
      // Validación de rango de edades
      if (edad_maxima <= edad_minima) {
        return NextResponse.json(
          { error: 'La edad máxima debe ser mayor que la edad mínima' },
          { status: 400 }
        );
      }
  
      // Creación de la nueva categoría
      const nuevaCategoria = await prisma.categoria.create({
        data: { nombre, edad_minima, edad_maxima },
      });
  
      return NextResponse.json(nuevaCategoria, { status: 201 });
    } catch {
      return NextResponse.json(
        { error: 'Error al crear la categoría' },
        { status: 500 }
      );
    }
  }
  