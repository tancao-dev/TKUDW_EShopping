import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../models/user";
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private ms: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    let body = {
      tendangnhap: username,
      matkhau: password
    }
    return this.http
      .post<any>(`${environment.apiUrl}/user/login`, body)
      .pipe(
        map((res) => {
          // login successful if there's a jwt token in the response
          if (res.success) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            this.currentUserSubject.next(res.data);
          } else {
            console.log(res.data);
            this.ms.error(res.data);
            return;
          }

          return res.data;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
