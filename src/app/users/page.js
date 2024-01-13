"use client";
import { useEffect, useState } from "react";
import { useProfile } from "../components/UseProfile";
import UserTabs from "../components/layout/UserTabs";

export default function UserPage(){
    const {loading:profileLoading, data:profileData} = useProfile();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            })
        })
    }, [])
    if (profileLoading){
        return 'Loading user info....'
    }
    if (!profileData.admin){
        return 'Not an Admin';
    }
    <section className="max-w-2xl mx-auto mt-8">
        <UserTabs isAdmin={true}></UserTabs>
        <div className="mt-8">
            {users?.length > 0 && users.map(user =>(
                <div key={user.id} className="bg-gray-100 rounded-lg mb-2 p-1px-4 items-center gap-4"> 
                    <div className="flex gap-4">
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                    </div>
                    <div>
                        <button>Edit</button>
                    </div>
                </div>
            ))}
        </div>
    </section>
}