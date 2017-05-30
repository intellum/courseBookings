var mongoose = require('mongoose');
var Schema = require('../schemas/courseBooking');

var CourseBookingSchema = mongoose.Schema(Schema);

CourseBookingSchema.index({
    "displayTitle":"text",
    "title":"text",
    "description": "text"
}, {background: true});

var CourseBooking = mongoose.model("CourseBooking", CourseBookingSchema);
module.exports = CourseBooking;