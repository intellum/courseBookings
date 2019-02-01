var mongoose = require('mongoose');
var Schema = require('../schemas/courseBooking');

var CourseBookingSchema = mongoose.Schema(Schema, {usePushEach: true});

var CourseBooking = mongoose.model("CourseBooking", CourseBookingSchema);
module.exports = CourseBooking;