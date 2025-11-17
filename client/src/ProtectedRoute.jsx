import { Navigate , Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
function ProtectedRoute() {  
    
    const { loading, isAuthenticated } = useAuth(); 
    //console.log(loading, isAuthenticated);

   // if(loading)return <div>Loading...</div>;
    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />
}
export default ProtectedRoute;
// import { Navigate , Outlet } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";

// function ProtectedRoute() { 
//   const { loading, isAuthenticated } = useAuth(); 

  
//   if (!loading && !isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
//   return <Outlet />;
// }
// export default ProtectedRoute;