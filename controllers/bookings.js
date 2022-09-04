const express = require('express');
const Booking = require('./../models/bookingModel');


exports.getBookings =  async  (req, res) =>{
  try{
    const allbookings = await Booking.find();
    res.status(200).json(allbookings)
  }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
  });
  }
}

exports.addReservation = async(req, res) =>{
  try{
    console.log(req.body);
    const newReservation = await Booking.create({
      name:req.body.name,
      email:req.body.email,
      address: req.body.address,
      serviceCharge: req.body.serviceCharge,
      serviceBooked: req.body.serviceBooked,
      cardNumber:req.body.cardNumber,
      cvv:req.body.cvv,
      status: req.body.status
    })
    res.status(201).json({
      status: 'success',
      data: {
        reservation: newReservation
      }
    });
  }catch(err){
    console.log(req.body);
    console.log(err)
       res.status(404).json({
        status:"Fail",
        message: err
    });
  }
}

exports.getReservationById = async (req, res) =>{
  try{
  const bookings = await Booking.find({_id: req.params.id})
    res.status(200).json(bookings);
  }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
  });
  }    
}

exports.updateReservation = async (req, res) =>{
  try{
      const update = await Booking.findByIdAndUpdate(req.params.id,
      {status: req.body.status},
      {new: true})
      res.status(200).json({
      status: 'success',
      data:{
        booking: update
      }
    });
  }catch{
    res.status(404).json({
      status:"Fail",
      message: err
   });
  }  
}

exports.cancelReservation = async (req, res) =>{
  try{
    if(req.params.id * 1 > Booking.length){
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      });
    }else{
      const deleted = await Booking.findByIdAndDelete({_id: req.params.id})
    // Can also be 204 if you are not returning anything in the response
      res.status(200).json({
        status: 'success',
        data:{
          Reservation: deleted
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