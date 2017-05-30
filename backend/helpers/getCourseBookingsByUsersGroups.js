var CourseBooking = require('../models/courseBooking');
var Moment = require('moment');

module.exports = function(user, callback) {
    CourseBooking.find({_isPublished: true, _groups: {$in: user._groups}}, function(err, courseBookings) {

        var sortedBookings = courseBookings.sort(function(a,b){
            return new Date(a._startDate) - new Date(b._startDate);
        });

        callback(err, sortedBookings);
    });
}