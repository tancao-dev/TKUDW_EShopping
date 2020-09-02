import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Role } from "src/app/models/role";
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  currentUser: User;
  categoryList = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private generalService: GeneralService
  ) {
    this.authenticationService.currentUser.subscribe((x) => {
      if (x) {
        this.currentUser = x;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  ngOnInit() {
    this.generalService.getAllCategory().subscribe(res => {
      if (res) {
        this.categoryList = res;
      } 
    })
  }

  // get isAdmin() {
  //   return this.currentUser && this.currentUser.role === Role.Admin;
  // }

  setId(id) {
    this.generalService.setId(id);
  }

  goToCategory(id) {
    this.setId(id);
    this.router.navigate(["/category/accessories"]);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
