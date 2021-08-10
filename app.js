require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

const User = require("./model/user");
const UserFavorites = require("./model/favorite");
const UserNotes = require("./model/notes");
const UserRatings = require("./model/ratings");

app.post("/register", async (req, res) => {
    try {

        const { first_name, last_name, email, password } = req.body;

        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
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

            user.token = token;

            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
});

app.get("/favorites", auth, (req, res) => {
    res.status(200).send("");
})

app.get("/ratings", auth, (req, res) => {
    res.status(200).send("");
})

app.get("/notes", auth, (req, res) => {
    res.status(200).send("");
})

app.get("/allmovies", (req, res) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
        .then(fetchRes => fetchRes.json())
        .then(fetchRes => res.status(200).send(fetchRes))
})

app.get("/movie_details", auth, (req, res) => {
    fetch(`https://api.themoviedb.org/3/movie/${req.query.movie_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`)
        .then(fetchRes => fetchRes.json())
        .then(fetchRes => res.status(200).send(fetchRes))
})

module.exports = app;