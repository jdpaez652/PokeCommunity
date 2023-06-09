import './index.css'

const About = () => {
    return (
        <>
            <div className="about_page_wrapper">
                <div className='what_is_section container centered'>
                    <h2>What is this?</h2>
                    <p>
                        <b>Poké Community</b> is a semi-public web platform willing to let you enjoy with your Pokémon childhood memories, <b>and guess what!?</b>, with friends and other people over the world!.
                    </p>
                </div>

                <div className='container centered'>
                    <h1>What will you be able to do?</h1>
                    <div className='will_do_section '>
                        <div className='container centered'>
                            <h3>There are a lot of them on the hood!</h3>
                            <img src="/statics/about/warningPokemons.svg" width={200} alt="" />
                            <p>You can set as favorite the Pokémons you like, so you can build your own Pokédex.</p>
                        </div>
                        <div className='container centered'>
                            <h3>Watch and compare!</h3>
                            <img src="/statics/about/stats.png" width={200} alt="" />
                            <p>Take a look to the other user's Pokédexes and see how powerfull you are.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;