export interface TableData {
  childId?: string;
  mentorSupport?: string;
  rehabilitationCenterId: string;
  hearingAidModelRight: string;
  hearingAidFitmentLeftDate: string;
  speechTherapistId: string;
  hearingAidModelLeft: string;
  overallDiagnosis: string;
  hearingAidFitmentRightDate: string;
}

export interface childProfile {
  age: number;
  hearingAid: string;
  hearingLoss: number;
  gender: string;
  name: string;
  parentContactNo: string;
  parentEmailId: string;
  therapistId: string;
  uid: string;
}


export interface AllActivities {
  allActivities: Activity[];
}

export interface Activity {
  activity_icon: string;
  activity_name: string;
  levelNumber: number;
  subLevelName: string;
  finished: boolean;
  isFinished: boolean;
}

export interface SuccessStories {
  content: string;
  country: string;
  details: string;
  name: string;
  profile_url: string;
}


export interface dashboardTableData {
  childId: string;
  childName: string;
  therapyProgress: number;
  dhwaniProgress: number;
  monthlyAssessment: number;
  dailyExercisePrograms: number;
  therapyLastVisit: Date;
  therapyNextVisit: Date;
}


export interface JobType {
  clientID: number;
  _id: string;
  title: string;
  postedBy: string;
  companyImageUrl: string;
  publishedOn: Date;
  description: string;
  location: string;
  pay: number;
  deadline: string;
  jobType: string;
  skillsNecessary: string[];
  applicants?: string[];
}


interface JobPortal {
  name: string;
  email: string;
  imageURL: string;
  gender: string;
  age: number;
  location: string;
  description: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  experience?: Experience;
  education?: Education;
}
interface JobFormPortal {
  name: string;
  email: string;
  imageURL: string;
  gender: string;
  age: number;
  location: string;
  description: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  experience?: Experience;
  education?: Education;
  skills?: string;
  achievements?: string;
  instituationName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa: number;
  isCurrent: boolean;
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  maxNoOfYears: number;
}

interface Achievement {
  name: string;
  date: string;
  description: string;
}

interface Education {
  instituationName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa: number;
  isCurrent: boolean;
}

interface Experience {
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  maxNoOfYears: number;
}