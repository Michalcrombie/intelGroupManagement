import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Intelusers } from '../api/intelusers.js';

import './profile.html';



Template.Profile.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.Profile.helpers({
    intelusers() {
        return Intelusers;
    },
   
    settings: function(){
        return {
            collection:Intelusers,
            rowsPerPage:10,
            showFilter:true,
            fields:['description','srartDate','dueDate','catagory','subCatagory','owner','seconderyOwner','priorty','status','statusDetails','comments']
        };
    },
    
    //firstName: manipulateUsers(Intelusers.find()),
   
});

/*var manipulateUsers = function(intelusers) {
     var result = [];    
     intelusers.forEach(function(iuser){
         if (Meteor.userId() === iuser.first_name) {
             var dataPoint = [iuser.first_name];
             result.push(dataPoint);
         }
           
       });
     return result;
};
*/