'use client';

import React, { useEffect, useState } from 'react';
import { obtenerCategorias, eliminarCategoria, crearCategoria } from '../api/services/categorias';
import Link from 'next/link';
import DataTable from 'react-data-table-component';
import ColumnCategorias from './columnCategorias';
import expandedComponents from './expandedCategoria';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import InputText from '@/components/Inputs/InputText';
import InputNumber from '@/components/Inputs/InputNumber';
interface Categoria {
  nombre: string;
  edad_minima: number;
  edad_maxima: number;
}

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [vistaAgregar, setVistaAgregar] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
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
        <button  className='bg-blue-200 px-4 py-2 rounded-xl'
        
        onClick={() => setVistaAgregar(!vistaAgregar)}
        >
          Agregar

        </button>
      </div>

    { vistaAgregar && <div>
      <form className="flex flex-col items-center justify-center" 
        onSubmit={
          handleSubmit(async (values ) => {
            Swal.fire({
              icon: 'warning',
              title: '¿Estás seguro de que deseas editar la categoría?',
              showCancelButton: true,
              confirmButtonText: `Editar`,
              cancelButtonText: `Cancelar`,
              confirmButtonColor: '#22C55E',
            }).then(async (result) => {
              if (result.isConfirmed) {
                console.log(values)
                
                values.edad_minima = Number(values.edad_minima)
                values.edad_maxima = Number(values.edad_maxima)

                // @ts-ignore
                await crearCategoria(values);
                Swal.fire({
                  icon: 'success',
                  title: 'Categoría agregada',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  window.location.reload();
                })

              }
            })
          }
          )
        }
        >
          <InputText
            campo="Nombre"
            type="text"
            nombre="nombre"
            register={register}
            setValue={setValue}
            errors={errors.nombre}
            
          />
          <InputNumber
            campo="Edad mínima"
            nombre="edad_minima"
            register={register}
            setValue={setValue}
            error={errors.edad_minima}
            type="number"
            maxLenght={3}
          />
          <InputNumber
            campo="Edad máxima"
            nombre="edad_maxima"
            register={register}
            setValue={setValue}
            error={errors.edad_maxima}
            type="number"
            maxLenght={3}
          />
          <div className="flex flex-col items-center justify-center w-full">
            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded w-4/10 my-2">
              Agregar
            </button>
            </div>
            </form>
      
      </div>
      }


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
        noDataComponent="No hay categorías para mostrar"
        defaultSortFieldId={"Fecha"}
      // expandableIcon={expandableIcon}
      />

    
    </div>
  );
};

export default ListaCategorias;
