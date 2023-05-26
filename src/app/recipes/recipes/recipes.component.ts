import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipeId!: string | null;
  $recipeIdSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.$recipeIdSubscription = this.activatedRoute.paramMap.subscribe(
      (paramMap) => {
        this.recipeId = paramMap.get('id');
        //fetch recipe data -- fetch(id);
      }
    );
  }

  ngOnDestroy() {
    this.$recipeIdSubscription.unsubscribe();
  }

  fetchRecipe(id: string) {

  }

}
