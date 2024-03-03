import type { Request, Response } from "express";
import channels from "../../channels";
import client from "../../client";
import type { BanchoChannelMember } from "bancho.js";
import { BanchoMessage, BanchoUser, ChannelMessage } from 'bancho.js'

export default async (req: Request, res: Response) => {
    if (typeof req.query.players != 'string') {
        res.status(400).send()
        return
    }

    const players: string[] = JSON.parse(req.query.players)

    if (players.length == 0) {
        res.status(400).send({
            message: 'Username array is empty'
        })

        return
    }

    const channel = await client.createLobby('1v1', true)

    channels.add(channel)

    for (const username in players) {
        const player: BanchoUser = new BanchoUser(client, username)
        player.sendMessage(`osump://${channel.lobby.id}`)
    }

    res.send()

    channel.on('JOIN', (member: BanchoChannelMember) => {
        console.log(`${member.user.username} joined ${channel.lobby.id}`)
    })
}