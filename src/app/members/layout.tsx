import React from 'react'
import NavBar from '../components/nav/MembersNav'

const MembersLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <main className='bg-cover h-screen bg-bottom w-full bg-[url("/images/town-bg-vertical.webp")] flex justify-center mr-auto ml-auto'>
                <NavBar />
                <section id='wrapper' className="flex  justify-center md:h-8/10 md:w-5/7 mt-2 bg-(--background-alpha) w-[420px] md:mr-[14.2857%] ">



                    {children}





                </section>

            </main >


        </>
    )
}

export default MembersLayout