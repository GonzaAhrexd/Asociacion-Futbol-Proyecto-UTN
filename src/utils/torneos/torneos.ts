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