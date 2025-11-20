"use client";
import React, { useEffect } from 'react'
import { useState } from "react";
import { getClient, getList } from "@/lib/appwrite";

import { Query, TablesDB, Models } from "appwrite";
// import { RowList } from "@/types";
import { useAuth } from "@/app/providers/AuthProvider";
import Image from "next/image";
import * as CharacterTypes from "@/lib/types/characterTypes"


const CharacterCreationPage = () => {
    const QUERIES = [Query.equal("memberId", "68ccbf0f0026eb9a8d4f")]
    const { loggedInUser, logout } = useAuth();

    const [character, setCharacter] = useState<CharacterTypes.Character>(
        {
            memberId: loggedInUser?.$id,
            name: "",
            race: "",
            subRace: "",
            raceDescription: "",
            raceAbilities: [],
            raceAbilityDescription: [],
            classDescription: "",
            deity: "",
            deityImage: "",
            deityDescription: "",
            lightWeapons: false,
            mediumWeapons: false,
            heavyWeapons: false,
            heavyArmor: false,
            mediumArmor: false,
            lightArmor: false,
            lightShield: false,
            mediumShield: false,
            heavyShield: false,
            twoWeapon: false,
            rangedWeapons: false,
            whiteCloth: 0,
            greenCloth: 0,
            history: "",
            spellsPackets: 0,
            imageUrl: "",
        }
    );
    const [characterClasses, setCharacterClasses] = useState<Map<string, number>>(new Map());
    const [characterClassAbilities, setCharacterClassAbilities] = useState([])
    const [formInputs, setFormInputs] = useState<CharacterTypes.FormInputs>({
        class: "",
        level: 0,

    })


    const [raceList, setRaceList] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [subRaceList, setSubRaceList] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [classList, setClassList] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [deitiesList, setDeitiesList] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [classAbilitiesList, setClassAbilitiesList] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [error, setError] = useState(null)


    const DATABASE_ID = "68ccc1ab0001250042a8";
    const CLASS_ABILITES_TABLE_ID = "class_abilities";
    const DEITIES_TABLE_ID = "deities";
    const RACES_TABLE_ID = "races";
    const CLASSES_TABLE_ID = "classes";
    const CLASSNAMES = ["Fighter", "Cleric", "Ranger", "Mage", "Rogue"];
    const DEITIES = ["Celnuntos", "Corin", "Deidre", "Dolus", "Fleatea", "Gromtusk", "Kahlee", "Izaryle", "Melaka", "Osirus", "Ozmodius", "Ragnarous", "Rahul", "Sulis", "Theratis"];
    const RACES = ["Elf", "Dwarf", "Orc", "Chimera", "Troll", "WeeFolk", "HalfBreed"]
    const client = getClient()
    const tableDB = new TablesDB(client);
    //GET DATA FROM DATABASE
    useEffect(() => {
        console.log("GET DATA FROM DATABASE")
        let active = true;
        (async () => {
            try {
                const [DEITIES, RACES, CLASSES, CLASS_ABILITES] = await Promise.all([
                    getList(DATABASE_ID, DEITIES_TABLE_ID),
                    getList(DATABASE_ID, RACES_TABLE_ID),
                    getList(DATABASE_ID, CLASSES_TABLE_ID),
                    getList(DATABASE_ID, CLASS_ABILITES_TABLE_ID)
                ])
                if (active) {
                    setClassAbilitiesList(CLASS_ABILITES)
                    setRaceList(RACES)
                    setClassList(CLASSES)
                    setDeitiesList(DEITIES)

                }
            } catch (error) {
                if (active) setError(error)
            }
        })()


        return () => { active = false };
    }, []
    )

    //RACES
    useEffect(() => {
        const match = raceList?.rows.find((row) => row.races === character.subRace)
        if (match) {
            setCharacter((character) => ({
                ...character,
                raceDescription: match.description,
                raceAbilities: [match.ability],
                raceAbilityDescription: [match.ability_description],
            }))
        }
    }, [character?.subRace])


    //CLASS ABLITIES************************************************* */
    // useEffect(() => {
    //     // // console.log(" Has a class been chosen?", !classAbilitiesList || !character.subRace)

    //     // // if (!classAbilitiesList || !classesRef) return;
    //     // // console.dir(classAbilitiesList)
    //     // // console.log("character.class", character)
    //     // // let ?
    //     //     // setCharacter((character) => ({
    //     //     //     ...character,
    //     //     //     classAbilities: [...character.classAbilities, JSON.stringify({
    //     //     //         "class": `${match.class}`,
    //     //     //         "level": `${match.level}`,
    //     //     //         "title": `${match.title}`,
    //     //     //         "scaling": `${match.scaling}`,
    //     //     //         "description": `${match.description}`
    //     //     //     })]
    //     //     // }))
    // }
    // }, []
    // );
    //DEITIES
    useEffect(() => {
        const match = deitiesList?.rows.find((row) => row.God === character.deity);
        if (match) {
            setCharacter((character) => ({
                ...character,
                deityDescription: match.description,
                deityImage: match.image,
            }));
        }
    }, [character.deity, deitiesList]);
    // useEffect(() => { }, [levelModel.total])
    // function decreaseLevel() {
    //     character.level.reduce((a, b) => a + b, 0)
    //     if (character.level[3] > 0) {
    //         setCharacter((character) => ({
    //             ...character,
    //             level: [character.level[0], character.level[1], character.level[2], character.level[3] - 1]
    //         }))
    //     }
    // }
    // CLASS

    function updateClassInfo() {
        console.log("updateClassInfo: update Class FART info triggered", "characterClasses.size", "classList", !classList);
        console.dir(characterClasses.size)
        if (!classList) return;
        console.log(typeof characterClasses, "characterClasses", characterClasses)

        const currentClasses = Array.from(characterClasses?.keys()) // Grab class is of the character.
        const matched = currentClasses.map((className) => classList.rows.find((row) => row.classes === className))// For each class name I'm gonna look in the classList rows For row where the class is equals the class name. This will return an array of rows
        // .filter((row): row is typeof classList.rows[number] => !!row);
        //So this is filtering out any row that would be undefined or Null. And reassuring Typescript of the type of each row
        const reducedClassInfo = matched
            .reduce((acc, cur) => {
                return {
                    classDescription: cur.description,
                    lightWeapons: acc.lightWeapons || cur.lightWeapons,
                    mediumWeapons: acc.mediumWeapons || cur.mediumWeapons,
                    heavyWeapons: acc.heavyWeapons || cur.heavyWeapons,
                    heavyArmor: acc.heavyArmor || cur.heavyArmor,
                    mediumArmor: acc.mediumArmor || cur.mediumArmor,
                    lightArmor: acc.lightArmor || cur.lightArmor,
                    lightShield: acc.lightShield || cur.lightShield,
                    mediumShield: acc.mediumShield || cur.mediumShield,
                    heavyShield: acc.heavyShield || cur.heavyShield,
                    twoWeapon: acc.twoWeapon || cur.twoWeapon,
                    rangedWeapons: acc.rangedWeapons || cur.rangedWeapons,
                    whiteCloth: Math.max(acc.whiteCloth, cur.whiteCloth),
                    greenCloth: Math.max(acc.greenCloth, cur.greenCloth),
                    spellsPackets: Math.max(acc.spellsPackets, cur.spellsPackets)
                }
            }, {
                classDescription: "",
                lightWeapons: false,
                mediumWeapons: false,
                heavyWeapons: false,
                heavyArmor: false,
                mediumArmor: false,
                lightArmor: false,
                lightShield: false,
                mediumShield: false,
                heavyShield: false,
                twoWeapon: false,
                rangedWeapons: false,
                whiteCloth: 0,
                greenCloth: 0,
                spellsPackets: 0,
            }
            );
        setCharacter((character) => ({
            ...character!,
            classDescription: reducedClassInfo.classDescription,
            lightWeapons: reducedClassInfo.lightWeapons,
            mediumWeapons: reducedClassInfo.mediumWeapons,
            heavyWeapons: reducedClassInfo.heavyWeapons,
            heavyArmor: reducedClassInfo.heavyArmor,
            mediumArmor: reducedClassInfo.mediumArmor,
            lightArmor: reducedClassInfo.lightArmor,
            lightShield: reducedClassInfo.lightShield,
            mediumShield: reducedClassInfo.mediumShield,
            heavyShield: reducedClassInfo.heavyShield,
            twoWeapon: reducedClassInfo.twoWeapon,
            rangedWeapons: reducedClassInfo.rangedWeapons,
            whiteCloth: reducedClassInfo.whiteCloth,
            greenCloth: reducedClassInfo.greenCloth,
            spellsPackets: reducedClassInfo.spellsPackets,
        }));
    }

    function totalLevel(classLevelPairs: Map<string, number>): number {
        const toBeSummed = Array.from(classLevelPairs.values())
        if (Array.isArray(toBeSummed)) {
            return toBeSummed?.reduce((sum, addends) => sum + addends, 0)
        }
        else return 0
    }
    function increaseLevel() {
        let tempLevel = 0;
        console.log("increase pressed")
        // Check to see if there are three classes. Need to check if the total classes or 10
        if (formInputs.class && totalLevel(characterClasses) < 10 && (characterClasses.size <= 3)) {
            // check To see if the selected class is in the  characterClass object already
            if (!Array.from(characterClasses.keys()).some((className) => className === formInputs.class)) {
                //If the class has not been added we need to add the Class and the level of one to the characterClass array
                setCharacterClasses((characterClasses) => {
                    const updatedClasses = new Map(characterClasses);
                    updatedClasses.set(formInputs.class, 1);
                    tempLevel = 1;
                    return updatedClasses;
                });
                setFormInputs((formInputs) => ({ ...formInputs, "class": formInputs.class, "level": 1 }))
                console.log("This character hasn't a level in this class")
            } else {
                console.log("This character's level")
                //      Else we will increment the level of the current class.
                setCharacterClasses((characterClasses) => {
                    const CharacterClassList = new Map(characterClasses);
                    CharacterClassList.set(formInputs.class, formInputs.level + 1);
                    return CharacterClassList;
                })
                setFormInputs((formInputs) => ({
                    ...formInputs,
                    "level": formInputs.level + 1
                }))
                tempLevel = formInputs.level + 1
                console.log("trigger update class info from increase")

            } console.log("IncreaseLevel - trigger update class info from increase", characterClasses)
            console.dir(formInputs)

            //         //      Then we need to check and see if there are any abilities associated with that level of class.
            //         //             If true we check if that ability is in the character ability list.
            //         //                  If it isn't we'll add ability ID to the ability list and the scale
            //         //                  Else we will update the scale. 
            updateClassInfo()
        }
    }
    useEffect(() => {
        if (characterClasses.size > 0 && classList) {
            updateClassInfo();
        }
    }, [characterClasses, formInputs.class, classList]);

    const subraceOptions: Record<string, string[]> = {
        Chimera: ["Artanos", "Felinos", "Lacetros", "Lykinthros", "Minotaur", "Satyr", "Vulpine"],
        Dwarf: ["Dark Dwarf", "Hill Dwarf"],
        Elf: ["Dark Elf", "High Elf", "Wood Elf"],
        Human: ["Human"],
        Orc: ["Grunthar Orc", "Moruk Orc", "Uroken Orc"],
        Troll: ["Jungle Troll"],
        WeeFolk: ["Buraling", "Gnome", "Halfling"],
        HalfBreed: ["Half-Elf", "Half-Orc"],
    };
    function classSelected(chosenClass): void {
        const classMatch = Array.from(characterClasses.keys()).find((className) => className === chosenClass)
        if (classMatch === chosenClass) {
            setFormInputs((inputs) => {
                return ({
                    ...inputs,
                    "class": chosenClass,
                    "level": characterClasses.get(classMatch)
                })
            })
        } else {
            setFormInputs((inputs) => {
                return ({
                    ...inputs,
                    "class": chosenClass,
                    "level": 0
                })
            })
        }
    }

    return (

        <><section className='w-full relative '>
            {/* {races && <p>{`${JSON.stringify(races?.rows.find((row) => row.races === "Minotaur"))}`}</p>}
            {races && <p>{`${JSON.stringify(races?.rows.find((row) => row.races === "Minotaur"))}`}</p>} */}
            <section className='w-full flex '>
                <section className='w-2/5 self-center item-center'>
                    <h1 className='h1 flex justify-center m-5 text-black'>Character Creation</h1>
                    <form action="" className='border-2 border-black rounded-2xl w-full justify-self-center md:w-fit flex flex-col  bg-neutral-500'>
                        <div className='flex justify-between'>
                            <label htmlFor='name' className='ml-2 w-2/5'>Name:</label>
                            <input type="text" name="name"
                                className='text-black border-2 w-3/5 border-black rounded-2xl px-2 bg-white m-2' onChange={(e) => setCharacter((character) => ({
                                    ...character,
                                    name: e.target.value
                                }))}
                                required />
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='races' className='ml-2 w-2/5'>Race:</label>
                            <select name="races" id="races" className="  border-2 border-black rounded-2xl px-2 bg-white m-2 w-3/5 text-black" onChange={(e) => setCharacter(({
                                ...character,
                                race: e.target.value
                            }))}>
                                <option value="choose">Choose...</option>
                                {RACES.map((race) => (<option value={race} key={race}>{race}</option
                                >))}
                            </select>
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='subRace' className='ml-2 w-2/5'>Sub-Race:</label>
                            <select name="subRace" id="subRaceList" className=" border-2 border-black rounded-2xl px-2 bg-white m-2 w-3/5 text-black" onChange={(e) => setCharacter((character) => ({
                                ...character, subRace: e.target.value
                            }))}>
                                <option value="choose">Choose...</option>
                                {subraceOptions[character.race]?.map((subrace) => (
                                    <option key={subrace} value={subrace}>{subrace}</option>
                                ))}
                            </select >
                        </div >
                        <div className='flex justify-between'>
                            <label htmlFor='classes' className='ml-2 w-2/5'>Class:</label>
                            <select name="classes" id="classes" className="  border-2 border-black rounded-2xl px-2 bg-white m-2 w-3/5 text-black" onChange={
                                (e) => classSelected(e.target.value)}>
                                {(characterClasses.size === 0 || totalLevel(characterClasses) >= 3) && <option value="choose">Choose...</option>}
                                {CLASSNAMES.map((className) => (
                                    ((characterClasses.size === 0 || totalLevel(characterClasses) >= 3 || formInputs.class === className) && !(characterClasses.size === 3 && !characterClasses.has(className))) &&

                                    <option value={className} key={className}>{className}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='classes' className='ml-2 w-2/5'>Level:</label>
                            <div className="flex w-3/5">
                                <input type="button" name="levelDown" id="levelDown" value="-" className="border-2  border-black rounded-l-2xl pl-2 bg-white  my-2 w-1/3 text-black" /*onClick={decreaseLevel}*/ />
                                <span className="border-y-2 border-black  px-2 bg-white my-2 w-1/3 text-black text-center"> {formInputs.level || '0'}</span>
                                <input type="button" name="levelUp" id="levelUp" value="+" className="border-2 border-black rounded-r-2xl pr-2 bg-white mr-2 w-1/3 my-2 text-black" onClick={increaseLevel} />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='deities' className='ml-2 w-2/5'>Deities:</label>
                            <select name="deities" id="deities" className=" border-2 border-black rounded-2xl px-2 bg-white m-2 w-3/5 text-black" onChange={(e) => setCharacter((character) => ({ ...character!, deity: e.target.value }))}>
                                <option value="choose">Choose...</option>
                                {DEITIES.map((god) => (
                                    <option value={god} key={god}>{god}</option>
                                ))}
                            </select>

                        </div>

                        <div className='flex justify-between'>
                            <label htmlFor='Backstory' className='ml-2'>Backstory:</label>
                            <textarea name="Backstory" rows={10} onChange={(e) => setCharacter((character) => ({ ...character, history: e.target.value }))}
                                className='text-black border-2 border-black rounded-2xl px-2 bg-white m-2' />
                        </div>
                        <div className='flex justify-center content-center'>
                            <button
                                className='flex  btn btn-secondary'> Upload Image</button>
                            <input type='submit' value='Create' className='flex btn btn-secondary' />
                        </div>
                    </form >
                </section >
                <section className='w-3/5 flex flex-col bg-green-200'>
                    <div className='flex justify-between'>
                        <div>

                            <div className='flex'><h2>Name:  </h2> <p> {character.name}</p></div>
                            <div className='flex '><h2>Race: </h2> <p> {character.subRace}</p></div>
                            <h2>Class:&nbsp;</h2>
                            {characterClasses.size > 0 &&
                                Array.from(characterClasses.keys()).map((className) => (
                                    <React.Fragment key={className}>
                                        <div className='flex'>  <h2 className="ml-4">Class:</h2><span> {className} {characterClasses.get(className)} lvl</span></div>
                                        <div className='flex'></div>
                                    </React.Fragment>
                                ))}


                            {deitiesList && <div className='flex '>
                                <h2>Deity: </h2>


                                {character.deityImage?.startsWith('http') && (
                                    <Image
                                        src={character.deityImage}
                                        alt={`Deity: ${character.deity}`}
                                        width={1200}
                                        height={800}
                                        className=" object-scale-down h-4 w-fit self-center

                                        "
                                    />)}
                                <p className=" flex justify-start"> {character.deity} </p>
                            </div>}
                            {deitiesList && <div className='flex '> <p> {character.deityDescription}</p></div>}
                            <table border={1} className="grid-cols-3 grid-row-3 w-full ">
                                <thead className="text-center">
                                    <tr>
                                        <th>Item</th>
                                        <th scope='col' className="px-1">Light</th>
                                        <th scope="col" className="px-1">Medium</th>
                                        <th scope="col" className="px-1">Heavy</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className='text-end'>Weapons:</th>
                                        <td className="text-center">{character.lightWeapons ? "\u2705" : "\u26D4"}</td>
                                        <td className="text-center">{character.mediumWeapons ? "\u2705" : "\u26D4"}</td>
                                        <td className="text-center">{character.heavyWeapons ? "\u2705" : "\u26D4"}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='text-end'>Armor:</th>
                                        <td className="text-center">{character.lightArmor ? "\u2705" : "\u26D4"}</td>
                                        <td className="text-center">{character.mediumArmor ? "\u2705" : "\u26D4"}</td>
                                        <td className="text-center">{character.heavyArmor ? "\u2705" : "\u26D4"}</td>
                                    </tr>
                                    <tr className='- border-b'>
                                        <th scope="row" className='text-end'>Shield:</th>
                                        <td className="text-center">{character.lightShield ? "\u2705" : "\u26D4"}</td>
                                        <td className="text-center">{character.mediumShield ? "\u2705" : "\u26D4"}</td>
                                        <td className="text-center">{character.heavyShield ? "\u2705" : "\u26D4"}</td>

                                    </tr>
                                    <tr>

                                        <th scope="row" className='text-end border-t'>Two-Weapon:</th>
                                        <td className="text-center">{character.twoWeapon ? "\u2705" : "\u26D4"}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row" className='text-end'>Green Strips:</th>
                                        <td className="text-center">{character.greenCloth}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='text-end'>White Strips:</th>
                                        <td className="text-center">{character.whiteCloth}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='text-end'>Spell Packets:</th>
                                        <td className="text-center">{character.spellsPackets}</td>
                                    </tr>


                                </tbody>
                            </table>
                            <div>
                                <div>
                                    <h2>{character.raceAbilities}: </h2> <p>{character.raceAbilityDescription}</p>
                                </div>
                                <div>
                                    <h2> Class Skills:</h2>
                                </div>
                            </div>
                        </div>

                        <Image
                            src="/images/DeanSpencer-Character-moonelf-e1680414816906.webp"
                            alt="Group of characters ready to adventure"
                            width={1200}
                            height={800}

                            className="object-scale-down flex w-1/2
                              right-50rem top-0"
                        />
                    </div >
                    <div></div>
                    {/* <div className='flex '><h2>Class Skills: </h2> <p> {JSON.stringify(classAbilities.rows)}</p></div> */}
                    <ol>
                        {characterClassAbilities.length && characterClassAbilities.map((li, i) => (
                            <li key={i}>
                                <h2>
                                    {li.title}
                                </h2>
                                <p>
                                    {li.description}
                                </p>
                            </li>
                        ))}
                    </ol>
                    <div className='flex '><h2>Backstory: </h2> <p> {character.history}</p></div>
                </section >
            </section >
        </section >
        </>
    )
}

export default CharacterCreationPage