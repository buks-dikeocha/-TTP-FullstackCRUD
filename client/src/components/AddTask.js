import React, {useState} from 'react'

export default function AddTask() {
    const [newTask, setNewTask] = useState("")

    const addTask = async (event) => {
        event.preventDefault()

        try {
            const body = {task: newTask}
            await fetch("http://localhost:5000/todolist/", {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            
            window.location = "/user" // show changes
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <form className="d-flex justify-content-center" onSubmit={(e) => addTask(e)}>
                <input id="task-input" className="form-control m-2" type="text" value={newTask} placeholder="What do you need to do?"
                    onChange={ event =>
                        setNewTask(event.target.value)
                    }></input>
                <button className="btn btn-outline-success m-2">Add Task</button>
            </form>
        </div>
    )
}
