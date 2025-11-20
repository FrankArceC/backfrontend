import {useForm} from 'react-hook-form';
import { useTasks } from '../context/TaskContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function TaskFormPage() {
    // 1. Desestructura SÓLO las funciones de formulario de useForm()
    const {register, handleSubmit, setValue}= useForm();
    
    // 2. Desestructura las funciones de gestión de tareas (API) de useTasks()
    const { createTask, getTask, updateTask } = useTasks(); 
    
    const navigate = useNavigate();
    const params = useParams();
    
    // Función de efecto para cargar la tarea si existe un ID en la URL
    useEffect(() => {
        const loadTask = async () => { // Se debe usar una función asíncrona dentro de useEffect
            console.log(params.id);
            if (params.id) {
                const task = await getTask(params.id); // ⭐️ Ahora getTask es una función válida del contexto
                
                // Asegúrate de usar await y verificar si 'task' es un objeto
                if (task) {
                    setValue('title', task.title);
                    setValue('description', task.description);
                    // Opcional: Para la fecha
                    // setValue('date', task.date ? new Date(task.date).toISOString().split('T')[0] : '');
                }
            }
        }
        loadTask(); // Llama a la función asíncrona
    }, [params.id, getTask, setValue]); // 3. Añadir dependencias necesarias
    
    // Maneja el envío del formulario: crear o actualizar
    const onSubmit = handleSubmit((data) => {
      
        if (params.id) {
            // Llama a la función de actualización del contexto
            updateTask(params.id, data); 
        } else {
            // Llama a la función de creación del contexto
            createTask(data);
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
                    
                    <input 
                        type="text" 
                        placeholder="Escribe el nombre de la tarea"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        {...register("title")}
                        autoFocus
                    />
                    <textarea
                        rows="3"
                        placeholder="Escribe la descripción de la tarea"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        {...register("description")}
                    ></textarea>
                    <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>
                        Guardar
                    </button>
                </form>

            </div>
        </div>
    );
}

export default TaskFormPage;