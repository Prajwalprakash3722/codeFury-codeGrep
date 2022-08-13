import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  imageURL: String,
  location: String,
  description: String,
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
  deadline: String,
  jobType : {
    type: String,
    enum: ['full time', 'part time', 'internship', 'freelance'],
    default: 'full time'
  },
  clientID : mongoose.Schema.Types.ObjectId,
  skillsNecessary : [mongoose.Schema.Types.ObjectId],
  applicants : [mongoose.Schema.Types.ObjectId]
})

const Skills = mongoose.model("Skills", skillsSchema);

const Applicant = mongoose.model("JobPortal", applicantSchema);

const Job = mongoose.model("Job", jobSchema);

export { Applicant, Skills, Job };
