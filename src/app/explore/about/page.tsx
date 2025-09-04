import Image from "next/image";
const About = () => {
    return (
        <>


            <Image
                src="/images/ahf-intro6.png"
                alt="Group of characters ready to adventure"
                width={1200}
                height={800}
                sizes="100vw"

                className="rounded-lg w-full size-1/1  shadow-md"
            />

            <section className="bg-amber-50 md:flex md:flex-row md:m-4">


                <ul className="md:flex md:flex-col  md:w-2/5 md:justify-center">
                    <li><h2> What Sets Eldarlands Apart</h2></li>
                    <li>
                        <strong>Custom Game System:</strong> Designed from the ground up to
                        balance heavy combat with rich roleplay, Eldarlands supports both
                        warriors and noncombatants alike.
                    </li>
                    <li>
                        <strong>Player-Driven Storytelling:</strong> Characters evolve
                        through interaction, conflict, and collaboration. The world responds
                        to your choices.
                    </li>
                    <li>
                        <strong>Safety First:</strong> All combat follows strict rules and
                        weapon regulations to ensure a safe and enjoyable experience for
                        everyone.
                    </li>
                    <li>
                        <strong>Inclusive Community:</strong> We welcome players of all ages
                        and backgrounds. Whether you want to swing a sword or cast a spell,
                        there&#39;s a place for you here.
                    </li>
                </ul>


            </section>
            <section className="bg-amber-50 md:flex md:flex-row-reverse md:m-2">

                <article className="md:flex md:flex-col  md:w-2/5 md:justify-center">
                    <h2>Where and When</h2>
                    <p>
                        We meet most Sundays at 2 PM at Cedar Valley Park in Cherokee Village,
                        AR. New players are always welcome—come observe, ask questions, or
                        jump right in. <br /><br />

                    </p>

                    <h2>The World of Eldarlands</h2>
                    <p>
                        Set in a high-fantasy realm shaped by conflict and magic, Eldarlands
                        invites players to take on the roles of heroes, villains, diplomats,
                        and wanderers. The game world is dynamic, with evolving factions,
                        quests, and lore that grow with each session.
                    </p>
                </article>
                <Image
                    src="/images/ahf-outpost7.png"
                    alt="Group of players standing together"
                    width={1200}
                    height={800}
                    sizes="100vw"
                    className="rounded-lg w-full md:w-3/5 size-1/1 md:flex   shadow-md"
                />
            </section>
            <section className="bg-amber-50 md:flex md:flex-row md:m-4">
                <article className="md:flex md:flex-col  md:w-2/5 md:justify-center">
                    <h2>Why Join?</h2>
                    <p>
                        LARPing is more than dressing up and swinging foam weapons—it&#39;s
                        collaborative storytelling in motion. With a larger player base, the
                        game naturally develops rivalries, alliances, and intrigue, requiring
                        less direction and more organic interaction. That&#39;s why we&#39;re
                        always looking for new adventurers to join the fold.<br /><br />
                    </p>
                    <h2>What LARPing Really Is</h2>
                    <p>
                        Despite lingering misconceptions, LARP is simply interactive
                        make-believe. We dress as our characters, act out scenes, and follow a
                        structured ruleset to keep things fair and safe. There are no real
                        rituals, no blurred lines between fantasy and reality—just a group of
                        storytellers building something unforgettable together.<br /><br />
                    </p>
                    <h2>Get Involved</h2>
                    <p>
                        Reach out via email or stop by a Sunday session to see what we&#39;re
                        all about. Whether you&#39;re here to fight, roleplay, or just
                        explore, Eldarlands is ready for you.
                    </p>
                </article>
                <Image
                    src="/images/ahf-greetings3.png"
                    alt="Group of players standing together"
                    width={1200}
                    height={800}
                    sizes="100vw"
                    className="rounded-lg w-full md:w-3/5 size-1/1 md:flex   shadow-md"
                />
            </section>
        </>
    );
};

export default About;
