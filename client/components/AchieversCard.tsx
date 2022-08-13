import React from "react";
import { SuccessStories } from "../@types";

interface Props {
  props: SuccessStories;
}

const AchieversCard = ({ props }: Props) => {
  return (
    <>
      <div className="lg:w-1/3 lg:mb-0 p-4 shadow-xl hover:transition-shadow">
        <div className="h-full text-center">
          <img
            alt="testimonial"
            className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
            src={`${props.profile_url}`}
          />
          <p className="first-letter:text-xl leading-relaxed">
            {props.content}
          </p>
          <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>
          <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
            {props.name}
          </h2>
          <p className="text-gray-500">{props.details},</p>
        </div>
      </div>
    </>
  );
};

export default AchieversCard;
