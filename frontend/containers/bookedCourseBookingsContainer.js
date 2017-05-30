import React from 'react';
import {connect} from 'react-redux';
import BookedCourseBookings from '../components/bookedCourseBookings';
import {addDialog} from 'modules/notifications/actions/notifications';
import CourseBookingsItemDialogContainer from '../containers/courseBookingsItemDialogContainer';

var BookedCourseBookingsContainer = React.createClass({

    onItemClicked: function(item) {
        this.props.addDialog({
            dialogType: 'default',
            title: item.displayTitle,
            body: item.description,
            customDialog: CourseBookingsItemDialogContainer,
            options: {
                courseBookingId: item._id,
                isMyLearning: true
            },
            actions: [
                {
                    action: 'done',
                    buttonText: 'DONE',
                    buttonType: 'primary'
                }
            ]
        })
        .then((function(response) {
            if(response.action === 'done') {
                
            }
        }).bind(this));
    },

    render: function() {
        return (
            <BookedCourseBookings
                bookedCourseBookings={this.props.bookedCourseBookings}
                onItemClicked={this.onItemClicked}
            />
        );
    }

});

export default connect(function(state, props) {
    return {
        bookedCourseBookings: state.bookedCourseBookings
    }
}, {addDialog})(BookedCourseBookingsContainer);