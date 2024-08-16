import { connection } from "../../config/connection.js";
import { User } from "../User.js";
import { Thought } from "../Thought.js"
import { readFile } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


connection.on('error', (err) => err);


connection.once('open', async () => {
    console.log('Connected and starting to load seed data... ');
    const c = await connection.db.listCollections({name: "users"}).toArray();
    if(c.length > 0){
        console.log("Clearing out user data... ")
        await connection.db.dropCollection("users");
        console.log("... done")
    }

    const t = await connection.db.listCollections({name: "thoughts"}).toArray();
    if(t.length > 0){
        console.log("Clearing out thought data... ")
        await connection.db.dropCollection("thoughts");
        console.log("... done")
    }

    console.log("Importing thought data... ");
    await Thought.insertMany(JSON.parse(await readFile(__dirname + '/data/thought.json')))
    console.log("... done\nImporting user data... ")
    await User.insertMany(JSON.parse(await readFile(__dirname + '/data/user.json')))
    console.log("... done\nSeeding is complete")
    
    process.exit(0)
});
