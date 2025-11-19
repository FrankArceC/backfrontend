// import mongoose from "mongoose";
// export const connectDB = async () =>{
// try {
//   await mongoose.connect("mongodb://localhost:27017/mydatabase");
//   console.log("Base de datos enchufada");
// } catch (error) {
//   console.log(error);
// }
// }

import mongoose from "mongoose"; // Importa la librería Mongoose para interactuar con MongoDB.

/**
 * @description Función asíncrona para establecer la conexión a la base de datos MongoDB.
 */
export const connectDB = async () => {
  try {
    // Intenta conectar a la base de datos usando la URL de conexión.
    // "mongodb://localhost:27017/" es la dirección estándar del servidor local de MongoDB.
    // "mydatabase" es el nombre de la base de datos a la que se conectará (la creará si no existe).
    await mongoose.connect("mongodb://localhost:27017/mydatabase");
    
    console.log("Base de datos enchufada"); // Mensaje de éxito si la conexión es correcta.

  } catch (error) {
    // Captura cualquier error que ocurra durante el intento de conexión (ej. el servidor MongoDB no está activo).
    console.log(error);
  }
}