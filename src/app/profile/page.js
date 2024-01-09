"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import UserTabs from "../components/layout/UserTabs";


export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [savingName, setSavingName] = useState(false);
    const {status} = session;
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    useEffect(() => {
        if(status === 'authenticated'){
            setUserName(session.data.user.name);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status])

    async function handleProfileInfoUpdate(val) {
        val.preventDefault();
        setSavingName(true);
        const response = await fetch('/api/profile',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: userName,
                streetAddress: streetAddress,
                phone: phone,
                postalCode: postalCode,
                city: city,
                country: country,
            }),
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
    const userImage = session.data.user.image;
    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}/>
            <div className="mt-4 max-w-xs mx-auto flex flex-col items-center rounded-md px-4">
                <div className="mt-4">
                    <Image className="rounded-full" src={userImage} width={100} height={100}></Image>
                </div>
                <form className="mt-2 flex flex-col items-center" onSubmit={handleProfileInfoUpdate}>
                    <div>
                        <div className="flex flex-col mb-1">
                            <label htmlFor="name" >Name</label>
                            <input type="text" id="name" placeholder="Name" value={userName} onChange={val => setUserName(val.target.value)}></input>
                        </div>
                        <div className="flex flex-col mb-1">
                            <label htmlFor="email" >Email</label>
                            <input type="email" id="email" placeholder="Email" value={session.data.user.email} disabled={true}></input>
                        </div>
                        <div className="flex flex-col mb-1">
                            <label htmlFor="phone" >Phone Number</label>
                            <input type="tel" id="phone" placeholder="Phone Number" value={phone} onChange={val => setPhone(val.target.value)}></input>
                        </div>
                        <div className="flex flex-col mb-1">
                            <label htmlFor="streetAddress" >Street Address</label>
                            <input type="text" id="streetAddress" placeholder="Street address" value={streetAddress} onChange={val => setStreetAddress(val.target.value)}></input>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col mb-1">
                                <label htmlFor="postalCode" >Postal Code</label>
                                <input type="text" id="postalCode" placeholder="Postal Code" value={postalCode} onChange={val => setPostalCode(val.target.value)}></input>
                            </div>
                            <div className="flex flex-col mb-1">
                                <label htmlFor="city" >City</label>
                                <input type="text" id="city" placeholder="City" value={city} onChange={val => setCity(val.target.value)}></input>
                            </div>
                        </div>
                        <div className="flex flex-col mb-1">
                            <label htmlFor="country" >Country</label>
                            <input type="text" id="country" placeholder="Country" value={country} onChange={val => setCountry(val.target.value)}></input>
                        </div>
                    </div>
                    <div>
                        <button className=" bg-red-600 text-white px-4 py-2 rounded-full mb-2" type="submit" disabled={savingName}>Save</button>
                    </div>
                </form>
            </div>
        </section>
    );
}