import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../models/contact';
import { Contacts } from '../../providers/contact';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contact-edit',
  templateUrl: 'contact-edit.html',
})
export class ContactEditPage {
  contact: Contact;
  originalContact: Contact;
  editForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              public contacts: Contacts,
              private alertCtrl: AlertController) {
    this.contact = navParams.get('contact');
    this.originalContact = this.contact;
    this.editForm = formBuilder.group({
        id: [this.contact.id, [Validators.required, Validators.maxLength(100)]],
        first_name: [this.contact.first_name, [Validators.required, Validators.maxLength(100)]],
        last_name: [this.contact.last_name, [Validators.required, Validators.maxLength(100)]],
        email: [this.contact.email, [Validators.required, Validators.maxLength(100)]],
        Company: [this.contact.Company, [Validators.required, Validators.maxLength(100)]],
        gender: [this.contact.gender, [Validators.required, Validators.maxLength(100)]],
        avatar: [this.contact.avatar, [Validators.required, Validators.maxLength(100)]]
    });
  }

  updateContact() {
    this.contact.id = this.editForm.value.id;
    this.contact.first_name = this.editForm.value.first_name;
    this.contact.last_name = this.editForm.value.last_name;
    this.contact.email = this.editForm.value.email;
    this.contact.Company = this.editForm.value.Company;
    this.contact.gender = this.editForm.value.gender;
    this.contact.avatar = this.editForm.value.avatar;

    this.contacts.update(this.contact)
      .subscribe(
      data => {
        console.log('update:' + JSON.stringify(data));
        this.navCtrl.pop();
      },
      err => {
        console.log("Error occured.");
        let message = 'Update error';
        if (typeof err._body != 'undefined') {
          let body = JSON.parse(err._body);
          if (typeof body.Message != 'undefined')
            message = body.Message;
        }
        let updateErrorAlert = this.alertCtrl.create({
          title: 'Update error',
          subTitle: message,
          buttons: [{
            text: 'OK'
          }
          ]
        });
        updateErrorAlert.present();
      });

  }
  deleteContact() {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.contacts.delete(this.contact)
              .subscribe(
              data => {
                this.navParams.get('resolve')(this.contact);
                this.navCtrl.pop();
              },
              err => {
                console.log("Error occured.");
                let message = 'Delete error';
                if (typeof err._body != 'undefined') {
                  let body = JSON.parse(err._body);
                  if (typeof body.Message != 'undefined')
                    message = body.Message;
                }
                let deleteErrorAlert = this.alertCtrl.create({
                  title: 'Unable to delete',
                  subTitle: message,
                  buttons: [{
                    text: 'OK'
                   }
                  ]
                });

                deleteErrorAlert.present();
              });
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactEditPage');
  }

   ionViewDidLeave() {
console.log('ionViewDidLeave ContactEditPage');
   }
}
