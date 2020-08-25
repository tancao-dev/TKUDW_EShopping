import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GeneralService } from "src/app/services/general.service";
import { Location } from '@angular/common';

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  id = 0;
  product: any;
  category = "";
  listCategory = [];
  instock = true;
  constructor(
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.generalService.getAllCategory().subscribe(res => {
      this.listCategory = res;
    });
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.generalService.getProductDetailsById(this.id).subscribe((res) => {
      if (res) {
        this.product = res[0];
        this.category = this.listCategory[this.product.idnhomsanpham-1].ten;
        this.instock = (this.product.tinhtrang > 0) ? true : false;
      }
    });
  }

  goBack(){
    this.location.back();
  }
}
