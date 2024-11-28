"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const estilosBotones = "m-2 bg-gray-300 px-5 py-2 rounded";

  const { data: session, status } = useSession();
  const user = session?.user;
  return (
    <div className="flex flex-col w-fit">
      <h1 className="ml-3">Home</h1>
      {user ? (
        <>
          <p className="ml-3">Bienvenido, {user.name}!</p>
        </>
      ) : (
        <>
          <p>no logueao :(</p>
        </>
      )}
      <Link href="/" className={estilosBotones}>
        Canchas
      </Link>
      <Link href="/categorias" className={estilosBotones}>
        Categorias
      </Link>
    </div>
  );
}
