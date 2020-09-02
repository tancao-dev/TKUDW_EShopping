import { Component, OnInit } from "@angular/core";
import { GeneralService } from "../services/general.service";
import { AuthenticationService } from "../services/authentication.service";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../services/user.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  id = -1;
  products = [];
  category = "";
  idgiohang = -1;
  constructor(
    private userService: UserService,
    private generalService: GeneralService,
    private authenticationService: AuthenticationService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private ms: ToastrService
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
    this.userService.postGetCartId().subscribe((res) => {
      if (res) {
        console.log(res);
        this.idgiohang = res.data.id;
      } else {
      }
    });
  }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get("category");
  }

  goToProductDetails(id) {
    this.router.navigate([`/category/${this.category}/${id}`]);
  }

  addProductToCart(idsp) {
    this.userService.postAddProductToCart(idsp, this.idgiohang).subscribe(res => {
      if (res) {
        this.ms.success("Thêm sản phẩm thành công");
      }
    })
  }
}
