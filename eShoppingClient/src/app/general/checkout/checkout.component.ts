import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  submitForm: FormGroup;
  idgiohang = -1;
  giohang = [];
  total = 0;
  isCreateRecipient = true;
  recipientsList = [];
  constructor(
    private userService: UserService,
    private ms: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userService.postGetCartId().subscribe((res) => {
      if (res) {
        console.log(res);
        this.idgiohang = res.data.id;
      }
    });
    this.userService.getRecipients().subscribe((res) => {
      if (res) {
        this.recipientsList = res;
      }
    });
    this.getProducts();
  }

  ngOnInit() {
    this.initForm();
    this.f.nguoinhan.valueChanges.subscribe((value) => {
      if (value) {
        let temp = this.recipientsList.filter((e) => {
          return e.id === value;
        });
        if (temp.length > 0) {
          this.submitForm.patchValue({
            hoten: temp[0].hoten ? temp[0].hoten : null,
            SDT: temp[0].SDT ? temp[0].SDT : null,
            diachi: temp[0].diachi ? temp[0].diachi : null,
            isCreateRecipient: false
          });
          this.submitForm.controls.hoten.disable();
          this.submitForm.controls.SDT.disable();
          this.submitForm.controls.diachi.disable();
          this.submitForm.controls.isCreateRecipient.disable();
        }

      } else {
        this.submitForm.patchValue({
          hoten: null,
          SDT: null,
          diachi: null,
          isCreateRecipient: true
        });
        this.submitForm.controls.hoten.enable();
        this.submitForm.controls.SDT.enable();
        this.submitForm.controls.diachi.enable();
        this.submitForm.controls.isCreateRecipient.enable();
      }
    });
  }

  get f() {
    return this.submitForm.controls;
  }

  initForm() {
    this.submitForm = this.fb.group({
      hoten: [null, Validators.required],
      SDT: [null, Validators.required],
      diachi: [null, Validators.required],
      nguoinhan: {
        value:
          this.recipientsList.length > 0 ? this.recipientsList[0].id : null,
      },
      isCreateRecipient: false,
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.submitForm.invalid) {
      this.ms.error("Thiếu thông tin người nhận kìa bạn ơi");
      this.loading = false;
      return;
    }
    if (this.submitForm.value.isCreateRecipient) {
      let recipient = this.submitForm.value;
      delete recipient.isCreateRecipient;
      delete recipient.nguoinhan;
      this.userService.postAddRecipient(recipient).subscribe(res => {
        console.log(res);
      })
    }
    this.userService.postPaid(this.idgiohang).subscribe(
      (res) => {
        this.loading = false;
        this.router.navigate([""]);
        this.ms.success("Thanh toán thành công rồi bạn nhé ;)");
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  getProducts() {
    this.total = 0;
    this.userService.postGetCart().subscribe((res) => {
      if (res) {
        console.log(res);
        this.giohang = res.data;
        res.data.map((e) => {
          this.total += e.giabanhienhanh;
        });
      }
    });
  }
}
