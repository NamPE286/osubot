import { BanchoClient } from "bancho.js"

const client = new BanchoClient({ username: process.env.BANCHO_USERNAME!, password: process.env.BANCHO_PASSWORD! });

export default client