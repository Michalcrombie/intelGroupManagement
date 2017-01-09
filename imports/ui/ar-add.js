import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Ars } from '../api/ars.js';
import './ar-add.html';

Template.ARAdd.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.ARAdd.helpers({
    ars() {
        return Ars;
    },
});
