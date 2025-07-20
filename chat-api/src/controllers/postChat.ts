import { Request, Response } from "express";
import redis from '../lib/redis'
import { v4 as uuidv4 } from 'uuid'

export default async function postChat(req: Request, res: Response) {
    try {
        console.log("On post chat controller")

        const key = `chat:${uuidv4()}`;
        const newChat = { id: key, metadata: [] };

        await redis.set(key, JSON.stringify(newChat));

        const value = await redis.get(key);

        if (!value)
            return res.status(404).json({ error: 'Chat not created' });

        const msg = req.body.msg;

        const newMessage = {
            id: uuidv4(),
            data: msg,
        }

        const chat = JSON.parse(value);
        chat.metadata.push(newMessage);

        await redis.set(key, JSON.stringify(chat));

        res.status(200).json([chat]);
    } catch (err: any) {
        console.error('Could not post chat: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}