import React from 'react';
import {
    FlatButton
} from 'aptr-uikit';
import Moment from 'moment';
import classnames from 'classnames';

var CourseBookingEventItem = React.createClass({

    getClassName: function() {
        return classnames("course-booking-event-item", {
            "is-start-of-month": this.props.isStartOfMonth
        })
    },

    getStyles: function() {
        return {
            backgroundImage: "url('" + this.props.item._itemGraphic + "')",
            backgroundRepeat: "no-repeat"
        }
    },

    render: function() {
        return (
            <div className={this.getClassName()} style={this.getStyles()}>
                <div className="course-booking-event-item-shadow"/>
                <div className="course-booking-event-item-content">
                    <div className="course-booking-event-item-title">
                        {this.props.item.displayTitle}
                    </div>
                    <div className="course-booking-event-item-date">
                        {Moment(this.props.item._startDate).format("dddd, MMMM Do YYYY, h:mm a")}
                    </div>
                    <div className="course-booking-event-item-location">
                        {this.props.item._location}
                    </div>
                    <FlatButton
                        className="course-booking-event-item-view-button"
                        onClick={() => this.props.onItemClicked(this.props.item)}
                        text="View"
                    />
                </div>
            </div>
        );
    }

});

export default CourseBookingEventItem;