"use client";
import { useEffect, useState } from 'react'
import { getClient, getAuthenticatedAccount } from "@/lib/appwrite";
import { useAuth } from "@/app/providers/AuthProvider";
import Image from 'next/image'
import { TablesDB, Query } from "appwrite";
import { getClassAbilitiesArray, getClassAndLevelMap } from './getCharacterData';
import { Models } from 'appwrite';

import type { CharacterSheetRow, CompleteCharacterSheet } from '@/lib/types/characterTypes';

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

    const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "68ccc1ab0001250042a8"
    const TABLE_ID = "characters"


    const client = getClient()
    const tableDB = new TablesDB(client);
    const { loggedInUser, logout } = useAuth();
    const [error, setError] = useState(null)
    const [characterSelected, setCharacterSelected] = useState<CompleteCharacterSheet | null>(null)
    const [characterList, setCharacterList] = useState<Models.RowList<CharacterSheetRow> | null>(null)

    useEffect(() => {
        let active = true;
        const fetchData = async () => {
            console.log("getting character data")
            try {
                const account = getAuthenticatedAccount()
                const user = await account.get()

                const QUERIES = [Query.equal("memberId", user.$id)]

                const data = await tableDB.listRows<CharacterSheetRow>({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID,
                    queries: QUERIES,

                });
                if (active) {
                    setCharacterList(data)
                }
            } catch (err) {
                if (active) setError(err);
            }
        }
        fetchData();
        return () => { active = false };
    }, [DATABASE_ID, TABLE_ID,])
    async function handleCharacterInfo(i: number) {
        setCharacterSelected({
            memberId: characterList.rows[i].memberId,
            name: characterList.rows[i].name,
            race: characterList.rows[i].race,
            subRace: characterList.rows[i].subRace,
            raceDescription: characterList.rows[i].raceDescription,
            raceAbilities: characterList.rows[i].raceAbilities,
            raceAbilityDescription: characterList.rows[i].raceAbilityDescription,
            classDescription: characterList.rows[i].classDescription,
            deity: characterList.rows[i].deity,
            deityImage: characterList.rows[i].deityImage,
            deityDescription: characterList.rows[i].deityDescription,
            lightWeapons: characterList.rows[i].lightWeapons,
            mediumWeapons: characterList.rows[i].mediumWeapons,
            heavyWeapons: characterList.rows[i].heavyWeapons,
            heavyArmor: characterList.rows[i].heavyArmor,
            mediumArmor: characterList.rows[i].mediumArmor,
            lightArmor: characterList.rows[i].lightArmor,
            lightShield: characterList.rows[i].lightShield,
            mediumShield: characterList.rows[i].mediumShield,
            heavyShield: characterList.rows[i].heavyShield,
            twoWeapon: characterList.rows[i].twoWeapon,
            rangedWeapons: characterList.rows[i].rangedWeapons,
            whiteCloth: characterList.rows[i].whiteCloth,
            greenCloth: characterList.rows[i].greenCloth,
            history: characterList.rows[i].history,
            spellsPackets: characterList.rows[i].spellsPackets,
            imageUrl: characterList.rows[i].imageUrl
        })

        const classesAndLevelMap = await getClassAndLevelMap(characterList.rows[i]?.$id)
        const Ablities = await getClassAbilitiesArray(characterList.rows[i]?.$id, classesAndLevelMap)
        let clssLVL = Array.from(classesAndLevelMap.entries())
        setCharacterSelected(prev =>
        ({
            ...prev,
            "class": clssLVL,
            "classAbilities": Ablities.rows.map(row => ({ title: row.title, description: row.description })),
        })
        );
    }

    return (
        <>
            <section className='flex flex-col w-full justify-between h-full overflow-auto md:max-w-[1080px]' id="whole page">
                {characterSelected &&
                    <section className=" flex flex-col w-full h-6/7 bg-[url(/images/parchment.png)] overflow-auto" id="Character">
                        <section id="primaryAndImage" className='flex flex-row w-7/7'>
                            <section className='flex md:max-w-fit md:w-2/3 flex-col' id="notDescription">
                                <section className='flex flex-col
                     w-full' id="main&Image">
                                    <div className='flex'>
                                        <div>
                                            <h1 className=''>Your Characters </h1>
                                            <dl className='grid grid-cols-2  w-full '>
                                                <dt className='text-end'>Name: </dt>
                                                <dd className='text-center'>{characterSelected.name}</dd>
                                                <dt className='text-end'>Class: </dt>
                                                {characterSelected?.class?.map((clss) => <dd className='text-center'>{clss[0]} {clss[1]} lvl</dd>)}
                                                <dt className='text-end'>Race: </dt>
                                                <dd className='text-center'>{characterSelected.race}</dd>
                                                <dt className='text-end'>Deity: </dt>
                                                <dd className='text-center'>{characterSelected.deity}</dd>
                                            </dl>


                                        </div>

                                    </div>

                                </section>

                                <section id='tools' className=' flex flex-col '>

                                    <table border={1} className="grid-cols-3 grid-row-3 w-full border-1 p-1 border-collapse ">
                                        <thead className="text-center">
                                            <tr>
                                                <th>Item</th>
                                                <th scope='col'>Light</th>
                                                <th scope="col">Medium</th>
                                                <th scope="col">Heavy</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            <tr>
                                                <th scope="row" className='text-end'>Weapons:</th>
                                                <td className="text-center">{characterSelected.lightWeapons ? "\u2705" : "\u26D4"}</td>
                                                <td className="text-center">{characterSelected.mediumWeapons ? "\u2705" : "\u26D4"}</td>
                                                <td className="text-center">{characterSelected.heavyWeapons ? "\u2705" : "\u26D4"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className='text-end'>Armor:</th>
                                                <td className="text-center">{characterSelected.lightArmor ? "\u2705" : "\u26D4"}</td>
                                                <td className="text-center">{characterSelected.mediumArmor ? "\u2705" : "\u26D4"}</td>
                                                <td className="text-center">{characterSelected.heavyArmor ? "\u2705" : "\u26D4"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className='text-end'>Shield:</th>
                                                <td className="text-center">{characterSelected.lightShield ? "\u2705" : "\u26D4"}</td>
                                                <td className="text-center">{characterSelected.mediumShield ? "\u2705" : "\u26D4"}</td>
                                                <td className="text-center">{characterSelected.heavyShield ? "\u2705" : "\u26D4"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <dl className='grid grid-cols-2 w-full border-1 border-collapse'>Clothes:
                                        <dt className='text-end col-start-1'>White: </dt>
                                        <dd className='text-center'>{characterSelected.whiteCloth}</dd>
                                        <dt className='text-end col-start-1'>Green: </dt>
                                        <dd className='text-center '>{characterSelected.greenCloth}</dd>
                                        <dt className='text-end col-start-1'>Spell Packets: </dt>
                                        <dd className='text-center content-end'>{characterSelected.spellsPackets}</dd>

                                    </dl>
                                </section>
                            </section>

                            <Image src={characterSelected.imageUrl} alt="Group of characters ready to adventure"
                                width={1200}
                                height={800}
                                sizes="100%" className='max-w-[500px] w-1/2  flex h-fit' />
                        </section>

                        <section className='flex flex-col w-full' id="description">
                            <h1>Description:</h1>
                            <p>{characterSelected.history}</p>
                        </section>
                        <section className='flex flex-col w-full' id="description">
                            <h1>Racial Ability:</h1>
                            <h2>{characterSelected.raceAbilities}</h2>
                            <p>{characterSelected.raceAbilityDescription}</p>
                        </section>
                        <section>
                            <h1>Class Abilities:</h1>
                            <ul>
                                {characterSelected?.classAbilities?.map(ability => (
                                    <li key={ability.title}>
                                        <h2>{ability.title}</h2>
                                        <p>{ability.description}</p>
                                    </li>
                                )
                                )}
                            </ul>
                        </section>
                    </section>}
                <section className='bg-[url(/images/parchment.png)] h-100%  w-fit absolute bottom-0 flex flex-col box-border overflow-x-scroll  touch-pan-x md:h-[125px] md:w-full md:sticky md:top-full' >
                    <ul className=" h-100% w-max inline-flex">
                        {characterList && characterList.rows.map((character, i) => (
                            <li key={character.$id} className="w-fit object-scale-down flex flex-col mx-3 snap-center"  > < Image loading="lazy"
                                src={character.imageUrl}
                                alt="Group of characters ready to adventure"
                                width={1200}
                                height={800}
                                sizes="100%"
                                className="rounded-lg h-full w-fit "
                                onClick={() => handleCharacterInfo(i)} />
                            </li>
                        ))}

                    </ul>
                </section>

            </section >
        </>
    )
}

export default CharacterPage