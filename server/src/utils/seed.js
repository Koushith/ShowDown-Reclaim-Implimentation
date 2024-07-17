//file to see some mock data to the database
import { User } from '../models/user.js';
import { connectDB } from './connectDB.js';

const seed = async () => {
    try {
        await connectDB()
        await User.deleteMany();
        const data = await User.create({
            username: 'test_user',
            email: 'koushgith',
            steamId: '123456',
            isQualified: false
        })
        if(data) {
            console.log('Data Seeded');
            process.exit(1);
        }

    } catch(error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

seed();