// import mongoose from "mongoose";
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   email: { type: String, required: true, unique: true, trim : true },
//   password: { type: String, required: true, trim: true },
//    },
// {timestamps: true })
// export default mongoose.model('User', userSchema);

import mongoose from "mongoose"; // Importa la librería Mongoose, necesaria para definir esquemas y modelos.

/**
 * @description Define la estructura (Schema) de cómo se guardarán los datos de un usuario en MongoDB.
 */
const userSchema = new mongoose.Schema({
  // Campo para el nombre del usuario
  name: { 
    type: String,     // Debe ser de tipo String.
    required: true,   // Es obligatorio (el usuario debe proporcionarlo).
    trim: true        // Elimina los espacios en blanco al inicio y al final.
  },

  // Campo para el correo electrónico del usuario
  email: { 
    type: String,     // Debe ser de tipo String.
    required: true,   // Es obligatorio.
    unique: true,     // Asegura que no haya dos usuarios con el mismo correo electrónico en la base de datos.
    trim: true        // Elimina los espacios en blanco.
  },

  // Campo para la contraseña del usuario (se recomienda almacenar un hash, no la contraseña en texto plano)
  password: { 
    type: String,     // Debe ser de tipo String.
    required: true,   // Es obligatorio.
    trim: true        // Elimina los espacios en blanco.
  },
}, 
{
  // Opciones del esquema
  timestamps: true // Agrega automáticamente dos campos: 
                   // 1. 'createdAt' (fecha de creación) 
                   // 2. 'updatedAt' (fecha de la última actualización).
});

// Crea y exporta el modelo de Mongoose, asociándolo con el nombre de la colección 'User'.
// Mongoose pluralizará 'User' para crear la colección 'users' en MongoDB.
export default mongoose.model('User', userSchema);