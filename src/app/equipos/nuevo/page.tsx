'use client'
import { useForm } from 'react-hook-form';
import InputText from '@/components/Inputs/InputText';

type EquipoFormValues = {
  nombre: string;
  dni_dt: number;
  categoria: string;
  division: string; // Campo para la división
};

export default function NuevoEquipo() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<EquipoFormValues>();

//   Obtener los dts de la base de datos para luego en el select seleccionar uno y guardar su dni para la tabla del equipo como pk fk
  const dts = ["dt1", "dt2", "dt3"]


  const onSubmit = async (data: EquipoFormValues) => {
    try {
        alert('Datos del equipo enviados correctamente')
      console.log(data); // Muestra los datos del formulario
    } catch (error) {
      console.error('Error al crear la categoría:', error.message);
    }
  };

  return (
    <div className=' flex flex-col items-center'>
      <h1 className='text-3xl my-5'>Crear nuevo equipo</h1>

      <form 
        className="bg-gray-100 w-96 flex flex-col p-8" 
        onSubmit={handleSubmit(onSubmit)}
      >
        
        {/* Input para el nombre del equipo */}
        <InputText
          campo="Nombre del equipo"
          placeholder="Ej: Barcelona FC"
          type="text"
          nombre="nombre"
          register={register}
          setValue={setValue}
          errors={errors.nombre}
          require
        />

        {/* Select para elegir la división */}
       <div className="mt-2">
          <label className="block font-semibold" htmlFor="dni_dt">
            DNI del Director Tecnico
          </label>
          <select
            id="dni_dt"
            {...register("dni_dt", { required: "Seleccione un dni de DT" })}
            className={`block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900 ${
              errors.dni_dt ? 'mt-1 text-red-600' : ''
            }`}
          >
            <option value="A">444444444</option>
            <option value="B">555555555</option>
            <option value="C">666666666</option>
          </select>
          {errors.dni_dt && (
            <p className="text-red-500 text-xs italic">{errors.dni_dt.message}</p>
          )}
        </div>

       {/* Select para elegir la división */}
       <div className="mt-2">
          <label className="block font-semibold" htmlFor="categoria">
            Categoria
          </label>
          <select
            id="categoria"
            {...register("categoria", { required: "Seleccione una categoria" })}
            className={`block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900  ${
              errors.categoria ? 'border-red-500' : ''
            }`}
          >
            <option value="A">Juvenil</option>
            <option value="B">Mayores</option>
            <option value="C">Jubilados</option>
          </select>
          {errors.categoria && (
            <p className="text-red-500 text-xs italic">{errors.categoria.message}</p>
          )}
        </div>

        {/* Select para elegir la división */}
        <div className="mb-4 mt-2">
          <label className="block font-semibold" htmlFor="division">
            División
          </label>
          <select
            id="division"
            {...register("division", { required: "Seleccione una división" })}
            className={`block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900  ${
              errors.division ? 'border-red-500' : ''
            }`}
          >
            <option value="A">División A</option>
            <option value="B">División B</option>
            <option value="C">División C</option>
          </select>
          {errors.division && (
            <p className="text-red-500 text-xs italic">{errors.division.message}</p>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}