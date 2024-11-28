"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function navBar() {
  const estilosBotones = "bg-green-200 px-4 py-2 rounded-xl mr-2";

  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <div className="bg-green-400 flex flex-row items-center justify-center w-full p-1">
      {/* <p className='text-bold flex flex-col items-center justify-center text-white text-xl md:text-4xl '>
          Asociación de Fútbol Resistencia
      </p> */}
      <Link href="/" className={estilosBotones}>
        Inicio
      </Link>
      <Link href="/equipos" className={estilosBotones}>
        Equipos
      </Link>
      <Link href="/torneos" className={estilosBotones}>
        Torneos
      </Link>
      <Link href="/personas" className={estilosBotones}>
        Personas
      </Link>
      <Link href="/" className={estilosBotones}>
        Partidos
      </Link>
      <Link href="/" className={estilosBotones}>
        Estadisticas
      </Link>

      {user ? (
        <>
          <button
            className="bg-red-100 px-4 py-2 rounded-xl mr-2"
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className={estilosBotones}>
            Iniciar sesion
          </Link>
          <Link href="/register" className={estilosBotones}>
            Registrarse
          </Link>
        </>
      )}
    </div>
  );
}

export default navBar;
