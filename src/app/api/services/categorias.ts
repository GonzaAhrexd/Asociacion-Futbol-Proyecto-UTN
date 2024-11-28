import axios from 'axios';

const baseUrl = '/api/categorias'; // Ajusta según tu ruta API

interface Categoria {
    nombre: string;
    edad_minima: number;
    edad_maxima:number;
  }
  
export const obtenerCategorias = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

//falta este~
export const obtenerCategoriaPorNombre = async (nombre: string) => {
  const response = await axios.get(`${baseUrl}?nombre=${nombre}`);
  return response.data;
};

export const crearCategoria = async (categoria:Categoria) => {
  const response = await axios.post(baseUrl, categoria);
  return response.data;
};

export const actualizarCategoria = async (categoria:Categoria) => {
  const response = await axios.put(baseUrl, categoria);
  return response.data;
};

export const eliminarCategoria = async (nombre:string) => {
  const response = await axios.delete(`${baseUrl}?nombre=${nombre}`);
  return response.data;
};
