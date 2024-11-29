"use client";

import React, { useEffect, useState } from "react";
import EquipoForm from "../../equipos/EquipoForm";
import { obtenerEquipos } from "../../../utils/equipos/equipos";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [jugador, setJugador] = useState(null);

  useEffect(() => {
    async function fetchJugador() {
      if (user?.id) {
        try {
          const response = await prisma.$queryRaw`SELECT * FROM Jugador WHERE dni_jugador_fk=${user.id}`;
          setJugador(response[0]); // Aseguramos que es el primer jugador del array
        } catch (error) {
          console.error("Error al obtener el jugador:", error);
        }
      }
    }

    fetchJugador();
  }, [user?.id]);

  const handlerCrearEquipo = async () => {
    try {
      // Envía los datos en formato JSON
      const patchResponse = await axios.patch("/api/jugador", {
        dni_jugador_fk: user.id,
        es_responsable: true,
      });

      console.log(patchResponse);
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  const fetchEquipos = async () => {
    const equipos = await obtenerEquipos();
    setEquipos(equipos);
    setVistaAgregar(false);
  };

  // Función que evalúa si se debe ocultar el EquipoForm
  const shouldShowEquipoForm = () => {
    return !(jugador?.nro_equipo || jugador?.es_responsable);
  };

  return (
    <div className="flex h-screen justify-evenly items-center">
      {shouldShowEquipoForm() ? (
        <div className="flex items-center justify-center">
          <EquipoForm
            creando={true}
            data={undefined}
            onUpdate={fetchEquipos} // Actualiza la lista tras crear o modificar un equipo
          />
        </div>
      ) : (
        <p>¡Ya tienes un equipo asignado!</p>
      )}
    </div>
  );
}
