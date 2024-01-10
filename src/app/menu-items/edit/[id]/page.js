"use client";
import { useEffect, useState } from "react";
import UserTabs from "../../../components/layout/UserTabs";
import { useProfile } from "../../../components/UseProfile";
import toast from "react-hot-toast";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";

export default function EditMenuItemPage() {
    const {loading:profileLoading, data:profileData} = useProfile();
    const {id} = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [redirectToItems, setRedirectToItems] = useState(false);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setName(item.name);
                setPrice(item.price);
            });
        })
    },[])

    async function handleFormSubmit(val){
        val.preventDefault();
        const data = {name,price, _id:id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items',{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
            if (response.ok){
                resolve();
            }
            else 
                reject();
        });

        await toast.promise(savingPromise,{
            loading: 'Saving the menu-item',
            success: 'Saved',
            error: 'Error',
        })

        setRedirectToItems(true);
    }

    if(redirectToItems){
        return redirect('/menu-items');
    }

    if (profileLoading) {
        return 'Loading user info...';
    }

    if (!profileData.admin) {
        return 'Not an admin';
    }


    return (
        <section className="mt-8">
            <UserTabs isAdmin={true}></UserTabs>
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button"><span>Show all menu items</span></Link>
            </div>
            <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
                <div className="flex items-end gap-2">
                    <div className="grow">
                        <label>Item name</label>
                        <input type="text" value={name} onChange={val => setName(val.target.value)}></input>
                        <label>Price</label>
                        <input type="text" value={price} onChange={val => setPrice(val.target.value)}></input>
                    </div>
                    <div>
                        <button className="mb-2" type="submit">Save</button>
                    </div>
                </div>
            </form>
        </section>
    );
}