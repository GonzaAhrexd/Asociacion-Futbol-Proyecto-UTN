"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import InputText from '../components/Inputs/InputText';
import Link from 'next/link';

function page() {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-green-500'>
      <div className='w-full md:w-3/10 h-screen md:h-7/10 flex flex-col items-center justify-center bg-white rounded-lg p-2'> 
        <h1 className='text-4xl'>Inicia sesión</h1>
        <form className='w-full p-2' 
        onSubmit={
        handleSubmit((data) => {
          console.log(data);
        })
        }>
        <InputText campo="Nombre de usuario"  type="text" nombre="nombre_de_usuario" register={register} require errors={errors.nombre_de_usuario} />
        <InputText campo="Contraseña"  type="password" nombre="pass" register={register} require errors={errors.pass} />
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