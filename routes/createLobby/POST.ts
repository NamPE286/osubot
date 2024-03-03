import type { Request, Response } from "express";
import channels from "../../channels";
import client from "../../client";
import type { BanchoLobbyPlayer } from "bancho.js";

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
    console.log(`[${channel.lobby.id}] Lobby created`)

    for (const username of players) {
        channel.lobby.invitePlayer(username)
        console.log(`[${channel.lobby.id}] Invited ${username}`)
    }

    res.send()

    let playerCount = 0
    let matchCount = 0

    channel.lobby.on('playerJoined', (playerJoined: any) => {
        playerCount++
        console.log(`[${channel.lobby.id}] ${playerJoined.player.user.username} joined (${playerCount} player(s))`)
    })

    channel.lobby.on('playerLeft', async (player: BanchoLobbyPlayer) => {
        playerCount--
        console.log(`[${channel.lobby.id}] ${player.user.username} left (${playerCount} player(s))`)

        await channel.lobby.abortMatch()
        await channel.sendMessage(`[${channel.lobby.id}] ${player.user.username} left`)
        
        if(playerCount == 0) {
            channels.remove(channel.lobby.id)
        }
    })

    channel.lobby.on('allPlayersReady', async () => {
        if(playerCount < 2) {
            console.log('Not enough player joined in order to start the game')
            channel.sendMessage('Not enough player joined in order to start the game')

            return
        }

        console.log('All player ready! Starting match')
        await channel.sendMessage('All player ready! Starting match')
        await channel.lobby.startMatch()
    })

    channel.lobby.on('matchFinished', async () => {
        matchCount++
        let result: any[] = []

        for(const player of channel.lobby.scores) {
            result.push({
                username: player.player.user.username,
                score: (player.pass ? player.score : 0)
            })
        }

        console.log(result)

        let msg = ''

        for(const i of result) {
            msg += `${i.username} : ${i.score} | `
        }

        msg = msg.slice(0, msg.length - 3)

        await channel.sendMessage(`[${channel.lobby.id}] ${result[0].username} won the round!`)
        await channel.sendMessage(msg)
    })
}