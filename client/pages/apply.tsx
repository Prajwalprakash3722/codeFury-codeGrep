import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import JobTitle from "../components/JobTitle";
import axios from "axios";
import { JobType } from "../@types";
import React from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const fetchdata = async () => {
      const res = await axios.get("http://localhost:5000/jobportal/jobs");
      return res.data;
    };

    return {
      props: {
        job: await fetchdata(),
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },

      props: {} as never,
    };
  }
};

const Apply = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 grid grid-cols-1 gap-4">
        {props.job &&
          props.job.map((job: JobType) => (
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
                clientID={job.clientID}
                key={job._id}
              />
            </>
          ))}
      </div>
    </>
  );
};

export default Apply;
