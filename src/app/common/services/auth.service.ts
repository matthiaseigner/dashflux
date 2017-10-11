import { Router } from '@angular/router';
// Imports
import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  // Resolve HTTP using the constructor
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get token(): string {
    return localStorage.getItem('token');
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  public login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/senml+json'
    });
    this.http.post(`${environment.API_URL}/tokens`, {
      email: username,
      password
    }, {
        headers
      }).subscribe((re: any) => {
        this.token = re.token;
        this.router.navigateByUrl('');
      });
  }
  public signup(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/senml+json'
    });
    this.http.post(`${environment.API_URL}/users`, {
      email: username,
      password
    }, {
        headers
      }).subscribe((re: any) => {
        console.log(re);
      });
  }

  public getAuthenticatedHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/senml+json',
      'Authorization': this.token
    });
  }

}
