import React from 'react'
import InputText from '@/components/Inputs/InputText'
import {  eliminarCategoria } from '../api/services/categorias';

import InputNumber from '@/components/Inputs/InputNumber'
import { useForm } from 'react-hook-form';
type Categoria = {
    data:any
}

function ExpandedCategoria({ data }: Categoria) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
    const handleEliminar = async (nombre: string) => {
      if (window.confirm(`¿Estás seguro de que deseas eliminar la categoría ${nombre}?`)) {
        try {
          await eliminarCategoria(nombre);
          alert('Categoría eliminada');
          window.location.reload();
        } catch (error) {
          console.error('Error al eliminar la categoría:', error);
          alert('Error al eliminar la categoría');
        }
      }
    };
  
    return (
      <div>
        <form className="flex flex-col items-center justify-center">
          <InputText
            campo="Nombre"
            valor={data.nombre}
            type="text"
            nombre="nombre"
            register={register}
            setValue={setValue}
            errors={errors.nombre}
          />
          <InputNumber
            campo="Edad mínima"
            valor={data.edad_minima}
            nombre="edad_minima"
            register={register}
            setValue={setValue}
            error={errors.edad_minima}
            type="number"
            maxLenght={3}
          />
          <InputNumber
            campo="Edad máxima"
            valor={data.edad_maxima}
            nombre="edad_maxima"
            register={register}
            setValue={setValue}
            error={errors.edad_maxima}
            type="number"
            maxLenght={3}
          />
          <div className="flex flex-col items-center justify-center w-full">
            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded w-4/10 my-2">
              Editar
            </button>
            <div
              onClick={() => handleEliminar(data.nombre)}
              className="flex flex-col items-center justify-center bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded w-4/10"
            >
              Eliminar
            </div>
          </div>
        </form>
      </div>
    );
  }

export default ExpandedCategoria