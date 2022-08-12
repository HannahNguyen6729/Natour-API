const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  //non-blocking code-- asynchronous
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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
