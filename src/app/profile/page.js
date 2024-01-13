"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import UserTabs from "../components/layout/UserTabs";
import Userform from "../components/layout/Userform";


export default function ProfilePage() {
    const session = useSession();
    const [user, setUser] = useState(null);
    const {status} = session;
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    useEffect(() => {
        if(status === 'authenticated'){
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status])

    async function handleProfileInfoUpdate(val, data) {
        val.preventDefault();
        setSavingName(true);
        const response = await fetch('/api/profile',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data}),
        });
        toast.success('Profile has been updated.');
        setTimeout(() => {
            setSavingName(false);
        }, 3000);
    }
    if (status === 'loading' || !profileFetched){
        return 'Loading...'
    } 
    if (status === 'unauthenticated'){
        return redirect('/login');
    } 
    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}/>
            <Userform user={user} onSave={handleProfileInfoUpdate}></Userform>
        </section>
    );
}