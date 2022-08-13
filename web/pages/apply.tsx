import type { NextPage } from "next";
import JobTitle from '../../client/components/JobTitle';

const About: NextPage = () => {
    return (
      <>
        <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
          <JobTitle />
          {/* <Job_title />
                <Job_title />
                <Job_title />
                <Job_title />
                <Job_title />
                <Job_title /> */}
        </div>
      </>
    );
};

export default About;