import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.sign.js';
import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    //User.create({ name, email, password });
    try {
        const userFound = await User.findOne({email})
        if (userFound)
            return res.status(400).json(["El correo ya esta en uso."])
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password : passwordHash });
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token);
       
        res.json({
            id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
    }
    //res.cookie('token', token);
    //res.json({ message: 'Usuario registrado correctamente' });
};










export const login = async (req, res) => {
    
    const{ email, password } = req.body;
    try {
        const userFound = await User.findOne({ email});
        if (!userFound) return res.status(400).json({ message : 'Usuario no encontrado'});
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message : 'Contraseña incorrecta'});

        //const passwordHash = await bcrypt.hash(password, 10);
        //const newUser = new User({ name, email, password : passwordHash });
        //const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token);
       
        res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    //res.cookie('token', token);
    //res.json({ message: 'Usuario registrado correctamente' });
};


export const logout = (req,res) => {
    res.cookie('token', "",{expires: new Date(0)})
    return res.sendStatus(200)}



export const profile = async (req,res)=>{
    console.log("Contenido de req.user:", req.user.id);
    const userFound = await User.findById(req.user.id);
    console.log(userFound,"no estoy sacando nada");
    if (!userFound) return res.status(400).json({message : 'Usuario no encontrado'});
    return res.json({
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
    
 }

 export const verifyToken = async (req, res) => {

//Esos headers se agregan con un solo propósito: evitar que el navegador (o cualquier intermediario) 
// guarde en caché esa respuesta.

//Esto es crítico para rutas que manejan datos que deben estar siempre actualizados, como la 
// verificación de un token de autenticación (/api/verify).
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');


    const { token } = req.cookies;
    

        if (!token) return res.status(401).json({ message: 'No autorizado' });
    
        jwt.verify(token, TOKEN_SECRET, async (err, user) =>{
            
            if (err) return res.status(401).json({ message: 'No autorizado' });
            
            const userFound = await User.findById(user.id);
            if (!userFound) return res.status(401).json({ message : 'Usuario no encontrado'});
            return res.json({
                id: userFound._id,
                name: userFound.name,
                email: userFound.email,
        });
       
 }
);};