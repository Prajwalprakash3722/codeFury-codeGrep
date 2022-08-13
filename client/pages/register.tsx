import {
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Radio,
  RadioGroup,
  TextInput,
} from "@mantine/core";
import toast, { Toaster } from "react-hot-toast";

import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import { createNewProfile } from "../components/useFireStoreQuery";
import { firebase } from "../lib/firebaseClient";
import { firebaseAdmin } from "../lib/firebaseAdmin";
import { getErrorMessage } from "../hooks/getErrorMessage";
import nookies from "nookies";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    if (token) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    } else {
      return {
        props: {} as never,
      };
    }
  } catch (err) {
    return {
      props: {} as never,
    };
  }
};

const Register = (_props: any) :JSX.Element=> {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      gender: "",
      terms: false,
    },
    initialErrors: {
      confirmPassword: "",
      fullName: "",
      email: "",
      password: "",
      terms: "",
    },
    validate: {
      email: (value) => {
        if (!value) {
          return "Email is required";
        } else return undefined;
      },
      password: (value) => {
        if (value.length < 8) {
          return "Password must be at least 8 characters long";
        } else return undefined;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
      terms: (value) =>
        value ? null : "You must accept the terms and conditions",
    },
  });

  const submitForm = async (values: typeof form.values) => {
    {
      setLoading(true);
      try {
        const User = await firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password);
        await firebase.auth().currentUser?.updateProfile({
          displayName: values.fullName,
        });
        await firebase.auth().currentUser?.sendEmailVerification();
        const data = {
          fullName: values.fullName,
          uid: User.user?.uid as string,
          email: values.email,
          phoneNumber: values.phoneNumber,
          gender: values.gender,
          terms: values.terms,
        };
        await createNewProfile(data);
        setLoading(false);
        toast.success("Successfully Registered");
        router.push("/");
      } catch (e: any) {
        toast.dismiss();
        setLoading(false);
        toast.error(getErrorMessage(e));
      }
    }
  };

  return (
    <>
      <Box className="min-h-full min-w-full flex flex-col items-center justify-start">
        <Toaster position="top-center" />
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
              Register your account
            </h1>
            <Box sx={{ maxWidth: 500 }} mx="auto">
              <form
                onSubmit={form.onSubmit(
                  async (values) =>
                    await toast.promise(submitForm(values), {
                      loading: "Loading",
                      success: null,
                      error: null,
                    })
                )}
                className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
              >
                <TextInput
                  required
                  label="Full Name"
                  placeholder="Full Name"
                  type="text"
                  {...form.getInputProps("fullName")}
                />
                <RadioGroup
                  label="Select your gender"
                  description="This will not be shared and will be used for internally"
                  required
                  {...form.getInputProps("gender")}
                >
                  <Radio value="male" label="Male" />
                  <Radio value="female" label="Female" />
                  <Radio value="neutal" label="Prefer not to say" />
                </RadioGroup>
                <TextInput
                  required
                  label="Email"
                  placeholder="your@email.com"
                  type="email"
                  {...form.getInputProps("email")}
                />
                <TextInput
                  required
                  label="Phone Number"
                  placeholder="Phone Number"
                  type="tel"
                  {...form.getInputProps("phoneNumber")}
                />
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />

                <PasswordInput
                  required
                  mt="sm"
                  label="Confirm password"
                  placeholder="Confirm password"
                  {...form.getInputProps("confirmPassword")}
                />
                <Checkbox
                  required
                  mt="md"
                  label="I agree to the terms and conditions"
                  {...form.getInputProps("terms", { type: "checkbox" })}
                />

                <Group position="center" mt="xl">
                  <Button type="submit" loading={loading}>
                    Submit
                  </Button>
                </Group>
                <Group position="center" className="text-sm text-gray-500">
                  <p>
                    Have an Account?
                  </p>
                  <Link href="/login">
                    <a className="underline">Login</a>
                  </Link>{" "}
                </Group>
              </form>
            </Box>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Register;
