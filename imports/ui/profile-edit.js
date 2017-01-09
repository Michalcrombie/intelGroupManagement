import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { userSchema } from '../api/userSchema.js';
import './profile-edit.html';

Template.ProfileEdit.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.ProfileEdit.helpers({
  userSchema() {
        return userSchema;
    }
});
/**/
