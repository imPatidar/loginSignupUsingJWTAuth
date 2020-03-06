const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Schema
const User = require('../models/users');

router.post('/signup', (req, res, next) => {
    User.find({email:req.body.email},(err,doc)=>{console.log(err)})
        .exec()
        .then(user=>{
            if(user.length) return res.status(409).json({message:'Account with email address a;ready exists'})
            else {
                let user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email:req.body.email,
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    password:req.body.password,
                });
                user.save()
                    .then((_)=>res.status(201).json({message:'USer created successfully'}))
                    .catch((err)=>res.status(500).json(err))
            }
        })
});

router.post('/login', (req, res, next) => {
    User.find({email:req.body.email})
        .exec()
        .then(users=>{
            if(users.length>=1){
                if(req.body.password===users[0].password) {
                    const token = jwt.sign({
                        email:users[0].email,
                        userId:users[0]._id
                    },process.env.JWT_SECRET,{expiresIn: '1h'})
                    console.log(token)


                    res.status(200).json({message:'Login Successfull',token:token})
                }
                else{
                    res.status(401).json({message:"Auth Failed!"})
                }
            }
            else{
                res.status(401).json({message:"Auth Failed!"})
            }
        })
        .catch((err)=>res.status(500).json(err))

});


module.exports = router;