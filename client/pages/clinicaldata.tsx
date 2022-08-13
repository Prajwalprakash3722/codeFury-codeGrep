import { Alert, Box, Button, Group, Select, TextInput, Textarea } from "@mantine/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import toast, { Toaster } from "react-hot-toast";

import { DatePicker } from "@mantine/dates";
import React from "react";
import { firebaseAdmin } from "../lib/firebaseAdmin";
import { getErrorMessage } from "../hooks/getErrorMessage";
import { getStudentMentorData } from "../components/useFireStoreQuery";
import nookies from "nookies";
import { useForm } from "@mantine/form";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email, email_verified } = token;
    return {
      props: {
        user: {
          uid, email, email_verified
        }
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

function AuthenticatedPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {

  const [loading, setLoading] = React.useState(false);
  const [studentData, setStudentData] = React.useState<any[]>([]);

  React.useEffect(() => {
    getCurrentProfile(props.user.uid);
    return () => {
      console.log('unmounting');
    }
  }, [])


  const getCurrentProfile = async (id: string) => {
    try {
      let arr: any = [];
      const snapShot = await getStudentMentorData(id as string);
      snapShot.map((shot) => {
        let data = {
          value: shot.name,
          label: shot.name,
        }
        arr.push(data);
      })
      return setStudentData(arr);
    } catch (e) {
      console.log(e);
    }
  }

  const form = useForm({
    initialValues: {
      name: "",
      docId: "",
      rehabilitationCenter: "",
      hearingAidFitmentDate: "",
      overallDiagnosis: "",
      date: "",
    },
    initialErrors: {
      name: "",
      docId: "",
      rehabilitationCenter: "",
      hearingAidFitmentDate: "",
      overallDiagnosis: "",
      date: "",
    },
    validate: {
      
    },
  });

  const submitForm = async (values: typeof form.values) => {
    {
      setLoading(true);
      try {
        console.log(values);
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
        {!props.user.email_verified && (<Alert title="Warning!" color="yellow" >
          Verify your email to add student.If you have already verified your email please login again.
        </Alert>)}
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
              Add Clinical Data for {form.values.name === "" ? "Student" : form.values.name}
            </h1>
            <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati sunt dolores deleniti inventore quaerat mollitia?
            </p>

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
                <Select
                  label="Select Student"
                  description="You can only select the students who are registered with you"
                  data={studentData}
                  {...form.getInputProps("name")}
                />
                <TextInput
                  required
                  label="Rehabilitation Center"
                  description="Enter Rehabilitation Center"
                  placeholder="PADC"
                  type="text"
                  {...form.getInputProps("rehabilitationCenter")}
                />
                <DatePicker
                  required
                  label="Enter Hearing Aid Fitment Date"
                  description="(Both Ears)"
                  locale="in"
                  {...form.getInputProps("hearingAidFitmentDate")}
                />
                <Textarea
                  required
                  label="Overall Diagnosis"
                  variant="filled"
                  autosize
                  placeholder="Overall Diagnosis"
                  {...form.getInputProps("overallDiagnosis")}
                />
                <Group position="center" mt="xl">
                  <Button type="submit" loading={loading} disabled={!props.user.email_verified}>
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
}

export default AuthenticatedPage;
