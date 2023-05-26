import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
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
