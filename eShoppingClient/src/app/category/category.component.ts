import { Component, OnInit } from "@angular/core";
import { GeneralService } from "../services/general.service";
import { AuthenticationService } from "../services/authentication.service";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  id = -1;
  products = [];
  category = "";
  constructor(
    private generalService: GeneralService,
    private authenticationService: AuthenticationService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.generalService.getId();
    if (this.id > 0) {
      this.generalService.getProductsByCategory(this.id).subscribe((res) => {
        if (res) {
          this.products = res;
        }
      });
    } else {
      this.location.back();
    }
  }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get("category");
  }

  goToProductDetails(id) {
    this.router.navigate([`/category/${this.category}/${id}`]);
  }

  addProductToCart(id) {
    
  }
}
