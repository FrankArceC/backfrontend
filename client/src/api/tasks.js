import axios from './axios'

export const getTasksRequest = () => axios.get('/tasks') 
export const getTaskRequest = () => axios.get(`/tasks/${id}`) 
export const createTaskRequest = (task) => axios.post('/tasks', task) 
export const updateTaskRequest = (task) => 
    axios.put(`/tasks/${task.id}`,task) 
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`) 
