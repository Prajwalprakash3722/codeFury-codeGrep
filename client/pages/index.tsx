import Achievers from "../components/Achievers";
import { Image } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { useAuth } from "../hooks/auth";

export default function Index() {
  const { user } = useAuth();
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Welcome to
              <br className="inline-block" />
              <span className="text-2xl lg:text-9xl font-serif text-gray-500">
                Dhwani <br className="lg:hidden" />
              </span>
            </h1>
            <section>
              <div className="inline-block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 lg:items-center">
                  <div className="max-w-lg mx-auto text-center lg:text-left lg:mx-0">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                      Find your career path
                    </h2>

                    <p className="mt-4 text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aut vero aliquid sint distinctio iure ipsum cupiditate?
                      Quis, odit assumenda? Deleniti quasi inventore, libero
                      reiciendis minima aliquid tempora. Obcaecati, autem.
                    </p>
                    <div className="flex justify-left">
                      {user && (
                        <>
                          <Link href="/dashboard">
                            <a>
                              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
                                Dashboard
                              </button>
                            </a>
                          </Link>
                        </>
                      )}
                      {!user && (
                        <>
                          <Link href="/login">
                            <a>
                              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                Login
                              </button>
                            </a>
                          </Link>
                          <Link href="/register">
                            <a>
                              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                                Register
                              </button>
                            </a>
                          </Link>
                        </>
                      )}
                    </div>
                    {/* <a
                      className="inline-flex items-center px-8 py-3 mt-8 text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-transparent hover:text-indigo-600 active:text-indigo-500 focus:outline-none focus:ring"
                      href="/onboard"
                    >
                      <span className="text-sm font-medium"> Get Started </span>

                      <svg
                        className="w-5 h-5 ml-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a> */}
                  </div>

                  <div className="inline-block">
                    <a
                      className="block p-4 border border-gray-100 shadow-sm rounded-xl focus:outline-none focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
                      href="/startup-submission"
                    >
                      <span className="inline-block p-3 rounded-lg bg-gray-50">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          ></path>
                        </svg>
                      </span>

                      <h6 className="mt-2 font-bold">
                        Submit your startup for review
                      </h6>
                    </a>

                    <a
                      className="block p-4 border border-gray-100 shadow-sm rounded-xl focus:outline-none focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
                      href="/accountant"
                    >
                      <span className="inline-block p-3 rounded-lg bg-gray-50">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          ></path>
                        </svg>
                      </span>

                      <h6 className="mt-2 font-bold">Accountant</h6>

                      <p className="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
                        Lorem ipsum dolor sit amet consectetur.
                      </p>
                    </a>

                    <a
                      className="block p-4 border border-gray-100 shadow-sm rounded-xl focus:outline-none focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
                      href="/accountant"
                    >
                      <span className="inline-block p-3 rounded-lg bg-gray-50">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          ></path>
                        </svg>
                      </span>

                      <h6 className="mt-2 font-bold">Accountant</h6>

                      <p className="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
                        Lorem ipsum dolor sit amet consectetur.
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* <div className="min-w-screen">
              <p className="text-left lg:text-center mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
                provident. Nobis soluta laudantium at animi nesciunt velit quae,
                maiores consectetur, aliquam, reiciendis eveniet. Eaque,
                <br className="inline-block lg:hidden" />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
                provident. Nobis soluta laudantium at animi nesciunt velit quae,
                maiores consectetur, aliquam, reiciendis eveniet. Eaque,
                <br className="inline-block lg:hidden" />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
                provident. Nobis soluta laudantium at animi nesciunt velit quae,
                maiores consectetur, aliquam, reiciendis eveniet. Eaque,
              </p>
            </div> */}
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Image
              src="hero.webp"
              className="object-cover object-center rounded"
              alt="hero"
              height={600}
              width={600}
            />
          </div>
        </div>
      </section>
      <Achievers />
    </>
  );
}
