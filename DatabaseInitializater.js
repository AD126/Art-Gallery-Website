import gallery from "./gallery.json" assert {type: 'json'};
import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

async function initializeDatabase() {
    try {
        const database = client.db("final");
        const collections = {
            art: database.collection("gallery"),
            artists: database.collection("artist"),
            users: database.collection("users"),
            comments: database.collection("comments"),
            likes: database.collection("likes"),
            workshops: database.collection("workshop"),
            follows: database.collection("follow")
        };

        
        await Promise.all(Object.values(collections).map(collection => collection.drop()));

        
        const artistsData = [];
        const usersData = [];
        const uniqueArtists = new Set(gallery.map(art => art.Artist));

        uniqueArtists.forEach(artist => {
            usersData.push({ username: artist, password: "password", artists: true });
            artistsData.push({ Artist: artist });
        });

        // Insert data into collections
        await collections.art.insertMany(gallery);
        await collections.artists.insertMany(artistsData);
        await collections.users.insertMany(usersData);
    } finally {
        await client.close();
    }
}
initializeDatabase().catch(console.dir);