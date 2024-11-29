"use client";

import React, { useEffect, useState } from "react";
import { obtenerTorneos } from "../../utils/torneos/torneos";
import DataTable from "react-data-table-component";
import columnTorneos from "./columnTorneos";
import TorneoForm from "./TorneoForm";
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


export default function ListaTorneo() {
  const [torneos, setTorneos] = useState<Torneo[]>([]);
  const [vistaAgregar, setVistaAgregar] = useState(false);

  const fetchTorneos = async () => {
    const torneos = await obtenerTorneos();
    setTorneos(torneos);
    setVistaAgregar(false);
  };

  // Cargar equipos al cargar el componente
  useEffect(() => {
    fetchTorneos();
  }, []);

  return (
    <div>
      <div className="flex p-4">
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
    </div>
  );
}
