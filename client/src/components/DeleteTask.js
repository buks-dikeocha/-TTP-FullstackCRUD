import React from 'react'

export default function DeleteTask(props) {
    const deleteTask = async () => {
        try {
            await fetch(`http://localhost:5000/todolist/${props.id}`, {
                method: "delete"
            })
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <form onSubmit={deleteTask}>
                <button className="btn btn-outline-danger">❌</button>
            </form>
        </div>
    )
}
