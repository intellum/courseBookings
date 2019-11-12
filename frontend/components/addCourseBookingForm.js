import React from 'react';
import createReactClass from 'create-react-class';
import Bluebird from 'bluebird';
import {DialogTitle, DialogBody, DialogActions} from 'modules/notifications/components/dialogComponents.js';
import LP from 'modules/app/helpers/lp';
import Moment from 'moment';
import {FlatButton, Button} from 'uiKit';
import {Form} from 'modules/form';

const AddCourseBookingForm = createReactClass({

    getInitialState: function() {
        return {}
    },

    handleDialogAction: function(action) {
        this.props.commitAction({
            action: action,
            payload: this.state
        });
    },

    onUpdateField: function(attributes, hasError, fieldKey) { 
        this.setState(attributes)
        return Bluebird.resolve();
    },

    render: function() {
        return (
            <div className="dialog default-dialog course-booking-item-dialog">
                <DialogTitle title={this.props.title} className="dialog-title default-dialog-title"/>
                <DialogBody body={this.props.body} className="dialog-body default-dialog-body"/>
                <Form
                    model={this.state}
                    schema={this.props.options.schema}
                    onUpdate={this.onUpdateField}
                />
                <DialogActions
                    onDialogAction={this.handleDialogAction}
                    actions={this.props.actions} 
                    className="default-dialog-actions"/>
            </div>
        );
    }

});

export default AddCourseBookingForm;