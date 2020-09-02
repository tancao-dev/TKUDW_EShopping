import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User } from "../models/user";
import { AuthenticationService } from "./authentication.service";

@Injectable({ providedIn: "root" })
export class UserService {
  user =  new User();
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
  this.authService.currentUser.subscribe(res => {
    this.user = res;
  });
  }
  url = `${environment.apiUrl}/user`;
  // getAll() {
  //     return this.http.get<any>(`${environment.apiUrl}/`);
  // }

  postGetCart() {
    console.log(this.user);
    let body = { idtaikhoan: this.user.id };
    return this.http.post<any>(`${this.url}/cart`, body);
  }

  postGetCartId() {
    console.log(this.user);
    let body = { idtaikhoan: this.user.id };
    return this.http.post<any>(`${this.url}/cartId`, body);
  }
  postCheckout() {
    let body = { id: this.user.id };
    return this.http.post<any>(`${this.url}/checkout`, body);
  }

  postAddRecipient(body) {
    body.idtaikhoan = this.user.id;
    return this.http.post<any>(`${this.url}/checkout`, body);
  }

  postAddProductToCart(idsp, idgh) {
    console.log(this.user);
    let body = { idtaikhoan: this.user.id, idsanpham: idsp};
    return this.http.post<any>(`${this.url}/product/add`, body);
  }

  postDeleteProductFromCart(idsp, idgh) {
    let body = { idsanpham: idsp, idgiohang: idgh };
    return this.http.post<any>(`${this.url}/product/delete`, body);
  }

  getRecipients() {
    return this.http.get<any>(`${this.url}/${this.user.id}/recipients`);
  }

  postPaid(id) {
    let body = { idgiohang: id };
    return this.http.post<any>(`${this.url}/paid`, body);
  }
  
  // getById(id: number) {
  //     return this.http.get<any>(`${environment.apiUrl}/users/${id}`);
  // }
}
