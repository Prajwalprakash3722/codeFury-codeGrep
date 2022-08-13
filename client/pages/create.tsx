import {
  Box,
  Button,
  Group,
  Radio,
  RadioGroup,
  TextInput,
} from "@mantine/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import toast, { Toaster } from "react-hot-toast";

import { Alert } from "@mantine/core";
import React from "react";
import { childProfile } from "../@types";
import { createStudentProfile } from "../components/useFireStoreQuery";
import { firebaseAdmin } from "../lib/firebaseAdmin";
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

  const form = useForm<childProfile>({
    initialValues: {
      age: 0,
      hearingAid: "",
      gender: "",
      hearingLoss: 0,
      name: "",
      parentContactNo: "",
      parentEmailId: "",
      therapistId: props.user.uid,
      uid: "",
    },
    initialErrors: {
      age: "",
      hearingAid: "",
      gender: "",
      hearingLoss: "",
      name: "",
      parentContactNo: "",
      parentEmailId: "",
      therapistId: "",
      uid: "",
    },
    validate: {
      age(value) {
        if (value < 0 || value > 100) {
          return "Enter Valid Age";
        } else if (!value) return "Enter Age";
        return null;
      },
      hearingLoss(value) {
        if (!value) return "Enter Hearing Loss";
        else if (value > 100) return "Enter Valid Hearing Loss";
        return null;
      },
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
        {!props.user.email_verified && (
          <Alert title="Warning!" color="yellow">
            Verify your email to add student.If you have already verified your
            email please login again.
          </Alert>
        )}
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
              CreateApplication
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
                  {...form.getInputProps("name")}
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
                  label="Hearing Loss"
                  placeholder="96%"
                  description="(0-100%)"
                  type="text"
                  {...form.getInputProps("hearingLoss")}
                />
                <TextInput
                  required
                  label="Hearing Aid Model"
                  placeholder="Hearing Aid Model"
                  type="tel"
                  {...form.getInputProps("hearingAid")}
                />
                <TextInput
                  required
                  label="Parent Contact Number"
                  description="Do not include +91"
                  placeholder="Parent Contact Number"
                  type="tel"
                  {...form.getInputProps("parentContactNo")}
                />
                <TextInput
                  required
                  label="Parent Email Id"
                  placeholder="youremailid@gmail.com"
                  type="email"
                  {...form.getInputProps("parentEmailId")}
                />
                <Group position="center" mt="xl">
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={!props.user.email_verified}
                  >
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
