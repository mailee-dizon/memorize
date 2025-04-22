"use client";
import React from 'react'
import { useState } from 'react';
import { auth } from "@/app/firebase/config";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export const dynamic = "force-dynamic";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            if (!userCredentials) {
                console.log("help");
            }
            const user = userCredentials.user;
            console.log("Logged in as: ", user.email)
            router.push("../UserHome");
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = error.message;
                console.log(errorMessage);
            }
        }
    }



    return (
        <div>
            <h1>Log in Here</h1>
            <label>Email</label> <br/>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder = "Email"/> <br/>
            <label>Password</label> <br/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder = "Password"/> <br/>
            <button onClick={handleLogin}>Log in</button> <br/>
            <button onClick={() => {router.push("../SignupPage")}}>Create Account Here</button>
        </div>
    );
}