import React from 'react'
import { Client, Storage } from "appwrite";
import Image from 'next/image';
import { getFileURL } from '@/lib/storage';


const Premade = async () => {
    const bucket = "68c11c240013701075bb"
    const files = [
        {
            id: "68c11d90002aa6b4e28d",
            name: "Daedra Ironfoot the Halfling Cleric",
            src: "/images/DeanSpencer-spotcol-cleric-1.webp",
            alt: "Redheaded lady in White Clerical robes holding a staff",
            pdf: "../pdfs/Daedra-Ironfoot-Halfling-Cleric.pdf"
        },
        {
            id: "68c11dd4001aacf3b93c",
            name: "Jerin Darkelven the Dark Elf Fighter",
            src: "/images/DeanSpencer-spotcol-drowknightFP.webp",
            alt: "Black armored figure with white hair red eyes and two swords",
            pdf: "../pdfs/Jerin-Darkelven-Dark-Elf-Fighter.pdf"
        },
        {
            id: "68c11ded003e23dca6a9",
            name: "Lucious Amalar the High Elf Mage",
            src: "/images/DeanSpencer-Character-moonelf-e1680414816906.webp",
            alt: "",
            pdf: "../pdfs/Lucious-Amalar-High-Elf-Mage.pdf"
        },
        {
            id: "68c11dcb0033bd44958b",
            name: "Ishkar Marbel the Felinos Ranger",
            src: "/images/tabaxi_fighter-e1680414113839.webp",
            alt: "",
            pdf: "../pdfs/Ishkar-Marbel-Felinos-Ranger.pdf"
        },
        {
            id: "68c11e2d00132c491ba2",
            name: "Vahny Dustborn the Vulpine Rogue",
            src: "/images/DeanSpencer-character-kitsune-e1680414860765.webp",
            alt: "",
            pdf: "../pdfs/Vahny-Dustborn-Vulpine-Rogue.pdf"
        },
        {
            id: "68c11dfd002aa7d17f1e",
            name: "Ma'Keal Buras the Human Cleric",
            src: "/images/DeanSpencer-Paladin-e1680414915136.webp",
            alt: "",
            pdf: "../pdfs/MaKeal-Buras-Human-Cleric.pdf"
        },
        {
            id: "68c11e2200202baf72ae",
            name: "Thark Plainsclan the Grunthar Orc Fighter",
            src: "/images/DeanSpencer-spotcol-ogretank.webp",
            alt: "",
            pdf: "../pdfs/Thark-Plainsclan-Grunthar-Orc-Fighter.pdf"
        },
        {
            id: "68c11e28000aac06b783",
            name: "Theobold Deepstone the Dark Dwarf Mage",
            src: "/images/DeanSpencer-spotcol-duergarmage.webp",
            alt: "A dark dwarf shooting lightning",
            pdf: "../pdfs/Theobold-Deepstone-Dark-Dwarf-Mage.pdf"
        },
        {
            id: "68c11d3d002c3cf8ec30",
            name: "Chy'lis Bloodtip the Jungle Troll Ranger",
            src: "/images/DeanSpencer-hunter-e1680414761571.webp",
            alt: "A female troll dressed in hide with a spear and shield",
            pdf: "../pdfs/Chylis-Bloodtip-Jungle-Troll-Ranger.pdf"
        },
        {
            id: "68c11dc50001a2d03329",
            name: "Gromthorn the Uroken Orc Rogue",
            src: "/images/DeanSpencer-spotcol-ogrehunter.webp",
            alt: "",
            pdf: "../pdfs/Gromthorn-Uroken-Orc-Rogue.pdf"
        },
        {
            id: "68c11d35000cbc81776c",
            name: "Careon Fiddlek the Satyr Cleric",
            src: "/images/DeanSpencer-spotcol-goatgirl.webp",
            alt: "",
            pdf: "../pdfs/Careon-Fiddlek-Satyr-Cleric.pdf"
        },
        {
            id: "68c11e1d00082706c14d",
            name: "Selvik the Minotaur Fighter",
            src: "/images/DeanSpencer-minotaur-character-e1680414682902.webp",
            alt: "",
            pdf: "../pdfs/Selvik-Minotaur-Fighter.pdf"
        },
        {
            id: "68c11dbf00232f013333",
            name: "Glaughlin Fizzlebane the Gnome Mage",
            src: "/images/DeanSpencer-spotcol-gnomebard.webp",
            alt: "",
            pdf: "../pdfs/Glaughlin-Fizzlebane-Gnome-Mage.pdf"
        },
        {
            id: "68c11d230017b977d1f5",
            name: "Bael'garn Sathril the Wood Elf Ranger",
            src: "/images/DeanSpencer-spotcol-elfarcher.webp",
            alt: "",
            pdf: "../pdfs/Baelgarn-Sathril-Wood-Elf-Ranger.pdf"
        },
        {
            id: "68c11e040015a0a3fc13",
            name: "Patael Featherstep the Buraling Rogue",
            src: "/images/DeanSpencer-spotcol-halflingwithdagger.webp",
            alt: "",
            pdf: "../pdfs/Patael-Featherstep-Buraling-Rogue.pdf"
        }
    ];


    const daedra = await getFileURL("68c11c240013701075bb",
        "")
    return (
        <article className="md:flex md:flex-col  md:w-2/5 md:justify-center">
            <h4 className='flex justify-center'>Premade Character Concepts</h4>
            <div className='snap-y scroll-pl-6 font-extrabold font block underline-offset-1 justify-center md:w-1/1 h-96 overflow-y-auto p-4 bg-amber-50 rounded-lg shadow-md'>
                {files.map((file) => (
                    <figure key={file.id}>
                        <a
                            href={`https://nyc.cloud.appwrite.io/v1/storage/buckets/${bucket}/files/${file.id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='flex justify-center'
                        >
                            {file.src && (<Image
                                src={file.src}
                                alt={file.alt || file.name}
                                width={150}
                                height={150}
                                sizes="1/1"
                                className='flex justify-center'

                                loading="lazy" />
                            )}
                        </a>
                        <h2>
                            <a
                                href={`https://nyc.cloud.appwrite.io/v1/storage/buckets/${bucket}/files/${file.id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
                                className='flex justify-center'
                                target="_blank"
                                rel="noopener noreferrer">{file.name}
                            </a>
                        </h2>
                    </figure>
                ))}

                {/* <figure>
                    <a href='https://nyc.cloud.appwrite.io/v1/storage/buckets/68c11c240013701075bb/files/68c11d90002aa6b4e28d/view?project=68bb084a0032b02608c4' className='flex justify-center' target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/images/DeanSpencer-spotcol-cleric-1.webp"
                            alt="Redheaded lady in White Clerical robes holding a staff"
                            width={150}
                            height={150}
                            sizes="1/1"
                            className='flex justify-center'

                            loading="lazy" />								</a>

                    <h2><a href={daedra} className='flex justify-center' target="_blank" rel="noopener noreferrer">Daedra Ironfoot the Halfling Cleric</a></h2>
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
                </figure> */}

            </div>
        </article >
    )
}

export default Premade