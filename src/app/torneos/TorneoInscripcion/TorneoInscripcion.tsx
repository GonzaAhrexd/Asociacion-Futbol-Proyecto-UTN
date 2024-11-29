import React from 'react'

import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { inscribirTorneo } from '@/utils/torneos/torneos'
import InputText from '@/components/Inputs/InputText'
type TorneoInscripcionProps = {
    data: any
}

function TorneoInscripcion({ data }: TorneoInscripcionProps) {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();


    return (
        <div className='flex flex-col items-center justify-center'>
            <h1
            className='text-3xl font-light text-center'
            >Inscribir un equipo al torneo</h1>
            <form
            className='flex flex-col items-center justify-center'
                onSubmit={handleSubmit((values) => {
                    // Mostrar el Swal de confirmación
                    try {

                        Swal.fire({
                            title: '¿Estás seguro?',
                            text: "¿Deseas inscribir a este equipo en el torneo?",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí, inscribir',
                            cancelButtonText: 'Cancelar'

                        }).then( async (result) => {
                            if (result.isConfirmed) {
                                // Enviar el formulario
                                values.nombre_torneo_fk = data.nombre

                                await inscribirTorneo(values)
                                Swal.fire(
                                    {
                                        title: 'Equipo inscrito',
                                        icon: 'success'
                                    }).then(() => {
                                        // Redirigir a la lista de torneos
                                        // router.push('/torneos')
                                    })

                            }
                        })
                    } catch (error) {
                        console.log(error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error al inscribir el equipo'
                        })
                    }

                })}
            >
                
            <InputText campo="Número de equipo" register={register} nombre="nro_equipo_fk"
             require={true} 
             setValue={setValue}
             errors={errors.nro_equipo_fk}
             type="text"
             />
             <button
             className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'
             >
                Inscribir
             </button>
             </form>

        </div>
    )
}

export default TorneoInscripcion