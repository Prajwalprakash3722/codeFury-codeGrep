import mongoose from 'mongoose'

const dbConnect = async () => {


    return await mongoose.connect(process.env.MONGO_URL as string)
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => {
        console.log('Error connecting to database',err)
    })
    
}
export default dbConnect;