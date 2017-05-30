import React from 'react';
import {
    Button
} from 'aptr-uikit';
import LP from 'helpers/lp';

const CourseBookingsCollectionActions = React.createClass({

    onEditCourseBookingClicked: function(event) {
        event.preventDefault();
        this.props.editCourseBooking(this.props.courseBooking._id);
    },

    render: function() {
        return (
            <div>
                <Button
                    text={LP('courses', 'editCourse', 'titlecase')}
                    type="primary"
                    icon="pencil4"
                    onClick={this.onEditCourseBookingClicked}
                />
            </div>
        );
    }

});

export default CourseBookingsCollectionActions;