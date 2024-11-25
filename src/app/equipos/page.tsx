import Link from "next/link";

export default function equipos(){
    return(

        <div className='flex'>
            <h1 className='text-3xl mr-2'>Listado de equipos</h1>
            <Link href="/equipos/nuevo" className='bg-blue-200 px-4 py-2 rounded-xl'>
                Agregar
            </Link>
        </div>

    );
}