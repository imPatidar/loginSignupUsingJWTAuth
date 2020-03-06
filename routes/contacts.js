const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const checkAuth = require('../middleware/check-auth');

/*** routes***/

router.get('/all',checkAuth,(req,res)=>{
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  const user = User.find({_id:decoded.userId})
      .exec()
      .then(user=>res.json({message:'Congratulations You are now logged in successfully ' + user[0].firstName,}))
      .catch(err=>res.json({err:err}))


});





module.exports =  router;


