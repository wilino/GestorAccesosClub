import React, { createContext, useContext } from 'react';
import axios from '../../api/axios';

const GetUltimoAccesoContext = createContext();

export const useGetUltimoAcceso = () => useContext(GetUltimoAccesoContext);

export const GetUltimoAccesoProvider = ({ children }) => {
    const getUltimoAcceso = async (clienteId) => {
        try {
            const response = await axios.get(`/Accesos/ultimo-acceso/${clienteId}`);
            if (response.data && !response.data.hasErrors) {
                return response.data.data; // Datos del último acceso
            }
            console.error(response.data.errors);
            return null;
        } catch (error) {
            console.error('Error al obtener el último acceso:', error);
            return null;
        }
    };

    return (
        <GetUltimoAccesoContext.Provider value={{ getUltimoAcceso }}>
            {children}
        </GetUltimoAccesoContext.Provider>
    );
};