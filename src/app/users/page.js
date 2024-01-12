"use client";
import { useEffect } from "react";
import { useProfile } from "../components/UseProfile";
import UserTabs from "../components/layout/UserTabs";

export default function UserPage(){
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                
            })
        })
    }, [])
    if (loading){
        return 'Loading user info....'
    }
    if (!update.admin){
        return 'Not an Admin';
    }
    <section className="max-w-2xl mx-auto mt-8">
        <UserTabs isAdmin={true}></UserTabs>
    </section>
}