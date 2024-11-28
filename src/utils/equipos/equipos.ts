import axios from 'axios';

const baseUrl = '/api/equipos'; // Ajusta según tu ruta API

interface Equipo {
    nombre: string;
    dni_dt_fk: number;
    categoria_fk: number;
    division: string;
  }

export const obtenerEquipos = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const crearEquipo = async (equipo:Equipo) => {
  const response = await axios.post(baseUrl, equipo);
  return response.data;
};

export const actualizarEquipo = async (equipo:Equipo) => {
  const response = await axios.put(baseUrl, equipo);
  return response.data;
};

export const eliminarEquipo = async (nombre:string) => {
  const response = await axios.delete(`${baseUrl}?nombre=${nombre}`);
  return response.data;
};
