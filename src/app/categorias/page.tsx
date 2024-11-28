'use client';

import React, { useEffect, useState } from 'react';
import { obtenerCategorias, eliminarCategoria } from '../api/services/categorias';
import Link from 'next/link';
import DataTable from 'react-data-table-component';
import ColumnCategorias from './columnCategorias';
import expandedComponents from './expandedCategoria';

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

      <DataTable
        columns={ColumnCategorias}
        data={categorias}
        pagination
        expandableRows
        expandableRowsComponent={expandedComponents}
        // customStyles={customStyles}
        responsive={true}
        striped={true}
        highlightOnHover={true}
        noDataComponent="No hay categorias para mostrar"
        defaultSortFieldId={"Fecha"}
      // expandableIcon={expandableIcon}
      />

    </div>
  );
};

export default ListaCategorias;
