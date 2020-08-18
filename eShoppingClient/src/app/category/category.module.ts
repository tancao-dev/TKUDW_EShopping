import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  imports: [CommonModule, CategoryRoutingModule],
  declarations: [
    CategoryComponent,
    ProductDetailsComponent,
  ],
})
export class CategoryModule {}
