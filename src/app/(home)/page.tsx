"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import BotonSecciones from "@/components/BotonSecciones/BotonSecciones";
export default function Home() {
  const botonGris300 = "m-2 bg-gray-300 px-5 py-2 rounded";

  const { data: session, status } = useSession();
  const user = session?.user;

  const secciones = [
    {
      nombre: "Canchas",
      ruta: "/canchas",
    },
    {
      nombre: "Categorias",
      ruta: "/categorias",
    }
  ]
  return (
    <div>
      <div className="flex flex-col items-center">

        <div className="my-8">
          {user ? (
            <>
              <h1 className="ml-3 text-4xl m-auto">Bienvenido, {user.name}!</h1>
            </>
          ) : (
            <>
              <h1 className="ml-3 text-4xl m-auto">No estas logueado :(</h1>
            </>
          )}
        </div>
        <h1
          className="text-3xl font-bold text-center text-neutral-900"
        >Secciones</h1>
        <div className='grid gap-1 grid-cols-1 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 w-full '>
          {secciones.map((seccion) => (
            <BotonSecciones seccion={seccion.nombre} ruta={seccion.ruta} />
          ))}
        </div>
      </div>
    </div>
  );
}
