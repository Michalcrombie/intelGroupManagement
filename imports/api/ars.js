import { Mongo } from 'meteor/mongo';
 
export const Ars = new Mongo.Collection("ars");

Ars.attachSchema(new SimpleSchema({
  description: {
    type: String,
    label: "AR description",
    max: 200,
    defaultValue: "description" ,
  },
  srartDate: {
      type: Date,
      label: "Start Date",
      defaultValue: moment().format() ,
  },
  dueDate: {
      type: Date,
      label: "Due Date",
      defaultValue: moment().format() ,
  },
  catagory: {
      type: String,
      label: "catagory",
      allowedValues: ["Services","KPIs","HW"],
      defaultValue:"Services"
  },
  subCatagory: {
      type: String,
      label: "Sub Catagory",
      allowedValues: ["TLC","Thermal","DP"],
      defaultValue:"TLC"
  },
  priorty: {
    type: Number,
    label: "Priorty",
    min: 0,
    defaultValue:0 ,
  },
  owner: {
    type: String,
    label: "Owner",
    defaultValue:"none" ,
  },
  seconderyOwner: {
      type: String,
      label: "Secondery Owner",
      defaultValue:"none" ,
  },
  status: {
      type: String,
      label: "Status",
      allowedValues: ["Open","In process","Done"],
      defaultValue:"Open",
  },
  statusDetails: {
      type: String,
      label: "Status Details",
      defaultValue:"none" ,
  },
  comments: {
    type: String,
    label: "Comments",
    optional: true,
    max: 1000,
    defaultValue:"none" ,
  }
}));