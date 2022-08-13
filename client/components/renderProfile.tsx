import React from 'react'
import { Skeleton } from '@mantine/core'
import { childProfile } from '../@types'

type Props = {
  data: childProfile | null;
}
const RenderProfile = ({ data }: Props) => {
  return (
    <div>
        <Skeleton visible={!data}>
          {data && (<div className="leading-relaxed text-lg">
            <p>Name : {data!.name}</p>
            <p>Age :{data!.age}</p>
            <p>Hearing loss :{data!.hearingLoss}</p>
            <p>Hearing aid :{data!.hearingAid}</p>
            <p>
              Parent's contact no. :
              <a href={`tel:${data!.parentContactNo}`}>
                {data!.parentContactNo}
              </a>
            </p>
            <p>
              Parent's email id :
              <a href={`mailto:${data!.parentEmailId}`}>{data!.parentEmailId}</a>
            </p>
          </div>)}
        </Skeleton>
    </div>
  )
}

export default RenderProfile