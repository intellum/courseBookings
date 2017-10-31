import React from 'react';
import {connect} from 'react-redux';
import CourseBookingItemDialog from '../components/courseBookingsItemDialog';
import {
    bookUserIntoEvent,
    cancelUserFromEvent,
    downloadCalendarInvite
} from '../actions/courseBookingsActions';

var CourseBookingItemDialogContainer = React.createClass({

    getInitialState: function() {
        return {
            title: '',
            displayTitle: '',
            body: ''
        }
    },

    onCancelMyPlaceClicked: function() {
        if (this.props.options.isMyLearning) {
            this.handleDialogAction()
        }
        this.props.cancelUserFromEvent(this.props.courseBooking._id, this.props.auth._id);
    },

    onBookMyPlaceClicked: function() {
        this.props.bookUserIntoEvent(this.props.courseBooking._id, this.props.auth._id);
    },

    onDownloadCalendarInviteClicked: function() {
        var courseBookingId = this.props.courseBooking._id;
        if (!window.location.origin) {
            window.location.origin = window.location.protocol+"//"+window.location.host;
        }

        var win = window.open(window.location.origin + window.location.pathname + 'courseBookings/download/' + courseBookingId + '/', '_blank');
        win.focus();
        return;
    },

    handleDialogAction: function(action) {
        this.props.commitAction({
            action: action,
            payload: this.state
        });
    },

    render: function() {
        return (
            <CourseBookingItemDialog
                courseBooking={this.props.courseBooking}
                handleDialogAction={this.handleDialogAction}
                actions={this.props.actions}
                auth={this.props.auth}
                onCancelMyPlaceClicked={this.onCancelMyPlaceClicked}
                onBookMyPlaceClicked={this.onBookMyPlaceClicked}
                onDownloadCalendarInviteClicked={this.onDownloadCalendarInviteClicked}
            />
        );
    }

});

export default connect(function(state, props) {
    if (props.options.isMyLearning) {
        var courseBooking = _.find(state.bookedCourseBookings, {_id: props.options.courseBookingId});
    } else {
        var courseBooking = _.find(state.courseBookingsDashboard, {_id: props.options.courseBookingId});
    }
    return {
        auth: state.auth,
        courseBooking: courseBooking
    }
}, {
    bookUserIntoEvent,
    cancelUserFromEvent,
    downloadCalendarInvite
})(CourseBookingItemDialogContainer);