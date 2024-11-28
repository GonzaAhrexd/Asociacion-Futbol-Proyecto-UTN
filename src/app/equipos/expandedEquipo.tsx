import React from 'react';
import InputText from '@/components/Inputs/InputText';
import { eliminarEquipo, actualizarEquipo } from '../../utils/equipos/equipos';
import InputNumber from '@/components/Inputs/InputNumber';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type Equipo = {
  data: any;
};

export default function ExpandedEquipo({ data }: Equipo) {
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const handleEliminar = async (nombre: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el equipo ${nombre}?`)) {
      try {
        await eliminarEquipo(nombre);
        alert('equipos eliminado');
        window.location.reload();
      } catch (error) {
        console.error('Error al eliminar el equipo:', error);
        alert('Error al eliminar el equipo');
      }
    }
  };

  const onSubmit = async (values: any) => {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro de que deseas editar el equipo?',
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
        await actualizarEquipo(values);
        Swal.fire({
          icon: 'success',
          title: 'equipos editado',
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
      {/* Input para el nombre del equipo */}
      <InputText
                      campo="Nombre del equipo"
                      placeholder="Ej: Barcelona FC"
                      type="text"
                      nombre="nombre"
                      register={register}
                      setValue={setValue}
                      errors={errors.nombre}
                      require
                    />
                    {/* Select para elegir la división */}
                   <div className="mt-2">
                      <label className="block font-semibold" htmlFor="dni_dt">
                        DNI del Director Tecnico
                      </label>
                      <select
                        id="dni_dt"
                        {...register("dni_dt", { required: "Seleccione un dni de DT" })}
                        className={`block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900 ${
                          errors.dni_dt ? 'mt-1 text-red-600' : ''
                        }`}
                      >
                        <option value="A">444444444</option>
                        <option value="B">555555555</option>
                        <option value="C">666666666</option>
                      </select>
                      {errors.dni_dt && (
                        <p className="text-red-500 text-xs italic">{errors.dni_dt.message}</p>
                      )}
                    </div>
                    
                    {/* Select para elegir la división */}
                    <div className="mb-4 mt-2">
                      <label className="block font-semibold" htmlFor="division">
                        División
                      </label>
                      <select
                        id="division"
                        {...register("division", { required: "Seleccione una división" })}
                        className={`block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900  ${
                          errors.division ? 'border-red-500' : ''
                        }`}
                      >
                        <option value="A">División A</option>
                        <option value="B">División B</option>
                        <option value="C">División C</option>
                      </select>
                      {errors.division && (
                        <p className="text-red-500 text-xs italic">{errors.division.message}</p>
                      )}
                    </div>

                    {/* Select para elegir la división */}
                    <div className="mt-2">
                        <label className="block font-semibold" htmlFor="categoria">
                          Categoria
                        </label>
                        <select
                          id="categoria"
                          {...register("categoria", { required: "Seleccione una categoria" })}
                          className={`block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900  ${
                            errors.categoria ? 'border-red-500' : ''
                          }`}
                        >
                          <option value="A">Juvenil</option>
                          <option value="B">Mayores</option>
                          <option value="C">Jubilados</option>
                        </select>
                        {errors.categoria && (
                          <p className="text-red-500 text-xs italic">{errors.categoria.message}</p>
                        )}
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

