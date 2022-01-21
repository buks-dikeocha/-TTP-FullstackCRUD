import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const redirect = useNavigate()

    const userLogin = async (e) => {
        e.preventDefault()
        try {
            const body = {
                email: email,
                password: password
            }

            let itt = await fetch("http://localhost:5000/login", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            if (itt.status === 200) {
                redirect("/user")
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="border rounded m-5">
            <form className=" px-4 py-3 d-flex flex-column" onSubmit={(e) => userLogin(e)}>
                <h1>Get back to what matters!</h1>
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

                <button className="btn btn-primary w-50 align-self-center">Log in</button>
            </form>

            <div className="dropdown-divider"></div>


            <div className="m-4">
                <p>Don't have an account? <Link to="/signup">Make on here!</Link> </p>
            </div>
        </div>
    )
}
//