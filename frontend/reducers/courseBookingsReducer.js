import {
    FETCH_COURSE_BOOKINGS,
    CREATE_COURSE_BOOKING,
    BOOK_USER_INTO_EVENT,
    CANCEL_USER_FROM_EVENT
} from '../actions/courseBookingsActions';

export default function(state = {}, action) {

    switch (action.type) {

        case FETCH_COURSE_BOOKINGS:
            return _.mapKeys(action.payload._courseBookings, '_id');
        case CREATE_COURSE_BOOKING:
            return {...state, [action.payload._courseBooking._id]: action.payload._courseBooking};
        default:
            return state;
            
    }
}