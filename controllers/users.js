const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');



exports.getUsers =  async  (req, res) =>{
  try{
    const users = await User.find();
    res.status(200).json(users)
  }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
  });
  }
}

exports.addUser = async(req, res) =>{
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = await User.create({
      userName: req.body.userName,
      password: hashedPassword,
  })
  res.status(200).json({
    status: 'success',
    data: {
      User: newUser
    }
  });
  }catch(err){
       res.status(404).json({
        status:"Fail",
        message: err
    });
  }
}

exports.getUserById = async (req, res) =>{
  try{
  const user = await User.find({_id: req.params.id})
    res.status(200).json(user);
  }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
  });
  }    
}

exports.updateUser = async (req, res) =>{
  try{
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      const update = await User.findByIdAndUpdate(req.params.id,
      {
        userName: req.body.usernName,
        password: hashedPassword,
       },
       {new: true}
       )

      res.status(200).json({
      status: 'success',
      data:{
        user: update
      }
    });
  }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
   });
  }  
}

exports.deleteUser = async (req, res) =>{
  try{
    if(req.params.id * 1 > User.length){
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      });
    }else{
      const deleted = await User.findByIdAndDelete({_id: req.params.id})
      res.status(200).json({
        status: 'success',
        data:{
          User: deleted
        }
      });
    }    
    }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
   });
  } 
}