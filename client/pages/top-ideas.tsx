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
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {props.ideas &&
          props.ideas.map((idea: any) => (
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
