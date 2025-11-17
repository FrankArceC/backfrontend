import {useAuth} from "../context/AuthContext.jsx";


function TaskPage() {   
    const {user} = useAuth();
    console.log(user);
    return (    
        <div>Task Page</div>
    )
}
export default TaskPage;