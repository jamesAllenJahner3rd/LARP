import React from "react";
import Image from "next/image";
import type * as CharacterTypes from "@/lib/types/characterTypes";
import type { Models } from "appwrite";

import type { storage } from "@/lib/appwrite-node";

type CharacterSummaryProp = {
    characterClassAbilities: CharacterTypes.ClassAbilitiesList;
    character: CharacterTypes.CompleteCharacterSheet;
    deitiesList: CharacterTypes.DeityProps[] | null;
    characterClasses: Map<string, number>;
}


const CharacterSummary = ({
    characterClassAbilities,
    character,
    deitiesList,
    characterClasses,
}:
    CharacterSummaryProp
) => {
    // use character, characterClasses, etc. directly

    // public/images/parchment.png
    return (
        <section className='w-full md:w-2/3 block md:flex flex-col bg-[url(/images/parchment.png)]'>
            <div className='block md:flex justify-between'>
                <div>

                    <div className='flex'><h2>Name:  </h2> <p> {character.name}</p></div>
                    <div className='flex '><h2>Race: </h2> <p> {character.subRace}</p></div>
                    <h2>Class:&nbsp;</h2>
                    {characterClasses.size > 0 &&
                        Array.from(characterClasses.keys()).map((className) => (
                            <React.Fragment key={className}>
                                <div className='flex'> <span> {className} {characterClasses.get(className)} lvl</span></div>
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

                                <th scope="row" className='text-end border-t'>Two Weapons:</th>
                                <td className="text-center">{character.twoWeapon ? "\u2705" : "\u26D4"}</td>
                            </tr><tr>
                                <th scope="row" className='text-end'>Ranged Weapons:</th>
                                <td className="text-center">{character.rangedWeapons}</td>
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

                </div>

                <Image
                    src={character.imageUrl || "/images/Default.png"}
                    alt="Group of characters ready to adventure"
                    width={1200}
                    height={800}

                    className="object-scale-down block md:flex w-full md:w-1/2
                              right-50rem self-start"
                />
            </div >
            <div>
                <div>
                    <h2>{character.raceAbilities}: </h2> <p>{character.raceAbilityDescription}</p>
                </div>
                <div>
                    <h2> Class Skills:</h2>
                </div>
            </div>

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

    )
}

export default CharacterSummary