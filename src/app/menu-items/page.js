"use client";
import { useEffect, useState } from "react";
import { useProfile } from "../components/UseProfile";
import UserTabs from "../components/layout/UserTabs";
import toast from "react-hot-toast";
import Link from "next/link";

export default function MenuItemsPage() {
    
    const {loading:profileLoading, data:profileData} = useProfile();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            })
        })
    },[])
    
    if (profileLoading) {
        return 'Loading user info...';
    }

    if (!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true}></UserTabs>
            <div className="mt-8">
                <Link className="button" href={'/menu-items/new'}>Create new menu item</Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu item: </h2>
                {menuItems?.length > 0 && menuItems.map(item => (
                    <Link key={item.id} href={'/menu-items/edit/'+ item._id} className="mb-1">
                        {item.name}
                    </Link>
                ))}
            </div>
        </section>
    );
}