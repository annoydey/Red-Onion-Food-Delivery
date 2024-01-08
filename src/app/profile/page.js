"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [savingName, setSavingName] = useState(false);
    const {status} = session;

    useEffect(() => {
        if(status === 'authenticated'){
            setUserName(session.data.user.name);
        }
    }, [session, status])

    async function handleProfileInfoUpdate(val) {
        val.preventDefault();
        setSavingName(true);
        const response = await fetch('/api/profile',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: userName}),
        });
        toast.success('User name has been updated.');
        setTimeout(() => {
            setSavingName(false);
        }, 3000);
    }
    if (status === 'loading'){
        return 'Loading...'
    } 
    if (status === 'unauthenticated'){
        return redirect('/login');
    } 
    const userImage = session.data.user.image;
    return (
        <section className="mt-8">
            <h1 className="font-semibold text-center text-red-600 text-4xl">Profile</h1>
            <div className="mt-4 max-w-xs mx-auto flex flex-col items-center rounded-md border">
                <div className="mt-4">
                    <Image className="rounded-full" src={userImage} width={100} height={100}></Image>
                </div>
                <form className="mt-4 flex flex-col items-center" onSubmit={handleProfileInfoUpdate}>
                    <div>
                        <input type="text" placeholder="Name" value={userName} onChange={val => setUserName(val.target.value)}></input>
                        <input type="email" placeholder="email" value={session.data.user.email} disabled={true}></input>
                    </div>
                    <div>
                        <button className=" bg-red-600 text-white px-4 py-2 rounded-full mb-2" type="submit" disabled={savingName}>Save</button>
                    </div>
                </form>
            </div>
        </section>
    );
}