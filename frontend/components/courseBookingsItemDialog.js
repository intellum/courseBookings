import React from 'react';
import {DialogTitle, DialogBody, DialogActions} from 'modules/notifications/components/dialogComponents.jsx';
import LP from 'helpers/lp';
import Moment from 'moment';
import {FlatButton, Button} from 'aptr-uikit';

var CourseBookingsItemDialog = React.createClass({

    renderTitle: function(item) {
        return (
            <div className="course-booking-item-dialog-title">
                {item.displayTitle}
            </div>
        );
    },

    renderDescription: function(item) {
        return (
            <div className="course-booking-item-dialog-description">
                {item.description}
            </div>
        );
    },

    renderEventDate: function(item) {
        var startDate = Moment(item._startDate);
        var endDate = Moment(item._endDate);
        var isSameDay = startDate.isSame(endDate, 'day');

        var formattedStartDate = startDate.format("dddd, MMMM Do YYYY, h:mm a");
        var formattedEndDate = endDate.format("dddd, MMMM Do YYYY, h:mm a");

        if (isSameDay) {
            formattedEndDate = endDate.format("h:mm a")
        }

        return (
            <div className="course-booking-item-dialog-event-date">
                {formattedStartDate} - {formattedEndDate}
            </div>
        );
    },

    renderLocation: function(item) {
        return (
            <div className="course-booking-item-dialog-location">
                {item._location}
            </div>
        );
    },

    renderCalendarInvite: function(item, isUserAlreadyBooked) {

        if (isUserAlreadyBooked) {
            return (
                <div className="course-booking-item-dialog-calendar-invite">
                    <FlatButton
                        icon="calendar-text"
                        text="Download calendar invite"
                        onClick={this.props.onDownloadCalendarInviteClicked}
                    />
                </div>
            );
        }

    },

    renderBookingButton: function(item, isUserAlreadyBooked) {

        if (isUserAlreadyBooked) {
            return (
                <div className="course-booking-item-dialog-booking-button">
                    <Button
                        text="Cancel My Place"
                        type="primary"
                        onClick={this.props.onCancelMyPlaceClicked}
                    />
                </div>
            );
        }
        
        var placesLeft = item._places - item._users.length;
        if (placesLeft < 1) {
            return;
        }
        
        return (
            <div className="course-booking-item-dialog-booking-button">
                <Button
                    text="Book My Place"
                    type="primary"
                    onClick={this.props.onBookMyPlaceClicked}
                />
            </div>
        );
    },

    renderPlacesLeft: function(item) {
        var placesLeft = item._places - item._users.length;
        return (
            <div className="course-booking-item-dialog-places-left">
                <span className="course-booking-item-dialog-places-left-count">{placesLeft}</span> place(s) left
            </div>
        );
    },

    renderActions: function() {
        return (
            <DialogActions
                onDialogAction={this.props.handleDialogAction}
                actions={this.props.actions} 
                className="default-dialog-actions"/>
        );
    },

    render: function() {

        var item = this.props.courseBooking;

        if (!item) {
            return null;
        }

        var isUserAlreadyBooked = false;
        if (_.includes(item._users, this.props.auth._id)) {
            isUserAlreadyBooked = true;
        }

        console.log('rendering', this.props.courseBooking);
        
        return (
            <div className="dialog default-dialog course-booking-item-dialog">
                {this.renderTitle(item)}
                {this.renderDescription(item)}
                {this.renderEventDate(item)}
                {this.renderLocation(item)}
                {this.renderBookingButton(item, isUserAlreadyBooked)}
                {this.renderCalendarInvite(item, isUserAlreadyBooked)}
                {this.renderPlacesLeft(item)}
                {this.renderActions()}
            </div>
        );
    }

});

export default CourseBookingsItemDialog;