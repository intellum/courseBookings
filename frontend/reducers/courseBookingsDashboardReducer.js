import {
    BOOK_USER_INTO_EVENT,
    CANCEL_USER_FROM_EVENT
} from '../actions/courseBookingsActions';

import {
    FETCH_DASHBOARD_DATA
} from 'modules/dashboard/actions/dashboardActions';
import Moment from 'moment';

export default function(state = {}, action) {
    
    switch(action.type) {

        case FETCH_DASHBOARD_DATA:
            
            var upcomingEvents = _.filter(action.payload._dashboardData._courseBookings, function(courseBooking) {
                var isUpcoming = Moment(new Date(courseBooking._startDate)).isAfter(new Date());
                if (isUpcoming) {
                    return courseBooking;
                }
            });

            return _.mapKeys(upcomingEvents, '_id');

        case BOOK_USER_INTO_EVENT:
            return {...state, [action.payload._courseBooking._id]: action.payload._courseBooking};
        case CANCEL_USER_FROM_EVENT:
            return {...state, [action.payload._courseBooking._id]: action.payload._courseBooking};
    }

    return state;

}