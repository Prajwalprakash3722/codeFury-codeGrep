import { DEActivities, getAllActivities, getStudentProfileData } from '../components/useFireStoreQuery';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { LoadingOverlay, Skeleton } from '@mantine/core';
import React, { useEffect, useState } from 'react'

import RenderProfile from '../components/renderProfile';
import UnlockActivity from '../components/UnlockActivity';
import { childProfile } from '../@types';
import dynamic from 'next/dynamic'
import { firebaseAdmin } from '../lib/firebaseAdmin';
import nookies from 'nookies';
import { useRouter } from 'next/router';

const RenderLineChart = dynamic(
  () => import('../components/renderChart'), { ssr: false })

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: {
        user: {
          uid, email
        }
      },
    }
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





function manage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const router = useRouter()

  const { id } = router.query

  const [data, setData] = useState<childProfile | null>(null);
  const [activityData, setActivityData] = useState<DEActivities | null>(null);


  useEffect(() => {
    if (props.user.uid && id) {
      getCurrentProfile();
    }
    return () => {
      console.log('cleanup');
    }

  }, [])

  const getCurrentProfile = async () => {
    try {
      const snapShot = await getStudentProfileData(id as string);
      const activitySnap = await getAllActivities(id as string);
      setActivityData(activitySnap);
      return setData(snapShot as any);
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <>
      <div
        className="bg-yellow-100 border border-yellow-500 text-yellow-700 px-4 py-3 rounded-xl mt-2 lg:hidden"
        role="alert"
      >
        <p className="font-bold">Notice:</p>
        <p className="text-sm">
          Laptop or slightly Large Display Device is Preferable{" "}
        </p>
      </div>
      <section className="text-gray-600 body-font">
        <div className="lg:flex flex-row items-center ml-5 px-4">
          <div className="hidden lg:block">
          </div>
          <div className="container px-5 py-5 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <div className="block lg:hidden">
              </div>
              <h1 className="sm:text-3xl text-2xl font-round title-font mb-4 text-gray-900">
              </h1>
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-lg">
                You can manage your Student's details, view the Student's
                progress, schedule a session with your Student here.
              </p>
            </div>
            <LoadingOverlay visible={!data} />
            <div className="flex flex-wrap -m-4 ">
              <div className="w-auto xl:w-1/2 md:w-1/2 p-4">
                <Skeleton visible={!data}>
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h2 className="text-xl text-gray-700 font-round title-font mb-2">
                      {data &&
                        data!.name + " 's Profile"
                      }
                    </h2>
                    <RenderProfile data={data} />
                  </div>
                </Skeleton>
              </div>
              <div className="w-full xl:w-1/2 md:w-1/2 p-4">
                <Skeleton visible={!data}>
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-xl text-gray-700 font-round title-font mb-2">
                      Progress{" "}
                    </h2>
                    <RenderLineChart />
                  </div>
                </Skeleton>
              </div>
              <div className="w-full xl:w-1/2 md:w-1/2 p-4">
                <Skeleton visible={!data}>
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="6" cy="6" r="3" />
                        <circle cx="6" cy="18" r="3" />
                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                      </svg>
                    </div>
                    <h2 className="text-xl text-gray-700 font-round title-font mb-2">
                      {data && data.name
                        ? "Unlock activities for " + data.name
                        : "Unlock activities"}
                    </h2>
                    {data && (
                      <UnlockActivity allActivities={activityData!} uid={props.user.uid} />
                    )}
                  </div>
                </Skeleton>
              </div>
              <div className="w-full xl:w-1/2 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                    </svg>
                  </div>
                  {/* {Schedule()} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default manage