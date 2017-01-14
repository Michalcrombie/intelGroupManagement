export const userSchema = new SimpleSchema({
    employee_id: {
        type: String,
        label: "WWID",
        defaultValue: "None"
    },
    first_name: {
        type: String,
        label: "First Name",
        max: 200,
        defaultValue: "None"
    },
    last_name: {
        type: String,
        label: "Last Name",
        optional: true,
        defaultValue: "None"
    },
    office_address: {
        type: String,
        label: "Location",
        allowedValues: ["Haifa","PTK", "USA"],
        defaultValue: "Haifa"
    },
    email_adress: {
        type: String,
        label: "Email",
        defaultValue: "None"
    },
    qualifications: {   
        type: String,
        label: "Qualifications - Category",
        allowedValues: ["Services","KPIs","HW", "Marketing", "All", "TEMP"],
        defaultValue: "Services"
    },
    sub_qualifications: {   
        type: String,
        label: "Qualifications - Sub Category",
        allowedValues: ["Thermal", "DP", "Regulatory", "TpT", "Methodology", "Tools", "MAC", "PHY", "Power", "Coex", "Uploads"],
        defaultValue: "Thermal"
    },
    Permission: {   
        type: String,
        label: "Permission Type",
        allowedValues: ["Manager","Staff","Maintenance manager","System lead","Engineer"],
        defaultValue: "Engineer"
    },
});
Meteor.users.attachSchema(userSchema);