import { Component, OnInit } from "@angular/core";
import { User } from "../models/user";
import { UserService } from "../services/user.service";
import { AuthenticationService } from "../services/authentication.service";
import { first } from "rxjs/operators";
import { GeneralService } from '../services/general.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  loading = false;
  currentUser: User;
  categoryList = [];

  constructor(
    private generalService: GeneralService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loading = true;
    this.generalService.getAllCategory().subscribe(res => {
      if (res) {
        this.categoryList = res;
      } 
    })
  }
}
