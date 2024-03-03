import type { Request, Response } from "express";
import channels from "../../channels";

export default async (req: Request, res: Response) => {
    await channels.clear()
    res.send()
}