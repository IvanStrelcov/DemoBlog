import { Injectable } from '@angular/core';
import { Http,
         Response,
         Headers,
         RequestOptions,
         Jsonp }   from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs';

@Injectable()
export class AuthService {
  public listNotebooks: any;
  public oauth_verifier: any;
  public oauthToken: any;
  public oauthTokenSecret: any;
  public oauthAccessToken: any;
  public oauthAccessTokenSecret: any;
  public edamShard: any;
  public edamUserId: any;
  public edamExpires: any;
  public edamNoteStoreUrl: any;
  public edamWebApiUrlPrefix: any;
  private ref: any;
  public oauth: any;
  public options = {
      consumerKey: '1986s399-6189',
      consumerSecret: '1890cccb7fdee5b5',
      signatureMethod : "HMAC-SHA1",
      callbackUrl: 'http://localhost:4200/',
      mode: 'cors',
      // withCredentials: true,
      // allowWithCredentials: true
  };
  constructor(private _http: Http,
              private _jsonp: Jsonp) {
    // this.oauth = OAuth(this.options);
  }

  onAuth(){
    return this._http.get('http://localhost:8080/api/oauth')
               .map(res => {
                 console.log(res);
                 return res.json()})
               .catch(this.handleError)
               .subscribe((res) => {
                 console.log(res);
                 this.oauthTokenSecret = res.oauthTokenSecret;
                 window.localStorage.setItem('oauthTokenSecret', res.oauthTokenSecret);
                 this.oauthToken = res.oauthToken;
                 window.localStorage.setItem('oauthToken', res.oauthToken);
                 this.ref = location.replace(res.result);
                 this.ref.close();
               });
  }

  oauthCallback(){
    console.log('kngkajbrgjbar');
    this.oauthToken = window.localStorage.getItem('oauthToken');
    this.oauthTokenSecret = window.localStorage.getItem('oauthTokenSecret');
    this.oauth_verifier = window.localStorage.getItem('oauth_verifier');
    return this._http.get(`http://localhost:8080/api/oauth_callback?oauth_verifier=${this.oauth_verifier}&oauthToken=${this.oauthToken}&oauthTokenSecret=${this.oauthTokenSecret}`)
               .map(res => res.json())
               .catch(this.handleError)
               .subscribe(res => {
                 console.log('final res with oauth access token', res);
                 this.oauthAccessToken = res.oauthAccessToken;
                 window.localStorage.setItem('oauthAccessToken', res.oauthAccessToken);
                 this.oauthAccessTokenSecret = res.oauthAccessTokenSecret;
                 window.localStorage.setItem('oauthAccessTokenSecret', res.oauthAccessTokenSecret);
                 this.edamShard = res.edamShard;
                 window.localStorage.setItem('edamShard', this.edamShard);
                 this.edamUserId = res.edamUserId;
                 window.localStorage.setItem('edamUserId', this.edamUserId);
                 this.edamExpires = res.edamExpires;
                 window.localStorage.setItem('edamExpires', this.edamExpires);
                 this.edamNoteStoreUrl = res.edamNoteStoreUrl;
                 window.localStorage.setItem('edamNoteStoreUrl', this.edamNoteStoreUrl);
                 this.edamWebApiUrlPrefix = res.edamWebApiUrlPrefix;
                 window.localStorage.setItem('edam_webApiUrlPrefix', this.edamWebApiUrlPrefix);
                 this.getListNotebooks();
               })
  }

  getListNotebooks(){
    this.oauthAccessToken = window.localStorage.getItem('oauthAccessToken');
    return this._http.get(`http://localhost:8080/api/index?oauthAccessToken=${this.oauthAccessToken}`)
      .map(res => res.json())
      .catch(this.handleError)
      .subscribe(res => {
        console.log(res);
        this.listNotebooks = res.listNotebooks;
      })
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
