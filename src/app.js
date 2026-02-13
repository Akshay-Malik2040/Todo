const express = require('express');
const app = express();
const connectDb = require('./config/db')
require('dotenv').config();

const PORT = process.env.PORT || 3000;

connectDb().then(() => {
    app.listen(PORT, (req, res) => {
        console.log(`Server listening at port ${PORT}`);
    })
})

