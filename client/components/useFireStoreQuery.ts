import { Activity, AllActivities, SuccessStories, dashboardTableData } from '../@types/index.d';
import { DocumentReference, addDoc, collection, doc, getDoc, getDocs, getFirestore, limit, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { TableData, childProfile } from "../@types";

import { app } from "../lib/firebaseClient";

const firestore = getFirestore(app);


export interface profileProps {
  fullName: string;
  email: string;
  uid: string;
  gender: string;
  phoneNumber: string;
  terms: boolean;
  createdAt?: firebase.default.firestore.Timestamp;
}

export interface DEActivities {
  allActivities: AllActivities;
  count: number
}


const ColRef = collection(firestore, 'TherapistProfiles');

export const createNewProfile = async (Profile: profileProps) => {
  return addDoc(ColRef, {
    created: serverTimestamp(),
    ...Profile
  });
};
export const getProfile = async (uid: string) => {
  let profile: profileProps = {
    fullName: "",
    email: "",
    uid: "",
    gender: "",
    phoneNumber: "",
    terms: false
  }
  const queryData = query(ColRef, where('uid', '==', uid))
  const querySnapshot = await getDocs(queryData);
  querySnapshot.forEach((doc) => {
    profile = doc.data() as any;
  });
  return profile;
}

export const getTherapyStudentData = async (uid: string): Promise<TableData[]> => {

  let arr: TableData[] = [];
  const ColRef = collection(firestore, 'ParentTherapyData');
  const queryData = query(ColRef, where('speechTherapistId', '==', uid))
  const querySnapshot = await getDocs(queryData);
  querySnapshot.forEach((doc) => {
    arr.push(doc.data() as any);
  });
  return arr;
};

export const getStudentProfileData = async (uid: string): Promise<childProfile> => {
  let studentProfile: childProfile;
  const colRef = collection(firestore, 'childProfiles');
  const queryData = query(colRef, where('uid', '==', uid));
  const querySnapshot = await getDocs(queryData);
  querySnapshot.forEach((doc) => {
    studentProfile = doc.data() as any;
  });
  return studentProfile!;
}

export const getStudentMentorData = async (uid: string) => {
  let studentProfile: childProfile[] = [];
  const colRef = collection(firestore, 'childProfiles');
  const queryData = query(colRef, where('therapistId', '==', uid));
  const querySnapshot = await getDocs(queryData);
  querySnapshot.forEach((doc) => {
    studentProfile.push(doc.data() as any);
  });
  return studentProfile;
}



export const createStudentProfile = async (data: any): Promise<DocumentReference<childProfile>> => {
  const colRef = collection(firestore, 'childProfiles');
  return addDoc(colRef, {
    created: serverTimestamp(),
    ...data
  });
};

export const getAllActivities = async (uid: string) => {
  let allActivities: DEActivities;
  const colRef = doc(firestore, 'DEActivities', uid);
  const queryData = await getDoc(colRef);
  if (queryData.exists()) {
    allActivities = queryData.data() as any;
    return allActivities;
  }
  else {
    return null;
  }
}


export const getSuccessStories = async () => {
  let arr: SuccessStories[] = [];

  const colRef = collection(firestore, 'Success Stories');
  const queryData = query(colRef);
  const querySnapshot = await getDocs(queryData);
  querySnapshot.forEach((doc) => {
    arr.push(doc.data() as any);
  });
  return arr;
}

export const unlockActivityDB = async (uid: string, activity: Activity) => {

  const docRef = doc(firestore, 'DEActivities', uid);

  let data: DEActivities | null;
  data = await getAllActivities(uid);
  //@ts-ignore
  data.allActivities.map((doc: Activity) => {
    if (doc.activity_name === activity.activity_name) {
      doc.isFinished = !doc.isFinished;
      doc.finished = !doc.finished;
    }
  });
  await updateDoc(docRef, {
    count: data!.count + 1,
    allActivities: data!.allActivities
  })
  return data;
}




export const getDEScore = async (uid: string) => {
  let arr: any[] = [];

  const colRef = collection(firestore, 'DEScore');
  const queryData = query(colRef, where('uid', '==', uid), limit(30));
  const querySnapshot = await getDocs(queryData);
  querySnapshot.forEach((doc) => {
    arr.push(doc.data() as any);
  });
  console.log(arr)
  return arr;
}



export const getDashboardTableData = async (uid: string): Promise<dashboardTableData[]> => {

  let data: dashboardTableData[] = [];

  






  return data;
}



//jCi7OmSstyWM4qJtJipx9isW2cy1