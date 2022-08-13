import { Box, Button, Divider, Image, LoadingOverlay } from '@mantine/core'
import React, { useEffect } from 'react'
import { getProfile, profileProps } from '../components/useFireStoreQuery';
import toast, { Toaster } from 'react-hot-toast';

import ChangePasswordModal from '../components/changePasswordModal';
import { GetServerSidePropsContext } from 'next';
import { InferGetServerSidePropsType } from 'next';
import { firebase, } from '../lib/firebaseClient';
import { firebaseAdmin } from '../lib/firebaseAdmin';
import nookies from 'nookies';
import { useForm } from '@mantine/form';
import { useState } from 'react';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid } = token;
    const user = await firebaseAdmin.auth().getUser(uid);
    return {
      props: {
        user: JSON.stringify(user, null, 2),
      },
    }
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {} as never,
    };
  }
};



function profile(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [opened, setOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState<profileProps>();
  useEffect(() => {
    if (props.user) {
      getCurrentUser();
    }
    return () => {
      console.log('cleanup');
    }
  }, [])

  const getCurrentUser = async () => {
    try {

      const snapShot = await getProfile(User.uid);
      return setCurrentUser(snapShot);
    } catch (e) {
      console.log(e);
    }
  }



  const User = JSON.parse(props.user);
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    initialErrors: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) => {
        if (value.length < 8) {
          return "Password must be at least 8 characters long";
        } else return undefined;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  }
  )

  /**
   * @description Dynamically import the lib to reduce bundle size
   */
  const sendEmail = async () => {

    await firebase.auth().currentUser?.sendEmailVerification();
  }

  const submitForm = async (values: typeof form.values) => {
    await firebase.auth().currentUser?.updatePassword(values.confirmPassword);
  }
  return (
    <>
      <Toaster />
      <ChangePasswordModal
        opened={opened}
        setOpened={setOpened}
        form={form}
        submitForm={submitForm}
        toast={toast}
      />
      <LoadingOverlay visible={currentUser === undefined ? true : false} />
      <Box className="bg-gray-100">
        <div className="w-full text-white bg-main-color">
        </div >
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-indigo-400">
                <div className="image overflow-hidden">
                  <Image className="h-auto w-full mx-auto"
                    src={`https://avatars.dicebear.com/api/identicon/${User.email}.svg`}
                    alt="" />
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{User.displayName}</h1>
                <ul
                  className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Email Verified</span>
                    <span className="ml-auto"><span
                      className="bg-indigo-500 py-1 px-2 rounded text-white text-sm">
                      {User.emailVerified ? 'Yes' : 'No'}</span></span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Registered On</span>
                    <span className="ml-auto">{new Date(User.metadata.creationTime).toLocaleDateString()}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-9/12 lg:mx-2 h-64">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-indigo-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Full Name</div>
                      <div className="px-4 py-2">{User.displayName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold"></div>
                      <div className="px-4 py-2"></div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">{currentUser?.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">+91 {currentUser?.phoneNumber}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a className="text-blue-800" href="mailto:jane@example.com">{User.email}</a>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-5">
                    <Button
                      className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                      onClick={() => {
                        setOpened(true)
                      }}
                    >
                      Reset Password
                    </Button>
                    {User.emailVerified ? (null) : (<>
                      <Button
                        className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                        onClick={async () => {
                          toast.promise(sendEmail(), {
                            error: 'Some Thing Went Wrong',
                            loading: 'Sending Email',
                            success: 'Email Sent, Please Check Your Inbox'
                          })
                        }}
                      >
                        Send Email Verification
                      </Button>
                    </>)}

                  </div>
                </div>
              </div>
              <Divider />
            </div>
          </div>
        </div>
      </Box >
    </>
  )
}

export default profile