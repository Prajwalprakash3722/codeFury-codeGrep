import { DataTable, StudentDataTable } from '../components/dataTable'
import { Divider, LoadingOverlay } from '@mantine/core';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React, { useEffect, useState } from 'react'
import { TableData, childProfile } from '../@types';
import { getStudentMentorData, getTherapyStudentData } from '../components/useFireStoreQuery';

import { firebaseAdmin } from '../lib/firebaseAdmin';
import nookies from "nookies"

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email,email_verified } = token;
    return {
      props: {
        user: {
          uid, email,email_verified
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


function dashboard(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [data, setData] = useState<TableData[]>([]);
  const [studentData, setStudentData] = useState<childProfile[]>([]);

  useEffect(() => {
    if (props.user) {
      getData();
    }
    return () => {
      console.log('cleanup');
    }
  }, [])

  const getData = async () => {
    try {
      const snapShot = await getTherapyStudentData(props.user.uid);
      const snapShotData = await getStudentMentorData(props.user.uid);
      setData(snapShot);
      setStudentData(snapShotData);
    } catch (e) {
      console.log(e);
    }
  }



  return (
    <>
      <div className="min-h-screen">
        <LoadingOverlay visible={!data} />
        <div
          className="bg-yellow-100 border border-yellow-500 text-yellow-700 px-4 py-3 rounded-lg md:hidden"
          role="alert"
        >
          <p className="font-bold">Notice:</p>
          <p className="text-sm">
            Laptop or slightly Large Display Device is Preferable{" "}
          </p>
        </div>
        <div className="border-2 m-5 min-h-full rounded-lg">
          {studentData?.length! > 0 ? (<>
            <div className="flex flex-col items-center justify-center rounded-lg">
              {data?.length > 0 && (<DataTable TableData={data} />)}
            </div>
            <Divider />
            <div className="flex flex-col items-center justify-center rounded-lg">
              <StudentDataTable studentTableData={studentData} />
            </div>
          </>
          ) : (<>
            <div className="p-5">
              <h3 className="title-font text-xl mb-4 font-medium text-gray-900">
                Welcome to {" "}
                <span className="text-xl font-serif text-gray-500">
                  Dhwani {" "}
                </span>
                <br />
                You have not registered any student yet, register a student to get started.
              </h3>
            </div>
          </>)}
        </div>
      </div></>
  )
}

export default dashboard