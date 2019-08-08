import React from 'react';
import createReactClass from 'create-react-class';

const CourseBookingsCollectionItem = createReactClass({

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