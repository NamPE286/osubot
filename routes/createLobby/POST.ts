import type { Request, Response } from "express";
import channels from "../../channels";
import client from "../../client";
import type { BanchoChannelMember } from "bancho.js";

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

    console.log(players)

    const channel = await client.createLobby('1v1', true)

    channels.add(channel)
    console.log(`Created new lobby with id ${channel.lobby.id}`)

    for (const username of players) {
        channel.lobby.invitePlayer(username)
        console.log(`Invited ${username} to lobby ${channel.lobby.id}`)
    }

    res.send()

    channel.on('JOIN', (member: BanchoChannelMember) => {
        console.log(`${member.user.username} joined ${channel.lobby.id}`)
    })
}