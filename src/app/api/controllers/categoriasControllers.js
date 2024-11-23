/*
Los controladores actúan como un intermediario entre las rutas de tu aplicación y los servicios. Son responsables de recibir las solicitudes HTTP, invocar los métodos correspondientes del servicio y enviar la respuesta adecuada al cliente.*/

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function crearCategoria(req, res) {
  const { nombre, edad_minima, edad_maxima } = req.body;

  // Validaciones básicas
  if (!nombre || edad_minima == null || edad_maxima == null) {
    return res.status(400).json({
      error: 'Los campos nombre, edad_minima y edad_maxima son obligatorios.',
    });
  }

  if (edad_minima > edad_maxima) {
    return res.status(400).json({
      error: 'La edad mínima no puede ser mayor que la edad máxima.',
    });
  }

  try {
    // Creación en la base de datos usando Prisma
    const nuevaCategoria = await prisma.categorias.create({
      data: { nombre, edad_minima, edad_maxima },
    });

    // Respuesta exitosa
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error(`Error al crear la categoría: ${error.message}`);
    res.status(500).json({
      error: `Error al crear la categoría: ${error.message}`,
    });
  }
}

  
  
async function obtenerCategorias(req, res) {
  try {
    // Obtener todas las categorías directamente con Prisma
    const categorias = await prisma.categorias.findMany();

    // Enviar las categorías en la respuesta
    res.status(200).json(categorias);
  } catch (error) {
    console.error(`Error obteniendo todas las categorías: ${error.message}`);
    res.status(500).json({
      error: `Error al obtener las categorías: ${error.message}`,
    });
  }
}

async function obtenerCategoriaConNombre(req, res) {
  const { nombre } = req.params;

  try {
    // Buscar la categoría por nombre directamente con Prisma
    const categoria = await prisma.categorias.findUnique({
      where: {
        nombre: nombre,
      },
    });

    // Verificar si existe la categoría
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    // Responder con la categoría encontrada
    res.status(200).json(categoria);
  } catch (error) {
    console.error(`Error obteniendo categoría por nombre: ${error.message}`);
    res.status(500).json({ error: `Error al obtener la categoría: ${error.message}` });
  }
}

  
 // UPDATE
async function actualizarCategoriaConNombre(req, res) {
  const{nombre}=req.params;
  const { edad_minima, edad_maxima } = req.body;

  try {
    // Actualizar la categoría con los nuevos datos
    const categoriaActualizada = await prisma.categorias.update({
      where: {
        nombre: nombre,
      },
      data: {
        nombre,
        edad_minima,
        edad_maxima
      },
    });

    // Responder con la categoría actualizada
    res.status(200).json(categoriaActualizada);
  } catch (error) {
    console.error(`Error actualizando categoría: ${error.message}`);
    res.status(500).json({
      error: `Error al actualizar la categoría: ${error.message}`,
    });
  }
}

// DELETE
async function eliminarCategoriaConNombre(req, res) {
  const { nombre } = req.params;

  try {
    // Eliminar la categoría por nombre
    const categoriaEliminada = await prisma.categorias.delete({
      where: {
        nombre: nombre,
      },
    });

    // Responder con mensaje de éxito
    res.status(200).json({
      message: `Categoría con nombre ${nombre} eliminada`,
    });
  } catch (error) {
    console.error(`Error eliminando categoría: ${error.message}`);
    res.status(500).json({
      error: `Error al eliminar la categoría: ${error.message}`,
    });
  }
}

 
  
  module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaConNombre,
    eliminarCategoriaConNombre,
    actualizarCategoriaConNombre,
  };
  