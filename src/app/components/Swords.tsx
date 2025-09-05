import React from 'react'
import Video from 'next-video';
import myVideo from '../../../videos/sword-clash.mp4';

const SwordVideo = () => {
    return <Video src={myVideo} className='border-4 border-amber-200 border-solid m-2' autoPlay
        loop
        muted
        controls
        playsInline
    />;
}

export default SwordVideo