import mongoose from 'mongoose'
import colors from 'colors'
const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log("SUCCESS")
    }
    catch(error){
console.log(`error is in ${error}`)
    }
}
export default connectDB