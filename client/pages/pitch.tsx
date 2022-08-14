import { SimpleGrid } from '@mantine/core';

function Pitch() {
    return (
        <SimpleGrid cols={1}>
            <section className="flex pitch_section">
                <a className="" href="/startup-submission" >
                    <Buttons_pitch />
                </a>


                <div className='div_pitch'>
                    <a href="https://www.spacex.com/" className="block overflow-hidden rounded-2xl">
                        {/* <img className="object-cover w-full h-56" src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" /> */}
                        <iframe width="900" height="506" src="https://www.youtube.com/embed/0qo78R_yYFA" title="SpaceX Interplanetary Transport System" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <div className="p-4 bg-gray-900">
                            <p className="text-xs text-gray-500">spacex.com</p>

                            <h5 className="text-sm text-white">SpaceX designs, manufactures and launches the world’s most advanced rockets and spacecraft</h5>

                            <p className="mt-1 text-xs text-gray-500">The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</p>
                        </div>
                    </a>
                </div>
                <div className='div_pitch'>
                    <a href="https://www.edupass.org/" className="block overflow-hidden rounded-2xl">
                        <iframe width="900" height="506" src="https://www.youtube.com/embed/eFAcnibCQSA" title="Startup Pitch: Edupass | Global Seedstars Summit 2017" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                        <div className="p-4 bg-gray-900">
                            <p className="text-xs text-gray-500">edupass.com</p>

                            <h5 className="text-sm text-white">The International Student Guide to Studying in the USA</h5>

                            <p className="mt-1 text-xs text-gray-500">eduPASS's guide is a resource for international students looking to study in the USA -- providing academic, cultural, and financial tips.</p>
                        </div>
                    </a>
                </div>
            </section>
        </SimpleGrid>
    )
}
export default Pitch


function Buttons_pitch() {
    return (<>
        <a className="relative inline text-sm font-medium text-white group focus:outline-none focus:ring" href="/startup-submission">
            <span className="absolute inset-0 border border-red-600 group-active:border-red-500"></span>
            <span className="block px-12 py-3 transition-transform bg-red-600 border border-red-600 active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                Subit your solution/pitch
            </span>
        </a>
    </>);
}