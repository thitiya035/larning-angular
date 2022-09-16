import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:3000/users';

  getUser(id:number):Observable<UserProfile> {
      return this.http.get<UserProfile>(`${this.url}/${id}`);
  }

  getUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.url);
  }

  addUser(user: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.url, user);
  }

  updateUser(user: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.url}/${user.id}`, user);
  }
  deleteUser(id: number): Observable<unknown> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
