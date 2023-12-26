const { ObjectId } = require('mongodb')

async function followArtist(req, res) {
  let artistId = req.body.artistId;
  let artist = await req.app.locals.artistCollection.findOne({
    _id: new ObjectId(artistId),
  });
  let follow = await req.app.locals.followCollection.insertOne({
    follower: req.session.user.username,
    followed: artist.Artist,
    notifications: [],
  });
  if (follow) {
    res.status(201).send("You are now following this artist");
  } else {
    res.status(500).send("Something went wrong");
  }
}

async function showProfile(req, res) {
  try {
    let likedArtworks = await req.app.locals.likesCollection
      .find({ userLike: req.session.user.username })
      .toArray();
    let reviewedArtworks = await req.app.locals.commentsCollection
      .find({ userComment: req.session.user.username })
      .toArray();
    let userInfo = await req.app.locals.userCollection.findOne({
      username: req.session.user.username,
    });
    let followedArtists = await req.app.locals.followCollection
      .find({ follower: req.session.user.username })
      .toArray();
    res.render("./profile", {
      likedArtworks,
      reviewedArtworks,
      userInfo,
      followedArtists,
    });
  } catch {
    res.render("./main");
  }
}

async function deleteLike(req, res) {
  let like = req.body;
  like.userLike = req.session.user.username;
  let prompt = await req.app.locals.likesCollection.deleteOne(like);
  console.log(prompt);
  if (prompt) {
    res.status(201).send("You have removed your like");
  } else {
    res.status(500).send("Something went wrong");
  }
}

async function unfollowArtist(req, res) {
  let follow = req.body;
  let result = await req.app.locals.followCollection.deleteOne({
    _id: new ObjectId(follow._id),
  });
  if (result) {
    res.status(201).send("You have unfollowed this artist");
  } else {
    res.status(500).send("Something went wrong");
  }
}

async function logoutUser(req, res) {
  req.session.user = undefined;
  res.status(201).send("You have logged out");
}

async function switchAccountType(req, res) {
  let user = await req.app.locals.userCollection.findOne({
    username: req.session.user.username,
  });
  if (user.artists) {
    let result = await req.app.locals.userCollection.updateOne(
      { username: req.session.user.username },
      { $set: { artists: false } }
    );
    res.status(201).send("You have switched to a patron account");
  } else {
    let artist = await req.app.locals.artistCollection.findOne({
      Artist: req.session.user.username,
    });
    if (artist) {
      let result = await req.app.locals.userCollection.updateOne(
        { username: req.session.user.username },
        { $set: { artists: true } }
      );
      res.status(201).send("You have switched to an artist account");
    } else {
      res
        .status(500)
        .send("You need to add an artwork to the gallery to become an artist");
    }
  }
}

async function deleteComment(req, res) {
  let comment = req.body;
  comment.userComment = req.session.user.username;
  let result = await req.app.locals.commentsCollection.deleteOne(comment);
  if (result) {
    res.status(201).send("You have deleted your comment");
  } else {
    res.status(500).send("Something went wrong");
  }
}

async function checkTitleExists(req, res) {
  let title = req.body;
  let result = await req.app.locals.artCollection.findOne(title);
  if (result) {
    res.status(500).send("An artwork with the same title already exists");
  } else {
    res.status(201).send("No duplicate titles found");
  }
}

async function searchArtworks(req, res) {
  let query = req.body;
  let result = await req.app.locals.artCollection.find(query).toArray();
  if (result) {
    res.status(201).json(result);
  }
}

async function enrollWorkshop(req, res) {
  let workshopId = req.body._id;
  let result = await req.app.locals.workshopCollection.updateOne(
    { _id: new ObjectId(workshopId) },
    { $push: { enroll: req.session.user.username } }
  );
  console.log(result);
  if (result.acknowledged) {
    res.status(201).send("You have enrolled in this workshop");
  } else {
    res.status(501).send("Something went wrong");
  }
}

async function addArtwork(req, res) {
  let artwork = req.body;
  artwork.Artist = req.session.user.username;
  let result = await req.app.locals.artCollection.insertOne(artwork);
  console.log(result);
  if (result) {
    let message = "artwork: " + artwork.Title;
    res.status(201).send("You have added an artwork to the gallery");
    let result2 = await req.app.locals.followCollection.updateMany(
      { followed: req.session.user.username },
      { $push: { notifications: message } }
    );
    let result3 = await req.app.locals.artistCollection.insertOne({
      Artist: req.session.user.username,
    });
  } else {
    res.status(500).send("Something went wrong");
  }
}

async function postWorkshop(req, res) {
  let workshop = req.body;
  workshop.user = req.session.user.username;
  workshop.enroll = [];
  let result = await req.app.locals.workshopCollection.insertOne(workshop);
  console.log(result);
  if (result) {
    res.status(201).send("You have posted a workshop");
    let message = "workshop: " + workshop.name;
    let result2 = await req.app.locals.followCollection.updateMany(
      { followed: req.session.user.username },
      { $push: { notifications: message } }
    );
    console.log(result2);
  } else {
    res.status(500).send("Something went wrong");
  }
}

async function createAccount(req, res) {
  let user = req.body;
  user.artist = false;
  let result = await req.app.locals.userCollection.insertOne(user);
  console.log(result);
  if (result) {
    req.session.save();
    req.session.user = user;
    res.status(201).send("You have created an account");
  } else {
    res.status(500).send("Something went wrong");
  }
}

async function loginUser(req, res) {
  let user = req.body;
  let result = await req.app.locals.userCollection.findOne(user);
  if (result) {
    req.session.save();
    req.session.user = user;
    res.status(201).send("You have logged in");
  } else {
    res.status(500).send("Something went wrong");
  }
}

async function postComment(req, res) {
  let comment = req.body;
  comment.userComment = req.session.user.username;
  let result = await req.app.locals.commentsCollection.insertOne(comment);
  if (result) {
    res.status(201).send("You have posted a comment");
  } else {
    res.status(500).send("Something went wrong");
  }
}

async function likeArtwork(req, res) {
  let like = req.body;
  like.userLike = req.session.user.username;
  let artwork = await req.app.locals.artCollection.findOne({
    _id: new ObjectId(like.artLocation),
  });
  like.title = artwork.Title;
  let result = await req.app.locals.likesCollection.insertOne(like);
  if (result) {
    res.status(201).send("You have liked this artwork");
  } else {
    res.status(500).send("Something went wrong");
  }
}

function checkUserLoggedIn(req, res, next) {
  if (req.session.user == undefined) {
    return res.status(401).send("You need to log in first");
  }
  next();
}

async function checkUserIsArtist(req, res, next) {
  let user = await req.app.locals.artistCollection.findOne({
    Artist: req.session.user.username,
  });
  console.log(user);
  if (user == undefined) {
    console.log("LEAVE");
    return res.status(401).send("You need to be an artist to do this");
  }
  next();
}

function checkUserLoggedOut(req, res, next) {
  if (req.session.user != undefined) {
    return res.status(401).send("You need to log out first");
  }
  next();
}

function showAddArtPage(req, res) {
  res.render("./addArt");
}

function showSearchPage(req, res) {
  res.render("./search");
}

function showAddWorkshopPage(req, res) {
  res.render("./addWorkShop");
}

function showHomePage(req, res) {
  res.render("./main");
}

function showLoginPage(req, res) {
  res.render("./login");
}

function showCreateAccountPage(req, res) {
  res.render("./newAccount");
}

async function showGalleryPage(req, res) {
  try {
    const artworks = await req.app.locals.artCollection.find().toArray();
    res.status(201).render("./gallery", { artworks });
  } catch {}
}

async function showWorkshopPages(req, res) {
  const workshops = await req.app.locals.workshopCollection.find().toArray();
  res.status(201).render("./workshops", { workshops });
}

async function showArtistPage(req, res) {
  try {
    const artists = await req.app.locals.artistCollection.find().toArray();
    res.status(201).render("./artists", { artists });
  } catch {}
}

async function showArtistPageOne(req, res) {
  try {
    let artistId = new ObjectId(req.params.a);
    const artist = await req.app.locals.artistCollection.findOne({
      _id: artistId,
    });
    let artistName = artist.Artist;
    const artworks = await req.app.locals.artCollection
      .find({ Artist: artistName })
      .toArray();
    const workshops = await req.app.locals.workshopCollection
      .find({ user: artistName })
      .toArray();
    res.status(201).render("./artist", { artist, artworks, workshops });
  } catch {}
}

async function showWorkshopPage(req, res) {
  let workshopId = new ObjectId(req.params.a);
  const workshop = await req.app.locals.workshopCollection.findOne({
    _id: workshopId,
  });
  console.log(workshop);
  res.status(201).render("./workshop", { workshop });
}

async function showGalleryData(req, res) {
  try {
    let id = req.params.id;
    const artwork = await req.app.locals.artCollection.findOne({
      _id: new ObjectId(id),
    });
    const reviews = await req.app.locals.commentsCollection
      .find({ artLocation: id })
      .toArray();
    const likes = await req.app.locals.likesCollection
      .find({ artLocation: id })
      .toArray();
    let reviewList = [];
    for (let i in reviews) {
      reviewList.push(reviews[i].comments);
    }
    res.status(201).render("./galleryData", {
      artwork: artwork,
      reviews: reviewList,
      likesCount: likes.length,
    });
  } catch {}
}

module.exports = {
    followArtist,
    showProfile,
    deleteLike,
    unfollowArtist,
    logoutUser,
    switchAccountType,
    deleteComment,
    checkTitleExists,
    searchArtworks,
    enrollWorkshop,
    addArtwork,
    postWorkshop,
    createAccount,
    loginUser,
    postComment,
    likeArtwork,
    checkUserLoggedIn,
    checkUserIsArtist,
    checkUserLoggedOut,
    showAddArtPage,
    showSearchPage,
    showAddWorkshopPage,
    showHomePage,
    showLoginPage,
    showCreateAccountPage,
    showGalleryPage,
    showWorkshopPages,
    showArtistPage,
    showArtistPageOne,
    showWorkshopPage,
    showGalleryData,
}