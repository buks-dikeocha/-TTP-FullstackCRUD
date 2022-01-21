import React, {useState} from 'react'

export default function EditTask({task}) {
    const [updateWith, setUpdateWith] = useState(task.task)

    const updateTask = async (event) => {
        event.preventDefault()

        try {
            const body = { task: updateWith }
            await fetch(`http://localhost:5000/todolist/${task.taskid}`, {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            window.location = "/user"
        } catch (error) {
            console.error(error.message)
        }
    }

    return (        
        <div>
            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target={`#T${task.taskid}`}>
            ✍
            </button>

            <div className="modal fade" id={`T${task.taskid}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" onClick={() => setUpdateWith(task.task)}>
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit this task</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                        setUpdateWith(task.task)
                    }}></button>
                </div>
                <div className="modal-body">
                    <input value={updateWith} onChange={(event) =>
                        setUpdateWith(event.target.value)
                    }></input>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={() => {
                        setUpdateWith(task.task)
                    }}>Close</button>
                    <button type="button" className="btn btn-outline-primary" onClick={(e) => {
                        updateTask(e)
                    }}>Save changes</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}
