import { Box, Button, Group, Textarea, TextInput } from "@mantine/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import toast, { Toaster } from "react-hot-toast";

import React from "react";
import { firebase } from "../lib/firebaseClient";

import { getErrorMessage } from "../hooks/getErrorMessage";
import nookies from "nookies";
import { useForm } from "@mantine/form";
import { uuid } from "uuidv4";
import { DatePicker } from "@mantine/dates";
import axios from "axios";
import { firebaseAdmin } from "../lib/firebaseAdmin";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email, email_verified } = token;
    return {
      props: {
        user: {
          uid,
          email,
          email_verified,
        },
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

const CreateApplication = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [loading, setLoading] = React.useState(false);
  const form = useForm({
    initialValues: {
      authorName: "",
      authorEmail: props.user.email,
      avatarURL: "",
      title: "",
      description: "",
      upvotes: 0,
    },
  });

  const submitForm = async (values: typeof form.values) => {
    {
      console.log(values);
      setLoading(true);
      try {
        await axios.post("http://localhost:5000/jobportal/idea", values);
        setLoading(false);
        form.reset();
        toast.success("Successfully Added Job");
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
              Post a Idea
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
                {" "}
                <TextInput
                  required
                  label="Name"
                  placeholder="name"
                  type="text"
                  {...form.getInputProps("authorName")}
                  value={firebase.auth().currentUser!.displayName as string}
                />
                <TextInput
                  required
                  label="Idea Title"
                  placeholder="eg: MarkitUp"
                  type="text"
                  {...form.getInputProps("title")}
                />
                <Textarea
                  required
                  label="Description"
                  description="desc"
                  placeholder="text"
                  {...form.getInputProps("description")}
                />
                <TextInput
                  label="Image to your Idea Link"
                  placeholder="https://unsplash.com/photos/yC-Yzbqy7PY"
                  type="text"
                  {...form.getInputProps("avatarURL")}
                />
                <Group position="center" mt="xl">
                  <Button type="submit" loading={loading}>
                    Submit
                  </Button>
                </Group>
              </form>
            </Box>
          </div>
        </div>
      </Box>
    </>
  );
};

export default CreateApplication;
