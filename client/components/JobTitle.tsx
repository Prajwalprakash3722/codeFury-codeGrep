import { Button } from "@mantine/core";

function Job_title() {
  return (
    // <Grid columns={24}>
    //   <Grid.Col span={18}>1</Grid.Col>
    //   <Grid.Col span={6}><Buttons/></Grid.Col>
    // </Grid>
    <>
      <a
        className="relative block p-8 border border-gray-100 shadow-xl rounded-xl"
        href=""
      >
        <span className="absolute right-4 top-4 rounded-full px-3 py-1.5 font-medium text-xs">
        <Buttons/>
        </span>

        <div className="mt-4 text-gray-500 sm:pr-8">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            ></path>
          </svg>

          <h5 className="mt-4 text-xl font-bold text-gray-900">
            Science of Chemstry
          </h5>

          <p className="hidden mt-2 text-sm sm:block">
            You can manage phone, email and chat conversations all from a single
            mailbox.
          </p>
        </div>
      </a>
    </>
  );
}
export default Job_title;


function Buttons() {
  return (
    <>
      <Button variant="gradient" gradient={{ from: "orange", to: "red" }}>
        Apply
      </Button>
    </>
  );
}
