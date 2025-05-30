"use client";
import React from 'react'
import { useState } from 'react';
import { auth } from "@/app/firebase/config";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export const dynamic = "force-dynamic";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            if (!userCredentials) {
                console.log("help");
            }
            const user = userCredentials.user;
            router.push("HomePage")
            console.log("Signed up as: ", user.email)
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = error.message;
                console.log(errorMessage);
            }
        }
    }

    return (
        <div style={{margin: "auto", width: "50%", border: "2px solid black"}}>
            <h1 style={{textAlign: "center", fontFamily: "monospace"}}>Sign Up Here</h1>
            <div style={{padding: "5px"}}>
                <label style={{margin: "5px", fontFamily: "monospace", fontSize: "large"}}>Email</label> <br/>
                <input className="signInput" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder = "Email"/> <br/>
                <label style={{margin: "5px", fontFamily: "monospace", fontSize: "large"}}>Password</label> <br/>
                <input className="signInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder = "Password"/> <br/>
                <button style={{backgroundColor: "darkolivegreen", color: "white", padding: "10px", display: "block", margin: "auto"}} onClick={handleSignup}>Sign up</button> <br/>
                <button style={{backgroundColor: "darkolivegreen", color: "white", padding: "10px", display: "block", margin: "auto"}} onClick={() => {router.push("LoginPage")}}>Have an Account? Log in here</button>
            </div>
        </div>
    );
}