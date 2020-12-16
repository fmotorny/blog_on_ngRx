import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterRequestInterface} from '../shared/types/registerRequest.interface';
import {Observable} from 'rxjs';
import {CurrentUserInterface} from '../shared/types/currentUser.interface';
import {environment} from '../../environments/environment';
import {AuthResponseInterface} from '../shared/types/authResponse.interface';
import {map} from 'rxjs/operators';
import {LoginRequestInterface} from '../shared/types/loginRequest.interface';
import {CurrentUserInputInterface} from '../shared/types/currentUserInput.interface';

@Injectable()
export class AuthService {
  constructor(public http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(environment.apiUrl + '/users', data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(environment.apiUrl + '/users/login', data)
      .pipe(map(this.getUser));
  }


  getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http.get(environment.apiUrl + '/user').pipe(map(this.getUser));
  }

  updateCurrentUser(currentUserInput: CurrentUserInputInterface): Observable<CurrentUserInterface> {
    return this.http.put(environment.apiUrl + '/user', currentUserInput).pipe(map(this.getUser));
  }
}
