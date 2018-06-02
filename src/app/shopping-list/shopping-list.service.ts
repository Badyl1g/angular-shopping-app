import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Tomato', 1),
    new Ingredient('Cheese', 2)
  ];

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
    // return this.ingredients; // giving a reference to this array will make the app aware of changes in it
  }

  addIngredient(ingredient: Ingredient) {
    if (this.ingredients.filter(ing => ing.name === ingredient.name).length > 0) {
      this.ingredients.forEach((ing, index) => {
        if (ing.name === ingredient.name) {
          this.ingredients[index].amount = +this.ingredients[index].amount + +ingredient.amount;
          this.ingredientsChanged.next(this.ingredients.slice());
        }
      });
    } else {
      this.ingredients.push(ingredient);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }

  addIngredients(ingredients: Ingredient[]) {
    let mergedIngredients = [...this.ingredients];

    let used = [];
    for (let usedIng of this.ingredients) {
      used.push(usedIng.name);
    }

    ingredients.map((given, index) => {
      if (used.includes(given.name)) {
        let found = mergedIngredients
          .find(item => item.name === given.name);
        found.amount += given.amount;
      } else {
        mergedIngredients.push(given);
      }
    })

    this.ingredients = [...mergedIngredients];
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    // if (this.ingredients.filter(ing => ing.name === newIngredient.name).length > 0) {
    //   this.ingredients.forEach((ing, index) => {
    //     if (ing.name === newIngredient.name) {
    //       this.ingredients[index].amount = +this.ingredients[index].amount + +newIngredient.amount;
    //     }
    //   })
    // } else {
      this.ingredients[index] = newIngredient;
    // }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}