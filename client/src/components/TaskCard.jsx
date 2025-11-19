function TaskCard({ task }) {
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-white my-2">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <div className="h-1 bg-zinc-600 my-2">
                <button> Borrar </button>
                <button> Editar </button>
            </div>
            <p className="text-slate-300">{task.description}</p>
            {/* <p>{task.date.toLocaleString()}</p> */}
        </div>
    )
}
export default TaskCard;
