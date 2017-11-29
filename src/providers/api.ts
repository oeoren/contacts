import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
    Api is a generic REST Api handler. 
    At the top of app.module.ts you will need:

        import { Api } from '../providers/api';

    and you need to include Api in your providers array

        @NgModule({
          ..  
          providers: [
            ..
            Api,
            ..
          ]
*/

@Injectable()
export class Api {
  // Change the url if you move your API
      url: string = 'https://swa201403.servicebus.windows.net/Contact';
      static b64User : string = '';
      constructor(public http: Http) {}

setCredentials(userName: string, password) {
        Api.b64User = btoa(userName + ':' + password)
}

getHttpOptions(options?: RequestOptions) {
    if (!options) {
        let headers = new Headers({
        'Authorization': 'Basic ' + Api.b64User,
        'Content-Type': 'application/json'
        });
        options = new RequestOptions({ headers: headers });
    }
    return options;
}
  get(endpoint: string, params?: any, options?: RequestOptions) {
    options = this.getHttpOptions(options);
    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options)
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    options = this.getHttpOptions(options);
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    options = this.getHttpOptions(options);
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    options = this.getHttpOptions(options);
    return this.http.delete(this.url + '/' + endpoint, options);
  }

}
