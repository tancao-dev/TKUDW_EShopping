import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  submitForm: FormGroup
  constructor(
    private userService: UserService,
    private ms: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.submitForm = this.fb.group({
      hoten: [null, Validators.required],
      SDT: [null, Validators.required],
      diachi: [null, Validators.required]
    })
  }
  get f() {
    return this.submitForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.submitForm.invalid) {
      this.loading = false;
      return;
    }
    this.userService
      .postAddRecipient(this.submitForm.value)
      .subscribe(
        (res) => {
          this.loading = false;
          this.router.navigate([""]);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }

}
