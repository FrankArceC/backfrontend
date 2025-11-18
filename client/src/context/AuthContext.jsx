import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js"

import Cookies from 'js-cookie'
import { set } from "mongoose";
//import { is } from "zod/locales";
export const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("use Auth debe de usarse con AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    "use no memo";
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [errors]);

    //AuthContext.jsx
    // Define un 'efecto' de React que se ejecutará solo una vez cuando el componente
    // se monte por primera vez, gracias al array de dependencias vacío `[]` al final.
    // Su propósito es verificar si el usuario ya tiene una sesión activa (un token).
    useEffect(() => {

        // Define una función asíncrona interna llamada `checkLogin`.
        // Se hace 'async' porque necesitará esperar (await) la respuesta de la API.
        async function checkLogin() {

            // Obtiene todas las cookies almacenadas en el navegador
            // usando la librería `js-cookie`.
            const cookies = Cookies.get();

            // Comprueba si la cookie específica llamada 'token' NO existe.
            if (!cookies.token) {

                // Si no hay token, significa que el usuario no está autenticado.
                // Actualiza el estado global para reflejar esto:
                setIsAuthenticated(false); // Fija isAuthenticated a falso.
                setUser(null); // Borra cualquier dato de usuario.
                setLoading(false); // Deja de mostrar el estado de "Cargando...".

                // Termina la ejecución de la función aquí. No hay nada más que verificar.
                return;
            }

            // Si el código llega aquí, significa que SÍ hay un token.
            // Ahora, debemos verificar si ese token es válido (no ha expirado o sido falsificado).
            try {
                // Inicia un bloque 'try' para manejar posibles errores de red o de autenticación.

                // Llama a la función `verifyTokenRequest` (que es una llamada a tu API/backend)
                // y espera (await) a que el servidor responda.
                const res = await verifyTokenRequest();

                // Si la línea anterior NO dio error (el servidor respondió 200 OK),
                // significa que el token es válido.
                // Actualiza el estado global para reflejar que el usuario SÍ está autenticado:
                setIsAuthenticated(true); // Fija isAuthenticated a verdadero.
                setUser(res.data); // Guarda los datos del usuario (que vinieron en la respuesta).
                setLoading(false); // Deja de mostrar el estado de "Cargando...".

            } catch (error) {
                // Si `verifyTokenRequest` falla (ej. el token expiró y la API devolvió un error 401),
                // el código saltará directamente a este bloque 'catch'.

                // El token no era válido. Actualiza el estado global
                // para reflejar que el usuario NO está autenticado:
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }

        // Llama a la función que acabamos de definir para que se ejecute.
        checkLogin();

    }, []); // El `[]` asegura que este useEffect se ejecute solo una vez.

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
            setErrors(error.response.data);
        }
    };
    const logout = async () => {
        Cookies.remove('token');
        setUser(null);
        setIsAuthenticated(false);
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])

        }
    };


    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                loading,
                logout,
                user,
                isAuthenticated,
                errors
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
