import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RecipesRoutingModule
  ],
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipeViewComponent
  ]
})
export class RecipesModule { }
