import { Mongo } from 'meteor/mongo';
 
export const Ars = new Mongo.Collection("ars");

Ars.attachSchema(new SimpleSchema({
    description: {
        type: String,
        label: "AR Description",
        max: 500
    },
    catagory: {
        type: String,
        label: "Category",
        allowedValues: ["Services","KPIs","HW", "Marketing", "All", "TEMP"],
        optional: true
    },
    subCatagory: {
        type: String,
        label: "Sub Category",
        allowedValues: ["Thermal", "DP", "Regulatory", "TpT", "Methodology", "Tools", "MAC", "PHY", "Power", "Coex", "Uploads"],
        optional: true
    },
    srartDate: {
        type: Date,
        label: "Start Date",
        optional: true
    },
    dueDate: {
        type: Date,
        label: "Due Date",
        optional: true
    },
    priorty: {
        type: Number,
        label: "Priorty",
        min: 1,
        max: 5
    },
    owner: {
        type: String,
        label: "Owner",
        optional: true
    },
    seconderyOwner: {
        type: String,
        label: "Secondary Owner",
        optional: true
    },
    status: {
        type: String,
        label: "Status",
        allowedValues: ["Open","WIP", "Done", "Deferred"],
        optional: true
    },
    statusDetails: {
        type: String,
        label: "Status Details",
        optional: true
    },
    comments: {
        type: String,
        label: "Comments",
        optional: true,
        max: 1000
    }
}));