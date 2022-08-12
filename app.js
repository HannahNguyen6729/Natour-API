const fs = require('fs');
const express = require('express');
//console.log(express);
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1.MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

//define a middleware
app.use((req, res, next) => {
  console.log('hi from middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;

//handling GET request
// app.get('/api/v1/tours', getAlTours);

//handling POST request
// app.post('/api/v1/tours', createTour);

// responding paramater
// app.get('/api/v1/tours/:id', getTour);

//handling PATCH request
// app.patch('/api/v1/tours/:id', updateTour);
//handling PUT request
// app.put('/api/v1/tours/:id', updateTour);

//handling DELETE request
// app.delete('/api/v1/tours/:id', deleteTour);

// app.get('/', (req, res) => {
//   //res.status(200).send('Hello from the server side 123');
//   //   var a = 2;
//   //   var b = 3;
//   //   var c = a + b;
//   res.status(200).json({ message: 'hi there', app: 'natour' });
// });
// app.post('/', (req, res) => {
//   res.send('you can post this to the endpoint....');
// });
