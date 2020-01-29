import React from 'react';
import createReactClass from 'create-react-class';
import LP from 'modules/app/helpers/lp';
import {
    FlatButton
} from 'uiKit';
import Moment from 'moment';
import classnames from 'classnames';
import NavigationLink from 'modules/app/components/navigationLink';

const CourseBookingEventItem = createReactClass({

    getClassName: function() {
        return classnames("course-booking-event-item", {
            "is-start-of-month": this.props.isStartOfMonth
        })
    },

    getStyles: function() {
        
        if (!this.props.item._itemGraphic) return {};

        return {
            backgroundImage: "url('" + this.props.item._itemGraphic + "')",
            backgroundRepeat: "no-repeat",
        }
        
    },

    render: function() {
        return (
            <li role="listitem" className={this.getClassName()} style={this.getStyles()}>
                <div className="course-booking-event-item-shadow"/>
                <div className="course-booking-event-item-content">
                    <h3 className="course-booking-event-item-title">
                        {this.props.item.displayTitle}
                    </h3>
                    <p className="course-booking-event-item-date">
                        {Moment(this.props.item._startDate).format("dddd, MMMM Do YYYY, h:mm a")}
                    </p>
                    <p className="course-booking-event-item-location">
                        {this.props.item._location}
                    </p>
                    <NavigationLink
                        isFlatButton
                        aria-label={`${LP('global', 'view')} ${LP('courseBookings', 'courseBooking')}`}
                        className="course-booking-event-item-view-button"
                        onClick={() => this.props.onItemClicked(this.props.item)}
                        text={LP('global', 'view', 'titlecase')}
                    />
                </div>
            </li>
        );
    }

});

export default CourseBookingEventItem;