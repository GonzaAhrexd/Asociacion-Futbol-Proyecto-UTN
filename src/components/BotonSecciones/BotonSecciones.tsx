import Link from 'next/link';
import React from 'react'

type BotonSeccionesProps = {
    seccion: string;
    ruta: string;
}


function BotonSecciones({ seccion, ruta }: BotonSeccionesProps) {
    return (
        <Link href={ruta}    >
            <div className="rounded-lg md:h-32 lg:h-24 xl:h-20 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-green-500 hover:bg-green-950 transform transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="flex flex-row md:flex-col md:items-center lg:flex-row lg:items-start justify-between">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-50">
                        {seccion}
                    </h5>

                </div>
            </div>
        </Link>
    )
}

export default BotonSecciones