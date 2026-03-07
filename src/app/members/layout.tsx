"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import NavBar from '../components/nav/MembersNav'
import type { CompleteCharacterSheet } from "@/lib/types/characterTypes"
import Events from '../(public)/events/page'


export const CharacterContext = createContext<{
    characterSelected: CompleteCharacterSheet | null;
    setCharacterSelected: React.Dispatch<React.SetStateAction<CompleteCharacterSheet | null>>;


}>({
    characterSelected: null,
    setCharacterSelected: () => { }
})

const MembersLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [characterSelected, setCharacterSelected] = useState<CompleteCharacterSheet | null>(null);
    useEffect(() => {
        const stored = localStorage.getItem("characterSelected")
        if (stored) setCharacterSelected(JSON.parse(stored))
    }, [])
    const [clickedTab, setClickedTab] = useState(0);

    return (
        <>
            <main className='bg-cover h-screen bg-bottom w-full bg-[url("/images/town-bg-vertical.webp")] flex justify-center mr-auto ml-auto'>
                <CharacterContext.Provider value={{ characterSelected, setCharacterSelected }}>
                    <NavBar clickedTab={clickedTab} setClickedTab={setClickedTab} />
                    <section id='wrapper' className="flex   justify-center md:h-9/10 md:w-6/7 mt-2 bg-(--background-alpha) flex-row w-[420px]  ">
                        {clickedTab !== 6 && children}
                        {clickedTab === 6 && <Events />}
                    </section>
                </CharacterContext.Provider>

            </main >


        </>
    )
}

export default MembersLayout