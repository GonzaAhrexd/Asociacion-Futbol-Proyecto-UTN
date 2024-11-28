"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const botonGris300 = "m-2 bg-gray-300 px-5 py-2 rounded";

  const { data: session, status } = useSession();
  const user = session?.user;
  return (
    <div>
      <div className="flex flex-col w-fit">
        {user ? (
          <>
            <p className="ml-3">Bienvenido, {user.name}!</p>
          </>
        ) : (
          <>
            <p>no logueao :(</p>
          </>
        )}
        <h1>Aca podriamos poner un panel de admin o algo asi</h1>
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
