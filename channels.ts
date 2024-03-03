import { BanchoMultiplayerChannel } from "bancho.js"

const channels = new Map<number, BanchoMultiplayerChannel>

export default {
    add: (channel: BanchoMultiplayerChannel) => {
        channels.set(channel.lobby.id, channel)
    }
}