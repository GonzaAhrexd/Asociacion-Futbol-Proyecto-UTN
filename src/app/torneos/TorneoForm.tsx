"use client";

import React, { useState } from "react";
import {
  crearTorneo,
  
} from "../../utils/torneos/torneos";
import { useForm } from "react-hook-form";
import InputText from "@/components/Inputs/InputText";
import { DateTime } from "next-auth/providers/kakao";

interface Torneo {
    nombre?:string;
    categoria_fk?:string;
    inscripciones_inicio?:DateTime;
    inscripciones_fin?:DateTime;
    inicio_torneo?:DateTime;
    fin_torneo?:DateTime;
    esta_habilitado?:boolean;
    division?:string;
}

interface TorneoFormProps {
  creando: boolean;
  data?: Torneo;
  onUpdate: () => void; // Actualizar lista de equipos
}

export default function TorneoForm({ creando, data, onUpdate }: TorneoFormProps) {
//   const { nombre = "", dni_dt_fk, categoria_fk, division } = data || {};
  const [accionCrear, setAccionCrear] = useState(creando);
  const [isChecked, setIsChecked] = useState(false);

  // Manejar el cambio en el checkbox
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

//   const listaDnis = ["1345", "12345678", "66666666"];
  const listaDivisiones = ["A", "B", "C"];
  const listaCategorias = ["juvenil", "Super", "Maxi"];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      if (accionCrear) {
        console.log(values);
        await crearTorneo(values);
        alert("torneo creado");
        console.log("torneo creado");
      } 
    //   else {
    //     values.nro_equipo = data?.nro_equipo;
    //     await actualizarEquipo(values);
    //     alert("Equipo actualizado");
    //     console.log("Equipo actualizado");
    //   }
      onUpdate(); // Actualizar listado
    } catch (error) {
      console.error("Error al guardar el equipo:", error);
    }
  };

//   const handleEliminar = async (nombre: string | undefined) => {
//     if (!nombre) {
//       alert("Error: No se puede eliminar un equipo sin nombre.");
//       return;
//     }

//     const confirmacion = confirm(`¿Deseas eliminar el equipo "${nombre}"?`);
//     if (!confirmacion) return;

//     try {
//       await eliminarEquipo(nombre);
//       console.log(`Equipo "${nombre}" eliminado correctamente.`);
//       alert(`Equipo "${nombre}" eliminado correctamente.`);
//       onUpdate(); // Actualizar listado
//     } catch (error) {
//       console.error(`Error al eliminar el equipo "${nombre}":`, error);
//       alert(`Error al eliminar el equipo "${nombre}".`);
//     }
//   };

  if (!data && !accionCrear) {
    return <p>Los datos del equipo no están disponibles.</p>;
  }

  return (
    <form
      className="flex flex-col p-5 bg-gray-100 shadow m-2 w-[400px] mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl m-auto my-3">{accionCrear ? "Nuevo Torneo" : "Editar Torneo"}</h1>

      <InputText
        campo="Nombre del torneo"
        placeholder="Ej: Champions league 2025"
        type="text"
        nombre="nombre"
        register={register}
        setValue={setValue}
        errors={errors.nombre}
        valor={data ? data.nombre : ""}
        require
      />

    <div>
      <label htmlFor="fecha">Selecciona una fecha:</label>
      <input
        type="date"
        id="fecha"
        name="fecha"
        value={data?.inicio_torneo}
      />
    </div>
    <div>
      <label htmlFor="fecha">Selecciona una fecha:</label>
      <input
        type="date"
        id="fecha"
        name="fecha"
        value={data?.fin_torneo}
      />
    </div>
    <div>
      <label htmlFor="fecha">Selecciona una fecha:</label>
      <input
        type="date"
        id="fecha"
        name="fecha"
        value={data?.inscripciones_inicio}
      />
    </div>
    <div>
      <label htmlFor="fecha">Selecciona una fecha:</label>
      <input
        type="date"
        id="fecha"
        name="fecha"
        value={data?.inscripciones_fin}
      />
    </div>

    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          value={data?.esta_habilitado}
        />
      </label>
    </div>
  

      <div className="mb-4 mt-2">
        <label className="block font-semibold" htmlFor="division">
          División
        </label>
        <select
          id="division"
          {...register("division", { required: "Seleccione una división" })}
          className={`block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm ${
            errors.division ? "border-red-500" : ""
          }`}
        >
          {listaDivisiones.map((division, index) => (
            <option key={index} value={division}>
              {division}
            </option>
          ))}
        </select>
        {errors.division && <p className="text-red-500 text-xs italic">{errors.division.message}</p>}
      </div>

      <div className="mt-2">
        <label className="block font-semibold" htmlFor="categoria_fk">
          Categoría
        </label>
        <select
          id="categoria_fk"
          {...register("categoria_fk", { required: "Seleccione una categoría" })}
          className={`block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm ${
            errors.categoria_fk ? "border-red-500" : ""
          }`}
        >
          {listaCategorias.map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        {errors.categoria_fk && (
          <p className="text-red-500 text-xs italic">{errors.categoria_fk.message}</p>
        )}
      </div>

        

        





      <div className="flex">
        {accionCrear ? (
          <button
            onClick={() => setAccionCrear(true)}
            className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full my-2"
          >
            Crear
          </button>
        ) : (
          <>
            {/* <button
              onClick={() => setAccionCrear(false)}
              className="mr-2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-full my-2"
            >
              Editar
            </button> */}
            {/* <button
              onClick={() => handleEliminar(data?.nombre || "")}
              className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-1/2 my-2"
            >
              Eliminar
            </button> */}
          </>
        )}
      </div>
    </form>
  );
}
