import React from 'react'
import Image from 'next/image'
import SwordVideo from '@/app/components/Swords'
const Rules = () => {
    const screenBG = "bg-[var(--background)]"
    const pBG = "leading-8"
    return (

        <>

            <main className={`bg-[url('/images/hfa_scroll.webp')] bg-center bg-cover bg-origin-border ${screenBG} bg-blend-overlay`} >
                <section className="var(--background) md:flex md:flex-row md:m-4">
                    {/* <Image
                        src="/images/arms2.webp"
                        alt="Group of players standing together"
                        width={1200}
                        height={800}
                        sizes="100vw"
                        className="rounded-lg w-full md:w-3/5 size-1/1 md:flex   shadow-md"
                    /> */}
                    <SwordVideo />
                    <article className="md:flex md:flex-col  md:w-2/5 md:justify-center ml-1">
                        <h2 className='list-none'>Eldarlands LARP employs:</h2>
                        <ul className={`list-inside list-disc leading-10 grid-cols-2 md:grid-cols-1 grid`}>

                            <li>A 3-limb-death</li>
                            <li>A Boffer combat system</li>
                            <li>Fast-paced combat</li>
                            <li>Low learning curves</li>
                            <li>Minimal death penaltys </li>
                            <li>Short respawn timers</li>
                        </ul>
                    </article>
                </section>
                <section className=" rounded-2xl box-border p-2 w-full relative top-0 my-5">
                    <Image
                        src="/images/five_classes.webp"
                        alt="Group of players standing together"
                        width={1200}
                        height={800}
                        sizes="100vw"
                        className="md:rounded-lg w-full md:w-3/5 size-1/1 md:flex  md:shadow-md"
                    />
                    <p className={`${pBG} indent-1 bg-[var(--background-alpha)] absolute bottom-0 md:-bottom-12 md:right-66 w-full md:w-2/5 rounded-2xl shadow-black shadow-2xl box-border p-2`}>
                        &nbsp;&nbsp;The Eldarlands LARP Player&#39;s Handbook was written with the player in mind. <br />

                        &nbsp;&nbsp; We offer a number of playable races, as well as 5 class archetypes; Cleric, Fighter, Mage, Ranger, and Rogue.<br />&nbsp;&nbsp; These archetypes are designed to help guide players to build the character they want to play rather than forcing them to stick to a set list of attributes.<br />
                        &nbsp;&nbsp;The goal is to have fun. If you can have fun while growing something you built, all the better.<br />
                    </p>
                </section>
                <section className=" rounded-2xl box-border p-2 w-full relative flex-row-reverse my-5 top-0">
                    <Image
                        src="/images/Safety.webp"
                        alt="Group of players standing together with feathers for weapons and pillows for armor"
                        width={1200}
                        height={800}
                        sizes="100vw"
                        className="md:rounded-lg w-full md:w-3/5 size-1/1 md:block flex md:relative md:justify-self-end-safe   md:m-10 md:shadow-md"
                    />
                    <p className={`${pBG} indent-1 bg-[var(--background-alpha)] absolute bottom-0 md:-bottom-5 md:left-66 md:w-2/5 rounded-2xl shadow-black shadow-2xl box-border md:p-2`}>

                        All of our weapons, shields, and armor are constructed with safety in mind.<br /> We have extensive construction rules which must be followed, and all items are inspected for use  before each and every event.<br /> Unsafe weaponry and armors are not allowed to be used for gameplay.<br />
                    </p>
                </section>
                <section className=" rounded-2xl box-border p-2 w-full my-5 relative top-0">
                    <Image
                        src="/images/fazingA.webp"
                        alt="Group of players standing together"
                        width={1200}
                        height={800}
                        sizes="100vw"
                        className="rounded-lg w-full md:w-3/5 size-1/1 md:flex   md:shadow-md"
                    />
                    <p className={`${pBG} indent-1 bg-[var(--background-alpha)] absolute bottom-0 md:bottom-50 md:right-66 w-full md:w-2/5 rounded-2xl shadow-black shadow-2xl box-border p-2`}>
                        All members are required to have a liability release waiver signed and on file before they can begin weapon authorization.<br /> This protects our members and the game itself in the unlikely event of injury or worse.<br /> As it stands, serious injuries are few and far between, especially when all safety rules and common sense are applied.<br /> Most often, little more than the occasional bruise, sore muscle, or minor scratch are the extent of injuries experienced.<br /> These are even rarer among experienced players who have learned proper movements, actions, and combat methods.<br />
                    </p>
                </section>
                <section className=" rounded-2xl box-border p-2 w-full relative flex-row-reverse my-10 top-0">
                    <Image
                        src="/images/cat-fazingA.webp"
                        alt="Group of players standing together with feathers for weapons and pillows for armor"
                        width={1200}
                        height={800}
                        sizes="100vw"
                        className="md:rounded-lg w-full md:w-3/5 size-1/1 md:block flex md:relative md:justify-self-end-safe md:m-10 md:shadow-md"
                    />
                    <article className={`${pBG} indent-1 bg-[var(--background-alpha)] md:left-66 absolute md:my-10  bottom-0 md:bottom-50 w-full md:w-2/5 rounded-2xl shadow-black shadow-2xl box-border p-2`}>
                        <p className={`${pBG}`}>
                            Eldarlands LARP is first and foremost a <b>Live-Action Role-Playing game</b>.<br /> While our combat covers most of the live-action elements, it does not cover them all. Our players dress up.<br /> They sometimes speak with a different accent or language. In essence, they become their characters. Mannerism, friends, foes, morals... all of these elements differ person to person, as they do character to character.<br /> Oftentimes, the character a player builds is an extension of themselves, or who they&#39;d like to be.<br /> Other times, it&#39;s an experiment in seeing how opposite they can be, allowing them to learn about themselves or test things they&#39;ve always been curious about but unable to try.<br />
                        </p>
                        <p className={`${pBG}`}>
                            LARPing is a temporary escape from reality. While many of the emotions and feelings are real, once the event comes to an end, we return to the real world, separating the game from what is.<br />
                        </p>
                    </article>
                </section>



                <p className={`${pBG}`}>

                </p>

            </main >
        </>
    )
}

export default Rules