import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth/auth-guard.service";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'/*, canLoad: [ AuthGuard ] */},
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}