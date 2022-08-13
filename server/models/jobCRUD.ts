import mongoose from "mongoose";
import { Job, Applicant } from "./JobPortal";

type JobType = {
  title: String,
  description: String,
  location: String,
  pay: Number,
  deadline: String,
  jobType: {
    type: String,
    enum: ["full time", "part time", "internship", "freelance"],
    default: "full time"
  },
  clientID: mongoose.Schema.Types.ObjectId,
  skillsNecessary: [mongoose.Schema.Types.ObjectId]
};

const addJob = async (data: JobType) => {
  const newJob = new Job(data);
  return await newJob.save();
};

const getAllJobs = async () => {
  return await Job.find();
};

const getJob = async (id: String) => {
  return await Job.findById(id);
};

const removeJob = async (id: String) => {
  return await Job.findByIdAndDelete(id);
};

const updateJob = async (id: String, data: JobType) => {
  return await Job.findByIdAndUpdate(id, data, { new: true });
};

// const getApplicantsByJob = async (jobId: String) => {
//   const job = getJob(jobId);
//   return job.applicants;
// };

const registerApplicant = async (data: any) => {
  const newApplicant = new Applicant(data);
  return await newApplicant.save();
};

const getApplicants = async () => {
  return await Applicant.find();
};

export { addJob, getAllJobs, getJob, removeJob, updateJob, registerApplicant, getApplicants };
