import mongoose from "mongoose";
import { Job, Applicant, StartUp, Idea } from "./JobPortal";

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

const addStartUp = async (data: any) => {
  const newStartUp = new StartUp(data);
  return await newStartUp.save();
};

const findStartUp = async (id: String) => {
  return await StartUp.findById(id);
};

const findAllStartUps = async () => {
  return await StartUp.find();
};

const addIdea = async (data: any) => {
  const newIdea = new Idea(data);
  return await newIdea.save();
};

const findIdea = async (id: String) => {
  return await Idea.findById(id);
};

const findAllIdeas = async () => {
  return await Idea.find();
};

const updateIdea = async (id: String, data: any) => {
  return await Idea.findByIdAndUpdate(id, data, { new: true });
}


export {
  addJob,
  getAllJobs,
  getJob,
  removeJob,
  updateJob,
  registerApplicant,
  getApplicants,
  addStartUp,
  findStartUp,
  findAllStartUps,
  addIdea,
  findIdea,
  findAllIdeas,
  updateIdea
};
