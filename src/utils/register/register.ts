// utils/api.js
import axios from 'axios';

export const registerUser = async (data: any) => {
    try {
        const response = await axios.post('/api/register', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;  // Devuelve la respuesta de la API
    } catch (error) {
        console.error('Error en la solicitud a la API:', error);
        throw new Error('Hubo un problema al enviar el formulario');
    }
};
