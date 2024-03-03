import { BanchoClient } from "bancho.js"

const client = new BanchoClient({
    username: process.env.BANCHO_USERNAME!,
    password: process.env.BANCHO_PASSWORD!,
    apiKey: process.env.BANCHO_API_KEY
});

export default client