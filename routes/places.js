const express = require('express');
const placesRouter = express.Router();
const placesController = require('../controllers/placesController');

placesRouter.delete('/:placeId', function (req, res) {
  const placeId = req.params.placeId;

  placesController.deleteById(placeId, function (err) {
    if (err) {
      return res.send(err.message);
    }

    res.send(placeId);
  });
});

placesRouter.get('/:placeId', function (req, res) {
  const placeId = req.params.placeId;

  placesController.getById(placeId, function (err, place) {
    if (err) {
      return res.send(err.message);
    }

    res.send(place);
  });
});

placesRouter.patch('/:placeId', function (req, res) {
  const placeId = req.params.placeId;

  placesController.updateById(placeId, req.body, function (err, place) {
    if (err) {
      return res.send(err.message);
    }

    res.send(place);
  });
});

placesRouter.put('', function (req, res) {
  placesController.create(req.body, function (err, place) {
    if (err) {
      return res.send(err.message);
    }

    res.send(place);
  });
});

module.exports = placesRouter;