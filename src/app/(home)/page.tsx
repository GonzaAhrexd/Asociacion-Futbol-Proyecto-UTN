"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const botonGris300 = "m-2 bg-gray-300 px-5 py-2 rounded";

  const { data: session, status } = useSession();
  const user = session?.user;
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

        

        <Link href="/" className={botonGris300}>
          Canchas
        </Link>
        <Link href="/categorias" className={botonGris300}>
          Categorias
        </Link>
      </div>
    </div>
  );
}
