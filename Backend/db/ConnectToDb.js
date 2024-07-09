import mongoose from "mongoose";

const ConnectionDone = async(connectionString)=>{
    await mongoose.connect(connectionString)
}

export default ConnectionDone;