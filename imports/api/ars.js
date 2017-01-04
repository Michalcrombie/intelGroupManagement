import { Mongo } from 'meteor/mongo';
 
export const Ars = new Mongo.Collection("ars");

Ars.attachSchema(new SimpleSchema({
  description: {
    type: String,
    label: "AR description",
    max: 200
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
  catagory: {
      type: String,
      label: "catagory",
      allowedValues: ["Services","KPIs","HW"]
  },
  subCatagory: {
      type: String,
      label: "Sub Catagory",
      allowedValues: ["TLC","Thermal","DP"]
  },
  owner: {
    type: String,
    label: "Owner"
  },
  seconderyOwner: {
      type: String,
      label: "Secondery Owner",
      optional: true
  },
  priorty: {
    type: Number,
    label: "Priorty",
    min: 0
  },
  status: {
      type: String,
      label: "Status",
      allowedValues: ["Open","In process","Done"]
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