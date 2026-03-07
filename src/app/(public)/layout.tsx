import React from 'react'
import NavBar from '../components/nav/PublicNav'

const PublicLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            {children}
            <NavBar />
        </>
    )
}

export default PublicLayout