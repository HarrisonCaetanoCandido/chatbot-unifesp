import { randomUUID } from 'crypto';
import { Response, Request } from 'express';

export default async function getChat(req: Request, res: Response) {
    try {
        console.log("On get chat controller")
        res.status(200).json([
            {
                id: '1',
                metadata: [
                    {
                        id: randomUUID(),
                        data: {
                            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                            timestamp: new Date(),
                            direction: 'SENT'
                        }
                    },
                    {
                        id: randomUUID(),
                        data: {
                            message: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                            timestamp: new Date(),
                            direction: 'RECEIVED'
                        }
                    },
                    {
                        id: randomUUID(),
                        data: {
                            message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. \
                            The behavior could be thought of as a minimum gutter, as if the gutter is bigger somehow (because of something like justify-content: space-between;) then the gap will only take effect if that space would end up smaller. \
                            It is not exclusively for flexbox, gap works in grid and multi-column layout as well.',
                            timestamp: new Date(),
                            direction: 'SENT'
                        }
                    },
                    {
                        id: randomUUID(),
                        data: {
                            message: 'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit',
                            timestamp: new Date(),
                            direction: 'RECEIVED'
                        }
                    },
                    {
                        id: randomUUID(),
                        data: {
                            message: 'in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                            timestamp: new Date(),
                            direction: 'SENT'
                        }
                    },
                    {
                        id: randomUUID(),
                        data: {
                            message: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui',
                            timestamp: new Date(),
                            direction: 'RECEIVED'
                        }
                    },
                    {
                        id: randomUUID(),
                        data: {
                            message: 'officia deserunt mollit anim id est laborum',
                            timestamp: new Date(),
                            direction: 'SENT'
                        }
                    },
                ]
            }
        ]);
    } catch (err: any) {
        console.error(`Could not get chat data: ${err}`);
    }
}