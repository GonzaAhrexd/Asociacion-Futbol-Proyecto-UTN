import axios from 'axios';

const baseUrl = '/api/personas'; // Ajusta según tu ruta API

interface Persona {
    nombre: string;
    fecha_nacimiento: DateTime;
    direccion:string;
    telefono_contacto:number;
    pass: string;
    es_encargado:boolean;
  }

export const obtenerPersonas = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// export const crearEquipo = async (equipo:Equipo) => {
//   const response = await axios.post(baseUrl, equipo);
//   return response.data;
// };

// export const actualizarEquipo = async (equipo:Equipo) => {
//   const response = await axios.put(baseUrl, equipo);
//   return response.data;
// };

// export const eliminarEquipo = async (nombre:string) => {
//   const response = await axios.delete(`${baseUrl}?nombre=${nombre}`);
//   return response.data;
// };
