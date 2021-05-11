const express = require("express");
const cors = require('cors');
const app = express();
const port = 4000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo', {useNewUrlParser: true, useUnifiedTopology: true});


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});


const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({ username }).exec()
    if (user){
        res.status(500);
        res.json({
            message: "user already exists"
        });
        return;
    }

    await User.create({ username, password });
    res.json({
        message: "success",
    })
});

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({ username }).exec()
    if (!user || user.password !== password){
        res.status(403);
        res.json({
            message: "invalid login"
        });
        return;
    }

    
    res.json({
        message: "success",
    })
});



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(port, ()=>{
        console.log(`example app listening at http://localhost:${port}`)
    });
});