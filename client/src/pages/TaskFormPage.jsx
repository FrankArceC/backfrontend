import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TaskContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
dayjs.extend(utc);

function TaskFormPage() {
    // 1. Desestructura SÓLO las funciones de formulario de useForm()
    const { register, handleSubmit, setValue } = useForm();

    // 2. Desestructura las funciones de gestión de tareas (API) de useTasks()
    const { createTask, getTask, updateTask } = useTasks();

    const navigate = useNavigate();
    const params = useParams();

    // Función de efecto para cargar la tarea si existe un ID en la URL
    useEffect(() => {
        const loadTask = async () => {
            // ... (tu lógica de carga)
            if (params.id) {
                const task = await getTask(params.id);
                console.log("Datos recibidos de la API:", task); // 👈 ¡CLAVE DE DEPURACIÓN!

                if (task && task.title) { // Verifica que exista la tarea y la propiedad
                    setValue('title', task.title);
                    // ...
                }


                if (task) {
                    setValue('title', task.title);
                    setValue('description', task.description);
                    // ...
                }
            }
        }
        loadTask();
    }, [params.id, getTask]); // 3. Añadir dependencias necesarias

    // Maneja el envío del formulario: crear o actualizar
    const onSubmit = handleSubmit((data) => {

        if (params.id) {
            // Llama a la función de actualización del contexto
            updateTask(params.id, { ...data, date: dayjs(data.date).utc().format() });
        } else {
            // Llama a la función de creación del contexto
            createTask({ ...data, date: dayjs(data.date).utc().format() });
        }
        navigate('/tasks');
    })

    // ... (El resto del componente)
    return (
        // Contenedor que centra la tarjeta
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>

            {/* La tarjeta con el fondo oscuro */}
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-white">

                <h1 className='text-3xl font-bold mb-4'>
                    {params.id ? 'Editar Tarea' : 'Nueva Tarea'}
                </h1>

                {/* Aquí va tu formulario... */}
                <form onSubmit={onSubmit}>
                    <label htmlFor="title">title</label>
                    <input
                        type="text"
                        placeholder="Escribe el nombre de la tarea"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        {...register("title")}
                        autoFocus
                    />
                    <label htmlFor="description">description</label>
                    <textarea
                        rows="3"
                        placeholder="Escribe la descripción de la tarea"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        {...register("description")}
                    ></textarea>
                    <label htmlFor="date">Fecha</label>
                    <input type="date" {...register("date")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />
                    <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md'>
                        Guardar
                    </button>
                </form>

            </div>
        </div>
    );
}

export default TaskFormPage;