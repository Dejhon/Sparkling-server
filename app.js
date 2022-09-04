const express = require('express');
const morgan = require('morgan');
const serviceRouter = require('./routes/serviceRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const bookingRouter = require('./routes/bookingRoute');
const assessRouter = require('./routes/assesmentRoute');
const messageRouter = require('./routes/messageRoute');
const app = express();
const cors = require('cors');

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use(cors())

app.use((req, res, next) =>{
  console.log('[ANGULAR-APP3.1] - User Created Middleware!!');
  next();
})

// 2) ROUTES
app.use('/sparkling/authentication',authRouter);
app.use('/sparkling/assessment',assessRouter);
app.use('/sparkling/bookings',bookingRouter);
app.use('/sparkling/services',serviceRouter);
app.use('/sparkling/users',userRouter); 
app.use('/sparkling/messages', messageRouter);

module.exports = app;