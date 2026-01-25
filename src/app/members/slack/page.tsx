"use client";

import { useAuth } from "@/app/providers/AuthProvider";
import { useEffect, useState } from "react";
import { getClient, getAuthenticatedAccount } from "@/lib/appwrite";

import Image from 'next/image'
import { TablesDB, Query, Databases } from "appwrite";
import { CompleteCharacterSheet } from "@/lib/types/characterTypes"

/**
 * SlackPage
 *
 * Purpose:
 *   Provides a real‑time chat interface where a logged‑in user can speak
 *   as their selected character. Integrates with the backend Slack bridge
 *   via Server‑Sent Events (SSE) for live message updates.
 *
 * Responsibilities:
 *   - Load the user's selected character from localStorage.
 *   - Establish a persistent SSE connection to /api/slack/stream.
 *   - Append incoming Slack messages to local UI state.
 *   - Allow the user to send messages as the selected character via POST /api/slack/send.
 *   - Render the full character sheet alongside the chat interface.
 *
 * Behavior:
 *   - SSE connection opens once on mount and closes on unmount.
 *   - Messages are appended in arrival order; no pagination or history loading.
 *   - Character data is assumed to be valid JSON stored in localStorage.
 *   - If no character is selected, the character panel does not render.
 *
 * Returns:
 *   - A full-page UI containing character details, live message feed,
 *     and a message input box.
 *
 * Dependencies:
 *   - /api/slack/stream for real‑time events.
 *   - /api/slack/send for outbound messages.
 *   - AuthProvider for user authentication context.
 *   - CompleteCharacterSheet type for character structure.
 *
 * Notes for Future Maintainers:
 *   - If you add authentication to SSE, do it before creating EventSource.
 *   - If you add message history, load it before attaching SSE listeners.
 *   - If you add multiple characters, ensure localStorage key remains stable.
 *   - SSE is sensitive to caching; keep the backend headers strict.
 */
const SlackPage = (characterId) => {
    const [characterSelected, setCharacterSelected] = useState<CompleteCharacterSheet>(null)
    const { loggedInUser, logout } = useAuth();

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const loadMessages = async (loadMore = false) => {
        const client = getClient();
        const databases = new Databases(client);
        const queries = [Query.orderDesc('timestamp'), Query.limit(20)];
        if (loadMore) {
            queries.push(Query.offset(offset));
        }
        try {
            const response = await databases.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_STORYLINE_DATABASE_ID!,
                'messages',
                queries
            );


            const fetched = response.documents.map(doc => ({ username: doc.username, text: doc.text }));
            if (loadMore) {
                setMessages(prev => [...fetched.reverse(), ...prev]);
            } else {
                setMessages(fetched.reverse());
            }
            setOffset(prev => prev + fetched.length);
            if (fetched.length < 20) setHasMore(false);
        } catch (error) {
            console.error(error, "Failed to retrieve messages")
        }
    };


    useEffect(() => {
        const stored = localStorage.getItem("characterSelected");
        if (stored) setCharacterSelected(JSON.parse(stored));
        loadMessages();
    }, []),


        useEffect(() => {
            console.log("SSE connecting...");

            const events = new EventSource(
                "/api/slack/stream"
            );
            events.onopen = () => console.log("SSE connection opened");
            events.onerror = (err) => console.log("SSE error:", err);

            events.onmessage = (e) => {
                console.log("SSE:", e.data);
                const data = JSON.parse(e.data);
                setMessages((prev) => [...prev, data]);
            };

            return () => events.close();
        }, []);



    const send = async () => {
        try {
            await fetch("/api/slack/send", {
                method: "POST",
                body: JSON.stringify({
                    name: characterSelected.name,
                    imageUrl: characterSelected.imageUrl,
                    text
                }),
            });
            console.log("Message sent.");
        } catch (error) {
            console.error(error, "Failed to fetch slack/send api")
        }

        setText("");
    };

    return (
        <div className="flex flex-col h-full md:flex-row">
            <section className='flex flex-col w-full justify-between h-full overflow-auto md:max-w-[1080px]' id="whole page">
                {characterSelected &&
                    <section className=" flex flex-col w-full h-6/7 md:h-full bg-[url(/images/parchment.png)] overflow-auto" id="Character">
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
                                                <dt className='text-end'>XP: </dt>
                                                <dd className='text-center'>{characterSelected.experience}</dd>
                                                <dt className='text-end'>Class: </dt>
                                                {characterSelected?.class?.map((clss) => <dd className='text-center' key={clss[0]}>{clss[0]} {clss[1]} lvl</dd>)}
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


            </section >


            <div id="chatInterface" className="h-1/3 md:h-full md:w-1/3 lg:w-2/3 flex flex-col border-t border-gray-700">
                <div className="flex-1 overflow-y-auto space-y-2 p-4">
                    {messages.map((m, i) => (
                        <div key={i} className="p-2 bg-gray-100 rounded">
                            <div className="font-bold">{m.username}</div>
                            <div>{m.text}</div>
                        </div>
                    ))}
                </div>

                {hasMore && (
                    <div className="p-4 text-center">
                        <button
                            className="bg-blue-600 px-4 py-2 rounded"
                            onClick={() => loadMessages(true)}
                        >
                            Load More
                        </button>
                    </div>
                )}

                <div className="p-4 flex gap-2">
                    <input
                        className="flex-1 bg-white p-2 rounded"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 px-4 py-2 rounded"
                        onClick={send}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>

    );

}

export default SlackPage