import React from 'react'
import Image from 'next/image'
const Events = () => {
    return (
        <section className='overflow-y-auto'>

            <section className="var(--background) md:flex md:flex-row md:m-4">
                <Image
                    src="/images/party.webp"
                    alt="Group of players standing together"
                    width={1200}
                    height={800}
                    sizes="100vw"
                    className="rounded-lg w-full md:w-3/5 size-1/1 md:flex   shadow-md"
                />
                <article className="md:flex md:flex-col  md:w-2/5 md:justify-center">
                    <h2>Event:</h2> 3rd Annual Harvest Tournament & Feast

                    <time><h2>Date:</h2> Saturday, October 19th 2025</time>

                    <time>Time: 10 AM &#45; Evening</time>
                    <address><h2>Location:</h2> Due to lack of maintenance, the Annual Harvest Tournament and Feast will not take place at the park. Instead, we&#39;ll be holding this event at the Eldarlands Event Site &#45; 98 Edgewood Rd. Hardy, AR 72542</address>

                    <h2>Details:</h2> <span>Our annual tournament and feast. We will also hold our Story Marshal elections.</span>


                    <span>Please come in garb if possible, as it aides in immersion.</span>
                </article>
            </section><h2>Storyline:</h2> <p>In the wake of destruction, Outpost in is ruin. The bulk of the population has either fled, returning to the lands they previously called home, perished among the rubble, or those few lucky enough to have survived the massacre have set up small fortified camps on the outskirts of the diminishing lands once thought tamed.
                It&#39;s a time of turmoil and troubles. No one is safe. But there are those who refused to surrender, whether by choice or they have no other option, there are those who remain determined to carve out their own little piece of history.
                In the past, the Harvest Tournament and Feast was a sanctioned event, held without the safety of Outpost, open to any and all who chose to participate. With Outpost in ruin, there are no safe places left. No overseers to ensure the games are fairly judged. And no one to keep the horrors of the wild from encroaching on peaceful revelry.
                But fear not! The games will happen! Any who remain are welcome to test their mettle and see who will be the champion of the 3rd Annual Harvest Tournament and Feast. We may not have guards or a city wall to keep the dangers of the wilds at bey, but those willing to step forward and participate will be rewarded!</p>


            <section className="var(--background) md:flex md:flex-row md:m-4">
                <article className="md:flex md:flex-col  md:w-2/5 md:justify-center"><h2>***ATTENTION***</h2>

                    <span>Camping is NOT mandatory but it is encouraged.</span>

                    <p>Bathrooms and water are available on site. Any foods or luxury items should be brought with you. Be sure to arrive early to set up your came site, even if you don&#39;t plan to camp. It serves as your character&#39;s base of operations and gives you a place to rest between action.

                    </p></article>
                <Image
                    src="/images/characters_camping.webp"
                    alt="Group of players camping together"
                    width={1200}
                    height={800}
                    sizes="100vw"
                    className="rounded-lg w-full md:w-3/5 size-1/1 md:flex   shadow-md"
                />
            </section>
        </section>
    )
}

export default Events