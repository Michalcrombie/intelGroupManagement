import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Ars } from '../api/ars.js';
import { Session } from 'meteor/session';

import './edit_ar_row.html';
import './add-edit-ar-modal.html';


let closeModal = () => {
    $( '#add-edit-ar-modal' ).modal( 'hide' );
    $( '.modal-backdrop' ).fadeOut();
};

Template.addEditArModal.helpers({
    modalType( type ) {
        let arModal = Session.get( 'arModal' );
        if ( arModal ) {
            return arModal.type === type;
        }
    },
    modalLabel() {
        let arModal = Session.get( 'arModal' );

        if ( arModal ) {
            return {
                button: arModal.type === 'edit' ? 'Edit' : 'Add',
                label: arModal.type === 'edit' ? 'Edit' : 'Add an'
            };
        }
    },
    selected( v1, v2 ) {
        return v1 === v2;
    },
    ar() {
        let arModal = Session.get( 'arModal' );

        if ( arModal ) {
            return arModal.type === 'edit' ? Ars.findOne( arModal.ar ) : {
                start: arModal.date,
                end: arModal.date
            };
        }
    }
});


Template.addEditArModal.events({
    'submit form' ( ar, template ) {
        ar.preventDefault();
        let arModal = Session.get( 'arModal' ),
            submitType = arModal.type === 'edit' ? 'editAr' : 'addAr',
            arItem  = {
                description: template.find( '[name="description"]' ).value,
                srartDate: template.find( '[name="srartDate"]' ).value,
                dueDate: template.find( '[name="dueDate"]' ).value,
                catagory: template.find( '[name="catagory"] option:selected' ).value,
                subCatagory: template.find( '[name="subCatagory"] option:selected' ).value,
                priorty: parseInt( template.find( '[name="priorty"]' ).value, 10 ),
                owner: template.find( '[name="owner"]' ).value,
                seconderyOwner: template.find( '[name="seconderyOwner"]' ).value,
                status: template.find( '[name="status"] option:selected' ).value,
                statusDetails: template.find( '[name="statusDetails"]' ).value,
                comments: template.find( '[name="comments"]' ).value,
            };

        if ( submitType === 'editAr' ) {
            arItem._id   = arModal.ar;
        }

        Meteor.call( submitType, arItem, ( error ) => {
            if ( error ) {
                Bert.alert( error.reason, 'danger' );
            } else {
                Bert.alert( `Ar ${ arModal.type }ed!`, 'success' );
                closeModal();
            }
        });
    },
    'click .delete-ar' ( ar, template ) {
        let arModal = Session.get( 'arModal' );
        if ( confirm( 'Are you sure? This is permanent.' ) ) {
            Meteor.call( 'removeAr', arModal.ar, ( error ) => {
                if ( error ) {
                    Bert.alert( error.reason, 'danger' );
                } else {
                    Bert.alert( 'Ar deleted!', 'success' );
                    closeModal();
                }
            });
        }
    }
});
