import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './profile.html';
import './profile-edit.js';

Template.Profile.helpers({
    employee_id: function() {
        return Meteor.user() && Meteor.user().employee_id;
    },
    firstName: function() {
    return Meteor.user() && Meteor.user().first_name;
    },

    lastName: function() {
    return Meteor.user() && Meteor.user().last_name;
    },

    office_address: function() {
        return Meteor.user() && Meteor.user().office_address;
    },

    email_adress: function() {
        return Meteor.user() && Meteor.user().email_adress;
    },

    qualifications: function() {
        return Meteor.user() && Meteor.user().qualifications;
    },
    sub_qualifications: function() {
        return Meteor.user() && Meteor.user(). sub_qualifications;
    },
    Permission: function() {
        return Meteor.user() && Meteor.user().Permission;
    },
    editPath() {
        return "ProfileEdit/"+ this._id;
    },
    textValue() {
        var ans=true;
        if (Meteor.user().Permission== "Maintenance manager") {
            ans=true;
        } 
        else {
            ans=false;
        }
        return ans;
        ;}

});


   
