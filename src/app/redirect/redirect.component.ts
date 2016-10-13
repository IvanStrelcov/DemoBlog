import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { AuthService }       from '../services/service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html'
})
export class RedirectComponent implements OnInit {

  constructor( private _router: Router,
               private _authService: AuthService) { }

  ngOnInit() {
    const arr = this._router.url.match(/oauth_verifier=(.+)&/);
    window.localStorage.setItem('oauth_verifier', arr[1]);
    this._authService.oauthCallback();
    this._router.navigate(['blog']);
  }
}
