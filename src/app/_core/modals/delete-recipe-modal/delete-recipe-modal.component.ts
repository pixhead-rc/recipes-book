import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalState, Modals } from '../../models/modals';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { ModalService } from '../../services/modal.service';
import { enterContainerFromBottom } from 'src/app/_helper/animations';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'delete-recipe-modal',
  templateUrl: './delete-recipe-modal.component.html',
  styleUrls: ['./delete-recipe-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  animations: [
    enterContainerFromBottom
  ],
})
export class DeleteRecipeModalComponent implements OnInit {
  modalStateSub$!: Subscription | undefined;
  modalState!: ModalState;

  recipeId!: string;
  
  constructor(
    private modalService: ModalService,
    private recipesService: RecipesService
  ) { }

  ngOnInit() {
    this.modalStateSub$ = this.modalService.getModalState(Modals.DeleteRecipeModal)?.subscribe(
      ms => {
        this.modalState = ms;
        this.recipeId = ms.context.get('id')
      }
    );
  }

  ngOnDestroy() {
    this.modalStateSub$?.unsubscribe();
  }

  deleteRecipe() {
    this.recipesService.deleteRecipe(this.recipeId);
    this.closeSelf();
  }

  closeSelf() {
    this.modalService.closeModal(Modals.DeleteRecipeModal);
  }

}
