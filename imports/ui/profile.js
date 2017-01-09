import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker'
import { ReactiveDict } from 'meteor/reactive-dict';
import { Intelusers } from '../api/intelusers.js';
import './profile.html';
import './profile-edit.js';
/*
Template.Profile.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});


Template.Profile.helpers({
    users() {
        return Users.find().fetch();
       //return manipulateUsers(Users.find())
    }
});


Template.Profile.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.Profile.helpers({
    users() {
        return Meteor.users.find({});
    },

    settings: function(){
        return {
            collection:Meteor.users.find({}) ,
            rowsPerPage:10,
            showFilter:true,
            fields:['createdAt','services','employee_id','first_name','last_name','office_address','email_adress','qualifications','sub_qualifications',
                'group_name','Permission'
            ]
        };
    },
});*/


Tracker.autorun(function () {
    Meteor.subscribe("userData");
    Meteor.subscribe("allUserData");
    
});


