import axios from 'axios';
import Bluebird from 'bluebird';

export const FETCH_COURSE_BOOKINGS = 'FETCH_COURSE_BOOKINGS';
export const FETCH_COURSE_BOOKING = 'FETCH_COURSE_BOOKING';
export const CREATE_COURSE_BOOKING = 'CREATE_COURSE_BOOKING';
export const UPDATE_COURSE_BOOKING = 'UPDATE_COURSE_BOOKING';
export const BOOK_USER_INTO_EVENT = 'BOOK_USER_INTO_EVENT';
export const CANCEL_USER_FROM_EVENT = 'CANCEL_USER_FROM_EVENT';
export const DOWNLOAD_CALENDAR_INVITE = 'DOWNLOAD_CALENDAR_INVITE';

export function fetchCourseBookings(searchValue, currentPage) {
    
    return (dispatch) => {

        return axios.get('api/courseBookings', {
            params: {
                searchValue: searchValue,
                currentPage: currentPage
            }
        })
        .then(function(response) {

            dispatch({
                type: FETCH_COURSE_BOOKINGS,
                payload: response.data
            });

            return response;

        })
        .catch(function(response) {
            return Bluebird.reject(response);
        });

    }

}

export function createCourseBooking(courseBooking) {
    return (dispatch) => {
        return axios.post('api/courseBookings', courseBooking)
        .then(function(response) {

            dispatch({
                type: CREATE_COURSE_BOOKING,
                payload: response.data
            });

            return response;

        })
        .catch(function(response) {
            return Bluebird.reject(response);
        });
    }
}

export function fetchCourseBooking(id) {
    return (dispatch) => {
        return axios.get('api/courseBookings/' + id)
        .then(function(response) {

            dispatch({
                type: FETCH_COURSE_BOOKING,
                payload: response.data
            });

            return response;

        })
        .catch(function(response) {
            return Bluebird.reject(response);
        });
    }
}

export function updateCourseBooking(id, updateObject) {
    return (dispatch) => {

        return axios.put('api/courseBookings/' + id, updateObject)
        .then(function(response) {

            dispatch({
                type: UPDATE_COURSE_BOOKING,
                payload: response.data
            })

        })

    }
}

export function bookUserIntoEvent(courseBookingId, userId) {
    return (dispatch) => {

        return axios.post('api/courseBookings/book/' + courseBookingId, {
            userId: userId
        })
        .then(function(response) {

            dispatch({
                type: BOOK_USER_INTO_EVENT,
                payload: response.data
            })

        })

    }
}

export function cancelUserFromEvent(courseBookingId, userId) {
    return (dispatch) => {

        return axios.post('api/courseBookings/cancel/' + courseBookingId, {
            userId: userId
        })
        .then(function(response) {

            dispatch({
                type: CANCEL_USER_FROM_EVENT,
                payload: response.data
            })

        })

    }
}

/*export function downloadCalendarInvite(courseBookingId, userId) {
    return (dispatch) => {

        return axios.get('api/courseBookings/downloadInvite/' + courseBookingId, {
            params: {
                userId: userId
            }
        })
        .then(function(response) {

            dispatch({
                type: DOWNLOAD_CALENDAR_INVITE,
                payload: response.data
            })

        });

    }
}*/