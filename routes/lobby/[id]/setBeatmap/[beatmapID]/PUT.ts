import type { Request, Response } from "express";
import channels from "@root/channels";

export default async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const beatmapID = parseInt(req.params.beatmapID)

    try {
        const channel = channels.get(id)
        channel.lobby.setMap(beatmapID)
    
        res.send()
    } catch {
        res.status(404).send()
    }
}