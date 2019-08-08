import React from 'react';
import createReactClass from 'create-react-class';
import {
    FlatButton
} from 'uiKit';
import Moment from 'moment';

const BookedCourseBookingsItem = createReactClass({

    render: function() {
        return (
            <div className="booked-course-bookings-item">
                <div className="booked-course-bookings-item-image">
                    <div className="booked-course-bookings-item-shadow"/>
                    <img src={this.props.item._itemGraphic}/>
                </div>
                <div className="booked-course-bookings-item-content">
                    <div className="booked-course-bookings-item-title">
                        {this.props.item.displayTitle}
                    </div>
                    <div className="booked-course-bookings-item-date">
                        {Moment(this.props.item._startDate).format("dddd, MMMM Do YYYY, h:mm a")}
                    </div>
                    <div className="booked-course-bookings-item-location">
                        {this.props.item._location}
                    </div>
                    <FlatButton
                        className="booked-course-bookings-item-view-button"
                        onClick={() => this.props.onItemClicked(this.props.item)}
                        text="View"
                    />
                </div>
            </div>
        );
    }

});

export default BookedCourseBookingsItem;