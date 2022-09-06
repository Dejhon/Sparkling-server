const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret_key = "doctorBird_";
const expiry = 60

exports.login = async (req, res) =>{
    const username = req.body?.userName
    const password = req.body?.password
    if(username && password) {
    await User.findOne({userName: username}).then(existUser => {
        if(existUser && existUser._id) {
            bcrypt.compare(password, existUser?.password,function(err, response) {
                if(!err && response) {
                   const token = jwt.sign({ user_id: existUser._id, username},secret_key,{
                    algorithm: "HS256",
                    expiresIn: expiry
                   });
                   res.json({status:"Login Successful",token:token});
                } else {
                   res.json({status: 'warn', loginUser : false, data: 'Please enter valid password'});
                }
            })   
        } else {
            res.json({status: 'warn', loginUser : false, data: 'Please enter valid Username'});
        }
        }, (error) => {
            res.json({status: 'error' , data : error})
        })
    }else{
        res.status(404).json({
            Status:'User not Found',
            Message:"Fields cannot be empty"
        })
    }
}
