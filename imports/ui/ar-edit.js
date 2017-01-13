import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Ars } from '../api/ars.js';

import './ar-edit.html';

Template.editArRow.helpers({
    ars() {
        return Ars;
    },
});



