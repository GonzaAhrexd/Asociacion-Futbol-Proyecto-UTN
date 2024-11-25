import Link from 'next/link'

export default function(){

    const estilosBotones = "m-2 bg-gray-300 px-5 py-2 rounded"
    return(
        <div className='flex flex-col w-fit'>
            <Link href="" className={estilosBotones}>Jugadores</Link>
            <Link href="" className={estilosBotones}>Encargados</Link>
            <Link href="" className={estilosBotones}>DTs</Link>
            <Link href="" className={estilosBotones}>Arbitros</Link>

        </div>
    )
}