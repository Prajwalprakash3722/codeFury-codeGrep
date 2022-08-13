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
            <div className="min-w-screen">
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
            </div>
            <div className="flex justify-center">
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

              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg" name="Download Android App">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 512 512"
                >
                  <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                </svg>
                <span className="ml-4 flex items-center flex-col leading-none"></span>
              </button>
            </div>
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
