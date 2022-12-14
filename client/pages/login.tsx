import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core";

import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import { firebaseAdmin } from "../lib/firebaseAdmin";
import { getErrorMessage } from "../hooks/getErrorMessage";
import nookies from "nookies";
import toast from "react-hot-toast";
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

const Login = (_props: any) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      password: (value) => {
        if (value.length < 8) {
          return "Password must be at least 8 characters long";
        } else {
          return undefined;
        }
      },
    },
  });
  const submitForm = async (values: typeof form.values) => {
    {
      try {
        import("../lib/firebaseClient").then((pack) => {
          pack.firebase.auth()
            .signInWithEmailAndPassword(values.email, values.password);
        });
        setLoading(false);
        router.push("/");
      } catch (e: any) {
        toast.error(getErrorMessage(e));
        setLoading(false);
        console.log(e);
      }
    }
  };
  return (
    <>
      <Box className="min-h-full min-w-full flex flex-col items-center justify-start">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
              Login to your account
            </h1>
            <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati sunt dolores deleniti inventore quaerat mollitia?
            </p>

            <Box sx={{ maxWidth: 500 }} mx="auto">
              <form
                onSubmit={form.onSubmit(async (values) => {
                  setLoading(true);
                  toast.promise(submitForm(values), {
                    error: "Error",
                    loading: "Loading",
                    success: "Successfully Logged In",
                  });
                })}
                className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
              >
                <TextInput
                  required
                  label="Email"
                  placeholder="your@email.com"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />
                <Group position="center" mt="xl">
                  <Button type="submit" loading={loading}>
                    Submit
                  </Button>
                </Group>
                <Group position="center" className="text-sm text-gray-500">
                  <p>
                    No account?
                  </p>
                  <Link href="/register">
                    <a className="underline">Sign Up</a>
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

export default Login;
