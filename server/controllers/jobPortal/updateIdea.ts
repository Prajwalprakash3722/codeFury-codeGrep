import { findIdea } from "../../models/jobCRUD"


const createUpdatedIdea = async (data: any, id: String) => {
    let oldData: any = await findIdea(id);
    // console.log(oldData.threads);
    let threads = oldData.threads;
    threads.push(data);
    return threads;


    // findIdea(id).then((result) => {
    //     // console.log(result?.threads);
    //     result?.threads.push(data);
    //     return result?.threads;
    // }).catch((err) => {
    //     console.log(err); 
    // });
}

const createUpdatedUpvotes = async (data: any, id: String) => {
    let oldData: any = await findIdea(id);
    // console.log(oldData.threads);
    oldData.upvotes = + 1;
    return oldData;
}

export {
    createUpdatedIdea,
    createUpdatedUpvotes
};