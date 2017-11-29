import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Api } from '../../providers/api';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  showLogin:boolean = true;
  password:string = 'test';
  name:string = 'test';
  versionNumber: string = '0.1.1';
  loginForm: FormGroup;
  doAuthorize: boolean = true;

  constructor(public navCtrl: NavController, public api: Api,
     public alertController: AlertController, public loadingController:LoadingController,
     public platform: Platform,
     public formBuilder: FormBuilder,
     public tabsPage: TabsPage)
  {
    this.loginForm = formBuilder.group({
      name: [ this.name, Validators.required ],
      password: [this.password]
    })

  };



  doLogin() {
    this.name = this.loginForm.value.name;
    this.password = this.loginForm.value.password;
    if (!this.doAuthorize) {
      this.navCtrl.push(TabsPage);
    } else {
      let loader = this.loadingController.create({
        content: 'Login...',
      });
      loader.present().then(() => {
        this.api.setCredentials(this.name, this.password);
        this.api.get('echo?value=test')
          .subscribe(
          () => {
            console.log('Login OK');
            this.navCtrl.push(TabsPage);
          },
          err => {
            console.log("LoginPage: " + err);
            loader.dismiss();
            let errMsg = (err.status == 401) ? 'Unknown User/Password' : 'Cannot authorize';
            let alert = this.alertController.create({
              title: 'Error',
              subTitle: errMsg ,
              buttons: ['OK']
            });
            alert.present().then(() => {
            })
          },
          () => loader.dismiss()
          )
      })
    }
  }

}