import Task from "../models/task.model.js";

export const getTasks = async (req, res) =>{ 
    const tasks = await Task.find(
        { user: req.user.id }
    ).populate('user','name email');
    res.json(tasks);
}



export const createTask = async (req, res) => {
    try {
    const { title, description, date } = req.body;
    const newTask = new Task({ title, description, date, user: req.user.id });
    const savedTask =  await newTask.save();
    res.json(savedTask);
} catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
}
}

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user','name email');
   if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
   res.json(task);

  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body,{ new: true});
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea actualizada correctamente' });
}   catch (error) {             
    res.status(500).json({ message: 'Error del servidor' });    
}
}


export const deleteTask = async (req, res) => {
   try {
       const task = await Task.findByIdAndDelete(req.params.id);
       if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
       res.status(204).json({ message: 'Tarea eliminada correctamente' });
   } catch (error) {
       res.status(500).json({ message: 'Error del servidor' });
   }
}

