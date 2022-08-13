import { Button, Image, Modal, Select, Tabs } from "@mantine/core";
import { DEActivities, unlockActivityDB } from "./useFireStoreQuery";
import toast, { Toaster } from "react-hot-toast";

import { Activity } from "../@types";
import { ArchiveIcon } from '@heroicons/react/outline';
import React from "react";
import UnlockActivityImage from "./unlockActivityImage";
import { useState } from "react";

interface Props {
  allActivities: DEActivities;
  uid: string;
}

const UnlockActivity = ({ allActivities, uid }: Props) => {
  const [level, setLevel] = useState(1);
  const [activity, setActivity] = useState<Activity>();
  const [modal, setModal] = useState(false);

  const handleSubmit = async () => {
    toast.promise(unlockActivityDB(uid, activity!), {
      error: "Something went wrong",
      loading: "Unlocking...",
      success: "Unlocked!",
    })
    setModal(false);
    window.location.reload();
  }

  return (
    <div>
      <Toaster />
      <Select
        label="Select Level"
        placeholder="Pick one"
        data={[
          { value: "1", label: "Level 1" },
          { value: "2", label: "Level 2" },
          { value: "3", label: "Level 3" },
          { value: "4", label: "Level 4" },
          { value: "5", label: "Level 5" },
        ]}
        onChange={(value) => setLevel(parseInt(value!))}
        value={level.toString()}
      />
      <Modal
        opened={modal}
        onClose={() => setModal(false)}
        title="Are You Sure?"
      >
        <h1 className="text-xl text-gray-900 font-semibold">
          Unlocking <span className="text-indigo-400">{activity && activity!.activity_name}</span>.
        </h1>
        <div className="flex items-center justify-center">
          {activity && (<Image
            src={activity.activity_icon}
            key={activity.activity_name}
            radius="xl"
            height={250}
            width={250}
            alt={activity.activity_name}
            className="p-4 shadow-md shadow-neutral-300 rounded-full"
          />)}
        </div>
        <div className="flex flex-row justify-around p-4">
          <Button title="Unlock This Activity" color="green" onClick={handleSubmit}>
            Unlock This Activity
          </Button>
          <Button title="Cancel" color="red" onClick={() => setModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Tabs grow variant="default">
        <Tabs.Tab label="Beginner">
          <div className="bg-white text-gray-500 h-40 flex justify-center items-center flex-row">
            {allActivities !== null ? (
              allActivities.allActivities
                //@ts-ignore
                .filter(
                  (activity: Activity) =>
                    activity.levelNumber === level &&
                    activity.subLevelName === "beginner"
                )
                .map((activities: Activity) => {
                  return (
                    <UnlockActivityImage activities={activities} setActivity={setActivity} setModal={setModal} key={activities.activity_name} />
                  )
                })
            ) : (
              <div className="flex flex-row items-center justify-center">
                <ArchiveIcon className="h-10 w-10" />
                <h1 className="text-xl font-semibold">No Activities to Display</h1>
              </div>
            )}
          </div>
        </Tabs.Tab>
        <Tabs.Tab label="Advanced">
          <div className="bg-white text-gray-500 h-40 flex justify-center items-center flex-row">
            {allActivities !== null ? (
              allActivities.allActivities
                //@ts-ignore
                .filter(
                  (activity: Activity) =>
                    activity.levelNumber === level &&
                    activity.subLevelName === "advanced"
                )
                .map((activities: Activity) => {
                  return (
                    <UnlockActivityImage activities={activities} setActivity={setActivity} setModal={setModal} key={activities.activity_name} />
                  )
                })
            ) : (
              <div className="flex flex-row items-center justify-center">
                <ArchiveIcon className="h-10 w-10" />
                <h1 className="text-xl font-semibold">No Activities to Display</h1>
              </div>
            )}
          </div>

        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default UnlockActivity;
