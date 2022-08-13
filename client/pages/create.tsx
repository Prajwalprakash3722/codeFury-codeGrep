import {
  Box,
  Button,
  Group,
  Image,
  MultiSelect,
  Radio,
  RadioGroup,
  Textarea,
  TextInput,
} from "@mantine/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import toast, { Toaster } from "react-hot-toast";

import React from "react";
import { JobFormPortal } from "../@types";
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

  const form = useForm<JobFormPortal>({
    initialValues: {
      name: firebase.auth().currentUser?.displayName as string,
      email: props.user.email as string,
      gender: "",
      age: 0,
      location: "",
      github: "",
      linkedin: "",
      twitter: "",
      skills: "",
      imageURL: "",
      description: "",
      website: "",
      achievements: "",
      degree: "",
      endDate: "",
      fieldOfStudy: "",
      gpa: 0,
      instituationName: "",
      isCurrent: false,
      startDate: "",
      companyName: "",
      maxNoOfYears: 0,
      position: "",
    },
    initialErrors: {
      email: "",
      location: "",
      github: "",
      linkedin: "",
      twitter: "",
      imageURL: "",
      description: "",
      website: "",
      skills: "",
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
                <Image src={form.values.imageURL ? form.values.imageURL : ""} />
                <TextInput
                  required
                  label="Full Name"
                  placeholder="Full Name"
                  type="text"
                  {...form.getInputProps("name")}
                  value={form.values.name}
                />
                <RadioGroup
                  label="Select your gender"
                  description="This will not be shared and will be used for internally"
                  required
                  {...form.getInputProps("gender")}
                >
                  <Radio value="male" label="Male" />
                  <Radio value="female" label="Female" />
                  <Radio value="neutral" label="Prefer not to say" />
                </RadioGroup>
                <TextInput
                  required
                  label="Age"
                  description="(1-99)"
                  placeholder="18"
                  type="number"
                  {...form.getInputProps("age")}
                />
                <TextInput
                  required
                  label="Where are you based?"
                  placeholder="eg:Bengaluru"
                  type="text"
                  {...form.getInputProps("location")}
                />
                <Textarea
                  required
                  label="Your Achievements"
                  placeholder="...."
                  {...form.getInputProps("instituationName")}
                />
                  <Textarea
                  required
                  label="Your Achievements"
                  placeholder="...."
                  {...form.getInputProps("degree")}
                />
                  <Textarea
                  required
                  label="Your Achievements"
                  placeholder="...."
                  {...form.getInputProps("fieldOfStudy")}
                />
                <TextInput
                  required
                  type="text"
                  {...form.getInputProps("skills")}
                />
                <MultiSelect
                  label="Your Skills"
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
                <Textarea
                  required
                  label="Short Bio About Yourself"
                  placeholder="...."
                  {...form.getInputProps("description")}
                />
                <Textarea
                  required
                  label="Your Achievements"
                  placeholder="...."
                  {...form.getInputProps("achievements")}
                />
                <TextInput
                  required
                  label="Your LinkedIn Profile"
                  placeholder="https://linkden.com/"
                  type="tel"
                  {...form.getInputProps("linkedin")}
                />
                <TextInput
                  label="Your Github Profile"
                  placeholder="https://github.com/"
                  type="tel"
                  {...form.getInputProps("github")}
                />
                <TextInput
                  required
                  label="Your Twitter Profile"
                  placeholder="https://twitter.com/"
                  type="tel"
                  {...form.getInputProps("twitter")}
                />
                <TextInput
                  required
                  label="Your  Portfolio"
                  placeholder="..."
                  type="tel"
                  {...form.getInputProps("website")}
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
