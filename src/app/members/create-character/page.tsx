"use client";
import React, { useEffect, useEffectEvent } from 'react'
import { useState } from "react";
import { getAuthenticatedAccount, getClient } from "@/lib/appwrite";
import { ID, Query, TablesDB, Models } from "appwrite";
// import { RowList } from "@/types";
import { useAuth } from "@/app/providers/AuthProvider";
import TextArea from 'antd/es/input/TextArea';
import Image from "next/image";
import { match } from 'assert';
type Class = {
    name: string;
    description: string;
    light_weapons: boolean;
    medium_weapons: boolean;
    heavy_weapons: boolean;
    heavy_armor: boolean;
    medium_armor: boolean;
    light_armor: boolean;
    light_shield: boolean;
    medium_shield: boolean;
    heavy_shield: boolean;
    two_weapon: boolean;
    ranged_weapons: boolean;
    white_cloth: number;
    green_cloth: number;
    spells_packets: number;
}
type Deity = {
    image: string;
    name: string;
    description: string;

}
type ClassAbilites = {
    class: string;
    level: number;
    title: string;
    scaling: number;
    description: string;
}
type Race = {
    name: string;
    description: string;
    ability: string;
    ability_description: string;

}
const CharacterCreationPage = () => {
    const QUERIES = [Query.equal("memberId", "68ccbf0f0026eb9a8d4f")]
    const { loggedInUser, logout } = useAuth();
    const [racesModel, setRacesModel] = useState("");
    const [nameModel, setNameModel] = useState("");

    const [subRacesModel, setSubRacesModel] = useState<Race>({
        name: "",
        description: "",
        ability: "",
        ability_description: "",

    });
    const [classesModel, setClassesModel] = useState<Class>({
        name: "",
        description: "",
        light_weapons: false,
        medium_weapons: false,
        heavy_weapons: false,
        heavy_armor: false,
        medium_armor: false,
        light_armor: false,
        light_shield: false,
        medium_shield: false,
        heavy_shield: false,
        two_weapon: false,
        ranged_weapons: false,
        white_cloth: 0,
        green_cloth: 0,
        spells_packets: 0,
    })
    const [levelModel, setLevelModel] = useState(1);
    const [classAbilitiesModel, setClassAbilitiesesModel] = useState<ClassAbilites>({
        class: "",
        level: 1,
        title: "",
        scaling: 1,
        description: "",
    });
    const [deitiesModel, setDeitiesModel] = useState<Deity>({
        image: "",
        name: "",
        description: ""
    });
    const [backStoryModel, setBackStoryModel] = useState("");



    const [raceList, setRaceList] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [subRaceList, setSubRaceList] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [classes, setClasses] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [deities, setDeities] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [classAbilites, setClassAbilites] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [error, setError] = useState(null)


    const DATABASE_ID = "68ccc1ab0001250042a8";
    const CLASS_ABILITES_TABLE_ID = "class_abilities";
    const DEITIES_TABLE_ID = "deities";
    const RACES_TABLE_ID = "races";
    const CLASSES_TABLE_ID = "classes";

    const client = getClient()
    const tableDB = new TablesDB(client);
    useEffect(() => {
        console.log("useEffect ran")
        let active = true
        const fetchData = async () => {
            try {
                const CLASS_ABILITES = await tableDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: CLASS_ABILITES_TABLE_ID,
                });
                const DEITIES = await tableDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: DEITIES_TABLE_ID,
                });
                const RACES = await tableDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: RACES_TABLE_ID,
                });
                const CLASSES = await tableDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: CLASSES_TABLE_ID,
                });
                console.dir(classAbilites)
                if (active) {
                    setClassAbilites(CLASS_ABILITES)
                    setRaceList(RACES)
                    setClasses(CLASSES)
                    setDeities(DEITIES)

                }
            } catch (error) {
                if (active) setError(error)
            }
        }
        fetchData();

        return () => { active = false };
    }, []
    )


    useEffect(() => {
        console.log("subRaceList", subRacesModel.name)
        console.dir(subRacesModel)
        console.dir(raceList)
        const match = raceList?.rows.find((row) => row.races === subRacesModel.name)
        console.dir("subRaceList", match);
        if (match) {
            setSubRacesModel({
                ...subRacesModel,
                description: `${match.description}`,
                ability: `${match.ability}`,
                ability_description: `${match.ability_description}`,
            })
        }
    }, [subRacesModel.name])


    //************************************************* */
    useEffect(() => {
        console.log("classAbilites=>")
        console.dir(classAbilites)
        if (!classAbilites || !subRacesModel.name) return;
        const match = classAbilites?.rows.find((row) => row.class === subRacesModel.name && row.level === levelModel)
        console.log("classAbilites", match)
    }, [classAbilitiesModel.class, levelModel, subRacesModel.name]
    );




    // console.dir(classes)
    useEffect(() => {

        if (!classes || !classesModel.name) return;
        const match = classes?.rows?.find((row) => row.classes === classesModel.name
        )
        if (match) {
            setClassesModel({
                ...classesModel!,
                description: match.description,
                light_weapons: match.light_weapons,
                medium_weapons: match.medium_weapons,
                heavy_weapons: match.heavy_weapons,
                heavy_armor: match.heavy_armor,
                medium_armor: match.medium_armor,
                light_armor: match.light_armor,
                light_shield: match.light_shield,
                medium_shield: match.medium_shield,
                heavy_shield: match.heavy_shield,
                two_weapon: match.two_weapon,
                ranged_weapons: match.ranged_weapons,
                white_cloth: match.white_cloth,
                green_cloth: match.green_cloth,
                spells_packets: match.spells_packets,
            })
        }
    }, [classesModel.name, classes])
    useEffect(() => {
        const match = deities?.rows.find((row) => row.God === deitiesModel.name);
        if (match) {
            setDeitiesModel({
                ...deitiesModel,
                description: match.description,
                image: match.image,
            });
        }
    }, [deitiesModel.name, deities]);



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
                                className='text-black border-2 w-3/5 border-black rounded-2xl px-2 bg-white m-2' onChange={(e) => setNameModel(e.target.value)} required />
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='races' className='ml-2 w-2/5'>Race:</label>
                            <select name="races" id="races" className="  border-2 border-black rounded-2xl px-2 bg-white m-2 w-3/5 text-black" onChange={(e) => setRacesModel(e.target.value)}>
                                <option value="choose">Choose...</option>
                                <option value="elf">Elf</option>
                                <option value="dwarf">Dwarf</option>
                                <option value="orc">Orc</option>
                                <option value="chimera">Chimera</option>
                                <option value="troll">Troll</option>
                                <option value="weeFolk">WeeFolk</option>
                                <option value="halfBreed">Half-Breed</option>
                            </select>

                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='subRace' className='ml-2 w-2/5'>Sub-Race:</label>
                            <select name="subRace" id="subRaceList" className=" border-2 border-black rounded-2xl px-2 bg-white m-2 w-3/5 text-black" onChange={(e) => setSubRacesModel((race) => ({
                                ...race!, name: e.target.value
                            }))}>
                                <option value="choose">Choose...</option>
                                {racesModel === "chimera" && <option value="Artanos">Artanos</option>}
                                {racesModel === "chimera" && <option value="Felinos">Felinos</option >}
                                {racesModel === "chimera" && <option value="Lacetros" >Lacetros</option >}
                                {racesModel === "chimera" && <option value="Lykinthros" >Lykinthros</option >}
                                {racesModel === "chimera" && <option value="Minotaur" >Minotaur</option >}
                                {racesModel === "chimera" && <option value="Satyr" >Satyr</option >}
                                {racesModel === "chimera" && <option value="Vulpine" >Vulpine</option >}
                                {racesModel === "dwarf" && <option value="Dark Dwarf" >Dark Dwarf</option >}
                                {racesModel === "dwarf" && <option value="Hill Dwarf" >Hill Dwarf</option >}
                                {racesModel === "elf" && <option value="Dark Elf" >Dark Elf</option >}
                                {racesModel === "elf" && <option value="High Elf" >High Elf</option >}
                                {racesModel === "elf" && <option value="Wood Elf" >Wood Elf</option >}
                                {racesModel === "human" && <option value="Human" >Human</option >}
                                {racesModel === "orc" && <option value="Grunthar Orc">Grunthar Orc</option >}
                                {racesModel === "orc" && <option value="Moruk Orc" >Moruk Orc</option >}
                                {racesModel === "orc" && <option value="Uroken Orc" >Uroken Orc</option >}
                                {racesModel === "troll" && <option value="Jungle Troll" >Jungle Troll</option >}
                                {racesModel === "weeFolk" && <option value="Buraling" >Buraling</option >}
                                {racesModel === "weeFolk" && <option value="Gnome" >Gnome</option >}
                                {racesModel === "weeFolk" && <option value="Halfling" >Halfling</option >}
                                {racesModel === "halfBreed" && <option value="Half-Elf" >Half-Elf</option >}
                                {racesModel === "halfBreed" && <option value="Half-Orc" >Half-Orc</option >}
                            </select >
                        </div >
                        <div className='flex justify-between'>
                            <label htmlFor='classes' className='ml-2 w-2/5'>Class:</label>
                            <select name="classes" id="classes" className="  border-2 border-black rounded-2xl px-2 bg-white m-2 w-3/5 text-black" onChange={(e) => setClassesModel((prev) => ({
                                ...prev!, name: e.target.value
                            }))}>
                                <option value="choose">Choose...</option>
                                <option value="Cleric">Cleric</option>
                                <option value="Fighter">Fighter</option>
                                <option value="Mage">Mage</option>
                                <option value="Ranger">Ranger</option>
                                <option value="Rogue">Rogue</option>
                            </select>
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='classes' className='ml-2 w-2/5'>Level:</label>
                            <div className="flex w-3/5">
                                <input type="button" name="levelDown" id="levelDown" value="-" className="border-2  border-black rounded-l-2xl pl-2 bg-white  my-2 w-1/3 text-black" onClick={() => { if (levelModel > 0) setLevelModel(levelModel - 1) }} />
                                <span className="border-y-2 border-black  px-2 bg-white my-2 w-1/3 text-black text-center"> {levelModel}</span>
                                <input type="button" name="levelUp" id="levelUp" value="+" className="border-2 border-black rounded-r-2xl pr-2 bg-white mr-2 w-1/3 my-2 text-black" onClick={() => { if (levelModel < 10) setLevelModel(levelModel + 1) }} />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='deities' className='ml-2 w-2/5'>Deities:</label>
                            <select name="deities" id="deities" className=" border-2 border-black rounded-2xl px-2 bg-white m-2 w-3/5 text-black" onChange={(e) => setDeitiesModel((deity) => ({ ...deity!, name: e.target.value }))}>
                                <option value="choose">Choose...</option>
                                <option value="Celnuntos">Celnuntos</option>
                                <option value="Corin">Corin</option>
                                <option value="Deidre">Deidre</option>
                                <option value="Dolus">Dolus</option>
                                <option value="Fleatea">Fleatea</option>
                                <option value="Gromtusk">Gromtusk</option>
                                <option value="Kahlee">Kahlee</option>
                                <option value="Izaryle">Izaryle</option>
                                <option value="Melaka">Melaka</option>
                                <option value="Osirus"> Osirus</option>
                                <option value="Ozmodius">Ozmodius</option>
                                <option value="Ragnarous">Ragnarous</option>
                                <option value="Rahul">Rahul</option>
                                <option value="Sulis">Sulis</option>
                                <option value="Theratis">Theratis</option>
                            </select>

                        </div>

                        <div className='flex justify-between'>
                            <label htmlFor='Backstory' className='ml-2'>Backstory:</label>
                            <textarea name="Backstory" rows={10} onChange={(e) => setBackStoryModel(e.target.value)}
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

                            <div className='flex'><h2>Name:  </h2> <p> {nameModel}</p></div>
                            <div className='flex '><h2>Race: </h2> <p> {subRacesModel.name}</p></div>
                            <div className='flex '><h2>Class: </h2> <p> {classesModel.name}</p></div>
                            <div className='flex '><h2>Level: </h2> <p> {`${levelModel}`}</p></div>

                            {deities && <div className='flex '>
                                <h2>Deity: </h2>

                                {/* <p> {deitiesModel.image}"</p> */}
                                {deitiesModel?.image?.startsWith('http') && (
                                    <Image
                                        src={deitiesModel.image}
                                        alt={`Deity: ${deitiesModel.name}`}
                                        width={1200}
                                        height={800}
                                        className=" object-scale-down h-4 w-fit self-center

                                        "
                                    />)}
                                <p className=" flex justify-start"> {deitiesModel.name} </p>
                            </div>}
                            {deities && <div className='flex '> <p> {deitiesModel.description}</p></div>}
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
                                        <td className="text-center">{classesModel.light_weapons ? "\u2705" : "\u26D4"}</td>
                                        <td className="text-center">{classesModel.medium_weapons ? "\u2705" : "\u26D4"}</td>
                                        <td className="text-center">{classesModel.heavy_weapons ? "\u2705" : "\u26D4"}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='text-end'>Armor:</th>
                                        <td className="text-center">{classesModel.light_armor ? "\u2705" : "\u26D4"}</td>
                                        <td className="text-center">{classesModel.medium_armor ? "\u2705" : "\u26D4"}</td>
                                        <td className="text-center">{classesModel.heavy_armor ? "\u2705" : "\u26D4"}</td>
                                    </tr>
                                    <tr className='- border-b'>
                                        <th scope="row" className='text-end'>Shield:</th>
                                        <td className="text-center">{classesModel.light_shield ? "\u2705" : "\u26D4"}</td>
                                        <td className="text-center">{classesModel.medium_shield ? "\u2705" : "\u26D4"}</td>
                                        <td className="text-center">{classesModel.heavy_shield ? "\u2705" : "\u26D4"}</td>

                                    </tr>
                                    <tr>

                                        <th scope="row" className='text-end border-t'>Two-Weapon:</th>
                                        <td className="text-center">{classesModel.two_weapon ? "\u2705" : "\u26D4"}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row" className='text-end'>Green Strips:</th>
                                        <td className="text-center">{classesModel.green_cloth}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='text-end'>White Strips:</th>
                                        <td className="text-center">{classesModel.white_cloth}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='text-end'>Spell Packets:</th>
                                        <td className="text-center">{classesModel.spells_packets}</td>
                                    </tr>


                                </tbody>
                            </table>
                            <div>
                                <div>
                                    <p>{JSON.stringify(subRacesModel)}: {subRacesModel.ability_description}</p>
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
                    {/* <div className='flex '><h2>Skills: </h2> <p> {JSON.stringify(classAbilites)}</p></div> */}
                    <div className='flex '><h2>Backstory: </h2> <p> {backStoryModel}</p></div>
                </section >
            </section >
        </section >
        </>
    )
}

export default CharacterCreationPage