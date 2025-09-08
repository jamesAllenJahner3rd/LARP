import React from 'react'

// import marketside from '@public/video/marketside.mp4';



const Marketplace = () => {
    return <video src="/videos/marketside.mp4"
        className='border-4 border-amber-200 border-solid m-2 flex justify-self-center'
        autoPlay

        muted
        controls
        playsInline
    />;
}

export default Marketplace