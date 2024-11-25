'use client';

import React, { useEffect, useState } from 'react';
import { obtenerCategorias, eliminarCategoria } from '../api/categorias';
import Link from 'next/link';

interface Categoria {
  nombre: string;
  edad_minima: number;
  edad_maxima: number;
}

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await obtenerCategorias();
      setCategorias(data);
    };

    fetchCategorias();
  }, []);

  const handleEliminar = async (nombre: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la categoría ${nombre}?`)) {
      try {
        await eliminarCategoria(nombre);
        setCategorias(categorias.filter((categoria) => categoria.nombre !== nombre));
        alert('Categoría eliminada');
      } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        alert('Error al eliminar la categoría');
      }
    }
  };

  return (
    <div className='p-5'>
      <div className='flex'>
        <h1 className='text-3xl mr-2'>Listado de categorías</h1>
        <Link href="/categorias/nueva" className='bg-blue-200 px-4 py-2 rounded-xl'>
          Agregar
        </Link>
      </div>

      <ul className='mt-5 w-4/10'>
        {categorias.map((categoria) => (
          <li key={categoria.nombre} className='flex justify-between'>
            {categoria.nombre} - Edad mínima: {categoria.edad_minima}, Edad máxima: {categoria.edad_maxima}

            <div>
              <Link href={`/categorias/editar/${categoria.nombre}`} className='text-blue-700'>
                Editar
              </Link>
              <button
                onClick={() => handleEliminar(categoria.nombre)}
                className='text-red-700 ml-2'
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCategorias;
