import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { first } from "rxjs/operators";
import { MatDialog } from "@angular/material";
import { ModalComponent } from "../helpers/modal/modal.component";
import { UserInfo } from "../models/userInfo.model";
import { ToastrService } from "ngx-toastr";
import { GeneralService } from "../services/general.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  user: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    public ms: ToastrService,
    private generalService: GeneralService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      tendangnhap: ["", Validators.required],
      matkhau: ["", Validators.required],
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }
    this.authenticationService
      .login(this.f.tendangnhap.value, this.f.matkhau.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.router.navigate([""]);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      autoFocus: false,
      panelClass: "trend-dialog",
      width: "360px",
      height: "auto",
      data: {
        tendangnhap: this.user.tendangnhap,
        matkhau: this.user.matkhau,
        hoten: this.user.hoten,
        ngaysinh: this.user.ngaysinh,
        CMND: this.user.CMND,
        diachi: this.user.diachi,
        email: this.user.email,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let t = 0;
        Object.values(res).forEach((e) => {
          if (e == null) {
            t = 1;
            return;
          }
        });
        if (t === 0) {
          this.user = res;
          this.user.ngaysinh = new Date(this.user.ngaysinh);
          this.generalService.signup(this.user).subscribe((res) => {
            if (res) {
              this.ms.success("Tạo tài khoản thành công");
              this.authenticationService
                .login(this.user.tendangnhap, this.user.matkhau)
                .pipe(first())
                .subscribe(
                  (data) => {
                    this.loading = false;
                    this.router.navigate([""]);
                  },
                  (error) => {
                    this.error = error;
                    this.loading = false;
                  }
                );
            }
          });
        } else {
          this.ms.error("Vui lòng điền đủ thông tin");
          return;
        }
      }
    });
  }
}
