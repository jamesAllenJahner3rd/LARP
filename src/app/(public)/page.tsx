"use client"
import React, { useEffect, useState } from 'react'
import Marketplace from '../components/MarketplaceVideo'
import Image from 'next/image'
import SwordVideo from '../components/Swords'

const Prop = {
  heading: ["Welcome", "Explore", "Members,Shop"],
  hyperRef: ["/", "/explore/about", "/player", "https://armstreet.com/collections/fireside-family-larp-costume-basics-and-more"]
}
const IMAGES = {
  "WINNING": "https://nyc.cloud.appwrite.io/v1/storage/buckets/68c11c240013701075bb/files/690e46930038d63a2878/view?project=68bb084a0032b02608c4",
  "CAMPING": "https://nyc.cloud.appwrite.io/v1/storage/buckets/68c11c240013701075bb/files/690e4841003330f3be86/view?project=68bb084a0032b02608c4",
  "GATE": "https://nyc.cloud.appwrite.io/v1/storage/buckets/68c11c240013701075bb/files/690e49290036b9401721/view?project=68bb084a0032b02608c4",
};

const page = (Prop) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 1000); // slight delay to trigger transition
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <header className='relative'>
        <Marketplace />
        <section className={`bg-[rgba(226,228,211,0.57)] shadow-amber-100 text-red-900 flex flex-col w-1/1 transform-all absolute duration-4000 ${loaded ? "opacity-100 bottom-10 skew-y-0" : "opacity-0 skew-y-90"}`}>
          <Image
            src="/images/NavBarIcon.webp"
            alt="Group of characters ready to adventure"
            width={1200}
            height={800}
            sizes="100vw"

            className="rounded-lg w-full size-1/1 "
          /><h1 className='text-[2em]!'>
            Welcome To EldarLands
          </h1></section>
      </header>
      <section className=" rounded-2xl box-border p-2 w-full relative top-0 my-5 flex md:flex-row flex-col justify-evenly">
        {/* <h1 className=`text-foreground ${MedievalSharp.className}`>Welcome To EldarLands</h1> */}

        <Image
          src="/images/battle1.webp"
          alt="Group of players standing together"
          width={1200}
          height={800}
          sizes="100vw"
          className="md:rounded-lg w-full md:w-2/5 size-1/1 md:flex  md:m-3 md:shadow-md"
        />
        <p className={`"leading-8" indent-1 bg-[rgba(232,219,219,0.5)] md:absolute  md:top-0 md:right-0 w-full md:w-3/5 rounded-2xl shadow-black shadow-2xl box-border p-2`}>
          Your heart begins to race, partially from the thrill of the looming battle, but mostly because you’re outnumber heavily. Instinctively, you reach for the sword resting at your hip while drawing upon the magics at the edge of conscious thought. A blinding light erupts from your hand as you launch your spell into the enemy forces. It disseminates the front line but more quickly converge to fill the gap. You take a defensive stance, bringing your sword to bare in anticipation of melee combat.
        </p><Image
          src="/images/hfa_magicA.webp"
          alt="Group of players standing together"
          width={1200}
          height={800}
          sizes="100vw"
          className="md:rounded-lg w-full md:w-2/5 md:mx-3 mt-8 md:mt-48 size-1/1 md:flex  md:shadow-md md:justify-self-end-safe"
        />
        <p className={`"leading-8" indent-1 bg-[rgba(232,219,219,0.5)] md:absolute md:bottom-0  md:left-0 w-full md:w-3/5 rounded-2xl shadow-black shadow-2xl box-border p-2`}>
          &nbsp;&nbsp;A thick haze lingers a few feet off the ground. You see shadows moving within, though friend or foe remans to be seen. Suddenly, an arrow breaks concealment and wizzes past your head, striking the comrade to your right. His death throes are drowned out by enemy war cries. The shadows collect themselves, forming into solid figures charging toward you.<br />
        </p>
      </section >
      <section className=" rounded-2xl box-border p-2 w-full relative top-0 my-5 flex md:flex-row flex-col justify-evenly">
        <figure className="md:rounded-lg w-full md:w-2/5 size-1/1 md:flex  md:m-3 p-3 md:shadow-md">
          <SwordVideo />
        </figure>
        <p className={`"leading-8" indent-1 bg-[rgba(232,219,219,0.5)] md:absolute  md:top-0 md:right-0 w-full md:w-3/5 rounded-2xl shadow-black shadow-2xl box-border p-2`}>
          Sweat beads upon your forehead as the enemy closes around you. You feel your grip tighten on the sword’s handle as defiance sets in your glare. You know this is your last stand. There are too many to defeat on your own. Finally, they’re close enough to strike. You bring the blade around to block an incoming attack. A side step clears you of the opponent, bring you into position to return the blow. It lands across his unarmored side. Hearing another behind you, you spin, getting the sword up just in time to parry what would have been a killing blow.
        </p>
        <Image
          src={IMAGES.WINNING}
          alt="Group of players standing together"
          width={1200}
          height={800}
          sizes="100vw"
          className="md:rounded-lg w-full md:w-3/5
           md:mx-3 mt-8 md:mt-48 size-1/1 md:flex  md:shadow-md md:justify-self-end-safe"
        />


        <p className={`"leading-8" indent-1 bg-[rgba(232,219,219,0.5)] md:absolute md:bottom-0 md:left-0 w-full md:w-3/5 rounded-2xl shadow-black shadow-2xl box-border p-2 `}>
          A battle horn echoes in the air. You hear the shouts of your allies as they join the fray, washing over the enemy on all sides. In just a few short moments the battle has ended. The enemy having been fought back, and somehow, against all odds, you’re still alive. Cheers of victory erupt as friends and allies approach. Archers collect their arrows while the dead rise, weapons raised overhead to announce they’re out of character, heading to the respawn point. It was a narrow victory but a victory none the less.
        </p>

      </section >
      <section className=" rounded-2xl box-border p-2 w-full relative top-0 my-5 flex flex-col md:flex-row justify-evenly">
        <Image
          src={IMAGES.CAMPING}
          alt="Group of players standing together"
          width={1200}
          height={800}
          sizes="100vw"
          className="md:rounded-lg w-full md:w-3/5 size-1/1 md:flex  md:m-3 md:shadow-md mt-1"
        />
        <p className={`"leading-8" indent-1 bg-[rgba(232,219,219,0.5)] md:absolute md:top-0  md:left-0 w-full md:w-5/5 my-5 rounded-2xl shadow-black shadow-2xl box-border p-2`}>
          Later that evening, you find yourself settled around a campfire. Friends chat amongst themselves. Music carries far and wide. You glance over to see your comrade, killed by arrow at the start of the fight, talking with the one you defeated by sword. They’re swapping stories of the epic encounter and how close they came to tasting victory. A smile comes to your face as you take a sip from your drinking horn. It was an awesome adventure and you get to do it all again tomorrow.

          Welcome, friends, to Eldarlands LARP.
        </p>

      </section >


    </>
  )
}

export default page