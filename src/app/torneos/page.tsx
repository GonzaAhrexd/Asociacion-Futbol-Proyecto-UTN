"use client";

import React, { useEffect, useState } from "react";
import { obtenerTorneos, buscarTorneoPorCategoria } from "../../utils/torneos/torneos";
import DataTable from "react-data-table-component";
import columnTorneos from "./columnTorneos";
import TorneoForm from "./TorneoForm";
import { DateTime } from "next-auth/providers/kakao";
import TorneoInscripcion from "./TorneoInscripcion/TorneoInscripcion";
import SelectRegister from "@/components/Select/SelectRegisterSingle";

import { obtenerCategorias } from "../api/services/categorias";

import { useForm } from "react-hook-form";

export default function ListaTorneo() {
  const [torneos, setTorneos] = useState([]);
  const [vistaAgregar, setVistaAgregar] = useState(false);
  const [isUserEncargado, setIsUserEncargado] = useState(false);
  const [listaCategoria, setListaCategoria] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm(); 

  // Cargar equipos al cargar el componente
  const fetchTorneos = async () => {
    const torneos = await obtenerTorneos();
    setTorneos(torneos);
    setVistaAgregar(false);
  };
  useEffect(() => {

    const fetchCategorias = async () => {
      const categorias = await obtenerCategorias();

      console.log(categorias)

      setListaCategoria(categorias);
      setListaCategoria(categorias.map((categoria: any) => {
        return { value: categoria.nombre, nombre: categoria.nombre }
      }))


    };

    fetchCategorias();
  }, []);

  const handleSoyEncargado = () => {
    setIsUserEncargado(true);
    fetchTorneos()
  }

  const handleNoSoyEncargado = () => {
    setIsUserEncargado(false);
    setTorneos([])
  
  }


  return (
    <div>
      <div className="flex flex-row items-center justify-center p-8">

        <button
            className="bg-blue-500 px-4 py-2 rounded-xl m-5 text-white"
            onClick={() => handleSoyEncargado()}
        >Soy Encargado</button>
        <button
        onClick={() => handleNoSoyEncargado()}
            className="bg-blue-500 px-4 py-2 rounded-xl m-5 text-white"
        >No soy encargado</button>
        </div>

      {isUserEncargado ? <>

        <div className="flex p-4 ml-5">
          <h1 className="text-3xl mr-2">Listado de torneos</h1>
          <button
            className="bg-blue-200 px-4 py-2 rounded-xl"
            onClick={() => setVistaAgregar(!vistaAgregar)}
          >
            Agregar
          </button>
        </div>

        {vistaAgregar && (
          <div className="flex items-center justify-center">
            <TorneoForm
              creando={true}
              data={undefined}
              onUpdate={fetchTorneos} // Actualiza la lista tras crear o modificar un equipo
            />
          </div>
        )}

        <DataTable
          columns={columnTorneos}
          data={torneos}
          expandableRows
          expandableRowsComponent={({ data }) => (
            <TorneoForm
              creando={false}
              data={data}
              onUpdate={fetchTorneos} // Actualiza la lista tras eliminar o editar un equipo
            />
          )}
          responsive
          striped
          highlightOnHover
          noDataComponent="No hay torneos para mostrar"
        />

      </>
        :
        <>
          <div className="flex p-4">
            <h1 className="text-3xl m-auto">Listado de torneos</h1>
          </div>

          <form
            className="flex flex-col items-center justify-center"
          action="" 
            onSubmit={handleSubmit(async (data) => {

              const torneos = await buscarTorneoPorCategoria(data)
              setTorneos(torneos);

            })
            }
          >

            <SelectRegister

              campo="Elija su categoría"
              nombre="categoria"
              opciones={listaCategoria}
              setValue={setValue}
              error={errors.categoria}
              isRequired={true}
              mid={false}
            />
            <button
            className="bg-green-500 px-4 py-2 rounded-xl my-5 text-white font-semibold"
            >Buscar</button>
          </form>

          <DataTable
          columns={columnTorneos}
          data={torneos}
          expandableRows
          expandableRowsComponent={({ data }) => (
            <TorneoInscripcion
              data={data}
            />
          )}
          responsive
          striped
          highlightOnHover
          noDataComponent="No hay torneos para mostrar"
        />
        </>

      }
    </div>
  );
}
