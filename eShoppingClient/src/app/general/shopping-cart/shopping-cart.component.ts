import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { UserService } from "src/app/services/user.service";
import { GeneralService } from "src/app/services/general.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent implements OnInit {
  products = [];
  idgiohang = -1;
  total = 0;
  constructor(
    private _location: Location,
    private userService: UserService,
    private generalService: GeneralService,
    private router: Router,
    private route: ActivatedRoute,
    private ms: ToastrService
  ) {
    this.getCartId();
    this.getProducts();
  }

  ngOnInit() {}

  getProducts() {
    this.total = 0;
    this.userService.postGetCart().subscribe((res) => {
      if (res) {
        console.log(res);
        this.products = res.data;
        res.data.map((e) => {
          this.total += e.giabanhienhanh;
        });
      }
    });
  }

  getCartId() {
    this.userService.postGetCartId().subscribe((res) => {
      if (res) {
        if (res.data) {
          this.idgiohang = res.data.id;
        }
      } else {
      }
    });
  }

  backToShopping() {
    this._location.back();
  }

  deleteProductFromCart(idsp) {
    console.log(idsp);
    this.userService
      .postDeleteProductFromCart(idsp, this.idgiohang)
      .subscribe((res) => {
        if (res) {
          this.ms.success("Xóa sản phẩm thành công");
          this.getProducts();
        }
      });
  }
}
