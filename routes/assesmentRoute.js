const express = require('express');
const router = express.Router();
const assessController = require('./../controllers/assesment');
const cors = require('cors')
const { getAssessment, addAssessment } = require('../controllers/assesment');


      var whitelist = ['http://localhost:4200','http://localhost:3000/sparkling/assessments']
      var corsOptions = {
        origin: function (origin, callback) {
          if (whitelist.includes(origin) !== -1) {
            callback(null, true)
          } else {
            callback(new Error('Not allowed by CORS'))
          }
        }
      }
      
router
    .route('/')
    .get(getAssessment)
    .post(addAssessment)

router
    .route('/:id')
    .get(assessController.getAssessmentById)
    .put(assessController.updateAssessement)
    .delete(assessController.removeAssessment);

module.exports = router;