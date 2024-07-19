import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDB } from './utils/connectDB.js';
import userRoute from './routes/user.js';
import { exportData, serveForm } from './controllers/user.js';
import { fileURLToPath } from 'url';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(cors());
app.use(express.json());
// Serve static files from the "html" directory
app.use(express.static(path.join(__dirname, 'html')));

connectDB()

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World..');
});

app.get('/admin/export', serveForm)
app.get('/admin/export-data', exportData)

app.use('/api/user', userRoute);



app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});