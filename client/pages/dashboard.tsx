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
      
      </div></>
  )
}

export default dashboard