import { BanchoLobby } from "bancho.js"

export default class {
    lobbies = new Map<number, BanchoLobby>

    add(lobby: BanchoLobby) {
        if(!this.lobbies.has(lobby.id)) {
            return undefined
        }

        return this.lobbies.get(lobby.id)
    }
}