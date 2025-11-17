import {useForm} from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';



function RegisterPage(){
    const {register, handleSubmit, formState : {errors}}= useForm();
    const {signup, isAuthenticated, errors:registerErrors} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated) navigate("/tasks");
    },[isAuthenticated]
    )


    const onSubmit = handleSubmit(async (values)=>{
        signup(values);
    });

    return(
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
             <div className="bg-zinc-800 text-white px-4 py-2 rounded-md">
            {   
                registerErrors.map((error, index) => (
                    <div key={index} className="bg-red-500 p-2 text-white text-center mb-2">
                        {error}
                    </div>
                ))
            
            }
            <form 
                onSubmit={onSubmit}
            
                >
                <input type="text"
                    {...register('name', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Nombre"
                />
                {errors.name && <p className="text-red-500">El nombre del usuario es requerido.</p>}

                <input type="text"
                    {...register('email', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Email"
                />
                {errors.email && <p className="text-red-500">El email es requerido.</p>}
                <input type="text"
                    {...register('password', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Contraseña"
                />
                {errors.password && <p className="text-red-500">El password es requerido.</p>}
                <button type="submit">Registrar</button>
            </form>
             <p className="flex gap-x-2 justify-between">Ya tienes cuenta? <Link to="/login" className ="text-sky-500">Login</Link></p>
        </div>
        </div>
    )
}
export default RegisterPage