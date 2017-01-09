import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Intelusers } from '../api/intelusers.js';
import './profile-edit.html';

Template.ProfileEdit.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.ProfileEdit.helpers({
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
    
});
/**/
