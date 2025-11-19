import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to="/">
                <h1 className="text-2xl font-bold">Task Manager</h1>
            </Link>
            <ul className="flex gap-x-2">

                {isAuthenticated ? (
                    <>
                        <li>
                            Bienvenido
                        </li>
                        <li>
                            <Link to="/add-task">Agregar Tarea</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>)}


            </ul>
        </nav>
    );
}
export default Navbar;