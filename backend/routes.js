var ical = require('ical-generator');
var Auth = require(global.app + '/middleware/authorization.js');
var Permissions = require(global.app + '/middleware/permissions.js');
var DefaultRouteResponse = require(global.app + '/helpers/query/defaultRouteResponse');
var CourseBookings = require('./controller');

module.exports = function(app, passport, io) {
    app.get('/api/courseBookings', Auth.isAuthenticated, Permissions.isAdmin, function(req, res) {
        CourseBookings.fetchCourseBookings(req, function(errObject, resObject) {
            DefaultRouteResponse(res, errObject, resObject);
        })
    });

    app.get('/api/courseBookings/:id', Auth.isAuthenticated, Permissions.isAdmin, function(req, res) {
        CourseBookings.fetchCourseBooking(req, function(errObject, resObject) {
            DefaultRouteResponse(res, errObject, resObject);
        })
    });

    app.post('/api/courseBookings', Auth.isAuthenticated, Permissions.isAdmin, function(req, res) {
        CourseBookings.createCourseBooking(req, function(errObject, resObject) {
            DefaultRouteResponse(res, errObject, resObject);
        })
    });

    app.post('/api/courseBookings/book/:id', Auth.isAuthenticated, Permissions.isLearner, function(req, res) {
        CourseBookings.bookUserIntoEvent(req, function(errObject, resObject) {
            DefaultRouteResponse(res, errObject, resObject);
        })
    });

    app.post('/api/courseBookings/cancel/:id', Auth.isAuthenticated, Permissions.isLearner, function(req, res) {
        CourseBookings.cancelUserFromEvent(req, function(errObject, resObject) {
            DefaultRouteResponse(res, errObject, resObject);
        })
    });
    
    app.put('/api/courseBookings/:id', Auth.isAuthenticated, Permissions.isAdmin, function(req, res) {
        CourseBookings.updateCourseBooking(req, function(errObject, resObject) {
            DefaultRouteResponse(res, errObject, resObject);
        })
    });

    app.get('/courseBookings/download/:id', Auth.isAuthenticated, Permissions.isLearner, function(req, res) {
        CourseBookings.downloadInvite(req, function(errObject, resObject) {

            var iCal = ical();

            iCal.createEvent({
                start: resObject._courseBooking._startDate,
                end: resObject._courseBooking._endDate,
                summary: resObject._courseBooking.displayTitle,
                description: resObject._courseBooking.description,
                location: resObject._courseBooking._location
            });

            iCal.serve(res);

        })
    })

}