import { Button, Group } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Comment from "./Comments";

type Props = {
  _id: string;
  title: string;
  description: string;
  upvotes: number;
  authorName: string;
  authorEmail: string;
};

function IdeaTitle(props: Props) {
  const [upvotes, setUpvotes] = React.useState(false);
  const router = useRouter();
  const handleUpvote = async () => {
    // await axios.put("http://localhost:5000/jobportal/idea", {
    //   id: props._id,
    //   upvotes: upvotes ? props.upvotes - 1 : props.upvotes + 1,
    // });
    setUpvotes(!upvotes);
    // router.reload();
  };

  return (
    <>
      <div className="relative block p-8 border border-gray-100 shadow-xl rounded-xl">
        <span className="absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs">
          {props.upvotes ?? 0}
        </span>

        <div className="mt-4 text-gray-500 sm:pr-8">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            ></path>
          </svg>

          <h5 className="mt-4 text-xl font-bold text-gray-900">
            {props.title}
          </h5>

          <p className="hidden m-2 text-sm sm:block">{props.description}</p>
        </div>
        <Group>
          {!upvotes ? (
            <>
              <Button
                variant="gradient"
                gradient={{
                  from: "#ffa500",
                  to: "red",
                }}
                onClick={async () => {
                  handleUpvote();
                }}
              >
                Upvote
              </Button>
            </>
          ) : null}

          <Button
            variant="gradient"
            gradient={{
              from: "blue",
              to: "green",
            }}
          >
            Invest
          </Button>
        </Group>
        <Comment />
      </div>
    </>
  );
}
export default IdeaTitle;

function Btn() {
  return (
    <>
      <a
        className="inline-block px-12 py-3 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
        href="/download"
      >
        Invest
      </a>
    </>
  );
}
