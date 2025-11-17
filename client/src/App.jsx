 import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import {AuthProvider} from "./context/AuthContext.jsx"
import HomePage from "./pages/HomePage.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import TaskFormPage from "./pages/TaskFormPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

function App() {
     "use no memo";
   return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route> 

          <Route element={<ProtectedRoute />}>
            <Route path='/tasks' element={<TaskPage />}></Route> 
            <Route path='/add-task' element={<TaskFormPage />}></Route>
            <Route path='/tasks/:id' element={<TaskFormPage />}></Route>
            <Route path='/profile' element={<ProfilePage />}></Route> 
        </Route>
        </Routes>
       </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}
export default App;
