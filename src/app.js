const express = require('express');
const cookieParser=require('cookie-parser');
const app = express();
const connectDb = require('./config/db')
const authRoutes=require('./routes/authRoutes')
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use('/',authRoutes);

connectDb().then(() => {
    app.listen(PORT, (req, res) => {
        console.log(`Server listening at port ${PORT}`);
    })
})

