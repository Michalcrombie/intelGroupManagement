import { Mongo } from 'meteor/mongo';
 
export const Intelusers = new Mongo.Collection("intelusers");

Intelusers.attachSchema(new SimpleSchema({
    employee_id: {
        type: String,
        label: "employee ID",
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
        allowedValues: ["Haifa","Ptah Tikva"]
    },
    email_adress: {
        type: String,
        label: "Email address",
    },
    qualifications: {   
        type: String,
        label: "Qualifications",
        allowedValues: ["Services","KPIs","HW"]
    },
    sub_qualifications: {   
        type: String,
        label: "Sub Qualifications",
        allowedValues: ["TLC","Thermal","DP"]
    },
    group_name: {
        type: String,
        label: "Group Name",
        optional: true
    },
    Permission: {   
        type: String,
        label: "Permission",
        allowedValues: ["Manager","Sub manager","Maintenance manager","System lead","Employee"]
    },
}));