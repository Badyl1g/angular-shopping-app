import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { map } from "rxjs/operators";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {

  url = 'https://ng-shopping-app-6c662.firebaseio.com/';

  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put(
      this.url + 'recipes.json?auth=' + token, 
      this.recipeService.getRecipes()
    );
  }

  fetchRecipes() {
    const token = this.authService.getToken();

    this.http.get(this.url + 'recipes.json?auth=' + token)
      .pipe(map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }))
      .subscribe(
        (recipes: Recipe[]) => this.recipeService.setRecipes(recipes)
      );
  }

}