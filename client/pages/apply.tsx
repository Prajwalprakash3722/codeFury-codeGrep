import type { NextPage } from "next";
import JobTitle from "../components/JobTitle";
import axios from "axios";
import { JobType } from "../@types";
import React from "react";

const Apply: NextPage = () => {
  const [jobs, setJobs] = React.useState<JobType[]>();

  React.useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const res = await axios.get("http://localhost:5000/jobportal/jobs");
    console.log(res.data);
    setJobs(res.data);
  };

  return (
    <>
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 grid grid-cols-1 gap-4">
        {jobs &&
          jobs.map((job) => (
            <>
              <JobTitle
                companyImageUrl={job.companyImageUrl}
                description={job.description}
                title={job.title}
                postedBy={job.postedBy}
                publishedOn={job.publishedOn}
                skillsNecessary={job.skillsNecessary}
                pay={job.pay}
                location={job.location}
                deadline={job.deadline}
                _id={job._id}
                jobType={job.jobType}
              />
            </>
          ))}
      </div>
    </>
  );
};

export default Apply;
