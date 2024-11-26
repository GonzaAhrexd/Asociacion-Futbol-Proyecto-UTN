import React, { useEffect } from 'react';
import { useForm, FieldError } from 'react-hook-form';

type InputDateProps = {
  campo: string;
  placeholder?: string;
  nombre: string;
  register: any;
  setValue?: (field: string, value: any) => void;
  errors?: FieldError;
  require?: boolean;
  valor?: string; // Valor inicial en formato de fecha (YYYY-MM-DD)
};

export default function InputDate({
  campo,
  placeholder,
  nombre,
  register,
  require,
  setValue,
  errors,
  valor,
}: InputDateProps) {
  useEffect(() => {
    if (valor && setValue) {
      setValue(nombre, valor); // Establecer el valor inicial si existe
    }
  }, [setValue, nombre, valor]);

  return (
    <div className="flex flex-col">
      <label className="block font-semibold">{campo}</label>
      {errors && <span className="mt-1 text-red-600">{errors.message}</span>}
      <input
        type="date"
        className="block text-black w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900"
        {...register(nombre, {
          required: require ? `${campo} es requerido` : false, // Mensaje personalizado
          validate: (value: any) =>
            value ? true : `Debe seleccionar una fecha válida para ${campo}`,
        })}
        placeholder={placeholder || ''}
      />
    </div>
  );
}
