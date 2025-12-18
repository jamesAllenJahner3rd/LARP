"use client";
import { useEffect, useState } from 'react'
import { getClient, getList, uploadClientFile, saveCharacter } from "@/lib/appwrite";
import { Query, TablesDB, Models } from "appwrite";
import { useAuth } from "@/app/providers/AuthProvider";
import Image from "next/image";
import * as CharacterTypes from "@/lib/types/characterTypes"
import useCharacterClasses from "./hooks/useCharacterClasses"
import { totalLevel } from "@/app/members/create-character/hooks/useCharacterClasses"
import { toast } from 'react-toastify';

type CharacterFormProp = {
    character: CharacterTypes.CharacterSheetRow;
    setCharacter: React.Dispatch<React.SetStateAction<CharacterTypes.CharacterSheetRow>>;
    characterClasses: Map<string, number>;
    setCharacterClasses: React.Dispatch<React.SetStateAction<Map<string, number>>>;
    deitiesList: Models.Row[] | null;
    SUBRACE_OPTIONS: Record<string, string[]>;
    RACES: string[];
    classList: Models.Row[];
    setClassList: React.Dispatch<React.SetStateAction<Models.Row[]>>;
    formInputs: CharacterTypes.FormInputs;
    setFormInputs: React.Dispatch<React.SetStateAction<CharacterTypes.FormInputs>>;
    DEITIES: string[];
    CLASSNAMES: string[];
    classSelected: (className: CharacterTypes.ClassName) => void;
    increaseLevel: () => void;
    decreaseLevel: () => void;
    setCharacterClassAbilities: React.Dispatch<React.SetStateAction<CharacterTypes.ClassAbilitiesRowList>>;
    characterClassAbilities: CharacterTypes.ClassAbilitiesRowList;
    classAbilitiesList: CharacterTypes.ClassAbilitiesRowList;
    raceList: CharacterTypes.RaceRowList;
};
const CharacterForm = ({
    character,
    setCharacter,
    characterClasses,
    setCharacterClasses,
    deitiesList,
    DEITIES,
    SUBRACE_OPTIONS,
    RACES,
    classList,
    setClassList,
    CLASSNAMES,
    formInputs,
    setFormInputs,
    characterClassAbilities,
    setCharacterClassAbilities,
    classSelected,
    increaseLevel,
    decreaseLevel,
    classAbilitiesList,
    raceList
}:
    CharacterFormProp
) => {
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const characterTotalLevel = Array.from(characterClasses.values()).reduce((a, c) => a + c, 0)
        try {
            if (character && character.name && character.subRace && character.deity && characterClasses.size === 1, characterTotalLevel === 1) {
                const result = await saveCharacter(character, characterClasses, characterClassAbilities)
                toast.success("Character saved")
            }
        } catch (error) {
            console.error(error, "Unable to save character")
            toast.error("Unable to save character")
        }
    }
    async function imageHandler(aFile: File) {
        const fileId = await uploadClientFile(aFile);
        setCharacter((character) => ({
            ...character,
            imageUrl: `https://nyc.cloud.appwrite.io/v1/storage/buckets/68c11c240013701075bb/files/${fileId}/view?project=68bb084a0032b02608c4&mode=admin`
        }))
    }

    return (
        <form onSubmit={handleSubmit} className='border-2 border-black rounded-2xl w-full justify-self-center flex flex-col  bg-neutral-400'>
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
                    ...character,
                    subRace: e.target.value,
                    raceDescription: (raceList.rows.find((row) => row.races === e.target.value)).race_description
                }))}>
                    <option value="choose">Choose...</option>
                    {SUBRACE_OPTIONS[character.race]?.map((subrace) => (
                        <option key={subrace} value={subrace}>{subrace}</option>
                    ))}
                </select >
            </div >
            <div className='flex justify-between'>
                <label htmlFor='classes' className='ml-2 w-2/5'>Class:</label>
                <select name="classes" id="classes" className="  border-2 border-black rounded-2xl px-2 bg-white m-2 w-3/5 text-black" onChange={
                    (e) => classSelected(e.target.value as CharacterTypes.ClassName)}>
                    {(characterClasses.size === 0 || totalLevel(characterClasses) >= 3) && <option value="choose">Choose...</option>}
                    {CLASSNAMES.map((className) => (
                        ((characterClasses.size === 0 || totalLevel(characterClasses) >= 3 || formInputs.class === className) && !(characterClasses.size === 3 && !characterClasses.has(className))
                        ) &&

                        <option value={className} key={className}>{className}</option>
                    ))}
                </select>
            </div>
            <div className='flex justify-between'>
                <label htmlFor='classes' className='ml-2 w-2/5'>Level:</label>
                <div className="flex w-3/5">
                    <input type="button" name="levelDown" id="levelDown" value="-" className="border-2  border-black rounded-l-2xl pl-2 bg-white  my-2 w-1/3 text-black" onClick={decreaseLevel} />
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
                <label htmlFor='uploader' className='flex  btn btn-secondary w-2/3'>Upload Image</label>
                <input type="file" id="uploader" className='-z-1 opacity-0 absolute  btn btn-secondary' name="Upload Image" accept="image/png, image/jpeg, image/webp"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            imageHandler(e.target.files?.[0])            // full File object with data
                        } else {
                            setCharacter((character) => {
                                return ({
                                    ...character,
                                    imageUrl: "/images/default.png"
                                })
                            })
                        }
                    }}
                />
                <input type='submit' value='Create' className='z-2 flex btn btn-secondary w-1/3' />
            </div>
        </form >
    )
}

export default CharacterForm