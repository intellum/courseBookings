var Bloom = require(global.app + '/bloom');

Bloom.registerPlugin('courseBookings', function(app, passport, io) {

    require('./routes')(app, passport, io);

});