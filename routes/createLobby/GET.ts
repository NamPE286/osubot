import { type Request, type Response } from "express";

module.exports = async (req: Request, res: Response) => {
    res.send({
        message: 'ok'
    })
}