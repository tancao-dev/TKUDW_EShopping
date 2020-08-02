import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Role } from "src/app/models/role";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe((x) => {
      if (x) {
        this.currentUser = x;
        this.isLoggedIn = true;
        console.log(this.isLoggedIn);
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  ngOnInit() {}

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
