import mongoose from 'mongoose';

export const connectDB = async () => {
    const connectionStr = process.env.MONGO_URI;
    console.log(connectionStr);
    try {
        const conn = await mongoose.connect(connectionStr)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
