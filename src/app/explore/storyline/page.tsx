
import { Timeline } from "antd";
import { storage } from '@/lib/appwrite'
import { postData, getData, patchData, deleteData, getList } from '@/lib/database';
import StorylineClient from './StorylineClient';
import Image from "next/image";
const Storyline = async () => {
    const table = await getList("68c1160a001638ade3a0", "storyentries")
    const entries = table
    // console.log(table.rows)
    return (
        <><main className="bg-[url(https://nyc.cloud.appwrite.io/v1/storage/buckets/68c11c240013701075bb/files/68c8e013000c7cf62c6b/view?project=68bb084a0032b02608c4)]">
            <Image
                src="/images/Eldarlands-LARP-Logo-full-size.webp"
                alt="Group of characters ready to adventure"
                width={1200}
                height={800}
                sizes="100vw"

                className="rounded-lg w-full size-1/1  p-4"
            />
            <StorylineClient entries={table} />
        </main>
        </>
    );
}



export default Storyline