import { Meteor } from 'meteor/meteor';
import { Ars } from '../imports/api/ars.js';
import { Events } from '../imports/api/events.js';
import { Changes } from '../imports/api/changes.js';

Meteor.startup(() => {
    // code to run on server at startup
    Tasks = new Mongo.Collection("tasks");

    smtp = {
        username: 'intelgroupmanagment@gmail.com',
        password: '12345678intel',
        server:   'smtp.gmail.com',
        port: 465
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Meteor.methods({
    insertArs: function(doc) {
        if (doc.owner == Meteor.user().username || Meteor.user().Permission == "Manager"){
            Ars.insert(doc);
            console.log(doc);
            // // Send the e-mail
            Email.send({
                to: Meteor.user().email_adress,
                from: "intelgroupmanagment@gmail.com",
                subject: "Message From Intel WIFI core system architecture ",
                text: "Hello, You got a new AR :"+ doc.description 
            });
        };  
    },
    get_owners: function(curr_ar) {

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

        console.log("running publish");
        var qualified = [];
        Meteor.users.find().fetch().forEach(function(elem) {
            console.log("iterating");
            if (typeof elem.qualifications !== 'undefined') {
                if (elem.qualifications ==  curr_ar.category  || elem.sub_qualifications == curr_ar.sub_category) {
                    //console.log(elem.first_name );
                    qualified.push(elem.username);
                };
            }

        });
        console.log(qualified);
        if (!qualified.isEmpty) {
            // console.log(qualified);
            var tasks = []
            qualified.forEach(function (username) {
                //console.log(qualified);
                var relevant_tasks = [];
                var temp_tasks = Ars.find({owner: username}).fetch();
                // console.log("tasks for " + username);
                //console.log(temp_tasks);
                //console.log(temp_tasks);
                for (j = 0, len = temp_tasks.length; j < len; j++) {
                    var i = temp_tasks[j];

                    if ((i.srartDate > curr_ar.due_date) || (i.dueDate < curr_ar.start_date)) {
                        continue;
                    }

                    else if ((i.srartDate <= curr_ar.start_date) && (i.dueDate <= curr_ar.due_date)) {
                        i.srartDate = curr_ar.start_date;
                        relevant_tasks.push(i);
                    }

                    else if ((i.srartDate >= curr_ar.start_date) && (i.dueDate >= curr_ar.due_date)) {
                        i.dueDate = curr_ar.due_date;
                        relevant_tasks.push(i);
                    }

                    else if ((i.srartDate <= curr_ar.start_date) && (i.dueDate >= curr_ar.due_date)) {
                        i.srartDate = curr_ar.start_date;
                        i.dueDate = curr_ar.due_date;
                        relevant_tasks.push(i);
                    }

                    else if ((i.srartDate >= curr_ar.start_date) && (i.dueDate <= curr_ar.due_date)) {
                        relevant_tasks.push(i);
                    }
                }
                //console.log("relevant tasks for " + username);
                // console.log(relevant_tasks);
                tasks.push(relevant_tasks);

            });
            console.log(tasks);
            function calculate_length(An_AR) {
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var length = 0;
                length = Math.round(Math.abs((An_AR.srartDate.getTime() - An_AR.dueDate.getTime()) / (oneDay)));
                return length;
            }


            var name_weight = [];
            //function for calculate all tasks weight of one employee
            function sum_of_weight(tasks) {
                for (i = 0; i < tasks.length; i++) {
                    var sum = 0;
                    for (j = 0; j < tasks[i].length; j++) {
                        var weight = (calculate_length(tasks[i][j])) * (tasks[i][j].priorty);
                        sum += weight;
                        if (j == (tasks[i].length) - 1) {
                            name_weight.push({name: tasks[i][j].owner, weight: sum});
                        }
                    }
                }
            }

            (sum_of_weight(tasks));

            var name_numOfArs = [];

            function sum_of_ars(tasks) {
                for (i = 0; i < tasks.length; i++) {
                    var count = 0;
                    for (j = 0; j < tasks[i].length; j++) {
                        count++;
                        var x = tasks[i][j].owner;
                    }
                    name_numOfArs.push({name: x, num: count});
                }
                return name_numOfArs;
            }

            sum_of_ars(tasks);

            var final_array = []

            //sort the employees according to they sum
            function best_match(name_numOfArs, name_weight) {
                for (i = 0; i < name_numOfArs.length; i++) {
                    for (t = 0; t < name_weight.length; t++) {
                        if (name_numOfArs[i].name == name_weight[t].name) {
                            var x = (name_numOfArs[i].num) * 10;
                            var final_value = x + name_weight[t].weight;
                            final_array.push({name: name_numOfArs[i].name, weight: final_value});
                        }
                    }
                }
                return final_array;
            }

            best_match(name_numOfArs, name_weight);
            //console.log("final_array")
            //console.log(final_array)

            function sort(final_array) {
                function dynamicSort(property) {
                    var sortOrder = 1;
                    if (property[0] === "-") {
                        sortOrder = -1;
                        property = property.substr(1);
                    }
                    return function (a, b) {
                        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                        return result * sortOrder;
                    }
                }

                final_array.sort(dynamicSort("weight"));
            }

            var final = [];
            var len = final_array.length;
            for (j = (len - 1); j >= 0; j--) {
                final.push(final_array[j].name);
            }



            var returned_array = []
            final_array.forEach(function (elem) {
                returned_array.push(elem.name);
            });
            /*
               console.log(final);
   
               console.log(Meteor.users.find({"username": {"$in": returned_array}}).fetch());
   */
            console.log(final_array);

            function search(nameKey, myArray){
                for (var i=0; i < myArray.length; i++) {
                    if (myArray[i].name === nameKey) {
                        return myArray[i];
                    }
                }
            }

            qualified.forEach(function(user){
                //var result = $.grep(final_array, function(e) {return e.name == user;})
                if (!search(user, final_array)){
                    final_array.push({name: user, weight: 0});
                }

            });

            var unique_final_array = _.uniq(final_array, function(e){return e.name;});
            sort(unique_final_array);
            console.log(unique_final_array);
            return unique_final_array;
        }
        return [];
    },
    insertIntelusers: function(doc) {
        Meteor.users.update({_id: Meteor.userId()}, {$set: doc});
    },
    sendmail(doc) {
        var usersnew = Meteor.users.find();
        usersnew.forEach(function(user){
            if (user.first_name==doc.owner)
            {
                var mail=user.email_adress;
                Email.send({       
                    to: mail,
                    from: "intelgroupmanagment@gmail.com",
                    subject: "Message From Intel WIFI core system architecture ",
                    text: "Hello, Your AR was edited by:"+ Meteor.user().first_name
                })
            }
        });
    },
});

Meteor.methods({
    addEvent( event ) {
        check( event, {
            title: String,
            start: String,
            end: String,
            type: String,
            guests: Number,
            Names_of_external_guests:String
        });

        try {
            return Events.insert( event );
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    },
    editEvent( event ) {
        check( event, {
            _id: String,
            title: Match.Optional( String ),
            start: String,
            end: String,
            type: Match.Optional( String ),
            guests: Match.Optional( Number ),
            Names_of_external_guests: Match.Optional( String )
        });

        try {
            return Events.update( event._id, {
                $set: event
            });
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    },
    removeEvent( event ) {
        check( event, String );

        try {
            return Events.remove( event );
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    },
    //CSV exprt
    download: function() {
        var collection = Ars.find().fetch();
        var heading = true; // Optional, defaults to true
        var delimiter = "," // Optional, defaults to ",";
        return exportcsv.exportToCSV(collection, heading, delimiter);
    }
});


Accounts.onCreateUser(function(options, user) {
    var newFields = {
        employee_id: "",
        first_name: "",
        last_name: "",
        office_address: "",
        email_adress: "",
        qualifications: "",
        sub_qualifications: "",
        Permission:""
    };
    _.extend(user, newFields);
    return user;
});

Meteor.publish(null, function() {

    if (this.userId != null) {
        return Meteor.users.find({
            _id: this.userId
        }, {
            fields: {
                'employee_id':1,
                'first_name': 1,
                'last_name':1,
                'office_address':1,
                'email_adress':1,
                'qualifications':1,
                'sub_qualifications':1,
                'Permission':1,
            },
  
        });
    } else {
        return this.ready();
    }
});


/*
Meteor.publish("qualification.public", function(curr_ar) {

});*/

Ars.find().observe ({
    changed: function (newDocument, oldDocument){
        oldDate=oldDocument.dueDate.valueOf();
        newDate=newDocument.dueDate.valueOf();
        if (oldDate != newDate && oldDocument.owner !== newDocument.owner){
            Changes.insert({ ArID:oldDocument._id,ownerChanged:true , dueDateChanged:true })
        }
        else {
            if (oldDate != newDate){
                Changes.insert({ ArID:oldDocument._id,ownerChanged:false, dueDateChanged:true })
            }
            if (oldDocument.owner != newDocument.owner){
                Changes.insert({ ArID:oldDocument._id,ownerChanged:true , dueDateChanged:false })
            }}
    }})