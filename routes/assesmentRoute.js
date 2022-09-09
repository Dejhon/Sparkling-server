const express = require('express');
const router = express.Router();
const assessController = require('./../controllers/assesment');
const { getAssessment, addAssessment } = require('../controllers/assesment');

      
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