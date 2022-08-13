import { SimpleGrid } from '@mantine/core';

function Pitch() {
    return (
        <SimpleGrid cols={1}>
            <section className="pitch_section">
            <div className='div_pitch'>
                <a href="https://www.spacex.com/" className="block overflow-hidden rounded-2xl">
                    {/* <img className="object-cover w-full h-56" src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" /> */}
                    <iframe width="900" height="506" src="https://www.youtube.com/embed/0qo78R_yYFA" title="SpaceX Interplanetary Transport System" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div className="p-4 bg-gray-900">
                        <p className="text-xs text-gray-500">website.com</p>

                        <h5 className="text-sm text-white">How to position your furniture for positivity</h5>

                        <p className="mt-1 text-xs text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum nobis aliquid accusamus? Sint, sequi voluptas.</p>
                    </div>
                </a>
            </div>
            <div className='div_pitch'>
                <a href="https://www.spacex.com/" className="block overflow-hidden rounded-2xl">
                    {/* <img className="object-cover w-full h-56" src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" /> */}
                    <iframe width="900" height="506" src="https://www.youtube.com/embed/0qo78R_yYFA" title="SpaceX Interplanetary Transport System" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div className="p-4 bg-gray-900">
                        <p className="text-xs text-gray-500">website.com</p>

                        <h5 className="text-sm text-white">How to position your furniture for positivity</h5>

                        <p className="mt-1 text-xs text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum nobis aliquid accusamus? Sint, sequi voluptas.</p>
                    </div>
                </a>
            </div>
        </section>
        </SimpleGrid>
    )
}
export default Pitch