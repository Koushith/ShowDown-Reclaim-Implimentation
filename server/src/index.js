import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './utils/connectDB.js';
import userRoute from './routes/user.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB()

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World..');
});

app.use('/api/user', userRoute);

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});