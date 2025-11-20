import { createContext, useContext, useState, useCallback } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from "../api/tasks.js";


const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;

}
export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([]);

    const getTasks = useCallback(async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const createTask = async (task) => {
        const res = await createTaskRequest(task);
        console.log(res);
    }
    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            if (res.status === 204 || res.status === 200) {//este 204 viene del deletetask del back
                setTasks(tasks.filter(task => task._id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    }
    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id); // Asume que getTaskRequest llama a axios.get

            // ¡DEBES DEVOLVER explícitamente los datos de la tarea!
            return res.data;

        } catch (error) {
            // Manejar el error (por ejemplo, tarea no encontrada 404).
            console.error("Error al obtener la tarea:", error);

            // Si hay un error, puedes devolver null o un objeto de error para manejarlo en el frontend.
            return null;
        }
    };
    const updateTask = useCallback(async (id, newTask) => {
        try {
            const res = await updateTaskRequest({ id, ...newTask });
            console.log(res.data);
        }
        catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    )
}