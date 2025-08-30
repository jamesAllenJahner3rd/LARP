'use client'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Loading from './Loading'
import Image from 'next/image'

const NavBar = () => {
    const { status, data: session } = useSession();

    return (
        <nav className="flex p-5 bg-green-200 space-x-3">
            <Link href="/" className='mr-5'>Next.js</Link>
            <Link href="/users">Users</Link>
            <Link href="/products">Products</Link>
            {status === 'loading' && <Loading />}
            {status === 'authenticated' && <div className='ml-auto flex items-center space-x-3'>
                <span>Welcome, {session?.user?.name || session?.user?.email}</span>
                {session?.user?.image && <Image width={32} height={32} src={session.user.image} alt="User Image" className='w-8 h-8 rounded-full' />}
                <Link href="/api/auth/signout" className='btn btn-primary btn-sm'>Sign Out</Link> {/* Sign out is an endpoint handled by Next JS */}
            </div>}
            {status === 'unauthenticated' && <Link href="/api/auth/signin" className='ml-auto' >Sign In</Link>}
        </nav >
    )
}

export default NavBar
