const fs = require('fs');
const express = require('express');
//console.log(express);
const morgan = require('morgan');

const app = express();

//1.MIDDLEWARE
// app.use(morgan('dev'));
app.use(express.json());

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const getAlTours = (req, res) => {
  //non-blocking code-- asynchronous
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
const getTour = (req, res) => {
  console.log(req.params);

  const tour = tours.find((item) => item.id === req.params.id * 1);
  console.log(tour);
  if (!tour) {
    return res.status(404).json({
      status: '404 Not Found',
      message: 'invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
  });
};

const createTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  //Object.assign(obj1, obj2) : merge 2 obj
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      //status 201: create a new one
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: '404 Not Found',
      message: 'invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
};
const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: '404 Not Found',
      message: 'invalid ID',
    });
  }
  //status: 204: means no content, don't send any data back
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

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

app.route('/api/v1/tours').get(getAllTour).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => console.log(`App running on port ${port}`));
