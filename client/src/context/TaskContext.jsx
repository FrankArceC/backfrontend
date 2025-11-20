import {createContext, useContext, useState} from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from "../api/tasks.js";


const TaskContext = createContext();

export const useTasks=() =>{
    const context = useContext(TaskContext);
    if(!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;

}
export function TaskProvider({ children }){

    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
       try {        
            const res = await getTasksRequest();
            setTasks(res.data);
       } catch (error) {
            console.error(error);
       }
    }

    const createTask = async (task) =>{
        const res = await createTaskRequest(task);
        console.log(res);
    }
    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);            
            if (res.status === 204) {//este 204 viene del deletetask del back
                setTasks(tasks.filter(task => task._id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    }
    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            console.log(res.data);
            //return res.data;
        } catch (error) {
            console.error(error);
        }
    }
    const updateTask = async (id, newTask) => {
        try {
            const res = await updateTaskRequest({ id, ...newTask });
            console.log(res.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <TaskContext.Provider value ={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    )
}