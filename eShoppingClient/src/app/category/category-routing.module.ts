import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CategoryComponent } from './category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  { path: "", component: CategoryComponent },
  { path: ":category", component: CategoryComponent},
  { path: ":category/:id", component: ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
