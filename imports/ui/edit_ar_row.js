import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Ars } from '../api/ars.js';
import { Session } from 'meteor/session';

import './edit_ar_row.html';
import './add-edit-ar-modal.html';

Template.AR.events({
    'click .edit-button'() {
        // Set the checked property to the opposite of its current value
        Ars.update(this._id, {
            $set: { description: 'edited' },
        });
    },

});