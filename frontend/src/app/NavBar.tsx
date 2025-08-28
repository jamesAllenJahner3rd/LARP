import React from 'react'
import Link from 'next/link'

const NavBar = () => {
    return (
        <nav className="flex p-5 bg-green-200">
            <Link href="/" className='mr-5'>Next.js</Link>
            <Link href="/users">Users</Link>
            <Link href="/products">Products</Link>

        </nav>
    )
}

export default NavBar
