import { Component, OnInit }  from '@angular/core';
import { AuthService } from './services/service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public oauth_token_secret: any;
  private evernoteHostName: string = 'https://sandbox.evernote.com';
  constructor(private _authService: AuthService){
  }

  ngOnInit(){
    this.onAuth();
  }

  onAuth(){
    if(!window.localStorage.getItem('oauthToken') && !window.localStorage.getItem('oauthTokenSecret')) {
      this._authService.onAuth();
    }
    if(window.localStorage.getItem('oauthToken') && window.localStorage.getItem('oauthTokenSecret') && window.localStorage.getItem('oauth_verifier') && !window.localStorage.getItem('oauthAccessToken')) {
      this._authService.oauthCallback();
    }
    if(window.localStorage.getItem('oauthAccessToken')){
      this._authService.getListNotebooks();
    }
  }
}
