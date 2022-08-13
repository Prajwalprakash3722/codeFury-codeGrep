import { AppShell, Divider, Header, Image, Menu } from "@mantine/core";

import Link from "next/link";
import React from "react";
import { useAuth } from "../hooks/auth";
import { useRouter } from "next/router";

const NavBar = () => {
  const { user } = useAuth();
  const router = useRouter();

  /**
   * @description Performing Dynamic Imports as it reduces the overhead of the navBar
   */
  const handleLogout = () => {
    import("../lib/firebaseClient").then((pack) => {
      pack.firebase.auth().signOut();
    });
    router.push("/login");
  }


  return (
    <header className="shadow-sm">
      <div className="max-w-screen-xl p-4 mx-auto">
        <div className="flex flex-row items-center justify-between space-x-4 lg:space-x-10">
          <div className="flex lg:w-0 lg:flex-1">
            <Image
              src="dhwaniLogo.png"
              alt="Dhwani Logo"
              className="h-16 w-16 lg:h-20 lg:w-20"
            />
            {/* <span className="w-20 h-10 bg-gray-200 rounded-lg"></span> */}
          </div>
          <nav className="hidden space-x-8 text-sm font-medium md:flex">
            {user ? (
              <>
                <Link href="/">
                  <a className="text-gray-500 hover:text-indigo-400" href="/">
                    Home
                  </a>
                </Link>
                <Link href="/learn">
                  <a
                    className="text-gray-500 hover:text-indigo-400"
                    href="/learn"
                  >
                    Learn More
                  </a>
                </Link>
                <Link href="/contact">
                  <a
                    className="text-gray-500 hover:text-indigo-400"
                    href="/contact"
                  >
                    Contact
                  </a>
                </Link>
                <Link href="/apply">
                  <a className="text-gray-500 hover:text-indigo-400" href="/apply">
                    Apply
                  </a>
                </Link>
                <Link href={`/dashboard`}>
                  <a
                    className="text-gray-500 hover:text-indigo-400"
                    href="/learn"
                  >
                    Dashboard
                  </a>
                </Link>
                
                {/* <Link href="/manage">
                  <a className="text-gray-500 hover:text-indigo-400" href="/contact">
                    Manage Students
                  </a>
                </Link>
                <Link href="/clinicaldata">
                  <a className="text-gray-500" href="/authenticated">
                    Add Clinical Data
                  </a>
                </Link> */}
              </>
            ) : (
              <>
                <Link href="/">
                  <a className="text-gray-500 hover:text-indigo-400" href="/">
                    Home
                  </a>
                </Link>
                <Link href="/learn">
                  <a
                    className="text-gray-500 hover:text-indigo-400"
                    href="/learn"
                  >
                    Learn More
                  </a>
                </Link>
                <Link href="/contact">
                  <a
                    className="text-gray-500 hover:text-indigo-400"
                    href="/contact"
                  >
                    Contact
                  </a>
                </Link>
              </>
            )}
          </nav>

          <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
            {!user ? (
              <>
                <Link href="/login">
                  <a className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg">
                    Login
                  </a>
                </Link>

                <Link href="/register">
                  <a className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg">
                    Sign up
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile">
                  <a className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg">
                    {/* Logged as {user.displayName} */}
                    profile
                  </a>
                </Link>
                <button
                  className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <Menu
              control={
                <button
                  className="p-2 text-gray-600 bg-gray-100 rounded-lg"
                  type="button"
                  name="Mobile Navigation Menu"
                >
                  {" "}
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6h16M4 12h16M4 18h16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              }
            >
              {user ? (
                <>
                  <Menu.Label>Goto</Menu.Label>
                  <Menu.Item>
                    <Link href="/authenticated">
                      <a className="text-gray-500" href="/dashboard">
                        Dashboard
                      </a>
                    </Link>
                  </Menu.Item>
                  {/* <Menu.Item>
                    <Link href="/authenticated">
                      <a className="text-gray-500" href="/manage">
                        Manage Student
                      </a>
                    </Link>
                  </Menu.Item> */}
                  <Divider />
                  <Menu.Label>Actions</Menu.Label>
                  <Menu.Item color="indigo">
                    <button onClick={handleLogout}>Logout</button>
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Label>Goto</Menu.Label>

                  <Menu.Item>
                    <Link href="/authenticated">
                      <a className="text-gray-500" href="/">
                        Home
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/learn">
                      <a className="text-gray-500" href="/learn">
                        Learn More
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/contact">
                      <a className="text-gray-500" href="/contact">
                        Contact
                      </a>
                    </Link>
                  </Menu.Item>
                  <Divider />
                  <Menu.Label>Actions</Menu.Label>
                  <Menu.Item color="indigo">
                    <Link href="/login">
                      <a href="/login">Login</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item color="indigo">
                    <Link href="/register">
                      <a href="/register">Register</a>
                    </Link>
                  </Menu.Item>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="static bottom-0 bg-gray-50 w-[100%]">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        {/* <span className="block w-32 h-10 bg-gray-200 rounded-lg"></span> */}
        <Image
          src="dhwaniLogo.png"
          alt="Dhwani Logo"
          className="h-16 w-16 lg:h-20 lg:w-20"
        />
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-medium">Services</p>

            <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
              <a className="hover:opacity-75">
                {" "}
                1on1 Coaching{" "}
              </a>
            </nav>
          </div>

          <div>
            <p className="font-medium">Legal</p>

            <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
              <a className="hover:opacity-75">
                {" "}
                Privacy Policy{" "}
              </a>
            </nav>
          </div>
        </div>
        <div className="pt-8 mt-8 border-t border-gray-100 sm:items-center sm:justify-between sm:flex">
          <p className="text-xs text-gray-500">&copy; 2022 Dhwani IISC (Ustaah Labs)</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <span className="text-xs text-gray-500 text-center">
          Collaboration with{" "}
        </span>
        <div className="flex items-center justify-center gap-4 mb-2">
          <Image
            src="ustaahLogo.png"
            alt="Dhwani Logo"
            className="h-full object-cover rounded-full w-16 lg:h-20 lg:w-20 hover:shadow-xl transition-shadow duration-300 ease-in-out p-4"
          />
          <Image
            src="cpdmLogo.png"
            alt="Dhwani Logo"
            className="h-full object-cover rounded-full w-16 lg:h-20 lg:w-20 hover:shadow-xl transition-shadow duration-300 ease-in-out p-4"
          />
          <Image
            src="IISc.png"
            alt="Dhwani Logo"
            className="h-full object-cover rounded-full w-16 lg:h-20 lg:w-20 hover:shadow-xl transition-shadow duration-300 ease-in-out p-4"
          />
          <Image
            src="johnsLogo.png"
            alt="Dhwani Logo"
            className="h-full object-cover rounded-full w-16 lg:h-20 lg:w-20 hover:shadow-xl transition-shadow duration-300 ease-in-out p-4"
          />
        </div>
      </div>
    </footer>
  );
};

const WrapApp = ({ children }: any) => {
  return (
    <AppShell
      padding="md"
      header={
        <Header height="auto">
          <NavBar />
        </Header>
      }
      footer={<Footer />}
    >
      {children}
    </AppShell>
  );
};

export default WrapApp;
