import axios from 'axios';
import { DateTime } from 'next-auth/providers/kakao';

const baseUrl = '/api/torneos'; // Ajusta según tu ruta API

interface Torneo {
    nombre?:string;
    categoria_fk?:string;
    inscripciones_inicio?:DateTime;
    inscripciones_fin?:DateTime;
    inicio_torneo?:DateTime;
    fin_torneo?:DateTime;
    esta_habilitado?:boolean;
    division?:string;
}

export const obtenerTorneos = async () => {
  try{
    const response = await axios.get(baseUrl);
    return response.data;
  }catch(error){
    console.log(error);
  }
  
};

export const crearTorneo = async (torneo:Torneo) => {
    const response = await axios.post(baseUrl, torneo);
    return response.data;
  };

  export const eliminarTorneo = async (torneo: any) => {
    const response = await axios.delete(`${baseUrl}`, { data: torneo });
    return response.data;
  }

  export const actualizarTorneo = async (torneo: any) => {
    const response = await axios.put(`${baseUrl}`, torneo);
    return response.data;
  }