
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
    {path: '', component: ContactComponent},
    {path: 'category/:id', component: CategoryComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class GeneralRoutingModule{}