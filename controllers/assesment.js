const express = require('express');
const Assessment = require('./../models/assessmentModel');


exports.getAssessment =  async  (req, res) =>{
  try{
    const allAssessments = await Assessment.find();
    res.status(200).json(allAssessments)
  }catch(err){
    res.status(400).json({
      status:"Fail",
      message: err
  });
  }
}

exports.addAssessment = async(req, res) =>{
  try{
    const newAssessment = await Assessment.create({
      name:req.body.name,
      email:req.body.email,
      address: req.body.address
    })
    res.status(201).json({
      status: 'success',
      data: {
        assessment: newAssessment
      }
    });
  }catch(err){
       res.status(400).json({
        status:"Fail",
        message: err
    });
  }
}

exports.getAssessmentById = async (req, res) =>{
  try{
  const assessment = await Assessment.find({_id: req.params.id})
    res.status(200).json(assessment);
  }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
  });
  }    
}

exports.updateAssessement = async (req, res) =>{
  try{
      const update = await Assessment.findByIdAndUpdate(req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
       },
       {new: true}
       )

      res.status(200).json({
      status: 'success',
      data:{
        Assessment: update
      }
    });
  }catch{
    res.status(404).json({
      status:"Fail",
      message: err
   });
  }  
}

exports.removeAssessment = async (req, res) =>{
  try{
    if(req.params.id * 1 > Assessment.length){
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      });
    }else{
      const deleted = await Assessment.findByIdAndDelete({_id: req.params.id})
    // Can also be 204 if you are not returning anything in the response
      res.status(200).json({
        status: 'success',
        data:{
          assessment: deleted
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