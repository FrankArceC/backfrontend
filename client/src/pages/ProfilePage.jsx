import { useAuth } from '../context/AuthContext.jsx'; // Importa el hook de contexto de autenticación para acceder al estado de usuario y la sesión.
import { useEffect, useState } from 'react';         // Importa hooks de React para manejar efectos secundarios y estado local.
import UserProfileCard from '../components/UserProfileCard.jsx'; // Importa el componente que se encarga de renderizar la tarjeta de perfil.
import { profileRequest } from '../api/auth.js';     // Importa la función de solicitud a la API para obtener los datos completos del perfil.

function ProfilePage() {
  // Desestructura variables clave del contexto de autenticación.
  const { user, isAuthenticated, loading } = useAuth();

  // Estado local para almacenar la información completa del usuario que se mostrará. Inicialmente, usa los datos del contexto.
  const [fullUser, setFullUser] = useState(user);

  // Estado local para indicar si se está realizando una solicitud de red para obtener datos.
  const [fetching, setFetching] = useState(false);

  // Primer useEffect: Sincroniza el estado local 'fullUser' con el 'user' del contexto
  // Esto asegura que si el contexto cambia (ej. después de un login/logout), los datos se reflejen.
  useEffect(() => {
    setFullUser(user);
  }, [user]);

  // Segundo useEffect: Lógica para cargar datos completos del perfil si es necesario (ej. si faltan timestamps)
  useEffect(() => {
    // 1. Si el usuario no está autenticado, detiene la ejecución del efecto.
    if (!isAuthenticated) return;

    // 2. Verifica si faltan datos esenciales (como los timestamps createdAt/updatedAt) en el objeto 'user' del contexto.
    const needsTimestamps = !user?.createdAt || !user?.updatedAt;

    // 3. Si la información ya está completa, detiene la ejecución.
    if (!needsTimestamps) return;

    // Bandera para evitar que el estado se actualice después de que el componente se desmonte (cleanup).
    let active = true;

    setFetching(true); // Establece el estado de carga (fetching) a true.

    // Llama a la API para obtener el perfil completo.
    profileRequest()
      .then((res) => {
        // Solo actualiza el estado si el componente sigue montado (active es true).
        if (!active) return;
        setFullUser(res.data); // Actualiza el estado local con los datos completos recibidos de la API.
      })
      .finally(() => active && setFetching(false)); // Siempre establece fetching a false al finalizar la promesa.

    // Función de limpieza: Se ejecuta cuando el componente se desmonta.
    // Esto previene errores de "Memory Leak" (intentar actualizar un estado de un componente desmontado).
    return () => {
      active = false;
    };
  }, [isAuthenticated, user]); // Se ejecuta cuando cambia el estado de autenticación o el objeto 'user'.

  // Lógica de Renderizado Condicional:

  // Muestra un mensaje si no está autenticado y la carga (loading) ha terminado.
  if (!isAuthenticated && !loading) {
    return (
      <div className="mx-auto mt-10 w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Debes iniciar sesión para ver tu perfil.
      </div>
    );
  }

  // Renderiza la tarjeta de perfil y el indicador de carga (si está activo).
  return (
    <div className="px-4">
      <UserProfileCard user={fullUser} /> {/* Pasa el estado local (completo) al componente visual. */}
      {fetching && (
        <p className="mt-4 text-center text-sm text-gray-500">Actualizando información…</p>
      )}
    </div>
  );
}

export default ProfilePage;