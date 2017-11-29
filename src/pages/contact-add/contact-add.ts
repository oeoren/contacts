import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../models/contact';
import { Contacts } from '../../providers/contact';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contact-add',
  templateUrl: 'contact-add.html',
})
export class ContactAddPage {

contact: Contact;
  addForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              public contacts: Contacts,
              private alertCtrl: AlertController) {
    this.contact = new Contact;
    this.addForm = formBuilder.group({
id: [this.contact.id, [Validators.required, Validators.maxLength(100)]],
first_name: [this.contact.first_name, [Validators.required, Validators.maxLength(100)]],
last_name: [this.contact.last_name, [Validators.required, Validators.maxLength(100)]],
email: [this.contact.email, [Validators.required, Validators.maxLength(100)]],
Company: [this.contact.Company, [Validators.required, Validators.maxLength(100)]],
gender: [this.contact.gender, [Validators.required, Validators.maxLength(100)]],
avatar: [this.contact.avatar, [Validators.required, Validators.maxLength(100)]]
    });
  }
  addContact() {
    this.contact.id = this.addForm.value.id;
    this.contact.first_name = this.addForm.value.first_name;
    this.contact.last_name = this.addForm.value.last_name;
    this.contact.email = this.addForm.value.email;
    this.contact.Company = this.addForm.value.Company;
    this.contact.gender = this.addForm.value.gender;
    this.contact.avatar = this.addForm.value.avatar;

    this.contacts.add(this.contact)
      .subscribe(
      data => {
        this.navCtrl.pop();
      },
      err => {
        let message = 'Error when adding';
        if (typeof err._body != 'undefined') {
          let body = JSON.parse(err._body);
          if (typeof body.Message != 'undefined')
            message = body.Message;
        }
        let addErrorAlert = this.alertCtrl.create({
          title: 'Add',
          subTitle: message,
          buttons: [{
            text: 'OK'
          }
          ]
        });
        addErrorAlert.present();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactAddPage');
  }

}
