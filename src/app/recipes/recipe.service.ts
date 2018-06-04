import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  // before routing: 
  // recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Pizza', 
      'Z pomidorami, jalapeno, oliwkami i pieczarkami', 
      'https://www.veganricha.com/wp-content/uploads/2016/08/veggie-vegan-pizza-veganricha-5762-1.jpg',
      [
        new Ingredient('Pomidor', 2),
        new Ingredient('Jalapeno', 4),
        new Ingredient('Oliwki', 10),
        new Ingredient('Pieczarki', 3)
      ]
    ),
    new Recipe(
      'Burger', 
      'Najlepszy w mieście!',
      'http://laurencariscooks.com/1_lcc/wp-content/uploads/2016/08/Black-Bean-Burgers-4-600x600.jpg',
      [
        new Ingredient('Bułka', 2),
        new Ingredient('Fasola', 1),
        new Ingredient('Pomidor', 1),
        new Ingredient('Sałata', 3),
        new Ingredient('Sos czosnkowy', 1),
        new Ingredient('Sos paprykowo-ziołowy', 1)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice(); // copy, not a reference
    // return [...this.recipes]; // why not this?
  }

  getRecipe(name: string) {
    return this.recipes.find(recipe => recipe.name === name);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(name: string, newRecipe: Recipe) {
    const index = this.recipes.findIndex(r => r.name === name);
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());    
  }

  deleteRecipe(name: string) {
    const index = this.recipes.findIndex(r => r.name === name);
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}