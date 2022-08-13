import { TableData, childProfile } from '../@types';

// import Link from 'next/link';
import React from 'react'
import { Table } from '@mantine/core';
import { capitalCase } from "capital-case"
import { useRouter } from 'next/router';

interface Props {
  TableData: TableData[] | undefined;
}

interface IProps {
  studentTableData: childProfile[] | undefined;
}
const StudentDataTable: React.FC<IProps> = ({ studentTableData }) => {

  // function generateRow(data: string, index: number): JSX.Element {
  //   return (
  //     <>
  //       <td key={index + data} className="border text-center px-8 py-4 group-hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-blue-800 hover:underline">
  //         {data}
  //       </td>
  //     </>
  //   )
  // }
  const columns: Array<keyof childProfile> = ['name', 'age', 'gender', 'hearingAid', 'hearingLoss', 'parentContactNo', 'parentEmailId',]

  const router = useRouter()

  return (
    <>
      <div className="hidden lg:block p-5">
        <h2>
          Students Registered Under You
        </h2>
        <Table horizontalSpacing="md" verticalSpacing="sm" fontSize="md" striped highlightOnHover captionSide="bottom">
          <thead className="select-none">
            <tr>
              {columns.map(header => (
                <th key={header}>{capitalCase(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studentTableData?.map((data, index) => (
              <tr key={index} className="cursor-pointer">
                {columns.map(header => (
                  <td key={index.toString() + data[header]} onClick={() => router.push(`/manage?id=${data.uid}`)}>{data[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <caption>Click on a Row to view More Details.</caption>
        </Table>
      </div>
    </>
  )
}



const DataTable: React.FC<Props> = ({ TableData }) => {

  const TableHeaders = [
    "Child Id",
    "Child Name",
    "Therapy Progress",
    "Dhwani Progress",
    "Monthly assessment",
    "Daily exercise Progress",
    // "Therapy visit (Last visited)",
    // "Therapy visit (Next visit)",
    // "Counselling Session (Last visited)",
    // "Counselling Session (Next visit)",
    // "Hearing Aid Programming (Next visit)",
  ];

  return (
    <>
      <div className="lg:hidden">
        <h1 className="text-xl font-semibold">Please Open in Larger Screen</h1>
      </div>
      <div className="hidden  lg:block p-5">
        <Table highlightOnHover>
          <thead>
            <tr>
              {TableHeaders.map(header => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {TableData!.length > 0 &&
              TableData!.map((data) => (
                <tr className="group" key={JSON.stringify(data)}>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-blue-800 hover:underline">
                    {" "}
                    <Link
                      href={`/manage?id=${data.childId}`}
                    >
                      <a className="cursor-pointer text-gray-600 hover:text-blue-800 hover:underline"
                        href={`/manage?id=${data.childId}`}>{data.hearingAidModelRight}</a>
                    </Link>
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-blue-800 hover:underline">
                    {data.childId}
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-blue-800 hover:underline">
                    {data.overallDiagnosis}

                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-blue-800 hover:underline">

                    {data.overallDiagnosis}
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-blue-800 hover:underline">

                    {data.rehabilitationCenterId}
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-blue-800 hover:underline">

                    {data.hearingAidModelLeft}
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-blue-800 hover:underline">

                    {new Date(data.hearingAidFitmentLeftDate).toLocaleDateString()}
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-blue-800 hover:underline">
                    {new Date(data.hearingAidFitmentRightDate).toLocaleDateString()}
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-blue-800 hover:underline">

                    {new Date(data.hearingAidFitmentLeftDate).toLocaleDateString()}
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-blue-800 hover:underline">

                    {new Date(data.hearingAidFitmentLeftDate).toLocaleDateString()}
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-blue-800 hover:underline">
                    {new Date(data.hearingAidFitmentLeftDate).toLocaleDateString()}
                  </td>
                </tr>
              ))} */}
            {TableData?.map((data: any, index) => (
              <tr key={index}>
                {TableHeaders.map(header => (
                  <td key={index.toString() + data[header]}>{data[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export { DataTable, StudentDataTable };