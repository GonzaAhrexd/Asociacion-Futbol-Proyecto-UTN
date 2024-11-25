import Link from 'next/link'

export default function torneos(){
    return(
        <div className='flex'>
            <h1 className='text-3xl mr-2'>Listado de torneos</h1>
            <Link href="/torneos/nuevo" className='bg-blue-200 px-4 py-2 rounded-xl'>
                Agregar
            </Link>
        </div>
    )
}