"use client";

import React, { useState } from "react";
import {
  crearTorneo, actualizarTorneo, eliminarTorneo
  
} from "../../utils/torneos/torneos";
import { useForm } from "react-hook-form";
import InputText from "@/components/Inputs/InputText";
import { DateTime } from "next-auth/providers/kakao";
import InputDate from "@/components/Inputs/InputDate";
import Swal from "sweetalert2";

interface Torneo {
    nombre?:string;
    categoria_fk?:string;
    inscripciones_inicio?:DateTime;
    inscripciones_fin?:DateTime;
    inicio_torneo?:DateTime;
    fin_torneo?:DateTime;
    esta_habilitado?: number;
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
  const [isChecked, setIsChecked] = useState(data ? (data.esta_habilitado == 1 ? true : false) : false);

  // Manejar el cambio en el checkbox
  const handleCheckboxChange = (e: any) => {
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

        Swal.fire({
          title: "¿Estás seguro?",
          text: "¿Deseas crear el torneo?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí",
          cancelButtonText: "No",
        }).then(async (result) => {
          values.esta_habilitado = isChecked;
          await crearTorneo(values);
          if (result.isConfirmed) {
            Swal.fire(
              {
                title: "Torneo creado",
                icon: "success",
                timer: 2000,
                showConfirmButton: true,
                confirmButtonColor: "#28a745",
              }
            ).then(
              () => onUpdate() // Actualizar listado
            );
          }
        });

      } 
      else {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "¿Deseas editar el torneo?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí",
          cancelButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            values.nombreOriginal = data?.nombre;
            values.nombreNuevo = values.nombre;
            values.esta_habilitado = isChecked;
            console.log(values)
            await actualizarTorneo(values);
            alert("Equipo actualizado");
            console.log("Equipo actualizado");
          }
        });
        
      }
    } catch (error) {
      console.error("Error al guardar el equipo:", error);
    }
  };

  const handleEliminar = async (nombre: string | undefined) => {
   try{
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar el torneo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(nombre)
        await eliminarTorneo({nombre});
        Swal.fire(
          {
            title: "Torneo eliminado",
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
            confirmButtonColor: "#28a745",
          }
        ).then(
          () => onUpdate() // Actualizar listado
        );
      }
    })
   }catch(error){
     console.error("Error al eliminar el torneo:", error);
   }
  }

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
        require={false}
      />
      <InputDate 
        campo="Fecha de inicio"
        nombre="inicio_torneo"
        register={register}
        setValue={setValue}
        errors={errors.inicio_torneo}
        valor={data ? data.inicio_torneo : ""}
        require={false}
      />
       <InputDate 
        campo="Fecha de finalización"
        nombre="fin_torneo"
        register={register}
        setValue={setValue}
        errors={errors.inicio_torneo}
        valor={data ? data.fin_torneo : ""}
        require={false}
      />
        <InputDate 
          campo="Inicio de inscripciones"
          nombre="inscripciones_inicio"
          register={register}
          setValue={setValue}
          errors={errors.inicio_torneo}
          valor={data ? data.inscripciones_inicio : ""}
          require={false}
        />
        <InputDate 
          campo="Fin de inscripciones"
          nombre="inscripciones_fin"
          register={register}
          setValue={setValue}
          errors={errors.inicio_torneo}
          valor={data ? data.inscripciones_fin : ""}
          require={false}
        />
    <div className="flex flex-row items-center">
      <label 
      className="block font-semibold py-2"
      > Habilitado
        <input
        className="ml-2 
        w-5 h-5" 
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          // @ts-ignore
          value={data?.esta_habilitado == 1 ? true : false}
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
        {/* @ts-ignore */}
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
          // @ts-ignore
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
            <button
              onClick={() => setAccionCrear(false)}
              className="mr-2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-full my-2"
            >
              Editar
            </button>
            <button
              onClick={() => handleEliminar(data?.nombre || "")}
              className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-1/2 my-2"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </form>
  );
}
