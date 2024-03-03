import { BanchoClient } from "bancho.js"
import express from "express"

const app = express()
const router = express.Router()
const client = new BanchoClient({ username: process.env.BANCHO_USERNAME!, password: process.env.BANCHO_PASSWORD! });

router.use("/url", function (req, res, next) {
    Promise.reject().catch(next);
});

app.get('/', (req, res) => {
    res.send({
        timestamp: Date.now()
    })
})

app.post('/createLobby', async (req, res) => {
    const lobby = await client.createLobby('1v1 lobby', true)


})

console.log('Connecting to Bancho...')
await client.connect()
console.log('Connected to Bancho!')

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT} (local URL: http://localhost:${process.env.PORT})`)
})
