import { useTasks } from "../context/TaskContext.jsx";
import { Link } from "react-router-dom";
function TaskCard({ task }) {
    const { deleteTask } = useTasks();
    return (
        <div className="bg-zinc-800 mx-10 max-w-md w-full p-10 rounded-md text-white my-2">

            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button className="bg-indigo-500 px-4 py-1 rounded-sm " onClick={() => {
                        deleteTask(task._id);

                    }}> Borrar </button>
                    <Link to={`/tasks/${task._id}`} className="bg-indigo-500 px-4 py-1 rounded-sm"> Editar </Link>
                </div>
            </header>
            <p className="text-slate-300">{task.description}</p>
            <p>{new Date(task.date).toLocaleString()}</p>
        </div>
    )
}
export default TaskCard;
