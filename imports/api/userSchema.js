export const userSchema = new SimpleSchema({
    employee_id: {
        type: String,
        label: "WWID",
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
        label: "Location",
        allowedValues: ["Haifa","PTK", "USA"]
    },
    email_adress: {
        type: String,
        label: "Email",
    },
    qualifications: {   
        type: String,
        label: "Qualifications - Category",
        allowedValues: ["Services","KPIs","HW", "Marketing", "All", "TEMP"]
    },
    sub_qualifications: {   
        type: String,
        label: "Qualifications - Sub Category",
        allowedValues: ["Thermal", "DP", "Regulatory", "TpT", "Methodology", "Tools", "MAC", "PHY", "Power", "Coex", "Uploads"]
    },
    /*group_name: {
        type: String,
        label: "Group Name",
        optional: true
    },*/
    Permission: {   
        type: String,
        label: "Permission Type",
        allowedValues: ["Manager","Staff","Maintenance manager","System lead","Engineer"]
    },
});
Meteor.users.attachSchema(userSchema);