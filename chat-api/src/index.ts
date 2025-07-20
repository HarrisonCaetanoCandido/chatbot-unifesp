import express from "express";
import dotenv from 'dotenv';
import { router } from './routes/router';
import cors from 'cors';

dotenv.config();

const app = express();
const API_PORT = process.env.API_PORT;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

app.use(cors({
    origin: [FRONTEND_ORIGIN || '5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: false
}));

app.use(express.json())
app.use('/', router);

app.listen(API_PORT, () => {
    console.log(`Api running on ${API_PORT}`)
});