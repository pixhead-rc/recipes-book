import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/_core/models/recipe';
import { RecipesService } from 'src/app/_core/services/recipes.service';
import { ToastsService } from 'src/app/_core/services/toasts.service';

@Component({
  selector: 'recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  currentRecipe!: Recipe | null;
  recipeId!: string | null;
  $recipeIdSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService
  ) { }

  ngOnInit() {
    this.$recipeIdSubscription = this.activatedRoute.paramMap.subscribe(
      (paramMap) => {
        this.recipeId = paramMap.get('id');
        if (this.recipeId) {
          this.fetchRecipe(this.recipeId);
        }
      }
    );
  }

  ngOnDestroy() {
    this.$recipeIdSubscription.unsubscribe();
  }

  fetchRecipe(id: string) {
    this.recipesService.getRecipe(id).subscribe(
      (recipe) => {
        this.currentRecipe = recipe;
      },
      (error) => {
        this.currentRecipe = null;
      }
    );
  }
}
