import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { ModalState, Modals } from '../../models/modals';
import { Observable, Subscription, tap } from 'rxjs';
import { enterContainerFromBottom } from 'src/app/_helper/animations';
import { Ingredient, Recipe, Step } from '../../models/recipe';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'edit-recipe-modal',
  templateUrl: './edit-recipe-modal.component.html',
  styleUrls: ['./edit-recipe-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  animations: [
    enterContainerFromBottom
  ],
})
export class EditRecipeModalComponent implements OnInit {
  modalStateSub$!: Subscription | undefined;
  modalState!: ModalState;

  currentRecipe!: Recipe;
  recipeForm!: FormGroup;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.emptyRecipeInit();
    this.recipeFormInit();

    this.modalStateSub$ = this.modalService.modalsStates.get(Modals.EditRecipeModal)?.asObservable().subscribe(
      ms => {
        this.modalState = ms;
        console.log(ms.context);
      }
    );
  }

  ngOnDestroy() {
    this.modalStateSub$?.unsubscribe();
  }

  closeSelf() {
    this.modalService.closeModal(Modals.EditRecipeModal);
  }

  emptyRecipeInit() {
    this.currentRecipe = new Recipe();
    this.currentRecipe.ingredients.push(new Ingredient());
    this.currentRecipe.steps.push(new Step());
  }

  recipeFormInit() {
    this.recipeForm = this.formBuilder.group({
      title: [this.currentRecipe.title, [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      duration: [this.currentRecipe.duration, [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(3)]],
      description: [this.currentRecipe.description, [Validators.required, Validators.minLength(5), Validators.maxLength(256)]]
    });
  }

}
