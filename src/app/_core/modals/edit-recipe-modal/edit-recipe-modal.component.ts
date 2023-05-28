import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { ModalState, Modals } from '../../models/modals';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { enterContainerFromBottom } from 'src/app/_helper/animations';
import { Ingredient, Recipe, Step } from '../../models/recipe';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'edit-recipe-modal',
  templateUrl: './edit-recipe-modal.component.html',
  styleUrls: ['./edit-recipe-modal.component.scss'],
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
export class EditRecipeModalComponent implements OnInit {
  modalStateSub$!: Subscription | undefined;
  modalState!: ModalState;

  currentRecipe!: Recipe;
  recipeForm!: FormGroup;

  recipeId!: string;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private recipesService: RecipesService
  ) { }

  ngOnInit() {
    this.modalStateSub$ = this.modalService.getModalState(Modals.EditRecipeModal)?.subscribe(
      ms => {
        this.modalState = ms;
        if (ms.context && ms.context.get('id')) {
          this.editableRecipeInit(ms.context.get('id'));
        } else {
          this.emptyRecipeInit();
        }
        this.recipeFormRefresh();
      }
    );
  }

  ngDoCheck() {
    this.adjustTextAreas();
  }

  ngAfterViewChecked() {
    this.adjustTextAreas();
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
    this.currentRecipe.ingredients.push(new Ingredient());
    this.currentRecipe.steps.push(new Step());
    this.currentRecipe.steps.push(new Step());
  }

  editableRecipeInit(id: string) {
    this.recipesService.getRecipe(id).subscribe(
      (recipe) => {
        this.currentRecipe = recipe;
      },
      (error) => console.log(error)
    );
  }

  recipeFormRefresh() {
    this.recipeForm = this.formBuilder.group({
      title: [this.currentRecipe.title, [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      duration: [this.currentRecipe.duration, [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(3)]],
      description: [this.currentRecipe.description, [Validators.required, Validators.minLength(5)]],
      ingredients: new FormArray([]),
      steps: new FormArray([])
    });

    this.currentRecipe.ingredients.forEach(
      (ingr) => {     
        (this.recipeForm.controls['ingredients'] as FormArray).push(
          this.formBuilder.group({
            name: [ingr.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
            value: [ingr.value, [Validators.required, Validators.pattern(/^\d+$/)]]
          })
        );
      }
    );

    this.currentRecipe.steps.forEach(
      (step) => {     
        (this.recipeForm.controls['steps'] as FormArray).push(
          this.formBuilder.group({
            value: [step.value, [Validators.required, Validators.minLength(2)]]
          })
        );
      }
    );
  }

  adjustTextAreas() {
    Array.from(document.getElementsByTagName('textarea')).forEach(
      ta => this.textAreaAutoHeight(ta)
    );
  }

  textAreaAutoHeight(e: HTMLTextAreaElement) {
    e.style.height = "0px";
    e.style.height = (e.scrollHeight + 9)+"px";
  }

}
