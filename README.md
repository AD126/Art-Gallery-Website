# Art Gallery Website

A web application for browsing and managing an art gallery. Users can view artworks, leave comments, like pieces, follow artists, and enroll in workshops. Artists can submit their own artwork and host workshops.

## Features

- **Gallery** – Browse and view artwork with details, comments, and likes
- **Artist Profiles** – Explore artist pages and follow your favourite artists
- **Workshops** – Artists can create workshops; users can enroll in them
- **User Accounts** – Register, log in, and manage your profile
- **Submit Art** – Authenticated artists can upload new artwork to the gallery
- **Search** – Search for artworks across the gallery
- **Comments & Likes** – Engage with artwork by leaving comments and liking pieces

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Templating:** Pug
- **Database:** MongoDB
- **Session Storage:** connect-mongodb-session

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) running locally on the default port `27017`

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Seed the database

Run the database initializer to populate MongoDB with the initial gallery data from `gallery.json`:

```bash
node DatabaseInitializater.js
```

> **Note:** This will drop and recreate all collections, so only run it on a fresh database or when you want to reset the data.

### 3. Start the server

```bash
node server.js
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
.
├── server.js                 # Express app entry point
├── route-handler.js          # Route definitions
├── functions.js              # Route handler logic
├── db.js                     # MongoDB connection helper
├── DatabaseInitializater.js  # One-time database seeding script
├── gallery.json              # Initial artwork data
├── public/                   # Client-side JavaScript and CSS
│   ├── styles.css
│   ├── galleryManager.js
│   ├── loginManager.js
│   ├── newAccountManager.js
│   ├── profileManager.js
│   ├── searchManager.js
│   ├── submitArt.js
│   ├── addWorkshop.js
│   ├── enrollWorkshop.js
│   └── followManager.js
└── views/                    # Pug templates
    ├── layout.pug
    ├── main.pug
    ├── gallery.pug
    ├── galleryData.pug
    ├── artist.pug
    ├── artists.pug
    ├── login.pug
    ├── newAccount.pug
    ├── profile.pug
    ├── search.pug
    ├── addArt.pug
    ├── workshop.pug
    ├── workshops.pug
    └── addWorkShop.pug
```

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Home page |
| GET | `/gallery` | View all artworks |
| POST | `/gallery` | Submit a new artwork (authenticated) |
| GET | `/gallery/:id` | View a single artwork |
| GET | `/login` | Login page |
| PUT | `/login` | Log in |
| POST | `/login` | Create a new account |
| GET | `/newaccount` | New account page |
| POST | `/switchAccount` | Switch account type (artist/user) |
| GET | `/artistPage` | Browse all artists |
| GET | `/artist/:a` | View a specific artist's page |
| GET | `/addArt` | Add artwork page |
| POST | `/comments` | Post a comment |
| DELETE | `/comments` | Delete a comment |
| POST | `/likes` | Like an artwork |
| DELETE | `/likes` | Remove a like |
| GET | `/addWorkShop` | Add workshop page |
| POST | `/workshop` | Create a workshop (artists only) |
| GET | `/workshop` | Browse all workshops |
| GET | `/workshop/:a` | View a specific workshop |
| POST | `/enroll` | Enroll in a workshop |
| POST | `/follow` | Follow an artist |
| DELETE | `/follow` | Unfollow an artist |
| GET | `/search` | Search page |
| PUT | `/search` | Search artworks |
| PUT | `/checkTitle` | Check if artwork title already exists |
| GET | `/profile` | View your profile |
| POST | `/logout` | Log out |

## License

© 2023 Ammtoje Dahbia
