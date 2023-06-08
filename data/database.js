import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "backendApi"
    }).then(()=>{ console.log('mongodb connected') })
      .catch((error)=>{console.log(error)});
}

 