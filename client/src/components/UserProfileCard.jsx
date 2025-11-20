import React from "react"; // Importa React, aunque solo se usa para el JSX.

/**
 * @description Función utilitaria que recibe una fecha (string o Date) y la formatea
 * en un formato legible en español (es-ES).
 * @param {string | Date} value - La fecha a formatear (ej. user.createdAt).
 * @returns {string} Fecha formateada o "N/D" si es inválida/nula.
 */
function formatDate(value) {
    // Si el valor es nulo o indefinido, devuelve "N/D" (No Disponible).
    if (!value) return "N/D";

    try {
        // Convierte el valor a un objeto Date, manejando strings y objetos Date existentes.
        const date = typeof value === "string" ? new Date(value) : value;

        // Utiliza Intl.DateTimeFormat para formatear la fecha y hora.
        return new Intl.DateTimeFormat("es-ES", {
            year: "numeric",   // Muestra el año completo (ej. 2025).
            month: "long",     // Muestra el mes con el nombre completo (ej. noviembre).
            day: "2-digit",    // Muestra el día con dos dígitos (ej. 01).
            hour: "2-digit",   // Muestra la hora con dos dígitos.
            minute: "2-digit", // Muestra los minutos con dos dígitos.
        }).format(date);
    } catch {
        // En caso de que el valor sea una fecha inválida, devuelve "N/D".
        return "N/D";
    }
}

/**
 * @description Componente principal que renderiza una tarjeta de perfil de usuario.
 * Muestra el nombre, email, iniciales, y las fechas de creación y actualización.
 * @param {{ user: Object }} props - El objeto de usuario a mostrar.
 */
export default function UserProfileCard({ user }) {
    // Renderizado Condicional: Si 'user' es nulo (ej. mientras se está cargando),
    // muestra un esqueleto de carga (placeholder animado con clases Tailwind).
    if (!user) {
        return (
            <div className="mx-auto mt-10 w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow">
                <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
                <div className="mt-4 h-4 w-48 animate-pulse rounded bg-gray-200" />
                <div className="mt-6 h-20 w-full animate-pulse rounded bg-gray-100" />
            </div>
        );
    }

    // Lógica para obtener las iniciales del nombre del usuario.
    const initials = (user.name || "?")
        .split(" ")         // Divide el nombre en palabras.
        .filter(Boolean)    // Elimina cualquier cadena vacía resultante.
        .slice(0, 2)        // Toma un máximo de las dos primeras palabras.
        .map((p) => p[0].toUpperCase()) // Obtiene la primera letra y la convierte a mayúscula.
        .join("");          // Une las iniciales para formar una cadena (ej. "JD").

    // Renderizado del perfil completo
    return (
        <section className="mx-auto mt-10 w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow">

            {/* Cabecera de la tarjeta: Muestra iniciales, nombre y correo */}
            <div className="flex items-center gap-4 border-b border-gray-100 p-6">
                {/* Avatar con Iniciales */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-lg font-semibold text-white">
                    {initials}
                </div>
                {/* Detalles del Usuario */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                    <p className="text-sm text-gray-600">{user.email}</p>
                </div>
            </div>

            {/* Cuerpo de la tarjeta: Información de Fechas */}
            <div className="grid grid-cols-1 gap-0 divide-y divide-gray-100">
                {/* Fecha de Creación (Miembro desde) */}
                <div className="p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Miembro desde</p>
                    {/* Usa la función formatDate para mostrar la fecha de creación */}
                    <p className="mt-1 text-sm text-gray-800">{formatDate(user.createdAt)}</p>
                </div>
                {/* Fecha de Última Actualización */}
                <div className="p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Última actualización</p>
                    {/* Usa la función formatDate para mostrar la fecha de actualización */}
                    <p className="mt-1 text-sm text-gray-800">{formatDate(user.updatedAt)}</p>
                </div>
            </div>
        </section>
    );
}