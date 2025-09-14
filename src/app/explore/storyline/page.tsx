

import { storage, databases } from '@/lib/appwrite'
import { postData, getData, patchData, deleteData, getTable } from '@/lib/database';
import StorylineClient from './StorylineClient';

const Storyline = async () => {
    const table = await getTable("68c1160a001638ade3a0", "storyentries")
    const entries = table.documents
    console.log(table.documents)
    return <StorylineClient entries={table.documents} />;
}



export default Storyline