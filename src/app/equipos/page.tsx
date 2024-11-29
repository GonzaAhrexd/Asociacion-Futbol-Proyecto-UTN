"use client";

import React, { useEffect, useState } from "react";
import { obtenerEquipos } from "../../utils/equipos/equipos";
import DataTable from "react-data-table-component";
import ColumnCategorias from "./columnEquipos";
import EquipoForm from "./EquipoForm";

interface Equipo {
  nro_equipo?: number;
  nombre: string;
  dni_dt_fk: number;
  categoria_fk: string;
  division: string;
}

export default function ListaEquipos() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [vistaAgregar, setVistaAgregar] = useState(false);

  const fetchEquipos = async () => {
    const equipos = await obtenerEquipos();
    setEquipos(equipos);
    setVistaAgregar(false);
  };

  // Cargar equipos al cargar el componente
  useEffect(() => {
    fetchEquipos();
  }, []);

  return (
    <div>
      <div className="flex p-4">
        <h1 className="text-3xl mr-2">Listado de equipos</h1>
        <button
          className="bg-blue-200 px-4 py-2 rounded-xl"
          onClick={() => setVistaAgregar(!vistaAgregar)}
        >
          Agregar
        </button>
      </div>

      {vistaAgregar && (
        <div className="flex items-center justify-center">
          <EquipoForm
            creando={true}
            data={undefined}
            onUpdate={fetchEquipos} // Actualiza la lista tras crear o modificar un equipo
          />
        </div>
      )}

      <DataTable
        columns={ColumnCategorias}
        data={equipos}
        expandableRows
        expandableRowsComponent={({ data }) => (
          <EquipoForm
            creando={false}
            data={data}
            onUpdate={fetchEquipos} // Actualiza la lista tras eliminar o editar un equipo
          />
        )}
        responsive
        striped
        highlightOnHover
        noDataComponent="No hay equipos para mostrar"
      />
    </div>
  );
}
