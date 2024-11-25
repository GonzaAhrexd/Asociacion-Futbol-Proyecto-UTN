"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import InputText from '../../components/Inputs/InputText';
import Link from 'next/link';
import { registerUser } from '@/utils/register/register';
import { useState } from 'react';
function page() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [mensajeError, setMensajeError] = useState('')
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <div className='w-full md:w-3/10 h-screen md:h-7/10 flex flex-col items-center justify-center bg-gray-100 border shadow rounded-lg p-2'>
                <span 
                    className='text-white bg-red-700 rounded-lg h-5'
                >{mensajeError}</span>
                <h1 className='text-4xl'>Registro de usuario</h1>
                <form className='w-full p-2'
                    onSubmit={
                        handleSubmit(async (data) => {

                            if(data.pass !== data.pass_repeat){
                                // alert('Las contraseñas no coinciden')
                                setMensajeError('Las contraseñas no coinciden')
                                return
                            }else{
                                setMensajeError('')
                            }


                            try{
                                console.log(data)
                                await registerUser(data)
                            }catch(error){
                                console.log(error);
                            }
                        })
                    }>
                    <div className='flex flex-row justify-evenly'>
                        <InputText campo="Nombre" type="text" nombre="nombre" register={register} require errors={errors.nombre} />
                        <InputText campo="Apellido" type="text" nombre="apellido" register={register} require errors={errors.apellido} />
                    </div>

                    <div className='flex flex-row justify-evenly'>
                        <InputText campo="Nombre de usuario" type="text" nombre="nombre_de_usuario" register={register} require errors={errors.nombre_de_usuario} />
                        <InputText campo="Correo electrónico" type="text" nombre="correo_electronico" register={register} require errors={errors.correo_electronico} />
                    </div>
                    <div className='flex flex-row justify-evenly'>
                        <InputText campo="Contraseña" type="password" nombre="pass" register={register} require errors={errors.pass} />
                        <InputText campo="Repite la contraseña" type="password" nombre="pass_repeat" register={register} require errors={errors.pass_repeat} />
                    </div>

                    <div className='flex items-center justify-center'>
                        <span>¿No tienes cuenta? <Link href='/register' className='text-green-600'>¡Registrate!</Link></span>
                    </div>
                    <button type="submit" className='bg-green-600 text-white p-2 rounded-lg w-full my-2 '>Iniciar sesión</button>
                </form>
            </div>
        </div>
    )
}

export default page