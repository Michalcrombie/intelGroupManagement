import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Ars } from '../api/ars.js';

import './ar.html';
import './ar-edit.js';
import './ar-add.js';

Template.AR.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.AR.helpers({
  ars() {
    return Ars;
  },

  settings: function(){
      return {
          collection:Ars,
          rowsPerPage:10,
          showFilter:true,
          fields:  ['description','srartDate','dueDate','catagory','subCatagory','owner','seconderyOwner',
              'priorty','status','statusDetails','comments', { key: '', label: '', tmpl: Template.edit}]
        };
    },
   incompleteCount() {
       return manipulateCount(Ars.find());
   }
});

Template.edit.helpers({
  editPath() {
    return "AREdit/"+ this._id;
  }
});

Template.AR.events({
  'click #buttonDownload': function(Ars) {
    var nameFile = 'Group`s ARs.csv';
    Meteor.call('download', function(err, fileContent) {
      if(fileContent){
        var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
        saveAs(blob, nameFile);
      }})
  },
    'click .delete-button'(){
        Ars.remove(this._id)},
});

var manipulateCount = function (ars) {
    var count = 0;
    ars.forEach (function (ar) {
        if (Meteor.user().username === ar.owner) {
            if (ar.status == "Open" || ar.status == "WIP") {
                count++;
            }
        }
    })
    return count;
};

