import { useEffect } from "react";
import {useTasks} from "../context/TaskContext.jsx";
import TaskCard from "../components/TaskCard.jsx";  


function TaskPage() {   
    const {getTasks, tasks} = useTasks();

    useEffect(() => {
        getTasks();
    }, []);
    if (tasks.length === 0) return <h1>No hay tareas aun</h1>

    return (    
        <div className="grid grid-cols-3 gap-1">
        {tasks.map(task => (
                <TaskCard key={task._id} task={task} />
            ))
        }
        </div>
    )
}
export default TaskPage;