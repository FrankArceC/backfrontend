import {useForm} from 'react-hook-form';
import { useTasks } from '../context/TaskContext.jsx';
import { useNavigate } from 'react-router-dom';

function TaskFormPage() {
    const {register, handleSubmit}= useForm();
    const { createTask } = useTasks();
    const navigate = useNavigate();
    //console.log(createTask);

    const onSubmit = handleSubmit((data) => {
        createTask(data);
        navigate('/tasks');
    })

  return (
    // Contenedor que centra la tarjeta
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      
      {/* La tarjeta con el fondo oscuro */}
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-white">
        
        <h1 className='text-3xl font-bold mb-4'>Nueva Tarea</h1>

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