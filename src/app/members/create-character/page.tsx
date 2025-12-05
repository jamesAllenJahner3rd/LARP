"use client";
import React, { useEffect } from 'react'
import { useState } from "react";
import { getClient, getList } from "@/lib/appwrite";
import CharacterForm from './CharacterForm';
import { Query, TablesDB, Models } from "appwrite";
// import { RowList } from "@/types";
import { useAuth } from "@/app/providers/AuthProvider";
import Image from "next/image";
import * as CharacterTypes from "@/lib/types/characterTypes"
import CharacterSummary from './CharacterSummary';
import useCharacterClasses from './hooks/useCharacterClasses';
const SUBRACE_OPTIONS: Record<string, string[]> = {
    Chimera: ["Artanos", "Felinos", "Lacetros", "Lykinthros", "Minotaur", "Satyr", "Vulpine"],
    Dwarf: ["Dark Dwarf", "Hill Dwarf"],
    Elf: ["Dark Elf", "High Elf", "Wood Elf"],
    Human: ["Human"],
    Orc: ["Grunthar Orc", "Moruk Orc", "Uroken Orc"],
    Troll: ["Jungle Troll"],
    WeeFolk: ["Buraling", "Gnome", "Halfling"],
    HalfBreed: ["Half-Elf", "Half-Orc"],
};
const DATABASE_ID = "68ccc1ab0001250042a8";
const CLASS_ABILITES_TABLE_ID = "class_abilities";
const DEITIES_TABLE_ID = "deities";
const RACES_TABLE_ID = "races";
const CLASSES_TABLE_ID = "classes";
const CLASSNAMES = ["Fighter", "Cleric", "Ranger", "Mage", "Rogue"];
const DEITIES = ["Celnuntos", "Corin", "Deidre", "Dolus", "Fleatea", "Gromtusk", "Kahlee", "Izaryle", "Melaka", "Osirus", "Ozmodius", "Ragnarous", "Rahul", "Sulis", "Theratis"];
const RACES = ["Elf", "Dwarf", "Orc", "Chimera", "Troll", "WeeFolk", "HalfBreed"]

const CharacterCreationPage = () => {
    const QUERIES = [Query.equal("memberId", "68ccbf0f0026eb9a8d4f")];
    const { loggedInUser, logout } = useAuth();

    const [character, setCharacter] = useState<CharacterTypes.Character>(
        {
            memberId: loggedInUser?.$id,
            name: "",
            race: "",
            subRace: "",
            raceDescription: "",
            raceAbilities: "",
            raceAbilityDescription: "",
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
            rangedWeapons: 0,
            whiteCloth: 0,
            greenCloth: 0,
            history: "",
            spellsPackets: 0,
            imageUrl: "/images/default.png",
        }
    );
    const [characterClasses, setCharacterClasses] = useState<Map<string, number>>(new Map());
    const [characterClassAbilities, setCharacterClassAbilities] = useState<CharacterTypes.ClassAbilities | null>([])
    const [formInputs, setFormInputs] = useState<CharacterTypes.FormInputs>({
        class: "",
        level: 0,

    });



    const [raceList, setRaceList] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [subRaceList, setSubRaceList] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [classList, setClassList] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [deitiesList, setDeitiesList] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [classAbilitiesList, setClassAbilitiesList] = useState<Models.RowList<Models.DefaultRow> | null>(null);
    const [error, setError] = useState(null)

    const classLogic = useCharacterClasses({
        character,
        setCharacterClasses,
        characterClasses,
        setCharacter,
        formInputs,
        setFormInputs,
        classList,
        characterClassAbilities,
        setCharacterClassAbilities,
        classAbilitiesList,
    });

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
                raceDescription: match.race_description,
                raceAbilities: match.ability,
                raceAbilityDescription: match.ability_description,
            }))
        }
    }, [character?.subRace])



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

    return (

        <><section className='w-full relative '>
            {/* {races && <p>{`${JSON.stringify(races?.rows.find((row) => row.races === "Minotaur"))}`}</p>}
            {races && <p>{`${JSON.stringify(races?.rows.find((row) => row.races === "Minotaur"))}`}</p>} */}
            <section className='w-full flex '>
                <section className='w-2/5 self-center item-center'>
                    <h1 className='h1 flex justify-center m-5 text-black'>Character Creation</h1>
                    <CharacterForm
                        character={character}
                        setCharacter={setCharacter}
                        characterClasses={characterClasses}
                        setCharacterClasses={setCharacterClasses}
                        deitiesList={deitiesList}
                        DEITIES={DEITIES}
                        SUBRACE_OPTIONS={SUBRACE_OPTIONS}
                        RACES={RACES}
                        classList={classList}
                        setClassList={setClassList}
                        CLASSNAMES={CLASSNAMES}
                        formInputs={formInputs}
                        setFormInputs={setFormInputs}
                        characterClassAbilities={characterClassAbilities} setCharacterClassAbilities={setCharacterClassAbilities}
                        classAbilitiesList={classAbilitiesList}
                        raceList={raceList}
                        {...classLogic}
                    />
                </section >
                <CharacterSummary
                    characterClassAbilities={characterClassAbilities}
                    character={character}
                    deitiesList={deitiesList}
                    characterClasses={characterClasses} />
            </section >
        </section >
        </>
    )
}

export default CharacterCreationPage

