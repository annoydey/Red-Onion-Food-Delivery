"use client"

import { useState } from "react";
import {signIn} from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(val){
        val.preventDefault();
        setLoginInProgress(true);

        await signIn('credentials', {email, password, callbackUrl: '/'});
        
        setLoginInProgress(false);
        setEmail("");
        setPassword("");
    }
    return (
        <section className="mt-8">
            <h1 className="font-semibold text-center text-red-600 text-4xl">Login</h1>
            <form className="mt-4 max-w-xs mx-auto flex flex-col items-center" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" value={email} onChange={val => setEmail(val.target.value)} disabled={loginInProgress}></input>
                <input type="password" name="password" placeholder="password" value={password} onChange={val => setPassword(val.target.value)} disabled={loginInProgress}></input>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-full mb-2" type="submit" disabled={loginInProgress}>Login</button>
                <div className="my-4 text-center text-gray-500">or login with provider</div>
                <button type="button" className="w-full bg-blue-500 text-white px-4 py-2 rounded-full mb-2" onClick={() => signIn('google',{callbackUrl:'/'})}>Login with google</button>
            </form>
        </section>
    );
}