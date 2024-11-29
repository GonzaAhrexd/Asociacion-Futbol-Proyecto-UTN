import React from 'react';
import InputText from '@/components/Inputs/InputText';
import { eliminarEquipo, actualizarEquipo } from '../../utils/equipos/equipos';
import { useForm } from 'react-hook-form';

interface Equipo {
  nombre: string;
  dni_dt_fk: number;
  categoria_fk: string;
  division: string;
}

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

        values.nro_equipo=data.nro_equipo;
        console.log(values);
        await actualizarEquipo(values);
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
        valor={data.nombre}
        register={register}
        setValue={setValue}
        errors={errors.nombre}
        require
      />
                    {/* Select para elegir la división */}
                   <div className="mt-2">
                      <label className="block font-semibold" htmlFor="dni_dt_fk">
                        DNI del Director Tecnico
                      </label>
                      <select
                        id="dni_dt_fk"
                        {...register("dni_dt_fk", { required: "Seleccione un dni de DT" })}
                        className={`block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900 ${
                          errors.dni_dt ? 'mt-1 text-red-600' : ''
                        }`}
                      >
                        
                        <option value={data.dni_dt_fk}>{data.dni_dt_fk}</option>
                        <option value="1345">1345</option>
                        <option value="12345678">12345678</option>
                        <option value="66666666">66666666</option>
                      </select>
                      {errors.dni_dt_fk && (
                        <p className="text-red-500 text-xs italic">{errors.dni_dt_fk.message}</p>
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
                        <option value={data.division}>Division {data.division}</option>
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
                        <label className="block font-semibold" htmlFor="categoria_fk">
                          Categoria
                        </label>
                        <select
                          id="categoria_fk"
                          {...register("categoria_fk", { required: "Seleccione una categoria" })}
                          className={`block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900  ${
                            errors.categoria_fk ? 'border-red-500' : ''
                          }`}
                        >
                          <option value={data.categoria_fk}>{data.categoria_fk}</option>
                          <option value="juvenil">juvenil</option>
                          <option value="Maxi">Maxi</option>
                          <option value="Super">Super</option>
                        </select>
                        {errors.categoria_fk && (
                          <p className="text-red-500 text-xs italic">{errors.categoria_fk.message}</p>
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

