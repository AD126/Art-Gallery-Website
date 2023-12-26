const express = require("express");
const session = require("express-session");
const ConnectMongoDBSession = require("connect-mongodb-session");
const MongoDBStore = ConnectMongoDBSession(session);
const routes = require("./route-handler.js");
const connectDb = require("./db.js");

const app = express();
const store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/",
  collection: "sessiondata",
});

app.use(
  session({
    secret: "secret key",
    resave: true,
    saveUninitialized: true,
    store: store,
  })
);

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "pug");

app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.path);
  console.log(req.get("Content-Type"));
  next();
});;

async function start() {
  try {
    const db = await connectDb();
    app.locals = db;

    app.use("/", routes);

    console.log("Server running on Port 3000: http://localhost:3000/");
    app.listen(3000);
  } finally {
    console.error("An error occurred while starting the server.");
  }
}

start().catch(console.dir);
