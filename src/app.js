const express=require('express');
const app=express();
require('dotenv').config();

const PORT=process.env.PORT || 3000;

app.listen(PORT,(req,res)=>{
    console.log(`Server listening at port ${PORT}`);
})