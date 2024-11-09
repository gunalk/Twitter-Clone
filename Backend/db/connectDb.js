import mongoose from 'mongoose';
const connectDB =async()=>{
  
    try{
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      
    }
    catch(err){
        console.error('Failed to connect to MongoDB',err);
        process.exit(1);
    }
}

export default connectDB;