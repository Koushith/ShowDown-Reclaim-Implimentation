import mongoose from 'mongoose';
import { User } from '../models/user.js';
//mport { connectDB } from './connectDB.js';


export const connectDB = async () => {
    const mongoURI = 'mongodb+srv://test_db_admin:ur64Rwuoh9h31HWa@test-i.0qbjxom.mongodb.net/showDown?retryWrites=true&w=majority&appName=test-i';
    if(!mongoURI) {
        throw new Error('MongoDB connection string is not defined');
    }
    return mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

const seed = async () => {
    try {
        // Connect to the database
        const conn = await connectDB();
        const db = conn.connection.db;

        console.log('Connected to the database');

        // Drop the index if it exists
        try {
            await db.collection('users').dropIndex('steamId_1');
            console.log('Index steamId_1 dropped');
        } catch(error) {
            if(error.codeName === 'IndexNotFound') {
                console.log('Index steamId_1 not found');
            } else {
                throw error;
            }
        }

        // Seed some mock data
        const existingUser = await User.findOne({
            $or: [
                { username: 'test_user' },
                { email: 'koushgith' }
            ]
        });

        if(existingUser) {
            // Update the existing user
            existingUser.steamId = '123456';
            existingUser.isQualified = false;
            await existingUser.save();
            console.log('Existing user updated');
        } else {
            // Create a new user
            const newUser = await User.create({
                username: 'test_user',
                email: 'koushgith',
                steamId: '123456',
                isQualified: false
            });
            if(newUser) {
                console.log('New user created');
            }
        }

        // Close the database connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);

    } catch(error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seed();
