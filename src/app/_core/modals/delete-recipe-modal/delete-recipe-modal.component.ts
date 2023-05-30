import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalState, Modals } from '../../models/modals';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { ModalService } from '../../services/modal.service';
import { enterContainerFromBottom } from 'src/app/_helper/animations';
import { RecipesService } from '../../services/recipes.service';
import { ToastsService } from '../../services/toasts.service';
import { Router } from '@angular/router';

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
    private recipesService: RecipesService,
    private toast: ToastsService
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
    this.recipesService.deleteRecipe(this.recipeId).subscribe(
      respose => {
        if (respose.status === 200) {
          this.toast.success(respose.message);
        }
        else {
          this.toast.error(respose.message);
        }
      }
    );
    this.closeSelf();
  }

  closeSelf() {
    this.modalService.closeModal(Modals.DeleteRecipeModal);
  }

}
