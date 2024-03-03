import { BanchoMultiplayerChannel } from "bancho.js"

const channels = new Map<number, BanchoMultiplayerChannel>

export default {
    get: (id: number): BanchoMultiplayerChannel => {
        if(!channels.has(id)) {
            throw new Error('Lobby is not exist')
        }

        return channels.get(id)!
    },
    add: (channel: BanchoMultiplayerChannel) => {
        channels.set(channel.lobby.id, channel)
    },
    remove: async (channelID: number) => {
        const channel = channels.get(channelID)!
        await channel.lobby.closeLobby()
        channels.delete(channelID)

        console.log(`Deleted lobby ${channelID}`)
    },
    clear: async () => {
        for(const [id, channel] of channels.entries()) {
            await channel.lobby.closeLobby()
            console.log(`Deleted lobby ${id}`)
        }

        channels.clear()
    }
}