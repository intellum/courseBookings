import React from 'react';

const CourseBookingsCollectionItem = React.createClass({

    render: function() {
        return (
            <div>
                <div className="course-collection-item-title">{this.props.courseBooking.title}</div>
                <div className="course-collection-item-body">
                    {this.props.courseBooking.description}
                </div>
                <div className="course-collection-item-display-title">{this.props.courseBooking.displayTitle}</div>
            </div>
        );
    }

});

export default CourseBookingsCollectionItem;