// import mongoose  from "mongoose";
// const taskSchema = new mongoose.Schema({

//     title: {type: String, required: true},
//     description: {type: String, required: true},
//     date: {type: Date, default: Date.now},
//     user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
// }, {timestamps: true}
// )

// export default mongoose.model('Task', taskSchema);
import mongoose from "mongoose"; // Importa Mongoose para definir el esquema y el modelo.

/**
 * @description Define la estructura (Schema) de cómo se guardarán los datos de una tarea en MongoDB.
 * Este esquema incluye una referencia al modelo de Usuario ('User') para establecer la relación.
 */
const taskSchema = new mongoose.Schema({
  // Título de la tarea
  title: {
    type: String,     // Debe ser de tipo String.
    required: true    // Es obligatorio.
  },

  // Descripción detallada de la tarea
  description: {
    type: String,     // Debe ser de tipo String.
    required: true    // Es obligatorio.
  },

  // Fecha de la tarea
  date: {
    type: Date,       // Debe ser de tipo Date.
    default: Date.now // Si no se proporciona una fecha, se establecerá automáticamente a la fecha y hora actual.
  },

  // Referencia al usuario propietario de la tarea (Relación de 1 a N: Un usuario puede tener muchas tareas)
  user: {
    type: mongoose.Schema.Types.ObjectId, // El tipo de dato es un ID de objeto de MongoDB.
    ref: 'User',                          // Especifica que este ID hace referencia al modelo 'User'.
    required: true                        // Es obligatorio que cada tarea esté asociada a un usuario.
  }
}, 
{
  // Opciones del esquema
  timestamps: true // Agrega los campos 'createdAt' y 'updatedAt' automáticamente.
});

// Crea y exporta el modelo de Mongoose, asociándolo con el nombre de la colección 'Task'.
// Mongoose pluralizará 'Task' para crear la colección 'tasks' en MongoDB.
export default mongoose.model('Task', taskSchema);