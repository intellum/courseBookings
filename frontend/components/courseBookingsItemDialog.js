import React from 'react';
import createReactClass from 'create-react-class';
import {DialogTitle, DialogBody, DialogActions} from 'modules/notifications/components/dialogComponents.js';
import LP from 'modules/app/helpers/lp';
import Moment from 'moment';
import {FlatButton, Button, Loading} from 'uiKit';

const CourseBookingsItemDialog = createReactClass({

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
                        text={LP('courseBookings', 'downloadCalendarInvite', 'sentencecase')}
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
                        text={LP('courseBookings', 'cancelMyPlace', 'titlecase')}
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
                    text={LP('courseBookings', 'bookMyPlace', 'titlecase')}
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
                <span className="course-booking-item-dialog-places-left-count">{placesLeft} </span> 
                {LP('courseBookings', 'placesLeft', 'lowercase')}
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

    renderLoading: function() {
        return ( 
            <div className="dialog default-dialog course-booking-item-dialog">
                <Loading text="Loading"/>
            </div>
        );
    },

    render: function() {

        if (this.props.isSyncing) {
            return this.renderLoading();
        }
        
        var item = this.props.courseBooking;

        var isUserAlreadyBooked = false;
                
        if (_.find(item._users, {_id: this.props.auth._id})) {
            isUserAlreadyBooked = true;
        }
        
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