import type { NextPage } from "next";
import CommentSkeleton from "../components/thread_comment";



const TopPages: NextPage = () => {
  return (
    <>
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
          <CommentSkeleton/>

      </div>
    </>
  );
};

export default TopPages;
