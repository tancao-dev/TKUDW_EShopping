import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GeneralService } from "src/app/services/general.service";
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

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
  idgiohang = -1;
  constructor(
    private generalService: GeneralService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private ms: ToastrService
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
    this.getCartId();
  }

  getCartId() {
    this.userService.postGetCartId().subscribe((res) => {
      if (res) {
        console.log(res);
        this.idgiohang = res.data.id;
      } else {
      }
    });
  }

  addProductToCart() {
    this.userService.postAddProductToCart(this.id, this.idgiohang).subscribe(res => {
      if (res) {
        this.ms.success("Thêm sản phẩm thành công");
      }
    })
  }

  goBack(){
    this.location.back();
  }
}
