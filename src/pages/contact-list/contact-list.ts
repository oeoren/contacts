import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Contact } from '../../models/contact';
import { Contacts } from '../../providers/contact';

@IonicPage()
@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactListPage {
  currentContacts: Contact[];
  currentContact: Contact;
  currentIndex: Number;
  currentPage: Number;
  pageSize: Number;
  filter: string;
  pendingRefresh: boolean;

  initContacts() {
    this.currentContacts = [];
    this.currentPage = 1;
    this.pageSize = 40;
    this.filter = null;
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public contacts: Contacts) {
    this.initContacts();
    this.pendingRefresh = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactListPage');
  }

  loadContacts(){
   if (this.pendingRefresh) {
      this.contacts.query({
        filter: this.filter,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).subscribe(
        data => { this.currentContacts = data }
        );
      this.pendingRefresh = false;
    };
  }

  ionViewDidEnter() {
    this.loadContacts();
  }

  deleteCallback(contact: Contact) {
     const index: number = this.currentContacts.indexOf(<Contact>
    contact);
    if (index !== -1) {
    this.currentContacts.splice(index, 1);
    }
  }

  open(contact: Contact) {
    new Promise((resolve, reject) => {
        this.navCtrl.push('ContactEditPage', { contact: contact, resolve: resolve });
    }).then(deletedContact => {
        this.deleteCallback(<Contact>
            deletedContact);
    });
  }
  add() {
        this.navCtrl.push('ContactAddPage');
        this.pendingRefresh = true;
  }

  searchContacts(ev) {
    this.initContacts();
    this.filter = ev.target.value;
    this.pendingRefresh = true;
    this.loadContacts();
  }

  doRefresh(refresher) {
    console.log('DoRefresh');
    this.currentPage = 1;
    this.contacts.query(
        { pageNo: this.currentPage, pageSize: this.pageSize, filter: this.filter }
    ).subscribe(data => {
        this.currentContacts =  data;
        refresher.complete();
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.currentPage = +this.currentPage + 1;

    this.contacts.query(
      { pageNo: this.currentPage, pageSize: this.pageSize, filter: this.filter }
    ).subscribe(data => {
        this.currentContacts.push.apply(this.currentContacts, data);
        console.log('Async operation has ended');
        infiniteScroll.complete();
    });
  }
}
