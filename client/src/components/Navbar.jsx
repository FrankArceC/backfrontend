import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-zinc-700 my-3 mx-10 flex justify-between py-5 px-10 rounded-lg">
            <Link to="/">
                <h1 className="text-2xl font-bold">Task Manager</h1>
            </Link>
            <ul className="flex gap-x-2">

                {isAuthenticated ? (
                    <>
                        <li>
                            Bienvenido <span className="font-bold text-indigo-200">{user.name}</span>
                        </li>
                        <li>
                            <Link to="/add-task"
                                className="bg-indigo-500 px-4 py-1 rounded-sm"
                            >Agregar Tarea</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login"
                                className="bg-indigo-500 px-4 py-1 rounded-sm"
                            >Login</Link>
                        </li>
                        <li>
                            <Link to="/register"
                                className="bg-indigo-500 px-4 py-1 rounded-sm"
                            >Registrarse</Link>
                        </li>
                    </>)}


            </ul>
        </nav>
    );
}
export default Navbar;