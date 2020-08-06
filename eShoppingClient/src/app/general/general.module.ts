import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GeneralRoutingModule } from "./general-routing.module";
import { CategoryComponent } from "./category/category.component";
import { ContactComponent } from "./contact/contact.component";

@NgModule({
  imports: [CommonModule, GeneralRoutingModule],
  declarations: [CategoryComponent, ContactComponent],
})
export class GeneralModule {}
