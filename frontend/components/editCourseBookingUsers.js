import React from 'react';
import AlertInfo from 'modules/app/components/alertInfo';
import {ListItem} from 'aptr-uikit';
import getUsersFullName from 'helpers/getUsersFullName';

var EditCourseBookingUsers = React.createClass({

    renderNoUsersAlert: function() {
        if (this.props.courseBooking._users.length === 0) {
            return (
                <AlertInfo type="info" text="No users are attending this event"/>
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
                    {'Users in ' + this.props.courseBooking.title}
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