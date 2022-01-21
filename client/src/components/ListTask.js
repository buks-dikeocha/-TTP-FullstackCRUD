import React, { useState, useEffect } from 'react'
import EditTask from "./EditTask"
import DeleteTask from "./DeleteTask"

export default function ListTask() {
    const [taskList, setTaskList] = useState([])

    const getTasks = async () => {
        try {
            await fetch("http://localhost:5000/todolist/")
                .then(response => response.json())
                .then(data => setTaskList(data))
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div className="d-flex justify-content-center m-5">
            <table className="table table-hover w-75">
                <thead>
                    <tr>
                        <td><h5>Task</h5></td>
                        <td><h5>Edit</h5></td>
                        <td><h5>Delete</h5></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        taskList.map((task) => {
                            return (
                                <tr key={task.taskid}>
                                    <td>{task.task}</td>
                                    <td><EditTask task={task} /></td>
                                    <td><DeleteTask id={task.taskid} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}
