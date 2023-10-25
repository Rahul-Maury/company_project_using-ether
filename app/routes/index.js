
const express = require('express');


const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../utils/swagger.json');
const superAdminrouter = require('./superAdmin.routes');
const userrouter = require('./user.routes');
const { errorMiddleware  } = require('../middlewares/error.middleware');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
module.exports = function (server) {

  
      
     
    server.use(fileupload());
    server.use(cookieParser());
    server.use(express.json());
    server.use(express.urlencoded({ extends: true }));
  
    
  
  


    server.use('/api/v1',userrouter)
    server.use('/api/v1', superAdminrouter)
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  
    server.use(errorMiddleware);
  
}