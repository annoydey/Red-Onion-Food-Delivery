"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserForm({user, onSave}){
    const session = useSession();
    const [userName, setUserName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone ||'');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress ||'');
    const [postalCode, setPostalCode] = useState(user?.postalCode ||'');
    const [city, setCity] = useState(user?.city ||'');
    const [country, setCountry] = useState(user?.country ||'');
    const userImage = session.data.user.image;
    const [savingName, setSavingName] = useState(false);
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data:loggedInUserData} = useProfile();

    return (
        <div className="mt-4 max-w-xs mx-auto flex flex-col items-center rounded-md px-4">
            <div className="mt-4">
                <Image className="rounded-full" src={userImage} width={100} height={100}></Image>
            </div>
            <form className="mt-2 flex flex-col items-center"
                onSubmit={val => onSave(val, {name:userName,phone, admin, streetAddress,postalCode,city,country})}
            >
                <div>
                    <div className="flex flex-col mb-1">
                        <label htmlFor="name" >Name</label>
                        <input type="text" id="name" placeholder="Name" value={userName} onChange={val => setUserName(val.target.value)}></input>
                    </div>
                    <div className="flex flex-col mb-1">
                        <label htmlFor="email" >Email</label>
                        <input type="email" id="email" placeholder="Email" value={user.email} disabled={true}></input>
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
                    {loggedInUserData.admin && (
                        <div>
                            <label className="p-2 inline-flex items-center gap-2 border mb-2" htmlFor="adminCb">
                                <input id="adminCb" type="checkbox" className="" value={'1'} checked={admin} onClick={val => setAdmin(val.target.checked)}></input>
                                <span>Admin</span>
                            </label>
                        </div>      
                    )}
                </div>
                <div>
                    <button className=" bg-red-600 text-white px-4 py-2 rounded-full mb-2" type="submit" disabled={savingName}>Save</button>
                </div>
            </form>
        </div>
    );
}