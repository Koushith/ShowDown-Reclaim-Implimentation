import mongoose from 'mongoose';

export const connectDB = async () => {
    const connectionStr = process.env.MONGO_URI || "mongodb+srv://test_db_admin:ur64Rwuoh9h31HWa@test-i.0qbjxom.mongodb.net/showDown?retryWrites=true&w=majority&appName=test-i"
    try {
        const conn = await mongoose.connect(connectionStr)

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
