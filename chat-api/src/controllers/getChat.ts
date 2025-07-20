import { randomUUID } from 'crypto';
import { Response, Request } from 'express';
import redis from '../lib/redis';

export default async function getChat(req: Request, res: Response) {
    try {
        console.log("On get chat controller")

        const id: string = req.query.id as string;

        if (!id)
            return res.status(400).json({ error: 'Missing chat id' });

        const value = await redis.get(id);

        if (!value)
            return res.status(404).json({ error: 'Chat not found' });

        const parsed = JSON.parse(value);
        res.status(200).json([parsed]);
    } catch (err: any) {
        console.error(`Could not get chat data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
}