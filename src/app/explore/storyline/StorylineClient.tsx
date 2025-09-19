"use client";
import React, { useState } from 'react';
import type { Models } from 'appwrite';
import { Timeline } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import Form from 'next/form'
import { createStoryEntry } from '@/app/actions/createStoryEntry';
import { useAuth } from "@/app/providers/AuthProvider";
import { useEffect } from "react";

const StorylineClient = ({ entries }: { entries: Models.RowList }) => {
    const { user } = useAuth();

    const [adminBoolean, setAdminBoolean] = useState<boolean>(false);
    const [logExpanded, setLogExpanded] = useState<boolean[]>(Array(entries.rows.length).fill(false))

    function expandToggle(id: number, text: string) {
        let print: string[] = [""]
        return logExpanded[id] === true ? text : `${text.substring(0, 30)}... (click to expand)`;

    }
    useEffect(() => {
        console.log("user", user, user?.labels.includes("admin"));
        if (user && user.labels.includes("admin")) {
            setAdminBoolean(true);
            console.log(adminBoolean);
        }
    }, [user])
    return (

        < div className='mb-48 mx-8' >
            <h2>Storyline</h2>
            <Timeline className='text-[var(--foreground)]'
                items={
                    entries.rows.map((log, id) => (
                        {
                            dot: <CaretRightOutlined style={{ color: 'var(--foreground)' }} />,


                            children: <article key={log.$id}>
                                <h4 className=' cursor-default text-[var(--foreground)]'>{log.heading}</h4>
                                <time className='text-[var(--foreground)]'>{new Date(log.$createdAt).toLocaleDateString()}</time>
                                <div className='indent-1 w-4/5 justify-self-center-safe cursor-pointer text-[var(--foreground)]' onClick={() => { setLogExpanded(prev => prev.map((t, i) => i === id ? !t : t)) }}>
                                    {expandToggle(id, log.body).split("\\n").map((line, i) => (
                                        <React.Fragment key={i}>
                                            <p className='indent-5 leading-10'>{line}</p>

                                        </React.Fragment>
                                    ))}
                                </div>
                            </article>
                        }
                    ))
                }
            />

            < fieldset className='flex justify-center' hidden={!adminBoolean}>
                {/* <form action="/api/admin/storylineForm" method="POST" id="newlogForm" className='border-2 border-black rounded-2xl w-full
                 md:w-2/3 flex flex-col mb-48'> */}
                <Form action={createStoryEntry} id="newlogForm" className='border-2 border-black rounded-2xl w-full
                 md:w-2/3 flex flex-col mb-48 bg-neutral-500'>
                    <label htmlFor="heading" className='ml-2'>Title:</label>
                    <input name="heading" type='text' className='text-black border-2 border-black rounded-2xl px-2 bg-[var(--background-alpha)] m-2' placeholder='Enter Title here.' />

                    <label htmlFor="body" className='ml-2'>Article:</label>
                    <textarea id="body" name="newLog" rows={10} className='text-black m-2 border-2 border-black rounded-2xl px-2 bg-[var(--background-alpha)]' placeholder='Enter Article here.' />

                    <button className='border-2 type="submit" id="addLog" border-black rounded-2xl bg-[var(--button)] w-fit p-3 justify-self-center self-center-safe m-2 flex '>
                        Upload Article
                    </button>
                </Form>

            </fieldset>

        </div >
    )
}



export default StorylineClient