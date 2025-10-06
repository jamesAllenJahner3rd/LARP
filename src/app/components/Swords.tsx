import React from 'react'

// import swordClash from '@public/video/sword-clash.mp4';



const SwordVideo = () => {
    return <video src="/videos/sword-clash.mp4"
        className='flex justify-self-center border-4 border-amber-200 border-solid m-2 '
        autoPlay
        loop
        muted
        controls
        playsInline
    />;
}

export default SwordVideo