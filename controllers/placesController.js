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
  getList(callback) {
    Place.find({}, callback);
  }, //{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }
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