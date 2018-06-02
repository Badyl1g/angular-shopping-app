import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  // before routing: 
  // selectedRecipe: Recipe;

  constructor(/*private recipeService: RecipeService*/) { }

  ngOnInit() {
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => this.selectedRecipe = recipe
    // );
  }

}
