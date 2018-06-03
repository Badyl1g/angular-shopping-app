import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { RecipeService } from "./recipe.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class RecipeExists implements CanActivate {

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    const name = route.params['name'];
    const recipe = this.recipeService.getRecipe(name);

    if (typeof recipe === 'undefined') {
      this.router.navigate(['/recipes']);
      return false;
    } else {
      return true;
    }

  }

}