const Place = require('../models/place');

const placesController = {
  deleteById(placeId, callback) {
    Place.deleteOne({
      _id: placeId
    }, callback);
  },
  getById(placeId, callback) {
    Place.findById(placeId, callback);
  },
  create(place, callback) {
    let newPlace = new Place(place);

    newPlace.save(callback);
  },
  updateById(placeId, place, callback) {
    Place.updateOne({
      _id: placeId
    }, place, callback);
  }
};

module.exports = placesController;