"use client";

import React, { useEffect, useState } from "react";
import EquipoForm from "../equipos/EquipoForm";
import { obtenerEquipos } from "../../utils/equipos/equipos";
import Link from "next/link";


export default function Page() {
  const [vistaAgregar, setVistaAgregar] = useState(false);

  const fetchEquipos = async () => {
    const equipos = await obtenerEquipos();
    setEquipos(equipos);
    setVistaAgregar(false);
  };
  return (
    <div className="flex h-screen justify-evenly items-center">
      <Link className="bg-green-400 w-64 h-52 p-10 rounded-lg" href="/vistajugador/crear_equipo" >crear equipo</Link>
      {vistaAgregar && (
        <div className="flex items-center justify-center">
          <EquipoForm
            creando={true}
            data={undefined}
            onUpdate={fetchEquipos} // Actualiza la lista tras crear o modificar un equipo
          />
        </div>
      )}
      <button className="bg-green-400 w-64 h-52 p-10 rounded-lg">unirme a un equipo</button>
    </div>
  );
}
