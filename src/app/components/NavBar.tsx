import Link from 'next/link'
import React from 'react'


const NavBar = () => {
    const navCss = "m-auto min-w-fit grid-cols-4 max-w-fit grid py-2 px-3 items-center justify-items-center w-content border-1 rounded-full fixed inset-x-0 mx-auto bottom-6"

    return (
        <><nav className={navCss}>
            <Link href="" className="btn-ghost"><h3 className=''>Welcome </h3></Link>
            <Link href="" className=""><h3 className=''>Explore</h3></Link>
            <Link href="" className=""><h3 className=''>Members</h3></Link>
            <Link href="" className=""><h3 className=''>Shop</h3></Link>

        </nav >
            <button className="btn btn-ghost" type="button">hi</button>
        </>
    )
}

export default NavBar