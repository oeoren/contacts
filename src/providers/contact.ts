import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from './api';
import { Contact } from '../models/contact';

/*

    At the top of app.module.ts you will need:

        import { Contacts } from '../providers/contact';

    and you need to include Contacts in your providers array

    @NgModule({
      ..
      providers: [
        ..
        Contacts,
        ..
      ]
*/


@Injectable()
export class Contacts {
  public contacts: Contact[];
  constructor(public http: Http, public api: Api) {
  }
  query(params?: any) {
    return this.api.get('contact', params)
     .map(
       (resp) => { this.contacts = resp.json(); return resp.json();}
      );
  }

  add(item: Contact) {
        let body = JSON.stringify(item);
    var ret = this.api.post('contact', body)
      .map(
        res => res.json()
      );
    return ret;
  }

  update(item: Contact) {
    let body = JSON.stringify(item);
    var ret = this.api.put('contact/' + item.id, body)
      .map(
        res => res.json()
      );
    return ret;
  }

  delete(item: Contact) {
    var ret = this.api.delete('contact/' + item.id)
      .map(
      res => res.json()
      );
    return ret;
  }
}
