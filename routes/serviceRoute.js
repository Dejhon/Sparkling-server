const express = require('express');
const router = express.Router();
const serviceController = require('./../controllers/service');
const cors = require('cors')
const { getServices,
        addService,
      } = require('./../controllers/service');


      var whitelist = ['http://localhost:4200','http://localhost:3000/sparkling/services']
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
    .get(getServices)
    .post(addService)

router
    .route('/:id')
    .get(serviceController.getServiceById)
    .put(serviceController.updateService)
    .delete(serviceController.deleteService);

module.exports = router;