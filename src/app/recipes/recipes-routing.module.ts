import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeExists } from "./recipe-exist-guard.service";
import { AuthGuard } from "../auth/auth-guard.service";

const recipeRoutes: Routes = [
  // { path: 'recipes', component: RecipesComponent, children: [
  { path: '', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent, canActivate: [ AuthGuard ] },
    { path: ':name', component: RecipeDetailComponent, canActivate: [ RecipeExists ] },
    { path: ':name/edit', component: RecipeEditComponent, canActivate: [ AuthGuard, RecipeExists ] }
  ] },
]

@NgModule({
  imports: [ RouterModule.forChild(recipeRoutes) ],
  exports: [ RouterModule ]
})
export class RecipesRoutingModule {}