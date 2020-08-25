import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ContactComponent } from "./contact/contact.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: "", component: ContactComponent },
  { path: "cart", component: ShoppingCartComponent },
  { path: "checkout", component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
