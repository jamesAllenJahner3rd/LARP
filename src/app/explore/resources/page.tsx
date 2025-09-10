import React from 'react'
import Image from 'next/image'
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
            <section className="bg-amber-50 md:flex md:flex-row md:m-4 md:justify-around m-1">
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
            <section className="bg-amber-50 md:flex md:flex-row md:w-8/9  md:justify-self-center gap-[3%] ">

                <Image
                    src="/images/ahf-character-creation.webp"
                    alt=" A character creation screen image"
                    width={1200}
                    height={800}
                    sizes="1/1"
                    id="asdf"
                    className="rounded-lg w-full size-1/1 md:w-3/5 shadow-md"
                />
                <article className="md:flex md:flex-col  md:w-2/5 md:justify-center">
                    <h4 className='flex justify-center'>Premade Character Concepts</h4>
                    <div className='snap-y scroll-pl-6 font-extrabold font block underline-offset-1 justify-center md:w-1/1 h-96 overflow-y-auto p-4 bg-amber-50 rounded-lg shadow-md'>
                        <figure>
                            <a href="../pdfs/Daedra-Ironfoot-Halfling-Cleric.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="/images/DeanSpencer-spotcol-cleric-1.webp"
                                    alt=" Redheaded lady in White Clerical robes holding a staff"
                                    width={150}
                                    height={150}
                                    sizes="1/1"
                                    className='flex justify-center'

                                    loading="lazy" />								</a>
                            <h2><a href="../pdfs/Daedra-Ironfoot-Halfling-Cleric.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Daedra Ironfoot the Halfling Cleric</a></h2>
                        </figure>
                        <figure>
                            <a
                                href="../pdfs/Jerin-Darkelven-Dark-Elf-Fighter.pdf"
                                className='flex justify-center'
                                target="_blank"
                                rel="noopener noreferrer">
                                <Image
                                    width={150}
                                    height={150}
                                    className='flex justify-center'
                                    src="/images/DeanSpencer-spotcol-drowknightFP.webp"
                                    alt=" Black armored figure with white hair red eyes and two swords"
                                    loading="lazy"
                                    sizes="1/1" />								</a>
                            <h2><a href="../pdfs/Jerin-Darkelven-Dark-Elf-Fighter.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Jerin Darkelven the Dark Elf Fighter</a></h2>
                        </figure>
                        <figure>
                            <a href="../pdfs/Lucious-Amalar-High-Elf-Mage.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">
                                <Image width={150} height={150} className="flex justify-center" src="/images/DeanSpencer-Character-moonelf-e1680414816906.webp" alt="" loading="lazy" sizes="1/1" />								</a>
                            <h2><a href="../pdfs/Lucious-Amalar-High-Elf-Mage.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Lucious Amalar the High Elf Mage</a></h2>
                        </figure>
                        <figure>
                            <a href="../pdfs/Ishkar-Marbel-Felinos-Ranger.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">
                                <Image width={150} height={150} className="flex justify-center" src="/images/tabaxi_fighter-e1680414113839.webp" alt="" loading="lazy" sizes="1/1" />								</a>
                            <h2><a href="../pdfs/Ishkar-Marbel-Felinos-Ranger.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Ishkar Marbel the Felinos Ranger</a></h2>
                        </figure>
                        <figure>
                            <a href="../pdfs/Vahny-Dustborn-Vulpine-Rogue.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">
                                <Image width={150} height={150} className="flex justify-center" src="/images/DeanSpencer-character-kitsune-e1680414860765.webp" alt="" loading="lazy" sizes="1/1" />								</a>
                            <h2><a href="../pdfs/Vahny-Dustborn-Vulpine-Rogue.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Vahny Dustborn the Vulpine Rogue</a></h2>
                        </figure>
                        <figure>
                            <a href="../pdfs/MaKeal-Buras-Human-Cleric.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">
                                <Image width={150} height={150} className="flex justify-center" src="/images/DeanSpencer-Paladin-e1680414915136.webp" alt="" loading="lazy" sizes="1/1" />								</a>
                            <h2><a href="../pdfs/MaKeal-Buras-Human-Cleric.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Ma&#39;Keal Buras the Human Cleric</a></h2>
                        </figure>
                        <figure>
                            <a href="../pdfs/Thark-Plainsclan-Grunthar-Orc-Fighter.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">
                                <Image width={150} height={150} className="flex justify-center" src="/images/DeanSpencer-spotcol-ogretank.webp" alt="" loading="lazy" sizes="1/1" />								</a>
                            <h2><a href="../pdfs/Thark-Plainsclan-Grunthar-Orc-Fighter.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Thark Plainsclan  the Grunthar Orc Fighter</a></h2>
                        </figure>
                        <figure>
                            <a
                                href="../pdfs/Theobold-Deepstone-Dark-Dwarf-Mage.pdf"
                                className='flex justify-center'
                                target="_blank"
                                rel="noopener noreferrer">
                                <Image
                                    width={150}
                                    height={150}
                                    className="flex justify-center"
                                    src="/images/DeanSpencer-spotcol-duergarmage.webp"
                                    alt=" A dark dwarf shooting lightning" loading="lazy" sizes="1/1" />								</a>
                            <h2>
                                <a
                                    href="../pdfs/Theobold-Deepstone-Dark-Dwarf-Mage.pdf"
                                    className='flex justify-center'
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Theobold Deepstone the Dark Dwarf Mage
                                </a>
                            </h2>
                        </figure>
                        <figure>
                            <a
                                href="../pdfs/Chylis-Bloodtip-Jungle-Troll-Ranger.pdf"
                                className='flex justify-center'
                                target="_blank"
                                rel="noopener noreferrer">
                                <Image
                                    width={150}
                                    height={150}
                                    className="flex jus alright sotify-center"
                                    src="/images/DeanSpencer-hunter-e1680414761571.webp"
                                    alt=" A female troll dressed in hide with a spear and shield"
                                    loading="lazy"
                                    sizes="1/1" />								</a>
                            <h2><a href="../pdfs/Chylis-Bloodtip-Jungle-Troll-Ranger.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Chy&#39;lis Bloodtip the Jungle Troll Ranger</a></h2>
                        </figure>
                        <figure>
                            <a href="../pdfs/Gromthorn-Uroken-Orc-Rogue.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">
                                <Image width={150} height={150} className="flex justify-center" src="/images/DeanSpencer-spotcol-ogrehunter.webp" alt="" loading="lazy" sizes="1/1" />								</a>
                            <h2>
                                <a
                                    href="../pdfs/Gromthorn-Uroken-Orc-Rogue.pdf"
                                    className='flex justify-center'
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Gromthorn the Uroken Orc Rogue
                                </a>
                            </h2>
                        </figure>
                        <figure>
                            <a
                                href="../pdfs/Careon-Fiddlek-Satyr-Cleric.pdf"
                                className='flex justify-center'
                                target="_blank"
                                rel="noopener noreferrer">
                                <Image
                                    width={150}
                                    height={150}
                                    className="flex justify-center"
                                    src="/images/DeanSpencer-spotcol-goatgirl.webp"
                                    alt=""
                                    loading="lazy"
                                    sizes="1/1" />								</a>
                            <h2><a href="../pdfs/Careon-Fiddlek-Satyr-Cleric.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Careon Fiddlek the Satyr Cleric</a></h2>
                        </figure>
                        <figure>
                            <a href="../pdfs/Selvik-Minotaur-Fighter.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">
                                <Image width={150} height={150} className="flex justify-center" src="/images/DeanSpencer-minotaur-character-e1680414682902.webp" alt="" loading="lazy" sizes="1/1" />								</a>
                            <h2><a href="../pdfs/Selvik-Minotaur-Fighter.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Selvik the Minotaur Fighter</a></h2>
                        </figure>
                        <figure>
                            <a href="../pdfs/Glaughlin-Fizzlebane-Gnome-Mage.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">
                                <Image width={150} height={150} className="flex justify-center" src="/images/DeanSpencer-spotcol-gnomebard.webp" alt="" loading="lazy" sizes="1/1" />								</a>
                            <h2><a href="../pdfs/Glaughlin-Fizzlebane-Gnome-Mage.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Glaughlin Fizzlebane the Gnome Mage</a></h2>
                        </figure>
                        <figure>
                            <a href="../pdfs/Baelgarn-Sathril-Wood-Elf-Ranger.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">
                                <Image width={150} height={150} className="flex justify-center" src="/images/DeanSpencer-spotcol-elfarcher.webp" alt="" loading="lazy" sizes="1/1" />								</a>
                            <h2><a href="../pdfs/Baelgarn-Sathril-Wood-Elf-Ranger.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Bael&#39;garn Sathril the Wood Elf Ranger</a></h2>
                        </figure>
                        <figure>
                            <a href="../pdfs/Patael-Featherstep-Buraling-Rogue.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">
                                <Image width={150} height={150} className="flex justify-center" src="/images/DeanSpencer-spotcol-halflingwithdagger.webp" alt="" loading="lazy" sizes="1/1" />								</a>
                            <h2><a href="../pdfs/Patael-Featherstep-Buraling-Rogue.pdf" className='flex justify-center' target="_blank" rel="noopener noreferrer">Patael Featherstep the Buraling Rogue</a></h2>
                        </figure>

                    </div>
                </article>
            </section >

            <section className="bg-amber-50 md:flex md:flex-row md:m-4">
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
