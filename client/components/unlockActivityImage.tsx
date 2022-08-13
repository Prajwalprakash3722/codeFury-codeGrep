import { Button, Image, Tooltip } from '@mantine/core';

import { Activity } from '../@types';
import React from 'react'

type Props = {

  activities: Activity;
  setActivity: (value: React.SetStateAction<Activity | undefined>) => void
  setModal: (value: React.SetStateAction<boolean>) => void

}


const UnlockActivityImage = ({ activities, setActivity, setModal }: Props) => {
  return (
    <>
      <Tooltip gutter={10} label={activities.activity_name} openDelay={50} withArrow position="top">
        <Button
          style={{
            backgroundColor: "transparent",
          }}
          disabled={!activities.finished}
          onClick={() => {
            setActivity(activities);
            setModal(true);
          }}
          key={activities.activity_name}
        >
          <div className="shadow-lg">
            <Image
              src={activities.activity_icon}
              key={activities.activity_name}
              radius="xl"
              height={50}
              width={50}
              alt={activities.activity_name}
              className="p-4 shadow-xl shadow-neutral-300"
            />
          </div>
        </Button>
      </Tooltip>
    </>
  )
}

export default UnlockActivityImage