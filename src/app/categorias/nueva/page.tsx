'use client';

import { useForm } from 'react-hook-form';
import { crearCategoria } from "@/app/api/categorias";

type CategoriaFormValues = {
  nombre: string;
  edad_minima: number;
  edad_maxima: number;
};

export default function NuevaCategoriaPage() {

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
    } = useForm<CategoriaFormValues>();

  const onSubmit = async (data: CategoriaFormValues) => {
    try {
      const response = await crearCategoria(data);
      alert('Categoría creada exitosamente');
      reset(); // Reinicia el formulario
    } catch (error) {
      console.error('Error al crear la categoría:', error.message);
      alert(`Error: ${error.response?.data?.message || 'No se pudo crear la categoría'}`);
    }
  };

  return (
    <div>
        <h1 className='text-3xl'>Crear nueva categoria</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='bg-green-100 p-5 w-fit'>

            <div className='p-2'>
                <label>Nombre:</label>
                <input
                    {...register('nombre', { required: 'El nombre es obligatorio' })}
                    type="text"
                />
                {errors.nombre && <span>{errors.nombre.message}</span>}
            </div>
            <div className='p-2'>
                <label>Edad mínima:</label>
                <input
                    {...register('edad_minima', {
                    required: 'La edad mínima es obligatoria',
                    valueAsNumber: true,
                    validate: (value) => value >= 0 || 'La edad mínima debe ser mayor o igual a 0',
                    })}
                    type="number"
                />
                {errors.edad_minima && <span>{errors.edad_minima.message}</span>}
            </div>
            <div className='p-2'>
                <label>Edad máxima:</label>
                <input
                    {...register('edad_maxima', {
                    required: 'La edad máxima es obligatoria',
                    valueAsNumber: true,
                    validate: (value) => value >= 0 || 'La edad máxima debe ser mayor o igual a 0',
                    })}
                    type="number"
                />
                {errors.edad_maxima && <span>{errors.edad_maxima.message}</span>}
            </div>
            <button type="submit" className='bg-green-700 text-white w-full'>Crear</button>
        </form>
    </div>
  );
}
