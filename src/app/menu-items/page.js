"use client";
import { useProfile } from "../components/UseProfile";
import UserTabs from "../components/layout/UserTabs";

export default function MenuItemsPage() {
    
    const {loading, data} = useProfile();

    if (loading) {
        return 'Loading user info...';
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true}></UserTabs>
            <form className="mt-8 max-w-md mx-auto">
                <div className="flex items-end gap-2">
                    <div className="grow">
                        <label>Menu item name</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <button className="mb-2" type="submit">Create</button>
                    </div>
                </div>
            </form>
        </section>
    );
}