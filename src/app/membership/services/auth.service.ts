import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@membership/models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser: any;
  private _registerUrl = 'api/auth/signup';
  private _loginUrl = 'api/auth/signin';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get currentUser() {
    return this._currentUser;
  }

  set currentUser(user: any) {
    this._currentUser = user;
  }

  register(user: User) {
    return this.http.post(this._registerUrl, user);
  }

  login(body: any) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    return this.http.post(this._loginUrl, body);
  }

  loggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  getCurrentUser() {
    return this.http.get('api/user/me').pipe(
      tap(data => {
        this.currentUser = data;
      })
    );
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  saveToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.currentUser = null;
    this.router.navigate(['/']);
  }
}
