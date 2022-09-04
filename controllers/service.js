const express = require('express');
const Service = require('./../models/serviceModel');


exports.getServices =  async  (req, res) =>{
  try{
    const services = await Service.find();
    res.status(200).json(services)
  }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
  });
  }
}

exports.addService = async(req, res) =>{
  try{
    const newService = await Service.create({
      name:req.body.name,
      description:req.body.description,
      serviceCost: req.body.serviceCost
    })
    res.status(201).json({
      status: 'success',
      data: {
        service: newService
      }
    });
  }catch(err){
       res.status(404).json({
        status:"Fail",
        message: err
    });
  }
}

exports.getServiceById = async (req, res) =>{
  try{
  const service = await Service.find({_id: req.params.id})
    res.status(200).json(service);
  }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
  });
  }    
}

exports.updateService = async (req, res) =>{
  try{
      const update = await Service.findByIdAndUpdate(req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        serviceCost: req.body.serviceCost,
       },
       {new: true}
       )

      res.status(200).json({
      status: 'success',
      data:{
        Service: update
      }
    });
  }catch{
    res.status(404).json({
      status:"Fail",
      message: err
   });
  }  
}

exports.deleteService = async (req, res) =>{
  try{
    if(req.params.id * 1 > Service.length){
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      });
    }else{
      const deleted = await Service.findByIdAndDelete({_id: req.params.id})
    // Can also be 204 if you are not returning anything in the response
      res.status(200).json({
        status: 'success',
        data:{
          Service: deleted
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