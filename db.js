const { MongoClient} = require("mongodb");

async function connectDb() {
  const client = new MongoClient("mongodb://127.0.0.1:27017/");
  await client.connect();
  let db = client.db("final");

  return {
    db,
    artCollection: db.collection("gallery"),
    userCollection: db.collection("users"),
    artistCollection: db.collection("artist"),
    workshopCollection: db.collection("workshop"),
    commentsCollection: db.collection("comments"),
    likesCollection: db.collection("likes"),
    followCollection: db.collection("follow"),
  };
}

module.exports = connectDb;
