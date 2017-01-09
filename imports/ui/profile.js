import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './profile.html';
import './profile-edit.js';

Template.Profile.helpers({
  firstName: function() {
    return Meteor.user() && Meteor.user().first_name;
  }
});