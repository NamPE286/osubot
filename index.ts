import { BanchoClient } from "bancho.js"
import express from "express"
import fs from 'fs'
import path from 'path'
import Lobbies from "@classes/Lobbies"

const app = express()
const client = new BanchoClient({ username: process.env.BANCHO_USERNAME!, password: process.env.BANCHO_PASSWORD! });

app.get('/', (req, res) => {
    res.send({
        timestamp: Date.now()
    })
})

console.log('Connecting to Bancho...')
await client.connect()
console.log('Connected to Bancho!')

function* walkSync(dir: any): any {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        if (file.isDirectory()) {
            yield* walkSync(path.join(dir, file.name));
        } else {
            yield path.join(dir, file.name);
        }
    }
}

for (const filePath of walkSync('./routes')) {
    var reqPath = './' + filePath
        .split('\\')
        .join('/')
        .slice(0, -3)
    var route = '/' + reqPath
        .split('/')
        .slice(2, -1)
        .join('/')
        .replaceAll('[', ':')
        .replaceAll(']', '')
        .replaceAll('{', ':')
        .replaceAll('}', '?')

    if (reqPath.endsWith('GET', reqPath.length)) {
        app.get(route, require(reqPath))
    } else if (reqPath.endsWith('POST', reqPath.length)) {
        app.post(route, require(reqPath))
    } else if (reqPath.endsWith('PUT', reqPath.length)) {
        app.put(route, require(reqPath))
    } else if (reqPath.endsWith('DELETE', reqPath.length)) {
        app.delete(route, require(reqPath))
    }

    console.log(`Loaded path ${reqPath} to route ${route}`)
}

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT} (local URL: http://localhost:${process.env.PORT})`)
})
