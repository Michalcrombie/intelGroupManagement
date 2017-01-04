import { Mongo } from 'meteor/mongo';
 
export const Intelusers = new Mongo.Collection("intelusers");

Intelusers.attachSchema(new SimpleSchema({
    employee_id: {
        type: String,
        label: "employee ID",
        optional: true
    },
    first_name: {
        type: String,
        label: "First Name",
        max: 200
    },
    last_name: {
        type: String,
        label: "Last Name",
        optional: true
    },
    office_address: {
        type: String,
        label: "Office address",
        optional: true
    },
    email_adress: {
        type: String,
        label: "Email address",
        optional: true
    },
    qualifications: {   
        type: String,
        label: "Qualifications",
        allowedValues: ["Developer"]
    },
    group_name: {
        type: String,
        label: "Group Name"
    }
}));