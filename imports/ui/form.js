
import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';

//import { Books } from '../api/books.js';
 
import './form.html';



Books = new Mongo.Collection("books");
Books.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    author: {
        type: String,
        label: "Author"
    },
    copies: {
        type: Number,
        label: "Number of copies",
        min: 0
    },
    lastCheckedOut: {
        type: Date,
        label: "Last date this book was checked out",
        optional: true
    },
    summary: {
        type: String,
        label: "Brief summary",
        optional: true,
        max: 1000
    }
}));


//try- books

Template.form.events({
    'submit .new-book'(event) {
        // Prevent default browser form submit
        event.preventDefault();
 
        // Get value from form element
        //const target = event.target;
        const title = target.title.value;
        const copies = event.copies.value;
 
        // Insert a task into the collection
        Books.insert({
            title,
            copies,
            //lastCheckedOut: new Date(), // current time
            // owner: Meteor.userId(),
            //username: Meteor.user().username,
        });
 
        // Clear form
        //target.title.value = '';
    },
});


/*Meteor.methods({
    'Books.insert': function(data) {

        // generate token
        let token = randtoken.generate(16);
        console.log('token: ' + token);

        // some code here

        return Books.insert({
            // data to insert
        });
    }
});


*/

/*Contacts = new Mongo.Collection('contacts');

if (Meteor.isClient) {
    Forms.mixin(Template.AddContactForm);
}
if (Meteor.isClient) {
    Forms.mixin(Template.AddContactForm);
    Template.AddContactForm.events({
        'documentSubmit': function (e, tmpl, doc) {
            Contacts.insert(doc);
        }
    });
}
*/
/*
books = new Meteor.Collection("books");

if (Meteor.isClient) {

    Template.addBook.events({
        '.submit .addBookForm' : function (e) {
            e.preventDefault();
            books.insert({
                subject: $(".subject").val(),
            });
        }
    });

    Template.bookshell.books = function () {
        return books.find({}, {sort: {subject: 1}});
    };
}*/