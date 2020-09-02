import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "./authentication.service";

@Injectable({ providedIn: "root" })
export class GeneralService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}
  url = `${environment.apiUrl}/general`;
  private id = -1;
  // user = this.authService.currentUserValue;
  getAllCategory() {
    return this.http.get<any>(`${this.url}/categories`);
  }

  getProductsByCategory(id) {
    return this.http.get<any>(`${this.url}/${id}/products`);
  }
  signup(body) {
    body.tinhtrang = 1;
    body.vaitro = 0;
    return this.http.post<any>(`${this.url}/signup`, body);
  }
  getProductDetailsById(id) {
    return this.http.get<any>(`${this.url}/product/${id}`);
  }
  setId(id) {
    this.id = id;
  }
  getId() {
    return this.id;
  }
  // postGetCart() {
  //     let body = {id: this.user.id};
  //     return this.http.post<any>(`${this.url}/cart`,body);
  // }

  // postCheckout() {
  //     let body = {id: this.user.id};
  //     return this.http.post<any>(`${this.url}/checkout`,body);
  // }

  // getById(id: number) {
  //     return this.http.get<any>(`${environment.apiUrl}/users/${id}`);
  // }
}
