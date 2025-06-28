import express from 'express';
import getChat from '../controllers/getChat';

export const router = express.Router();

router.get('/get-chat', getChat);