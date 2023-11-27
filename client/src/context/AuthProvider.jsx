import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    setAuthData: () => {},
    logout: () => {}, // Nueva función para cerrar sesión
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verificar si hay un token de sesión almacenado o alguna lógica similar
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setIsAuthenticated(true);
        }
    }, []); // Se ejecuta solo una vez al montar el componente

    const setAuthData = (data) => {
        setIsAuthenticated(data.isAuthenticated);

        // Puedes almacenar el token u otros datos de sesión si es necesario
        // Por ejemplo, almacenar el token en el localStorage:
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
    };

    const logout = () => {
        // Limpiar el token del localStorage al cerrar sesión
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthData, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
