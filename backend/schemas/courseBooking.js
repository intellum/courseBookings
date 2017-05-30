var mongoose = require('mongoose');

module.exports = {
    "_type": {type: String, default: 'courseBooking'},
    "title": String,
    "displayTitle": String,
    "description": String,
    "_location": String,
    "_startDate": String,
    "_endDate": String,
    "_places": {type: Number, default: 10},
    "_itemGraphic": String,
    "_users": [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    "_isPublished": {type: Boolean, default: false},
    "_createdAt": {type: Date, default: new Date()},
    "_createdBy": {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    "_updatedAt": {type: Date, default: new Date()},
    "_updatedBy": {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    "_groups": [{type: mongoose.Schema.Types.ObjectId, ref:'Group'}]
}