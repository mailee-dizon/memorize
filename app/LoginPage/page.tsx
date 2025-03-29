import React from 'react'
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <h1>Log in Here</h1>
            <label>Email</label> <br/>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder = "Email"/> <br/>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder = "Password"/> <br/>
            <button>Log in</button>
            <button>Create Account Here</button>
        </div>
    );
}