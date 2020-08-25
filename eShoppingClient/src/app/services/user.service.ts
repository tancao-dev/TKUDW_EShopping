import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private authService: AuthenticationService) { }
    url = `${environment.apiUrl}/user`;
    user = this.authService.currentUserValue;
    // getAll() {
    //     return this.http.get<any>(`${environment.apiUrl}/`);
    // }

    postGetCart() {
        let body = {id: this.user.id};
        return this.http.post<any>(`${this.url}/cart`,body);
    }

    postCheckout() {
        let body = {id: this.user.id};
        return this.http.post<any>(`${this.url}/checkout`,body);
    }

    // getById(id: number) {
    //     return this.http.get<any>(`${environment.apiUrl}/users/${id}`);
    // }
}