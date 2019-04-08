import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {User} from '../interfaces'
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<{token: string, perms:string}> {
    return this.http.post<{token: string, perms:string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token, perms}) => {
            localStorage.setItem('auth-token', token)
            localStorage.setItem('perms', perms)
            this.setToken(token)
          }
        )
      )
  }

  getUserPerms(user: User) {
    return user.perms
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }
}
