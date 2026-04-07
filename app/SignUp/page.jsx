"use client"

import { useState } from 'react';

export default function SignUp () {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit (e) {
        e.preventDefault();
        const res = await fetch(`http://localhost:4000/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                last_name: lastName,
                email: email,
                password: password
            })
        })

        if (!res.ok){
            console.log("Error")
        }
    }

    return (
        <>
            <div>
                <div>
                    <div>
                        <div>
                            <h2>Log in</h2>
                        </div>
                        <div>
                            <h2>Sign up</h2>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={(e) => submit(e)}>
                            <div>
                                <h1>Join the productivity revolution</h1>
                                <p>Create your account and start organized today.</p>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name"/>

                                    <label htmlFor="last_name">Last name</label>
                                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} name="last_name" id="last_name"/>
                                </div>
                                <label htmlFor="email">Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" type="email"/>

                                <label htmlFor="password">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" type="password"/>
                            </div>
                            <div>
                                <button type="submit">Create account</button>
                                <p>Or continue with </p>
                            </div>
                            <div>
                                <p>imagenes</p>
                                <p>imagenes</p>
                            </div>
                        </form>
                        <div>
                            <img />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}