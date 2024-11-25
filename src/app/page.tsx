// import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
   <div className="p-5">

    <Link href="/categorias" className="bg-green-200 px-4 py-2 rounded-xl">Categorias</Link>

   </div>
  );
}
