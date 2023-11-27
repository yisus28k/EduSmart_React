import React from 'react';
import { useAuth } from '../context/AuthProvider';
import Axios from 'axios';

export const HomePage = () => {
    const { isAuthenticated, setAuthData } = useAuth();

    const handleLogout = async () => {
        try {
            // Hacer una solicitud al servidor para cerrar sesión
            await Axios.post("http://localhost:3000/logout");

            // Limpiar la información de autenticación y redirigir al inicio
            setAuthData({
                isAuthenticated: false,
                token: null,
            });

            // Limpiar también el almacenamiento local
            localStorage.removeItem('token');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <p>Bienvenido a la página de inicio. Sesión iniciada.</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            ) : (
                <p>Debes iniciar sesión para acceder a esta página.</p>
            )}
        </div>
    );
};
