'use client';

import React, { useEffect, useState } from 'react';
import { obtenerCategorias, crearCategoria } from '../api/services/categorias';
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

export default function ListaCategorias(){

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [vistaAgregar, setVistaAgregar] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchCategorias = async () => {
      const categorias = await obtenerCategorias();
      setCategorias(categorias);
    };

    fetchCategorias();
  }, []);

  function cancelarEnvio(){
    setVistaAgregar(false)
  }

  const onSubmit = async (values: any) => {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro de que deseas crear la categoría?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      confirmButtonColor: '#22C55E',
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(values);
        values.edad_minima = Number(values.edad_minima);
        values.edad_maxima = Number(values.edad_maxima);

        await crearCategoria(values);
        Swal.fire({
          icon: 'success',
          title: 'Categoría agregada',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  return (

    <div className=''> 
      <div className="p-4">

        <div className="flex my-10">
          <h1 className="text-3xl mr-2">Listado de categorías</h1>
          <button
            className="bg-blue-200 px-4 py-2 rounded-xl"
            onClick={() => setVistaAgregar(!vistaAgregar)}
          >
            Agregar
          </button>
        </div>

        {vistaAgregar && (
          <div className="flex items-center justify-center">
            <form
              className="flex flex-col p-5 bg-gray-100 shadow m-2 w-[400px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputText
                campo="Nombre"
                type="text"
                nombre="nombre"
                register={register}
                setValue={setValue}
                errors={errors.nombre}
              />
              <div className="flex my-2">
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
              </div>

              <div className='flex'>
                <button className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full my-2">
                  Crear
                </button>
                <button className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full my-2" onClick={cancelarEnvio}>
                  Cancelar
                </button>
              </div>

              
            </form>
          </div>
        )}

        <DataTable
          columns={ColumnCategorias}
          data={categorias}
          pagination
          expandableRows
          expandableRowsComponent={expandedComponents}
          responsive
          striped
          highlightOnHover
          noDataComponent="No hay categorías para mostrar"
          defaultSortFieldId="Fecha"
        />
        </div>

    </div>
    
  );
};


