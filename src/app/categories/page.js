"use client";


import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import {useProfile} from "../components/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage(){
    const {loading:profileLoading, data:profileData} = useProfile();
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            });
        });
    }

    if (profileLoading){
        return 'Loading user info ...'
    }

    if (!profileData.admin) {
        return 'Not an admin';
    }
    

    async function handleCategorySubmit(val){
        val.preventDefault();
        const creationPromise = new Promise(async(resolve, reject) => {
            const data = {name:categoryName};
            if(editedCategory){
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if (response.ok) 
                resolve(); 
            else 
                reject();
        });
        await toast.promise(creationPromise,{
            loading: editedCategory ? 'Updating category....' : 'Creating your new category....',
            success: editedCategory ? 'Category updated' : 'Category created',
            error: 'Error, sorry...',
        });
    }

    async function handleDeleteClick(_id){
        const promise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/categories?_id='+_id,{
                method: 'DELETE',
            });
            if (response.ok) 
                resolve(); 
            else 
                reject();
        });

        await toast.promise(promise,{
            loading: 'Deleting....',
            success: 'Deleted',
            error: 'Error',
        });

        fetchCategories();
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true}></UserTabs>
            <form className="mt-6 flex flex-col items-center" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="flex flex-col mb-1">
                        <label htmlFor="name">
                            {editedCategory ? 'Update category': ' New category name'} 
                            {editedCategory && (
                                <>:<b>{editedCategory.name}</b></>
                        )}
                        </label>
                        <input type="text" value={categoryName} onChange={val => setCategoryName(val.target.value)}></input>
                    </div>
                    <div className="pb-1">
                        <button className=" bg-red-600 text-white px-4 py-2 rounded-full mb-2" type="submit">{editedCategory ? 'Update': 'Create'}</button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing categories: </h2>
                {categories?.length > 0 && categories.map(data => (
                    <div 
                    key={data.id} 
                    className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1 mb-1 w-full items-center" >
                        <div className="grow">
                            {data.name}
                        </div>
                        <div className="flex gap-1">
                            <button type="button"
                                onClick={() => {setEditedCategory(data); setCategoryName(data.name)}}
                            >
                                Edit
                            </button>
                            <button type="button"
                                onClick={() => handleDeleteClick(data._id)}
                            >
                                Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}