import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Role } from "src/app/models/role";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  isLoggedIn = false;
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe((x) => {
      if (x) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  ngOnInit() {}
}
