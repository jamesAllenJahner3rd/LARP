
import { Timeline } from "antd";
import { storage, databases } from '@/lib/appwrite'
import { postData, getData, patchData, deleteData, getTable } from '@/lib/database';
import StorylineClient from './StorylineClient';
import Image from "next/image";
const Storyline = async () => {
    const table = await getTable("68c1160a001638ade3a0", "storyentries")
    const entries = table.documents
    console.log(table.documents)
    return (
        <>
            <Image
                src="/images/Eldarlands-LARP-Logo-full-size.webp"
                alt="Group of characters ready to adventure"
                width={1200}
                height={800}
                sizes="100vw"

                className="rounded-lg w-full size-1/1  p-4"
            />
            <StorylineClient entries={table.documents} />
        </>
    );
}



export default Storyline