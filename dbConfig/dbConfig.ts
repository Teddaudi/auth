import mongoose from "mongoose";

// export async function connect() {
//     try {
//         mongoose.connect(process.env.MONGO_URI!);
//         const connection = mongoose.connection;

//         connection.on('connected',()=>{
//             console.log("MongoDB connected successfully")
//         })
//         connection.on('error',(err)=>{
//             console.log('MongoDB connection error'+ err)
//             process.exit()
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }



export async function connect() {
    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected to MongoDB");
      return;
    }
  
    try {
      await mongoose.connect(process.env.MONGO_URI!, {
        serverSelectionTimeoutMS: 10000 // 10 seconds
      });
      console.log("MongoDB connected successfully");
    } catch (error: any) {
      console.error("MongoDB connection error: " + error.message);
      process.exit(1);
    }
  
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error: " + err);
      process.exit(1);
    });
  }