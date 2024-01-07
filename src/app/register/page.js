"use client"

import Link from "next/link";
import { useState } from "react";
import {signIn} from "next-auth/react";

export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userCreated, setUserCreated] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);

    async function handleFormSubmit(val){
        val.preventDefault();
        setCreatingUser(true);
        await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        setEmail("");
        setPassword("");
        setCreatingUser(false);
        setUserCreated(true);
    }

    return (
        <section className="mt-8">
            <h1 className="font-semibold text-center text-red-600 text-4xl">Register</h1>
            {userCreated && (
                <div className="my-3 text-center">
                    <p>
                        <span className="bg-green-500 text-white py-1 rounded-full mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </span>
                            User has been created. <br/> 
                        <span className="ms-5">
                            Now you can {' '} <Link href={'/login'} className="underline">Login &raquo;</Link>
                        </span>
                    </p>
                </div>
            )}
            <form className="mt-4 max-w-xs mx-auto flex flex-col items-center" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email} onChange={val => setEmail(val.target.value)} disabled={creatingUser}></input>
                <input type="password" placeholder="password" value={password} onChange={val => setPassword(val.target.value)} disabled={creatingUser}></input>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-full mb-2" type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">or login with provider</div>
                <button type="button" className="w-full bg-blue-500 text-white px-4 py-2 rounded-full mb-2"onClick={() => signIn('google',{callbackUrl:'/'})}>Login with google</button>
            </form>
        </section>
    );
}