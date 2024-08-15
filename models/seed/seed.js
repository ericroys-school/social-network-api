import { connection } from "../../config/connection.js";
import { User } from "../User.js";
import { Thought } from "../Thought.js"
import { readFile } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


connection.on('error', (err) => err);


connection.once('open', async () => {
    console.log('connected');
    const c = await connection.db.listCollections({name: "users"}).toArray();
    if(c.length > 0)
        await connection.db.dropCollection("users");

    const t = await connection.db.listCollections({name: "thoughts"}).toArray();
    if(t.length > 0) 
        await connection.db.dropCollection("thoughts");

    await Thought.insertMany(JSON.parse(await readFile(__dirname + '/data/thought.json')))
    await User.insertMany(JSON.parse(await readFile(__dirname + '/data/user.json')))
    
    process.exit(0)
});
