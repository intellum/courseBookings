import {
    BOOK_USER_INTO_EVENT,
    CANCEL_USER_FROM_EVENT,
} from '../actions/courseBookingsActions';

import {
    FETCH_DASHBOARD_DATA
} from 'modules/dashboard/actions/dashboardActions';

export default function(state = {}, action) {
    
    switch(action.type) {

        case FETCH_DASHBOARD_DATA:
            return _.mapKeys(action.payload._dashboardData._courseBookings, '_id');
        case BOOK_USER_INTO_EVENT:
            return {...state, [action.payload._courseBooking._id]: action.payload._courseBooking};
        case CANCEL_USER_FROM_EVENT:
            return {...state, [action.payload._courseBooking._id]: action.payload._courseBooking};
    }

    return state;

}