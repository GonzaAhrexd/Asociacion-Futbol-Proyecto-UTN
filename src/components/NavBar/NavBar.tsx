                                                           
"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function navBar() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const botonGris300 = "bg-green-300 px-4 py-2 rounded-xl mr-2";
  const botonGris400 = "bg-green-400 px-4 py-2 rounded-xl mr-2";

  return (
    <div className="bg-green-200 flex flex-row items-center justify-center w-full p-2">
      {/* <p className='text-bold flex flex-col items-center justify-center text-white text-xl md:text-4xl '>
          Asociación de Fútbol Resistencia
      </p> */}

      <Link href="/" className={botonGris300}>
        Inicio
      </Link>
      <Link href="/equipos" className={botonGris300}>
        Equipos
      </Link>
      <Link href="/torneos" className={botonGris300}>
        Torneos
      </Link>
      <Link href="/personas" className={botonGris300}>
        Personas
      </Link>
      <Link href="/" className={botonGris300}>
        Partidos
      </Link>
      <Link href="/" className={botonGris300}>
        Estadisticas
      </Link>
      {user ? (
        <>
          <button
            className="text-white bg-red-700 px-4 py-2 rounded-xl mr-2"
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
          >
            Salir
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className={botonGris400}>
            Iniciar sesion
          </Link>
          <Link href="/register" className={botonGris400}>
            Registrarse
          </Link>
        </>
      )}
    </div>
  );
}

export default navBar;
