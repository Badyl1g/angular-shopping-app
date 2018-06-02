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
      'Vegan Pizza', 
      'With Tomatos, Jalapeno, Olives and Mushrooms', 
      'https://www.veganricha.com/wp-content/uploads/2016/08/veggie-vegan-pizza-veganricha-5762-1.jpg',
      [
        new Ingredient('Tomato', 2),
        new Ingredient('Jalapeno', 4),
        new Ingredient('Olives', 10),
        new Ingredient('Mushrooms', 3)
      ]
    ),
    new Recipe(
      'Vegan Burger', 
      'Simply the best',
      'http://laurencariscooks.com/1_lcc/wp-content/uploads/2016/08/Black-Bean-Burgers-4-600x600.jpg',
      [
        new Ingredient('Bun', 2),
        new Ingredient('Beans', 1),
        new Ingredient('Tomato', 1),
        new Ingredient('Salad', 3),
        new Ingredient('Vegan Mayo', 1),
        new Ingredient('Paprika Sauce', 1)
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