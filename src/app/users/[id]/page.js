"use client";
import UserForm from "@/app/components/layout/Userform";
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function EditUserPage() {
    const {loading:profileLoading, data:profileData} = useProfile();
    const {id} = useParams();
    const [user, setUser] = useState(null);

    useEffect(()=> {
        fetch('/api/profile?_id='+id).then(res =>{
            res.json().then(user => {
                setUser(user);
            });
        })
    },[]);

    async function handleSaveButtonClick(val, data){
        val.preventDefault();
        const promise = new Promise(async (resolve,reject)=>{
            const res = await fetch('/api/profile',{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({...data,_id:id}),
            });
            if (res.ok){
                resolve();
            }else{
                reject();
            }
        });
        await toast.promise(promise, {
            loading: 'Saving user...',
            success: 'User saved',
            error: 'Error occurred while saving the user',
        });
    }

    if (profileLoading){
        return 'Loading user info ...'
    }

    if (!profileData.admin) {
        return 'Not an admin';
    }
    return(
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true} ></UserTabs>
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick}></UserForm>
            </div>
        </section>
    );
}