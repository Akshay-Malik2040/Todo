const express=require('express');
const router=express.Router();
const {signin,login}=require('../controllers/authController');

router.post('/',signup);
router.post('/login',login)