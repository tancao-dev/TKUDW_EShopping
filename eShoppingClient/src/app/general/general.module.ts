import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GeneralRoutingModule } from "./general-routing.module";
import { ContactComponent } from "./contact/contact.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";

@NgModule({
  imports: [CommonModule, GeneralRoutingModule],
  declarations: [
    ContactComponent,
    ShoppingCartComponent,
  ],
})
export class GeneralModule {}
