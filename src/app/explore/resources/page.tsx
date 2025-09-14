import React from 'react'
import Image from 'next/image'
import Premade from './Premade'

// import Link from 'next/link'
const resources = () => {
    return (
        <>
            <Image
                width="1800"
                height="670"
                src="/images/Eldarlands-LARP-Logo-full-size.webp"
                alt="Eldarlands logo"
                loading="lazy"
                sizes="1/1"

            />
            <section className="var(--background) md:flex md:flex-row md:m-4 md:justify-around m-1">
                <article className="md:flex md:flex-col  md:w-2/5 md:justify-center">
                    <h2 className="md:flex Eldarlands md:justify-center"> L.A.R.P.
                        Game Resources</h2>

                    <p>Download the player&#39;s handbook, character sheets, release waivers, or aid in recruitment with the following resources. These files are PDFs, for use in association with the Eldarlands Live Action Role Playing game. All other use is prohibited.</p>
                    <a href="../pdfs/Eldarlands-LARP-Players-Handbook-PDF-eBook.pdf" className='flex justify-center underline' target="_blank" rel="noopener noreferrer">
                        Player&#39;s Handbook V.1
                    </a>
                    <a href="../pdfs/Eldarlands-LARP-Character-Sheet.pdf" className='flex justify-center underline' target="_blank" rel="noopener noreferrer">
                        Character Sheets
                    </a>
                    <a href="../pdfs/Release-Waiver.pdf" className='flex justify-center underline' target="_blank" rel="noopener noreferrer">
                        Liability Release Waivers
                    </a>
                    <a href="../pdfs/Recruitment-Poster.pdf" className='flex justify-center underline' target="_blank" rel="noopener noreferrer">
                        Recruitment Posters
                    </a>
                </article> <Image
                    src="/images/Eldarlands-LARP-eBook-Cover.webp"
                    alt=" The cover of the Eldarlands LARP book"
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                    className="rounded-lg size-1/1 w-2/3 justify-self-center md:w-2/5 flex justify-center shadow-md"
                /></section>
            <iframe
                src="https://www.youtube.com/embed/RPKMIDu2QI8"
                title="Embedded Content"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                width="800"
                height="600"
                allowFullScreen
                className='w-8/9 justify-self-center m-1'
            />


            <p className="text-center m-1">Please note, Eldarlands LARP has <b>no affiliation</b> with the above video. It&#39;s simply a good resource for new and old players alike. When entering into a role play setting, it&#39;s important to become immersed, but one must also know where to draw the line between fantasy and reality.</p>
            <section className="var(--background) md:flex md:flex-row md:w-8/9  md:justify-self-center gap-[3%] ">

                <Image
                    src="/images/ahf-character-creation.webp"
                    alt=" A character creation screen image"
                    width={1200}
                    height={800}
                    sizes="1/1"
                    id="asdf"
                    className="rounded-lg w-full size-1/1 md:w-3/5 shadow-md"
                />
                <Premade />
            </section >

            <section className="var(--background) md:flex md:flex-row md:m-4">
                <Image width="1024" height="768" src="/images/Ur-Map.webp" alt="" loading="lazy" sizes="1/1" className="rounded-lg w-full md:w-3/5 size-1/1 md:flex shadow-md" />
                <article className="md:flex md:flex-col  md:w-2/5 md:justify-center">
                    <h4 className='flex align-top'>The World of Ur</h4>
                    <h2 className='flex justify-center'>Experience the Story for Yourself</h2>

                    <p className="text-center m-1">Join Eldarlands LARP to immerse yourself into a world of action,<br />adventure, and more excitement than you could hope for.<br />Our boffer combat gets the veins pumping and the sweat dripping,<br />all while losing one&#39;s self in the role play. We meet for fighter<br />practice every Sunday at 2PM at Cedar Valley Park in <br />Cherokee Village, AR, and hold events quarterly at this time, <br />though as the game matures we hope to increase their frequency.</p>
                    <a href="/register">
                        JOIN THE BATTLE
                    </a></article>
            </section>
        </>
    )
}

export default resources
