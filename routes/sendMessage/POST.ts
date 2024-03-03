import type { Request, Response } from "express";
import channels from "../../channels";
import client from "../../client";
import type { BanchoChannelMember } from "bancho.js";
import { BanchoMessage, BanchoUser, ChannelMessage } from 'bancho.js'

export default async (req: Request, res: Response) => {
    if (typeof req.query.username != 'string' ||
        typeof req.query.content != 'string') {
        res.status(400).send()
        return
    }

    const username: string = req.query.username
    const player = new BanchoUser(client, username)

    player.sendMessage(req.query.content)
    
    res.send()
}