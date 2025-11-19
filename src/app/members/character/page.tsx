"use client";
import { useEffect, useState } from 'react'
import { getClient } from "@/lib/appwrite";
// import { getCharacters } from "@/app/actions/characterList/getCharacterList"
import { useAuth } from "@/app/providers/AuthProvider";
import Image from 'next/image'
import { TablesDB, Query } from "appwrite";

/**
 * CharacterPage
 *
 * Purpose:
 *   Displays the logged-in user's character list and details.
 *
 * Responsibilities:
 *   - Fetch character data from Appwrite using client-side SDK
 *   - Display character stats, equipment, and lore
 *   - Allow user to select and view different characters
 *
 * Dependencies:
 *   - `useAuth()` from AuthProvider for user context
 *   - `getClient()` and `TablesDB` from Appwrite SDK (browser-safe)
 *   - `next/image` for optimized image rendering
 *
 * Notes:
 *   This is a client-only component (`"use client"`) due to use of React hooks and Appwrite client SDK.

 */

const CharacterPage = () => {

    // const characterDB = await tablesDB()
    const DATABASE_ID = "68c1161d0005b831d8b7"
    const TABLE_ID = "characters"
    const QUERIES = [Query.equal("memberId", "68ccbf0f0026eb9a8d4f")]

    const client = getClient()
    const tableDB = new TablesDB(client);
    const characterDB = new TablesDB(client);
    const { loggedInUser, logout } = useAuth();
    const [error, setError] = useState(null)
    const [characterSeleted, setCharacterSelected] = useState(1)
    const [characterList, setCharacterList] = useState(null)
    // characterList = characterDB.listRows
    useEffect(() => {
        let active = true;
        const fetchData = async () => {
            try {

                const data = await tableDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID,
                    queries: QUERIES,

                });
                if (active) setCharacterList(data)
            } catch (err) {
                if (active) setError(err);
            }
        }
        fetchData();
        return () => { active = false };
    }, [])
    console.dir(characterList)
    // console.dir(characterList.rows)
    return (
        <>
            {characterList && <section className='flex flex-col w-full justify-between h-full' id="whole page">
                <section className=" flex row w-full" id="withDescription">
                    <section className='flex w-2/3 flex-col' id="notDescription">
                        <section className='flex flex-col
                     w-full' id="main&Image">
                            <div className='flex'>
                                <div>
                                    <h1 className=''>Your Characters </h1>
                                    <dl className='grid grid-cols-2  w-full'>
                                        <dt className='text-end'>Name: </dt>
                                        <dd className='text-center'>{characterList.rows[characterSeleted].name}</dd>
                                        <dt className='text-end'>Class: </dt>
                                        <dd className='text-center'>{characterList.rows[characterSeleted].class}</dd>
                                        <dt className='text-end'>Race: </dt>
                                        <dd className='text-center'>{characterList.rows[characterSeleted].race}</dd>
                                        <dt className='text-end'>Sub Race: </dt>
                                        <dd className='text-center'>{characterList.rows[characterSeleted].subRace}</dd>

                                        <dt className='text-end'>Level: </dt>
                                        <dd className='text-center'>{characterList.rows[characterSeleted].level}</dd>
                                        <dt className='text-end'>Deity: </dt>
                                        <dd className='text-center'>{characterList.rows[characterSeleted].deity}</dd>
                                    </dl>
                                    <table border={1} className="grid-cols-3 grid-row-3 w-full ">
                                        <thead className="text-center">
                                            <tr>
                                                <th>Item</th>
                                                <th scope='col'>Light</th>
                                                <th scope="col">Medium</th>
                                                <th scope="col">Heavy</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row" className='text-end'>Weapons:</th>
                                                <td className="text-center">{characterList.rows[characterSeleted].lightWeapons ? "\u2705" : "\u26D4"}</td>
                                                <td className="text-center">{characterList.rows[characterSeleted].mediumWeapons ? "\u2705" : "\u26D4"}</td>
                                                <td className="text-center">{characterList.rows[characterSeleted].heavyWeapons ? "\u2705" : "\u26D4"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className='text-end'>Armor:</th>
                                                <td className="text-center">{characterList.rows[characterSeleted].lightArmor ? "\u2705" : "\u26D4"}</td>
                                                <td className="text-center">{characterList.rows[characterSeleted].mediumArmor ? "\u2705" : "\u26D4"}</td>
                                                <td className="text-center">{characterList.rows[characterSeleted].heavyArmor ? "\u2705" : "\u26D4"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className='text-end'>Shield:</th>
                                                <td className="text-center">{characterList.rows[characterSeleted].lightShield ? "\u2705" : "\u26D4"}</td>
                                                <td className="text-center">{characterList.rows[characterSeleted].mediumShield ? "\u2705" : "\u26D4"}</td>
                                                <td className="text-center">{characterList.rows[characterSeleted].heavyShield ? "\u2705" : "\u26D4"}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <Image src={characterList.rows[characterSeleted].imageUrl} alt="Group of characters ready to adventure"
                                    width={1200}
                                    height={800}
                                    sizes="100%" className='w-1/2 flex h-fit' />
                            </div>
                            <dl className='grid grid-cols-4 w-full '>
                                <dt className='text-end col-start-1'>White Clothes: </dt>
                                <dd className='text-center'>{characterList.rows[characterSeleted].whiteCloth}</dd>
                                <dt className='text-end col-start-1'>Green Clothes: </dt>
                                <dd className='text-center '>{characterList.rows[characterSeleted].greenCloth}</dd>
                                <dt className='text-end col-start-1'>Spell Packets: </dt>
                                <dd className='text-center '>{characterList.rows[characterSeleted].spellsPackets}</dd>
                                <dt className='text-end col-start-1'>Racial Abilites: </dt>
                                <dd className='text-center col-span-3 w-2/3'>{characterList.rows[characterSeleted].abilities}</dd>
                                <dt className='text-end col-start-1'>Class Ablilites: </dt>
                                <dd className='text-center col-span-3 text-balance w-2/3'>{characterList.rows[characterSeleted].classAbilities}</dd>
                            </dl>
                        </section>
                    </section>
                    <section className='w-1/3' id="description">
                        <h1>Description:</h1>
                        <p>{characterList.rows[characterSeleted].history}</p>
                    </section>
                </section>
                <section className='bg-pink-500 h-fit w-full flex flex-col  overflow-x-scroll scrollbar-thin touch-pan-x' >
                    <ul className="  flex h-[100px] w-fit self-center">
                        {characterList && characterList.rows.map((character, i) => (
                            <li key={i} className="mx-5 h-1rem" onClick={(() => setCharacterSelected(i))} > < Image loading="lazy"
                                src={character.imageUrl}
                                alt="Group of characters ready to adventure"
                                width={1200}
                                height={800}
                                sizes="100%"
                                className="rounded-lg h-full w-auto "
                                onClick={() => setCharacterSelected(character)} />
                            </li>
                        ))}

                    </ul>
                </section>

            </section >}
        </>
    )
}

export default CharacterPage