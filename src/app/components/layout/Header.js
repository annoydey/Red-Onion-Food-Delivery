"use client"

import Link from 'next/link'
import Image from "next/image"
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if(userName && userName.includes(' ')){
      userName = userName.split(' ')[0];
    }
    return (
    <header className='flex items-center justify-between'>
        <Image src="/images/logo2.png" width={200} height={200} alt="Logo"></Image>
        <nav className='text-lg flex items-center gap-8 text-grap-500 font-semibold'>
          <Link href={'/'}>Home</Link>
          <Link href={''}>Menu</Link>
          <Link href={''}>About</Link>
          <Link href={''}>Contact</Link>
        </nav>
        <nav className='flex items-center gap-4 text-gray-500 font-semibold'>
            {status === 'authenticated' && (
              <>

                <Link href={'/profile'} className='whitespace-nowrap'>Hello, {userName}</Link>
                <button className='bg-red-600 rounded-full text-white px-6 py-2' onClick={async () => { await signOut(); window.location.href = '/'; }}>Logout</button>
              </>
            )}
            {status === 'unauthenticated' && (
              <>
                <Link href={'/login'}>Login</Link>
                <Link href={'/register'} className='bg-red-600 rounded-full text-white px-6 py-2'>Register</Link>
              </>
            )}
        </nav>
      </header>
    );
};
