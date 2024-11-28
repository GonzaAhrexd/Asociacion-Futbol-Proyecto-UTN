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

  const {register, handleSubmit, setValue, formState: { errors } } = useForm();
  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await obtenerCategorias();
      setCategorias(data);
    };

    fetchCategorias();
  }, []);

  return (
    <div className='p-5'>

      <div className='flex'>
        <h1 className='text-3xl mr-2'>Listado de categorías</h1>
        <button  className='bg-blue-200 px-4 py-2 rounded-xl' onClick={() => setVistaAgregar(!vistaAgregar)}>
          Agregar
        </button>
      </div>

    { vistaAgregar && 
    <div className='flex items-center justify-center'>
        <form className="flex flex-col p-5 bg-gray-100 shadow m-2 w-[400px]" 
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
            // valor={data.nombre}
            type="text"
            nombre="nombre"
            register={register}
            setValue={setValue}
            errors={errors.nombre}
          />
          <div className='flex'>
            <InputNumber
              campo="Edad mínima"
              // valor={data.edad_minima}
              nombre="edad_minima"
              register={register}
              setValue={setValue}
              error={errors.edad_minima}
              type="number"
              maxLenght={3}
            />
            <InputNumber
              campo="Edad máxima"
              // valor={data.edad_maxima}
              nombre="edad_maxima"
              register={register}
              setValue={setValue}
              error={errors.edad_maxima}
              type="number"
              maxLenght={3}
            />
          </div>

          <button className=" mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full my-2">
              Enviar
          </button>
          


        </form>
      </div>
      }

      <DataTable
        columns={ColumnCategorias}
        data={categorias}
        pagination
        expandableRows
        expandableRowsComponent={expandedComponents}
        responsive={true}
        striped={true}
        highlightOnHover={true}
        noDataComponent="No hay categorías para mostrar"
        defaultSortFieldId={"Fecha"}
      />

    
    </div>
  );
};

export default ListaCategorias;
