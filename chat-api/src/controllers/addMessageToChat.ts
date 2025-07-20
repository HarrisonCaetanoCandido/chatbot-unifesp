import { Request, Response } from "express";
import redis from "../lib/redis";
import { v4 as uuidv4 } from 'uuid';

export default async function addMessageToChat(req: Request, res: Response) {
    try {
        console.log("On add Message To Chat")

        const { chatId, msg } = req.body;

        if (!chatId || !msg)
            return res.status(400).json({ error: 'Missing chatId or message' });

        const value = await redis.get(chatId);

        if (!value)
            return res.status(404).json({ error: 'Chat not found' });

        const chat = JSON.parse(value);
        const newMessage = {
            id: uuidv4(),
            data: msg
        };

        chat.metadata.push(newMessage);

        /*
        ESSE CONTROLLER PODE ENVIAR A NOVA MENSAGEM DO USUARIO AO MODELO USANDO
        OUTRO CONTROLLER E 
        O MODELO PODE ENTAO USAR ESSE MESMO CONTROLLER PARA INSERIR A RESPOSTA
        PARA O USUARIO
        */

        await redis.set(chatId, JSON.stringify(chat));

        return res.status(200).json({ message: 'Message added' });
    } catch (err: any) {
        console.error("Could not add a new message to the chat");
        res.status(500).json({ error: 'Internal Server Error' });
    }
}