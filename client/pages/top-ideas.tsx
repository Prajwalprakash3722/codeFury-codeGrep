import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";
import IdeaTitle from "../components/idea_title";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const fetchdata = async () => {
      const res = await axios.get("http://localhost:5000/jobportal/ideas");
      return res.data;
    };

    return {
      props: {
        ideas: await fetchdata(),
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

function contact(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const ideas = [
    {
      title: "React",
      description:
        "React is a JavaScript library for building user interfaces.",
      authorName: "Manten",
      publishedOn: "2020-01-01",
      authorEmail: "test@test.com",
      upvotes: 98,
    },
    {
      title: "Angular",
      description:
        "Angular is a TypeScript-based open-source front-end web application platform led by the Angular Team at Google.",
      authorName: "Google",
      publishedOn: "2020-01-01",
      authorEmail: "test@test.com",
      upvotes: 0,
    },
    {
      title: "Vue",
      description:
        "Vue.js is a progressive framework for building user interfaces. It is maintained by the Vuejs Team.",
      authorName: "Vuejs Team",
      publishedOn: "2020-01-01",
      authorEmail: "test@test.com",
      upvotes: 43,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {props.ideas &&
          ideas
            .sort((a, b) => b.upvotes - a.upvotes)
            .map((idea: any) => (
              <>
                <IdeaTitle
                  title={idea.title}
                  description={idea.description}
                  authorName={idea.authorName}
                  authorEmail={idea.authorEmail}
                  upvotes={idea.upvotes}
                  key={idea._id}
                  _id={idea._id}
                />
              </>
            ))}
      </div>
    </>
  );
}

export default contact;
