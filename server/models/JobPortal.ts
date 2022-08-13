import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: {
    type: String,
    enum: ["Male", "Female", "Prefer not to mention"],
    default: "Prefer not to mention"
  },
  age: Number,
  imageURL: String,
  location: String,
  description: String,
  resumeURL: String,
  website: String,
  linkedin: String,
  github: String,
  twitter: String,
  experience: [
    {
      companyName: String,
      position: String,
      description: String,
      startDate: String,
      endDate: String,
      isCurrent: Boolean
    }
  ],
  education: [
    {
      instituationName: String,
      degree: String,
      fieldOfStudy: String,
      startDate: String,
      endDate: String,
      gpa: Number,
      isCurrent: Boolean
    }
  ],
  skills: [mongoose.Schema.Types.ObjectId],
  achievements: [
    {
      name: String,
      date: String,
      description: String
    }
  ]
});

const skillsSchema = new mongoose.Schema({
  name: String
});

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  pay: Number,
  deadline: Date,
  jobType: {
    type: String,
    enum: ["full time", "part time", "internship", "freelance"],
    default: "full time"
  },
  postedOn: Date,
  clientID: mongoose.Schema.Types.ObjectId,
  skillsNecessary: [mongoose.Schema.Types.ObjectId],
  applicants: [mongoose.Schema.Types.ObjectId]
});

const startupSchema = new mongoose.Schema({
  name: String,
  username: String,
  coFounders: String,
  countryOfOrigin: String,
  companySize: Number,
  valuation: Number,
  website: String,
  pitch: String,
  pitchURL: String, //video link
  adminStaff: {
    CEO: String,
    CTO: String,
    COO: String
  }
});

const ideaSchema = new mongoose.Schema({
  authorName: String,
  authorEmail: String,
  avatarURL: String,
  title: String,
  description: String,
  upvotes: Number,
  threads: [
    {
      authorName: String,
      authorEmail: String,
      avatarURL: String,
      content: String,
      date: String
    }
  ]
});

const Idea = mongoose.model("Idea", ideaSchema);

const Skills = mongoose.model("Skills", skillsSchema);

const Applicant = mongoose.model("JobPortal", applicantSchema);

const Job = mongoose.model("Job", jobSchema);

const StartUp = mongoose.model("StartUp", startupSchema);

export { Applicant, Skills, Job, StartUp, Idea };
