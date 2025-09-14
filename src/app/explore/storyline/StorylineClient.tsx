"use client";
import React, { useState } from 'react';
import type { Models } from 'appwrite';



const StorylineClient = ({ entries }: { entries: Models.Document[] }) => {
    console.log(entries)
    const [logExpanded, setLogExpanded] = useState<boolean[]>(Array(entries.length).fill(false))

    function expandToggle(id: number, text: string) {
        let print: string[] = [""]
        return logExpanded[id] === true ? text : `${text.substring(0, 30)}... (click to expand)`;

    }

    return (
        <div className='mb-48'>
            <h2>Storyline</h2>
            {entries.map((log, id) => (
                <article key={log.$id}>
                    <h3 className=' cursor-default'>{log.heading}</h3>
                    <time>{new Date(log.$createdAt).toLocaleDateString()}</time>
                    <div className='indent-1 w-4/5 justify-self-center-safe cursor-pointer' onClick={() => { setLogExpanded(prev => prev.map((t, i) => i === id ? !t : t)) }}>
                        {expandToggle(id, log.body).split("\\n").map((line, i) => (
                            <React.Fragment key={i}>
                                <p className='indent-5 leading-10'>{line}</p>

                            </React.Fragment>
                        ))}
                    </div>
                </article>
            ))
            }
            <fieldset>
                <form>
                    <label htmlFor="heading">Title:</label>
                    <input id="heading" type='text' />
                    <label htmlFor="body">Article:</label>
                    <input id="body" type="textbox" />
                    <button>Up Load</button>
                </form>

            </fieldset>

        </div >
    )
}



export default StorylineClient