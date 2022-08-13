import {
  Box,
  Button,
  Group,
  Image,
  MultiSelect,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import toast, { Toaster } from "react-hot-toast";

import React from "react";
import { JobType } from "../@types";
import { createStudentProfile } from "../components/useFireStoreQuery";
import { firebaseAdmin } from "../lib/firebaseAdmin";
import { firebase } from "../lib/firebaseClient";

import { getErrorMessage } from "../hooks/getErrorMessage";
import nookies from "nookies";
import { useForm } from "@mantine/form";
import { uuid } from "uuidv4";

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
  const [data, setData] = React.useState([
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    {
      value: "Java",
      label: "Java",
    },
    {
      value: "Python",
      label: "Python",
    },
    {
      value: "C++",
      label: "C++",
    },
  ]);

  const form = useForm<JobType>({
    initialValues: {
      title: "",
      description: "",
      location: "",
      pay: 0,
      deadline: "",
      skillsNecessary: [],
      jobType: "",
      publishedOn: new Date(),
    },
    initialErrors: {
      // email: "",
      // location: "",
      // github: "",
      // linkedin: "",
      // twitter: "",
      // imageURL: "",
      // description: "",
      // website: "",
      // skills: "",
    },
  });

  const submitForm = async (values: typeof form.values) => {
    {
      setLoading(true);
      try {
        await createStudentProfile({ ...values, uid: uuid() });
        setLoading(false);
        form.reset();
        toast.success("Successfully Added Profile");
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
              Create Application Form
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
                  label="Title"
                  placeholder="title"
                  type="text"
                  {...form.getInputProps("title")}
                  value={form.values.title}
                />
                <Textarea
                  required
                  label="Description"
                  description="desc"
                  placeholder="text"
                  {...form.getInputProps("description")}
                />
                <TextInput
                  required
                  label="Location"
                  placeholder="eg:Bengaluru"
                  type="text"
                  {...form.getInputProps("location")}
                />
                <TextInput
                  required
                  label="Pay"
                  placeholder="eg 4500"
                  type="number"
                  {...form.getInputProps("pay")}
                />
                <TextInput
                  required
                  label="Deadline"
                  placeholder="dd/mm/yy"
                  type="text"
                  {...form.getInputProps("deadline")}
                />
                <Select
                 data={[
                    
                    { value: 'full time', label: 'Full time' },
                    { value: 'part time', label: 'part time' },
                    { value: 'internship', label: 'Internship' },
                    { value: 'freelance', label: 'Freelance' },
                  ]}
                  label="Job type"
                  placeholder="sdfdssf"
                  type="text"
                  {...form.getInputProps("jobType")}
                />
                <MultiSelect
                  label="Skills needed"
                  data={data}
                  placeholder="eg:Java,Python,C++ or add your own"
                  searchable
                  creatable
                  getCreateLabel={(query) => `+ Add ${query}`}
                  onCreate={(query) => {
                    const item = { value: query, label: query };
                    setData((current) => [...current, item]);
                    return item;
                  }}
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
