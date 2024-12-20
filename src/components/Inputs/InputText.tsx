import React from 'react';
import { useEffect } from 'react';

type InputTextProps = {
  campo: string;
  placeholder?: string;
  type: string;
  nombre: string;
  register: any;
  setValue?: any;
  errors: any;
  require?: boolean;
  valor?: string;
  width? : string;
};

// Definimos el componente funcional InputText
export default function InputText({width,  campo, placeholder, type, nombre, register, require, setValue, errors, valor }: InputTextProps) {

  useEffect(() => {
    if (valor) {
      setValue(nombre, valor);
    }
  }, [setValue, nombre, valor, errors]);


  return (
    <div className='flex flex-col mt-2'>
    {
      <label className={"block font-semibold"}>
        {campo}
      </label>
      }
       {errors && <span className="mt-1 text-red-600">{placeholder || campo} es requerido</span>} 
      <input
        type={type}
        className={`${width ? width : "w-full"} block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900`}
        {...register(nombre, { required: require === true ? true : false })} placeholder={placeholder}
      />
    </div>
  );
}

