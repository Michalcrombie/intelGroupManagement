import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Ars } from '../api/ars.js';
import './ar-add.html';

Template.ARAdd.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});


Template.ARAdd.events({
    "change input": function (e,t) {
        Session.set(e.target.name, e.target.value);

        set_owner("owner");
        set_owner("seconderyOwner");


    },
    "change select[name!='owner'][name!='seconderyOwner']": function(e, t) {
        Session.set(e.target.name, e.target.value);
        set_owner("owner");
        set_owner("seconderyOwner");
    }

});

var collection_users = Meteor.users;

// AR template record
function AR(action_num, description, category, sub_category, owner, secondary_owner, start_date, due_date, priorty) {
    this.action_num = action_num;
    this.description = description;
    this.category = category;
    this.sub_category = sub_category;
    this.owner = owner;
    this.secondary_owner = secondary_owner;
    this.start_date = start_date;
    this.due_date = due_date;
    this.priorty = priorty;
}

// Initialize an AR for the algorithm
function init_curr_ar() {
    var catagory = Session.get("catagory");
    var sub_catagory = Session.get("subCatagory");
    var start_date = new Date(Session.get("srartDate"));
    var due_date = new Date(Session.get("dueDate"));

    if (catagory != null && sub_catagory != null && start_date != null && due_date != null) {
        return new AR(null, null, catagory, sub_catagory, null, null, start_date, due_date, null);
    } else {
        return null;
    }

}

function set_owner(field_name){
    var curr_ar = init_curr_ar();
    if (curr_ar != null) {

        console.log(curr_ar);

        Meteor.call('get_owners', curr_ar, function(error, result){
            var options = result.slice();
            console.log($('[name="'+field_name+'"]').attr("id"));
            var s = $("<select id=\""+$('[name="'+field_name+'"]').attr("id")+"\" name=\""+field_name+"\" data-schema-key=\""+field_name+"\" autocomplete=\"off\" class=\"form-control\" />");
            options.forEach(function(e){
                $("<option />", {value: e.name, text: e.name}).appendTo(s);
                // console.log(e);
            });

            //

            var div = $('[name="'+field_name+'"]').parent('div');
            $('[name="'+field_name+'"]').remove();
            div.append(s);


        });

    }
}

Template.ARAdd.helpers({
    ars() {
        return Ars;
    },
    userschema() {
        return userSchema;
    }
});
