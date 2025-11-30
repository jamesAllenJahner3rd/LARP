import React from 'react'
import Image from 'next/image'
// import { GODS } from "@/data/gods"
const Pantheon = () => {

    const figureCss = "w-[20rem] flex flex-col mx-3 snap-center select-none"
    return (
        <>
            <section className="var(--background) md:flex md:flex-row-reverse md:m-2 ">
                <Image
                    src="/images/magic-prayer.webp"
                    width={1200}
                    height={800}
                    sizes="100vw"
                    alt=" A girl praying to a God of magic"
                    className="rounded-lg w-full md:w-3/5 size-1/1 md:flex shadow-md"
                />
                <article className="md:flex md:flex-col md:w-2/5 md:justify-center">
                    <h2>Religion in Eldarlands LARP</h2>
                    <p>Religion is a rich and optional layer of roleplay in Eldarlands. While it doesn&#39;t affect character stats or progression, it offers powerful storytelling opportunities for those who choose to explore it.
                        Clerics channel divine energy to perform miracles. Mages may strike dark bargains for forbidden magic. Rangers draw strength from nature itself. Whether your character is a devout follower, a reluctant prophet, or a skeptic surrounded by zealots, religion can shape your journey.
                    </p>
                </article>
            </section>
            <section className="var(--background) md:flex md:flex-row-reverse md:m-2">

                <p className="md:flex md:flex-col md:w-2/5 md:justify-center">The world of Ur—and other Eldarlands realms—is steeped in divine history. Wars have been fought over gods. Crusades have unearthed ancient relics. Entire regions have been reshaped by divine influence.
                    Players may choose a patron deity from our pantheon, invent their own, or opt out entirely. Religion is for roleplay only and holds no sway outside the game.
                    Want to add depth to your character&#39;s backstory? Explore divine politics? Lead a crusade or protect a sacred grove? Religion is your gateway to epic storytelling.
                </p>
                <Image
                    src="/images/dark-prayer.webp"
                    width={1200}
                    height={800}
                    sizes="100vw"
                    alt=" A boy praying to a dark God"
                    className="rounded-lg w-full md:w-3/5 size-1/1 md:flex   shadow-md"
                />
            </section >
            <h2>The Gods and Goddesses of the Eldarlands Saga</h2>

            <aside className="w-screen flex-col-reverse overflow-x-scroll scroll-p-36  scroll-smooth snap-x snap-mandatory flex scrollbar-thick touch-pan-x ">

                <section className=" w-max inline-flex">
                    {/*GODS.map(({ name, alt, image, description }) => (
                        <figure key={name} className={figureCss}>
                            <Image
                                src={image}
                                width={1200}
                                height={800}
                                sizes="100vw"
                                alt={alt}
                            />
                            <figcaption className='w-full select-none'>
                                {description}
                            </figcaption>
                        </figure>
                    ))*/}
                </section>
            </aside>
        </>
    )
}

export default Pantheon