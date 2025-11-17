import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import { Link } from 'react-router-dom';
function LoginPage(){
    const {register, handleSubmit, formState:{errors}}= useForm();
    const {signin, errors: signinErrors} = useAuth();

    const onSubmit = handleSubmit((data) =>{
        signin(data);
        //console.log(data)
    })

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
             <div className="bg-zinc-800 text-white px-4 py-2 rounded-md">
                      {   
                signinErrors.map((error, i) => (
                    <div key={i} className="bg-red-500 p-2 text-white text-center mb-2 py-2">
                        {error}
                    </div>
                ))
            
            }
                <h1 className='text-2xl font-bold'>Login</h1>
                <form 
                onSubmit={onSubmit}>
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
                <button type="submit">Login</button>
            </form>
            <p className="flex gap-x-2 justify-between">No tienes cuenta aun? <Link to="/register" className ="text-sky-500">Registrar</Link></p>
             </div>
        </div>
    )
}
export default LoginPage