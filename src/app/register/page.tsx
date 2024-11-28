"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import InputText from '../../components/Inputs/InputText';
import Link from 'next/link';
import { registerUser } from '@/utils/register/register';
import { useState } from 'react';
import InputDate from '@/components/Inputs/InputDate';
import Swal from 'sweetalert2';
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
                            if (data.pass !== data.pass_repeat) {
                                // alert('Las contraseñas no coinciden')
                                setMensajeError('Las contraseñas no coinciden')
                                return
                            } else {
                                setMensajeError('')
                            }
                            try {
                                await registerUser(data)
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Usuario registrado',
                                    showConfirmButton: true,
                                    timer: 1500
                                }).then(() => {
                                    window.location.href = '/'
                                })
                            } catch (error) {
                                console.log(error);
                            }
                        })
                    }>
                    <div className='flex flex-row justify-evenly items-center gap-4'>
                        <InputText campo="Nombre" type="text" nombre="nombre" register={register} require errors={errors.nombre} />
                        <InputText campo="Apellido" type="text" nombre="apellido" register={register} require errors={errors.apellido} />
                    </div>

                    <div className='flex flex-row justify-evenly items-center gap-4'>
                        <InputText campo="DNI" type="text" nombre="dni" register={register} require errors={errors.DNI} />
                        <InputDate campo="Fecha de nacimiento" nombre="fecha_nacimiento" placeholder="Selecciona una fecha" register={register} setValue={setValue} require={true} />
                    </div>
                    <div className='flex flex-row justify-evenly items-center gap-4'>
                        <InputText campo="Contraseña" type="password" nombre="pass" register={register} require errors={errors.pass} />
                        <InputText campo="Repite la contraseña" type="password" nombre="pass_repeat" register={register} require errors={errors.pass_repeat} />
                    </div>
                    <div className='flex flex-row justify-evenly items-center gap-4'>
                        <InputText campo="Calle" type="text" nombre="direccion_calle" register={register} require errors={errors.direccion_calle} />
                        <InputText campo="Altura" type="text" nombre="direccion_altura" register={register} require errors={errors.direccion_altura} />
                    </div>

                    <div className='flex items-center justify-center'>
                        <span>Ya tienes cuenta? <Link href='/login' className='text-green-600'>¡Inicia sesión!</Link></span>
                    </div>
                    <button type="submit" className='bg-green-600 text-white p-2 rounded-lg w-full my-2 '>Registrarse</button>
                </form>
            </div>
        </div>
    )
}

export default page