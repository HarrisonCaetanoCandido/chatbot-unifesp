import express from 'express';
import getChat from '../controllers/getChat';
import addMessageToChat from '../controllers/addMessageToChat';
import postChat from '../controllers/postChat';

export const router = express.Router();

router.get('/get-chat', getChat);
router.post('/add-msg-to-chat', addMessageToChat);
router.post('/post-chat', postChat);