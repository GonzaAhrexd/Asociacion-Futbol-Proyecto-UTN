'use client';

import React, { useEffect, useState } from 'react';
import { obtenerEquipos, crearEquipo } from '../../utils/equipos/equipos';
import DataTable from 'react-data-table-component';
import ColumnCategorias from './columnEquipos';
import expandedComponents from './expandedEquipo';
import { useForm } from 'react-hook-form';
import InputText from '@/components/Inputs/InputText';

interface Equipo {
    nombre: string;
    dni_dt_fk: number;
    categoria_fk: string;
    division: string;
  }

export default function ListaEquipos(){

    const [equipos, setEquipos] = useState<Equipo[]>([]);
    const [vistaAgregar, setVistaAgregar] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchEquipos = async () => {
        const equipos = await obtenerEquipos();
        setEquipos(equipos);
        };

        fetchEquipos();
    }, []);

    function cancelarEnvio(){
        setVistaAgregar(false)
      }

      const onSubmit = async (values: any) => {
        
        console.log(values);
        values.dni_dt_fk = Number(values.dni_dt_fk);
        await crearEquipo(values);
            
      };

    return(

        <div>
            <div className='flex p-4'>
                <h1 className='text-3xl mr-2'>Listado de equipos</h1>
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
                      <label className="block font-semibold" htmlFor="dni_dt_fk">
                        DNI del Director Tecnico
                      </label>
                      <select
                        id="dni_dt_fk"
                        {...register("dni_dt_fk", { required: "Seleccione un dni de DT" })}
                        className={`block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900 ${
                          errors.dni_dt_fk ? 'mt-1 text-red-600' : ''
                        }`}
                      >
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
                          <option value="juvenil">juvenil</option>
                          <option value="Maxi">Maxi</option>
                          <option value="Super">Super</option>
                        </select>
                        {errors.categoria_fk && (
                          <p className="text-red-500 text-xs italic">{errors.categoria_fk.message}</p>
                        )}
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
                data={equipos}
                // pagination
                expandableRows
                expandableRowsComponent={expandedComponents}
                responsive
                striped
                highlightOnHover
                noDataComponent="No hay equipos para mostrar"
            />
        </div>

        

    );
}