import { Button } from "@mantine/core";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { JobType } from "../@types";

function JobTitle(props: JobType) {
  const [applied, setApplied] = React.useState(false);

  return (
    <>
      <Toaster />
      <article className="bg-white border-2 border-gray-100 rounded-xl">
        <div className="flex items-start p-6">
          <a href="" className="block shrink-0">
            <img
              src="https://rvce.edu.in/sites/default/files/logo_0.png"
              alt="User Avatar"
              className="object-cover rounded-lg h-14 w-14"
            />
          </a>

          <div className="ml-4">
            <strong className="font-medium sm:text-lg">
              <p className="hover:underline">{props.title}</p>
            </strong>

            <p className="text-sm text-gray-700 line-clamp-2">
              {props.description}
            </p>

            <div className="mt-2 sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center text-gray-500">
                <p className="ml-1 text-xs">
                  Posted On:{" "}
                  {props.publishedOn?.toLocaleDateString() ??
                    new Date().toLocaleDateString()}
                </p>
              </div>
              <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                {props.skillsNecessary.map((skill) => (
                  <span
                    key={skill}
                    className="mr-1 bg-gray-400 p-2 rounded-full text-gray-900"
                  >
                    {skill}
                  </span>
                ))}
              </p>
              <span className="hidden sm:block" aria-hidden="true">
                &middot;
              </span>
              <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                Approx Pay:{props.pay}
              </p>
              <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                Posted by
                <a
                  href=""
                  className="font-medium underline hover:text-gray-700"
                >
                  {"  "}
                  {props.postedBy ?? "Unknown"}
                </a>
              </p>
              <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                Deadline to Apply:{props.deadline}
              </p>
              <Button
                color={!applied ? "orange" : "green"}
                onClick={() => {
                  toast.success("Applied Successfully");
                  setApplied((ap) => !ap);
                }}
              >
                {!applied ? "Apply Now" : "Applied"}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <strong className="-mr-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-tl-xl rounded-br-xl bg-green-600 py-1.5 px-3 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>

            <span className="text-[10px] font-medium sm:text-xs">
              {props.jobType.toUpperCase( )}
            </span>
          </strong>
        </div>
      </article>
    </>
  );
}

export default JobTitle;

function Buttons() {
  return <></>;
}
