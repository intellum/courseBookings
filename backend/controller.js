var Bloom = require(global.app + '/bloom');
var Promise = require('bluebird');
var async = require('async');
var CourseBooking = require('./models/courseBooking');
var User = require(global.app + '/models/user');
var AddCourseBookingSchema = require('./schemas/addCourseBooking');
var EditCourseBookingSchema = require('./schemas/editCourseBookingSchema');

var getModelPaginationByCurrentPage = require(global.app + '/helpers/query/getModelPaginationByCurrentPage');
var getTotalPages = require(global.app + '/helpers/query/getTotalPages');
var getSearchFromSearchValue = require(global.app + '/helpers/query/getSearchFromSearchValue');
var getCourseBookingsByUsersGroups = require('./helpers/getCourseBookingsByUsersGroups');
var getDashboardItemSettings = require(global.app + '/helpers/settings/getDashboardItemSettings');
var getMyLearningItemSettings = require(global.app + '/helpers/settings/getMyLearningItemSettings');
var getBookedCourseBookings = require('./helpers/getBookedCourseBookings');

Bloom.registerHook('dashboard:learner', Promise.coroutine(function*(dashboardData, currentData, callback) {
        
    var courseBookingsSettings = yield getDashboardItemSettings(currentData.settings, 'learner', 'courseBookings', currentData.user);

    if (courseBookingsSettings && courseBookingsSettings._isEnabled) {

        getCourseBookingsByUsersGroups(currentData.user, function(err, courseBookings) {
            dashboardData._courseBookings = courseBookings;
            return callback();
        })


    } else {
        return callback();
    }

}));

Bloom.registerHook('myLearning', function(myLearningData, currentData, callback) {

    var bookedCourseBoookingsSettings = getMyLearningItemSettings(currentData.settings, 'learner', 'bookedCourseBookings')

    if (bookedCourseBoookingsSettings && bookedCourseBoookingsSettings._isEnabled) {

        getBookedCourseBookings(currentData.user, function(err, bookedCourseBookingsModels) {
            myLearningData._bookedCourseBookings = bookedCourseBookingsModels;
            return callback();
        });

    } else {
        return callback();
    }

}, 0);

module.exports = {

    createCourseBooking: function(req, callback) {

        var courseBooking = {
            title: req.body.title,
            displayTitle: req.body.displayTitle,
            description: req.body.description
        }

        CourseBooking.create(courseBooking, function(err, courseBookingModel) {
            callback(err, {_courseBooking: courseBookingModel});
        })
    },
    
    fetchCourseBookings: function(req, callback) {
        var query = req.query;
        var search = {};
        var projection = {}
        var options = {};
        var currentPage = 0;

        if ("searchValue" in query) {
            getSearchFromSearchValue(query.searchValue, ['title', 'displayTitle'], search)
        }

        if (query.currentPage) {
            currentPage = parseInt(query.currentPage);
            getModelPaginationByCurrentPage(currentPage, options);
        }
        
        // Produce a count
        CourseBooking.count(search, function(err, count) {
            if (err) {
                return callback(err);
            }
            // Now find the courses
            CourseBooking
            .find(search, projection, options)
            .populate({
                path: '_createdBy',
                select: 'firstName lastName username'
            })
            .populate({
                path: '_updatedBy',
                select: 'firstName lastName username'
            })
            .exec(function(err, courseBookings) {
                
                if (err) {
                    return callback(err);
                }

                var totalPages = getTotalPages(count);

                return callback(null, {
                    _courseBookings: courseBookings, 
                    _count: count,
                    _currentPage: currentPage,
                    _totalPages: totalPages,
                    _schema: AddCourseBookingSchema
                });

            });

        });
    },

    fetchCourseBooking: function(req, callback) {
        CourseBooking
            .findById(req.params.id)
            .populate({
                path: '_users',
                select: 'firstName lastName username email'
            })
            .exec(function(err, courseBooking) {
                
                if (err) {
                    return callback(err);
                }

                return callback(null, {
                    _courseBooking: courseBooking, 
                    _schema: EditCourseBookingSchema
                });

            });
    },

    updateCourseBooking: function(req, callback) {
        CourseBooking.findByIdAndUpdate(
            req.params.id, 
            req.body, {new: true}).populate({
                path: '_users',
                select: 'firstName lastName username email'
            }).exec(function(err, courseBooking) {
                
                if (err) {
                    return callback(err);
                }
    
                return callback(null, {
                    _courseBooking: courseBooking
                });
            })
    },

    bookUserIntoEvent: Promise.coroutine(function*(req, callback) {

        try {
            
            var courseBooking = yield CourseBooking.findByIdAndUpdate(req.params.id, {
                $push: {
                    "_users": req.body.userId
                }
            }, {new: true}).populate({
                path: '_users',
                select: 'firstName lastName username email'
            })
               
            
            return callback(null, {
                _courseBooking: courseBooking
            });

        } catch (err) {
            return callback(err);
        }
    }),

    cancelUserFromEvent: Promise.coroutine(function*(req, callback) {

        try {
            var courseBooking = yield CourseBooking.findByIdAndUpdate(req.params.id, { $pullAll: { "_users": [req.body.userId]}}, { new: true })
                .populate({
                    path: '_users',
                    select: 'firstName lastName username email'
                });

            return callback(null, {
                _courseBooking: courseBooking
            });

        } catch (err) {
            return callback(err);
        }
    }),

    addUsersIntoEvent: Promise.coroutine(function*(req, callback) {

        try {            
            var userIds = req.body.userIds;

            var courseBooking = yield CourseBooking.findByIdAndUpdate(req.params.id, {
                $push: {
                    _users: {
                        $each: userIds
                    }
                }
            }, {new: true}).populate({
                path: '_users',
                select: 'firstName lastName username email'
            }).exec();               
            
            return callback(null, {
                _courseBooking: courseBooking
            });

        } catch (err) {
            return callback(err);
        }
    }),

    downloadInvite: function(req, callback) {

        CourseBooking.findById(req.params.id, function(err, courseBookingModel) {
            if (err) {
                return callback(err);
            }

            courseBooking = courseBookingModel;

            return callback(null, {_courseBooking: courseBookingModel})

        });
        

    }
}