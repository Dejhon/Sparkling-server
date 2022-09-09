const express = require('express');
const router = express.Router();
const serviceController = require('./../controllers/service');
const { getServices,
        addService,
      } = require('./../controllers/service');

      
router
    .route('/')
    .get(getServices)
    .post(addService)

router
    .route('/:id')
    .get(serviceController.getServiceById)
    .put(serviceController.updateService)
    .delete(serviceController.deleteService);

module.exports = router;