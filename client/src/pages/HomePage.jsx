import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import { Link } from 'react-router-dom';

function HomePage() {
    const { isAuthenticated, user } = useAuth();
    const { tasks, getTasks } = useTasks();

    useEffect(() => {
        if (isAuthenticated && tasks.length === 0) {
            getTasks();
        }
    }, [isAuthenticated, tasks.length, getTasks]);

    const formatDate = (d) => {
        if (!d) return 'Sin fecha';
        const date = new Date(d);
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric', month: 'short', day: '2-digit'
        }).format(date);
    };

    const previewTasks = tasks.slice(0, 3);

    return (
        <div className="py-10">
            {/* Hero */}
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {isAuthenticated ? `Hola ${user?.name}, organiza tus tareas` : 'Gestor de Tareas MERN'}
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                    {isAuthenticated
                        ? 'Accede rápidamente a tus tareas y mantén tu flujo organizado.'
                        : 'Aplicación MERN con autenticación JWT, validación y una UI moderna con Tailwind.'}
                </p>
                {!isAuthenticated && (
                    <div className="mt-6 flex justify-center gap-4">
                        <Link to="/register" className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500">
                            Crear Cuenta
                        </Link>
                        <Link to="/login" className="rounded-lg border border-indigo-600 px-5 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
                            Iniciar Sesión
                        </Link>
                    </div>
                )}
            </section>

            {/* Stats / Resumen */}
            {isAuthenticated && (
                <section className="mt-10 grid gap-6 md:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Total Tareas</p>
                        <p className="mt-2 text-3xl font-bold text-indigo-600">{tasks.length}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Última actualización</p>
                        <p className="mt-2 text-lg font-medium text-gray-800">{tasks[0] ? formatDate(tasks[0].updatedAt || tasks[0].createdAt) : '—'}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Acciones Rápidas</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <Link to="/add-task" className="rounded bg-indigo-600 px-3 py-1 text-xs font-medium text-white hover:bg-indigo-500">Nueva Tarea</Link>
                            <Link to="/tasks" className="rounded bg-gray-800 px-3 py-1 text-xs font-medium text-white hover:bg-gray-700">Ver Tareas</Link>
                            <Link to="/profile" className="rounded bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200">Perfil</Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Preview de Tareas */}
            {isAuthenticated && previewTasks.length > 0 && (
                <section className="mt-10">
                    <h2 className="text-lg font-semibold text-gray-900">Tus últimas tareas</h2>
                    <ul className="mt-4 space-y-3">
                        {previewTasks.map(t => (
                            <li key={t._id} className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                                <div className="flex items-start justify-between">
                                    <h3 className="font-medium text-gray-900 group-hover:text-indigo-600">{t.title}</h3>
                                    <span className="text-xs text-gray-500">{formatDate(t.date)}</span>
                                </div>
                                <p className="mt-1 line-clamp-2 text-sm text-gray-600">{t.description}</p>
                                <Link to={`/tasks`} className="mt-2 inline-block text-xs font-medium text-indigo-600 hover:text-indigo-500">Ver todas →</Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Features para visitantes */}
            {!isAuthenticated && (
                <section className="mt-12">
                    <h2 className="text-lg font-semibold text-gray-900 text-center">¿Qué ofrece esta app?</h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: 'Stack MERN', desc: 'MongoDB, Express, React y Node para velocidad.' },
                            { title: 'Auth JWT', desc: 'Sesiones seguras con tokens y cookies.' },
                            { title: 'Validación', desc: 'Schemas estrictos para entradas confiables.' },
                            { title: 'UI Responsive', desc: 'Diseño moderno con Tailwind CSS.' }
                        ].map(f => (
                            <div key={f.title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                                <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default HomePage;