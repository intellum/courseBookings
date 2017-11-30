import React from 'react';
import LP from 'helpers/lp';
import AlertInfo from 'modules/app/components/alertInfo';
import {ListItem} from 'aptr-uikit';
import getUsersFullName from 'helpers/getUsersFullName';

var EditCourseBookingUsers = React.createClass({

    renderNoUsersAlert: function() {
        if (this.props.courseBooking._users.length === 0) {
            return (
                <AlertInfo type="info" text={LP('courseBookings', 'noUsersAreAttendingThisEvent', 'sentencecase')}/>
            );
        }
    },

    renderUsers: function() {
        return _.map(this.props.courseBooking._users, function(user) {
            return (
                <div className="edit-course-booking-users-list-item">
                    <ListItem
                        itemText={getUsersFullName(user)}
                        itemDetail={user.email}
                        icon="calendar-text"
                    />
                </div>
            );
        })
    },

    render: function() {
        return (
            <div className="edit-course-booking-users">
                <div className="edit-course-booking-users-title">
                    {LP('courseBookings', 'usersIn', 'sentencecase')} {this.props.courseBooking.title}
                </div>
                <div className="edit-course-booking-users-list">
                    {this.renderNoUsersAlert()}
                    {this.renderUsers()}
                </div>
            </div>
        );
    }

});

export default EditCourseBookingUsers;