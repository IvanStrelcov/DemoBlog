import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService }            from '../services/service';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html'
})
export class NoContentComponent implements OnInit {

  constructor( private _router: Router,
               private _activatedRoute: ActivatedRoute,
               private _authService: AuthService) { }

  ngOnInit() {
    console.log(this._router);
    console.log(this._activatedRoute);
    const arr = this._router.url.match(/oauth_verifier=(.+)&/);
    console.log(arr);
    window.localStorage.setItem('oauth_verifier', arr[1]);
    this._authService.oauthCallback();
    this._router.navigate(['blog']);
  }

}
