import React from 'react'
import Image from 'next/image'

const Pantheon = () => {
    const figureCss = "w-[20rem] flex flex-col mx-3 snap-center"
    return (
        <>
            <section className="var(--background) md:flex md:flex-row-reverse md:m-2 ">
                <Image
                    src="/images/magic-prayer.webp"
                    alt=" A girl praying to a God of magic"
                    width={1200}
                    height={800}
                    sizes="100vw"
                    className="rounded-lg w-full md:w-3/5 size-1/1 md:flex shadow-md"
                />
                <article className="md:flex md:flex-col md:w-2/5 md:justify-center">
                    <h2>Religion in Eldarlands LARP</h2>
                    <p>Religion is a rich and optional layer of roleplay in Eldarlands. While it doesn&#39;t affect character stats or progression, it offers powerful storytelling opportunities for those who choose to explore it.
                        Clerics channel divine energy to perform miracles. Mages may strike dark bargains for forbidden magic. Rangers draw strength from nature itself. Whether your character is a devout follower, a reluctant prophet, or a skeptic surrounded by zealots, religion can shape your journey.</p>
                </article>
            </section>
            <section className="var(--background) md:flex md:flex-row-reverse md:m-2">

                <p className="md:flex md:flex-col md:w-2/5 md:justify-center">The world of Ur—and other Eldarlands realms—is steeped in divine history. Wars have been fought over gods. Crusades have unearthed ancient relics. Entire regions have been reshaped by divine influence.
                    Players may choose a patron deity from our pantheon, invent their own, or opt out entirely. Religion is for roleplay only and holds no sway outside the game.
                    Want to add depth to your character&#39;s backstory? Explore divine politics? Lead a crusade or protect a sacred grove? Religion is your gateway to epic storytelling.
                </p><Image
                    src="/images/dark-prayer.webp"
                    alt=" A boy praying to a dark God"
                    width={1200}
                    height={800}
                    sizes="100vw"
                    className="rounded-lg w-full md:w-3/5 size-1/1 md:flex   shadow-md"
                />
            </section >
            <h2>The Gods and Goddesses of the Eldarlands Saga</h2>

            <aside className="w-[100vw] overflow-x-scroll scroll-p-36  scroll-smooth snap-x snap-mandatory scrollbar-thick ">
                <section className=" w-max inline-flex scrollbar-thick">
                    <figure className={figureCss}>
                        <img
                            src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Celnuntos-Holy-Symbol-300x300.png"
                            alt="Celnuntos Holy Symbol"
                        />
                        <figcaption className='w-[100%]'>
                            Celnuntos - The god of nature and elves, Celnuntos is caring and just. Though he does not forgive those who destroy the wild places of the world. He is commonly worshipped by Wood Elves, Rangers, Halflings, Satyrs, Uroken Orc, and Jungle Trolls.
                        </figcaption>
                    </figure>
                    <figure className={figureCss}>
                        <img
                            src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Corin-Holy-Symbol-300x300.png"
                            alt="Corin Holy Symbol"
                        />
                        <figcaption>
                            Corin – The god of water and sailors, Corin is quick to anger but calms just as quickly. Like the sea, he erodes all in his path, ever expanding his influence. Corin is commonly revered, if not outright worshipped by sailors of every race, Minotaurs, and a great many Humans.
                        </figcaption>
                    </figure>
                    <figure className={figureCss}>
                        <img
                            src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Deidre-Holy-Symbol-300x300.png"
                            alt="Deidre Holy Symbol"
                        />
                        <figcaption>Deidre – The god of divine, Deidre is revered as the holy link. He encompasses all who hold faith, regardless of their chosen deity. Deidre is forgiving and calm.
                        </figcaption>
                    </figure>
                    <figure className={figureCss}>
                        <img
                            src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Dolus-Holy-Symbol-300x300.png"
                            alt="Dolus Holy Symbol" />
                        <figcaption>Dolus – The god of trickery, Dolus is a prankster. He enjoys causing confusion and mayhem. While he’s one of the lesser gods, he holds the favor of many Rogues, assassins, bards, travelers, Buralings, and Lacetros.
                        </figcaption>
                    </figure>
                    <figure className={figureCss}>
                        <img src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Fleatea-Holy-Symbol-300x300.png" alt="Fleatea Holy Symbol" />
                        <figcaption>
                            Fleatea – The goddess of air and Halflings, Fleatea is gentle but firm. She is often worshipped by Halflings, sailors, and Rangers.
                        </figcaption>
                    </figure>
                    <figure className={figureCss}>
                        <img src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Gromtusk-Holy-Symbol-300x300.png" alt="Gromtusk Holy Symbol" />
                        <figcaption>
                            Gromtusk – The god of Orcs and strength, Gromtusk is harsh and unforgiving. He demands strength and victory through blood. His worshippers are often exclusively Orcs, though a few Fighters from other races find their way to his influence.
                        </figcaption>
                    </figure>
                    <figure className={figureCss}>
                        <img src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Kahlee-Holy-Symbol-300x300.png" alt="Kahlee Holy Symbol" />
                        <figcaption>
                            Kahlee – The goddess of magic, Kahlee is curious and experimental. She takes joy in those who share her passions. Her followers are often Mages, High Elves, and others who embrace the arcane arts.</figcaption></figure> <figure className={figureCss}>
                        <img src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Izaryle-Holy-Symbol-300x300.png" alt="Izaryle Holy Symbol" />
                        <figcaption>
                            Izaryle – The Unspoken One is rarely mentioned outside of a hushed whisper. Not much is known about this banished god other than the evil races of the world tend to gravitate toward it. Izaryle was believed to be one of the three greater gods prior to the godly war at the dawn of time. All that remains are a few desecrated ruins and elusive references.
                        </figcaption>
                    </figure>
                    <figure className={figureCss}>
                        <img
                            src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Melaka-Holy-Symbol-300x300.png"
                            alt="Melaka Holy Symbol" />
                        <figcaption>
                            Melaka – The goddess of travelers, Melaka is a nomad. She loves exploration and seeing new places. Many of her followers paint her as a child, wide eyed at the sights before her. Her followers are often Rogues, Rangers, and Buralings.</figcaption></figure> <figure className={figureCss}><img src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Osirus-Holy-Symbol-300x300.png" alt="Osirus Holy Symbol" /><figcaption>Osirus – The god of death, Osirus is patient and ever watchful. He does not get in a hurry. All will eventually be his. His followers are often creatures of the night and dark Clerics, though he does not condone their elicit activities.</figcaption></figure> <figure className={figureCss}><img src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Ozmodius-Holy-Symbol-300x300.png" alt="Ozmodius Holy Symbol" /><figcaption>Ozmodius – The King God. The god of time and knowledge. Ozmodius is the sands of time. He sees all and takes little action unless someone disrupts time. Being the King God, his temples are numerous. Ozmodius is most often worshipped by Humans.</figcaption></figure> <figure className={figureCss}><img src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Ragnarous-Holy-Symbol-300x300.png" alt="Ragnarous Holy Symbol" /><figcaption>Ragnarous – The god of fire, dwarves, and war, Ragnarous is hot tempered and unforgiving. Rarely is a war fought without his followers being present. Ragnarous is often worshipped by Dwarves, Fighters, and Mages</figcaption></figure> <figure className={figureCss}><img src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Rahul-Holy-Symbol-300x300.png" alt="Rahul Holy Symbol" /><figcaption>Rahul – Goddess of the moon and night, Rahul is the twin of Sulis. She is secretive and cunning. Her worshippers are commonly Artanos, Lykanthros, Wood Elves, and Rogues.</figcaption></figure> <figure className={figureCss}><img src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Sulis-Holy-Symbol-300x300.png" alt="Sulis Holy Symbol" /><figcaption>Sulis – The god of the sun and law, Sulis is the twin of Rahul. He is outgoing and charismatic. He represents order and justice. His chosen followers are mostly Satyrs, High Elves, and Fighters for justice.</figcaption></figure> <figure className={figureCss}><img src="https://eldarlandslarp.com/wp-content/uploads/2023/05/Theratis-Holy-Symbol-300x300.png" alt="Theratis Holy Symbol" /><figcaption>Theratis – The god of psionics, Theratis is the seeker of knowledge and self-sustainability. He is the left hand of Ozmodius. His followers are often Dark Dwarves or Mages.</figcaption></figure>
                </section>
            </aside>
        </>
    )
}

export default Pantheon