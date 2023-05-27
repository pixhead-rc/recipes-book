import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../_core/pipes/pipes.module';
import { EditRecipeModalComponent } from "../_core/modals/edit-recipe-modal/edit-recipe-modal.component";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipeViewComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RecipesRoutingModule,
        PipesModule,
        EditRecipeModalComponent
    ]
})
export class RecipesModule { }
