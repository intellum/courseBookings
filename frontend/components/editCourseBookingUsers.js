import React from 'react';
import createReactClass from 'create-react-class';
import LP from 'helpers/lp';
import AlertInfo from 'modules/app/components/alertInfo';
import {Button, ListItem} from 'uiKit';
import getUsersFullName from 'helpers/getUsersFullName';

const EditCourseBookingUsers = createReactClass({

    renderNoUsersAlert: function() {
        if (this.props.courseBooking._users.length === 0) {
            return (
                <AlertInfo type="info" text={LP('courseBookings', 'noUsersAreAttendingThisEvent', 'sentencecase')}/>
            );
        }
    },

    renderUsers: function() {

        return _.map(this.props.courseBooking._users, (user) => {            
            const { props } = this;

            return (
                <div className="edit-course-booking-users-list-item">
                    <ListItem
                        buttons={[{
                            icon:"users-minus",
                            type: "alert",
                            toolTip: "Remove from event",
                            onClick: () => {
                                props.onRemoveUserFromEventClicked(user._id);
                            }
                        }]}
                        itemText={getUsersFullName(user)}
                        itemDetail={user.email}
                        icon="calendar-text"
                    />
                </div>
            );
        })
    },

    renderAddUsersButton: function() {
        return (
            <Button
                text="Add Users"
                icon="plus"
                onClick={this.props.onAddUsersClicked}
                disabled={this.props.isSyncing}
                type="primary"
                className="add-item-to-parent-button"
            />
        );
    },

    render: function() {
        return (
            <div className="edit-course-booking-users">
                <div className="edit-course-booking-users-title">
                    {LP('courseBookings', 'usersIn', 'sentencecase')} {this.props.courseBooking.title}
                </div>
                <div className="edit-course-booking-users-list">
                    {this.renderAddUsersButton()}
                    {this.renderNoUsersAlert()}
                    {this.renderUsers()}
                </div>
            </div>
        );
    }

});

export default EditCourseBookingUsers;
