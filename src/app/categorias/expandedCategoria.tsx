import React from 'react';
import InputText from '@/components/Inputs/InputText';
import { eliminarCategoria, actualizarCategoria } from '../api/services/categorias';
import InputNumber from '@/components/Inputs/InputNumber';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

// type dataProps = {
//   nombre: string;
//   edad_minima: number;
//   edad_maxima: number;
// };

type Categoria = {
  data: any;
};

export default function ExpandedCategoria({ data }: Categoria) {
  
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

  const onSubmit = async (values: any) => {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro de que deseas editar la categoría?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#22C55E',
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(values);
        values.nombre_original = data.nombre;
        values.nombre_nuevo = values.nombre;
        values.edad_minima = Number(values.edad_minima);
        values.edad_maxima = Number(values.edad_maxima);

        // @ts-ignore
        await actualizarCategoria(values);
        Swal.fire({
          icon: 'success',
          title: 'Categoría editada',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col p-5 bg-gray-100 shadow m-2 w-[400px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputText
          campo="Nombre"
          valor={data.nombre}
          type="text"
          nombre="nombre"
          register={register}
          setValue={setValue}
          errors={errors.nombre}
        />
        <div className="flex my-2">
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
        </div>

        <div className="flex items-center justify-center ">
          <button className="mr-2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-5/10 my-2">
            Editar
          </button>
          <div
            onClick={() => handleEliminar(data.nombre)}
            className="flex items-center justify-center bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded w-5/10"
          >
            Eliminar
          </div>
        </div>
      </form>
    </div>
  );
}

