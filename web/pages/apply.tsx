import type { NextPage } from "next";
import Job_title from "../components/Job";

const About: NextPage = () => {
  return (
    <>
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
      <Job_title/>
      </div>
    </>
  );
};

export default About;