require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const fetch = require("node-fetch");
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())

const User = require("./model/user");
const UserFavorites = require("./model/favorite");
const UserNotes = require("./model/notes");
const UserRatings = require("./model/ratings");

app.post("/register", async (req, res) => {
    try {

        const { first_name, last_name, email, password } = req.body;

        if (!(email && password && first_name && last_name)) {
            res.status(400).json({ error: 'All fields are required!' })
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).json({ error: 'User already exists!' })
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        UserFavorites.create({
            user_id: user._id,
        })
        UserNotes.create({
            user_id: user._id,
        })
        UserRatings.create({
            user_id: user._id,
        })

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

app.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const user = await User.findOne({ email });


        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            const user_id = user._id;

            user.token = token;
            const favorites = await UserFavorites.findOne({ user_id })
            const notes = await UserNotes.findOne({ user_id })
            const ratings = await UserRatings.findOne({ user_id })
            res.status(200).json({ user, favorites, notes, ratings });
        } else {
            res.status(400).json({ error: 'Invalid credentials' })
        }
    } catch (err) {
        console.log(err);
    }
});

app.get("/favorites", auth, async (req, res) => {
    try {
        const favorites = await UserFavorites.findOne({ user_id: req.user.user_id });
        res.status(200).json(favorites.movies_ids)
    } catch (e) {
        console.log(e)
    }
})

app.post("/favorites", auth, async (req, res) => {
    if (req.body.type === "add") {
        try {
            let favorites = await UserFavorites.findOne({ user_id: req.user.user_id })
            favorites.movies_ids.push(req.body.movie);
            await UserFavorites.findOneAndUpdate({ user_id: req.user.user_id }, favorites)
            res.status(200).send("Favorites updated");
        } catch (e) {
            console.log(e)
        }
    } else if (req.body.type === "delete") {
        try {
            const favorites = await UserFavorites.findOne({ user_id: req.user.user_id })
            const newFavorites = favorites.movies_ids.filter((favorite) => favorite.id !== req.body.movie.id)
            await UserFavorites.findOneAndUpdate({ user_id: req.user.user_id }, { $set: { movies_ids: newFavorites } })
            res.status(200).send("Favorites updated");
        } catch (e) {
            console.log(e)
            res.status(e.status).send(e)
        }
    }
})

app.get("/ratings", auth, async (req, res) => {
    try {
        const ratings = await UserRatings.findOne({ user_id: req.user.user_id });
        res.status(200).json(ratings.movies)
    } catch (e) {
        console.log(e)
        res.status(e.status).send(e)
    }
})

app.post("/ratings", auth, async (req, res) => {
    if (req.body.type === "add") {
        try {
            let ratings = await UserRatings.findOne({ user_id: req.user.user_id })
            let i = undefined
            const alreadyRated = ratings.movies.filter((x, index) => { 
                if (x.id === req.body.rating.id) {
                    i = index
                    return true
                } else {
                    return false
                }
            }).length !== 0 ? true : false
            if (alreadyRated) {
                ratings.movies[i].rating = req.body.rating.rating
            } else {
                ratings.movies.push(req.body.rating);
            }
            await UserRatings.findOneAndUpdate({ user_id: req.user.user_id }, ratings)
            res.status(200).send("Ratings updated");
        } catch (e) {
            console.log(e)
        }
    } else if (req.body.type === "delete") {
        try {
            const ratings = await UserRatings.findOne({ user_id: req.user.user_id })
            const newRatings = ratings.movies.filter((rating) => rating.id !== req.body.movie_id)
            await UserRatings.findOneAndUpdate({ user_id: req.user.user_id }, { $set: { movies: newRatings } })
            res.status(200).send("Ratings updated");
        } catch (e) {
            console.log(e)
            res.status(e.status).send(e)
        }
    }
})

app.get("/notes", auth, async (req, res) => {
    try {
        const notes = await UserNotes.findOne({ user_id: req.user.user_id });
        res.status(200).json(notes.movies)
    } catch (e) {
        console.log(e)
        res.status(e.status).send(e)
    }
})

app.post("/notes", auth, async (req, res) => {
    if (req.body.type === "add") {
        try {
            let notes = await UserNotes.findOne({ user_id: req.user.user_id })
            let i = undefined
            const alreadyNoted = notes.movies.filter((x, index) => { 
                if (x.id === req.body.note.id) {
                    i = index
                    return true
                } else {
                    return false
                }
            }).length !== 0 ? true : false
            if (alreadyNoted) {
                notes.movies[i].note = req.body.note.note
            } else {
                notes.movies.push(req.body.note);
            }
            await UserNotes.findOneAndUpdate({ user_id: req.user.user_id }, notes)
            res.status(200).send("Notes updated");
        } catch (e) {
            console.log(e)
        }
    } else if (req.body.type === "delete") {
        try {
            console.log(req.body)
            const notes = await UserNotes.findOne({ user_id: req.user.user_id })
            const newNotes = notes.movies.filter((note) => note.id !== req.body.note_id)
            await UserNotes.findOneAndUpdate({ user_id: req.user.user_id }, { $set: { movies: newNotes } })
            res.status(200).send("Notes updated");
        } catch (e) {
            console.log(e)
            res.status(e.status).send(e)
        }
    }
})

app.get("/search", async (req, res) => {
    try {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${req.query.movie_title}&page=1&include_adult=true`)
            .then(fetchRes => fetchRes.json())
            .then(fetchRes => {
                res.status(200).send(fetchRes)
            })
    } catch (e) {
        console.log(e)
        res.status(e.status).send(e)
    }
})

app.get("/allmovies", (req, res) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate`)
        .then(fetchRes => fetchRes.json())
        .then(fetchRes => res.status(200).send(fetchRes))
})

app.get("/movie_details", (req, res) => {
    try {
        fetch(`https://api.themoviedb.org/3/movie/${req.query.movie_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`)
            .then(fetchRes => fetchRes.json())
            .then(fetchRes => {
                res.status(200).send(fetchRes)
            })
    } catch (e) {
        console.log(e)
        res.status(e.status).send(e)
    }

})

module.exports = app;