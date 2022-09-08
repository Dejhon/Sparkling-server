const express = require('express');
const Message = require('./../models/messageModel');


exports.getAllMessages =  async  (req, res) =>{
  try{
    const allMessages = await Message.find();
    res.status(200).json(allMessages)
  }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
  });
  }
}

exports.addMessage = async(req, res) =>{
  try{
    console.log(req.body);
    const newMessage = await Message.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      subject: req.body.subject,
      message: req.body.message,
      status:  req.body.status
    })
    res.status(201).json({
      status: 'success',
      data: {
        message: newMessage
      }
    });
  }catch(err){
    console.log(req.body);
    console.log(err)
       res.status(400).json({
        status:"Fail",
        message: err
    });
  }
}

exports.getMessageById = async (req, res) =>{
  try{
  const message = await Message.find({_id: req.params.id})
    res.status(200).json(message);
  }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
  });
  }    
}

exports.updateMessage = async (req, res) =>{
  try{
      const update = await Message.findByIdAndUpdate(req.params.id,
      {status: req.body.status},
      {new: true})
      res.status(200).json({
      status: 'success',
      data:{
        message: update
      }
    });
  }catch{
    res.status(404).json({
      status:"Fail",
      message: err
   });
  }  
}

exports.deleteMessage = async (req, res) =>{
  try{
    if(req.params.id * 1 > Message.length){
      return res.status(404).json({
        status: 'fail',
        error: 'Invalid ID'
      });
    }else{
      const deleted = await Message.findByIdAndDelete({_id: req.params.id})
    // Can also be 204 if you are not returning anything in the response
      res.status(200).json({
        status: 'success',
        data:{
          message: deleted
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