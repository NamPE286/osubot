import { BanchoMultiplayerChannel } from "bancho.js"

const channels = new Map<number, BanchoMultiplayerChannel>

export default {
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
            channel.lobby.closeLobby()
            console.log(`Deleted lobby ${id}`)
        }

        channels.clear()
    }
}