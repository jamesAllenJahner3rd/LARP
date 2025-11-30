
import { Timeline } from "antd";
// import { storage } from '@/lib/appwrite-node'
import { getList } from '@/lib/database';
import StorylineClient from './StorylineClient';
import Image from "next/image";
import { StoryEntry } from "@/lib/types/types"



const Storyline = async () => {
    let entries: StoryEntry[] = [];
    try {
        const table = await getList("68c1160a001638ade3a0", "storyentries");
        entries = table.rows.map((row) => ({
            id: row.$id,
            heading: row.heading,
            body: row.body,
            createdAt: row.$createdAt,
        }));
    } catch (err) {
        // Fail gracefully: log error and continue with empty entries so render doesn't timeout
        // Server logs will show the real issue in deployment logs.
        // eslint-disable-next-line no-console
        console.error("storyline: failed to load entries", err);
        entries = [];
    }


    return (
        <> {/*className="bg-[url(https://nyc.cloud.appwrite.io/v1/storage/buckets/68c11c240013701075bb/files/68c8e013000c7cf62c6b/view?project=68bb084a0032b02608c4)]"*/}
            <main >
                <Image
                    src="/images/Eldarlands-LARP-Logo-full-size.webp"
                    alt="Group of characters ready to adventure"
                    width={1200}
                    height={800}
                    sizes="100vw"

                    className="rounded-lg w-full size-1/1  p-4"
                />
                <StorylineClient entries={entries} />
            </main>
        </>
    );
}



export default Storyline