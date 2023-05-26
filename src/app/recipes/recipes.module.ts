import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';

@NgModule({
  imports: [
    CommonModule,
    RecipesRoutingModule
  ],
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipeViewComponent
  ]
})
export class RecipesModule { }
