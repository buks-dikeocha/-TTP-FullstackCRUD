import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp(props) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const redirect = useNavigate()

    const userSignUp = async (e) => {
        e.preventDefault()
        try {
            const body = {
                username: username,
                email: email,
                password: password
            }

            let itt = await fetch("http://localhost:5000/signup", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            if (itt.status === 200) {
                redirect("/user")
            }
        }
        catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="border rounded m-5">
            <form className="px-4 py-3 d-flex flex-column justify-content-around"
                 onSubmit={(e) => userSignUp(e)}>
                <h1>Start creating todo lists now!</h1>
                <div className="form-group m-2">
                    <input className="form-control" type="text" value={username} placeholder="username" onChange={(e) => {
                        setUsername(e.target.value)
                    }}></input>
                </div>

                <div className="form-group m-2">
                    <input className="form-control" type="email" value={email} placeholder="email" onChange={(e) => {
                        setEmail(e.target.value)
                    }}></input>
                </div>

                <div className="form-group m-2">
                    <input className="form-control" type="password" value={password} placeholder="password" onChange={(e) => {
                        setPassword(e.target.value)
                    }}></input>
                </div>                

                <button className="btn btn-primary w-50 align-self-center">Sign up</button>
            </form>

            <div className="dropdown-divider"></div>

            <div className="m-3">
                <p>Already with us? <Link to="/login">Login here!</Link> </p>
            </div>

            <p className="m-3">Password must include:</p>
            <div className="m-3 px-4">
                <p>At least eight characters</p>
                <p>At least one lowercase letter</p>
                <p>At least one uppercase letter</p>
                <p>At least one number</p>
                <p>At least one special character</p>
            </div>
        </div>
    )
}