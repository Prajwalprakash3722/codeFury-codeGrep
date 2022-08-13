import React, { useEffect, useState } from "react";

import AchieversCard from "./AchieversCard";
import { SuccessStories } from "../@types";
import { getSuccessStories } from "./useFireStoreQuery";

const Achievers = () => {
  const [SuccessData, setSuccessData] = useState<SuccessStories[] | null>(null);
  useEffect(() => {
    fetchSuccessData();
  }, []);

  const fetchSuccessData = async () => {
    const snapShot = await getSuccessStories()
    setSuccessData(snapShot);
  }


  return (
    <>
      {SuccessData && (
        <>
          <section className="text-gray-600 body-font">
            <h1 className="text-center text-3xl font-semibold text-blue-900">
              Achievers
            </h1>
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                  {SuccessData && SuccessData.map((data) => (
                    <AchieversCard props={data} key={JSON.stringify(data)} />
                  ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Achievers;
