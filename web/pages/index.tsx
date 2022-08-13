import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <span className="absolute bottom-[-9rem] lg:bottom-[50%] left-[-10vw] h-[200px] w-full lg:h-[600px] lg:w-[600px] bg-gradient-to-r from-[#505bf1] to-[#EE5DB4] filter blur-[100px] opacity-25 rounded-full"></span>
      <span className="absolute top-[-7rem] lg:top-[50%] lg:right-[5vw] h-[200px] w-screen lg:h-[600px] lg:w-[600px] bg-gradient-to-r from-[#505bf1] to-[#EE5DB4] filter blur-[100px] opacity-25 rounded-full"></span>
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
        <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
          StartUp India
        </h1>
        <div className="mt-4 md:mt-8">
          <a
            href="/onboard"
            className=" absolute inline-block px-12 py-3 text-sm font-medium text-white transition rounded bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
