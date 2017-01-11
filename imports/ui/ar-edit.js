import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Ars } from '../api/ars.js';
import { Session } from 'meteor/session';

import './ar-edit.html';

Template.editArRow.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.editArRow.helpers({
    ars() {
        return Ars;
    },
});



