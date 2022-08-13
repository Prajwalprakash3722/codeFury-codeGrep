import React from "react";

function IdeaTitle() {
    return (
        <>
            <a
                className="relative block p-8 overflow-hidden border border-gray-100 rounded-lg"
                href=""
            >
                <span
                    className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                ></span>

                <div className="justify-between sm:flex">
                    <div>
                        <h5 className="text-xl font-bold text-gray-900">
                            Building a SaaS product as a software developer
                        </h5>
                        <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
                    </div>
                </div>

                <div className="mt-4 sm:pr-8">
                    <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum
                        provident a, ipsa maiores deleniti consectetur nobis et eaque.
                    </p>
                </div>
            </a>
            <div className="box">
                <a className="button" href="#popup1">Know more</a>
            </div>
            {/* pop up */}
            <div id="popup1" className="overlay">
                <div className="popup">
                    <a className="close" href="#">&times;</a>
                    <div className="content">
                        Invest in the future.
                    </div>
                    <Btn/>
                </div>
            </div>
        </>
    );
}
export default IdeaTitle

function Btn() {
    return (
        <>
            <a className="inline-block px-12 py-3 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring" href="/download">
               Invest
            </a>
        </>
    );
}