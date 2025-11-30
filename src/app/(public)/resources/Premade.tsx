import Image from 'next/image';
import { getFileURL } from '@/lib/storage';


const Premade = async () => {
    const bucket = "68c11c240013701075bb"
    const files = [
        {
            id: "68c11d90002aa6b4e28d",
            name: "Daedra Ironfoot the Halfling Cleric",
            src: "68c2365c00259e03b4b9",
            alt: "Redheaded lady in White Clerical robes holding a staff",
        },
        {
            id: "68c11dd4001aacf3b93c",
            name: "Jerin Darkelven the Dark Elf Fighter",
            src: "68c23655001b99974e37",
            alt: "Black armored figure with white hair red eyes and two swords",
        },
        {
            id: "68c11ded003e23dca6a9",
            name: "Lucious Amalar the High Elf Mage",
            src: "68c2372700291954359d",
            alt: "",
        },
        {
            id: "68c11dcb0033bd44958b",
            name: "Ishkar Marbel the Felinos Ranger",
            src: "68c2378b001b846136a2",
            alt: "",
        },
        {
            id: "68c11e2d00132c491ba2",
            name: "Vahny Dustborn the Vulpine Rogue",
            src: "68c2372e00340be28492",
            alt: " With long red hair wearing a white mask and a red fox.",
        },
        {
            id: "68c11dfd002aa7d17f1e",
            name: "Ma'Keal Buras the Human Cleric",
            src: "68c2366b003703a957ac",
            alt: " A man in chainmail with a white talbert",
        },
        {
            id: "68c11e2200202baf72ae",
            name: "Thark Plainsclan the Grunthar Orc Fighter",
            src: "68c23606003e2c7a146b",
            alt: "an Orc with an Axe",
        },
        {
            id: "68c11e28000aac06b783",
            name: "Theobold Deepstone the Dark Dwarf Mage",
            src: "68c2364f0002cfd86ec6",
            alt: "A dark dwarf shooting lightning",
        },
        {
            id: "68c11d3d002c3cf8ec30",
            name: "Chy'lis Bloodtip the Jungle Troll Ranger",
            src: "68c236b30013068f42dc",
            alt: "A female troll dressed in hide with a spear and shield",
        },
        {
            id: "68c11dc50001a2d03329",
            name: "Gromthorn the Uroken Orc Rogue",
            src: "68c236100017ab9cc08d",
            alt: " An ogre with a bow",
        },
        {
            id: "68c11d35000cbc81776c",
            name: "Careon Fiddlek the Satyr Cleric",
            src: "68c2363300279925f736",
            alt: " A lady with a gun who has goat horns",
        },
        {
            id: "68c11e1d00082706c14d",
            name: "Selvik the Minotaur Fighter",
            src: "68c23671002e8a341bed",
            alt: " A minotaur holding a pole arm and shield",
        },
        {
            id: "68c11dbf00232f013333",
            name: "Glaughlin Fizzlebane the Gnome Mage",
            src: "68c2363a000f1315ca79",
            alt: " A gnome casting magic",
        },
        {
            id: "68c11d230017b977d1f5",
            name: "Bael'garn Sathril the Wood Elf Ranger",
            src: "68c23646002f21aed0dd",
            alt: " An elf holding a bow"
        },
        {
            id: "68c11e040015a0a3fc13",
            name: "Patael Featherstep the Buraling Rogue",
            src: "68c2362c00232c03120c",
            alt: " halfLing with a dagger hiding behind a wall"
        }
    ];


    return (
        <article className="md:flex md:flex-col  md:w-2/5 md:justify-center">
            <h4 className='flex justify-center'>Premade Character Concepts</h4>
            <div className='snap-y scroll-pl-6 font-extrabold font block underline-offset-1 justify-center md:w-1/1 h-96 overflow-y-auto p-4 var(--background) rounded-lg shadow-md'>
                {/*files.map((file) => (
                    <figure key={file.id}>

                        <a
                            href={`https://nyc.cloud.appwrite.io/v1/storage/buckets/${bucket}/files/${file.id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='flex justify-center'
                        >
                            {file.src && (<Image
                                src={`https://nyc.cloud.appwrite.io/v1/storage/buckets/${bucket}/files/${file.src}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
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
                ))*/}
            </div>
        </article >
    )
}

export default Premade