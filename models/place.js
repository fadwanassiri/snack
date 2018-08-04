const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: String,
  location: {
    address: String,
    zipCode: String,
    latitude: String,
    longitude: String,
  }
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;