import banchoJS from "bancho.js"
import express from "express"

const app = express()
const client = new banchoJS.BanchoClient({ username: process.env.BANCHO_USERNAME!, password: process.env.BANCHO_PASSWORD! });

console.log('Connecting to Bancho...')
await client.connect()
console.log('Connected to Bancho!')

app.get('/', (req, res) => {
    res.send({
        timestamp: Date.now()
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Started server on port ${process.env.PORT} (local URL: http://localhost:${process.env.PORT})`)
})
