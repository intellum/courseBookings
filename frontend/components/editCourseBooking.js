import React from 'react';
import Tabs from 'modules/app/components/tabs';
import LP from 'helpers/lp';
import {Form} from 'modules/form';
import EditCourseBookingUsers from './editCourseBookingUsers';

var EditCourseBooking = React.createClass({

    getTabItems: function() {
        return [{
            icon: 'pencil4',
            label: 'Edit',
            value: 'edit',
            component: this.getForm()
        }, {
            icon: 'users',
            label: 'Users',
            value: 'users',
            component: this.getUsers()
        }]
    },

    getForm: function() {
        return (
            <div className="edit-course-booking">
                <Form
                    model={this.props.courseBooking}
                    schema={this.props.schema}
                    onUpdate={this.props.onUpdateField}
                    form={{actions:this.props.formActions}}
                    title={"Edit " + this.props.courseBooking.title}
                />
            </div>
        );
    },

    getUsers: function() {
        return (
            <EditCourseBookingUsers 
                courseBooking={this.props.courseBooking}
            />
        );
    },

    render: function() {
        return (
            <div className="content">
                <Tabs 
                    items={this.getTabItems()}
                    value={this.props.activeTab}
                    onChange={this.props.onTabChanged}
                />
            </div>
        );
    }

});

export default EditCourseBooking;