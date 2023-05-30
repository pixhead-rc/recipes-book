import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { ModalState, Modals } from '../../models/modals';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { enterContainerFromBottom } from 'src/app/_helper/animations';
import { Ingredient, Recipe, Step, ValueTypes } from '../../models/recipe';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { RecipesService } from '../../services/recipes.service';
import { ToastsService } from '../../services/toasts.service';
import { Router } from '@angular/router';

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

  recipeId!: string | null;

  get typesArray() {
    return Object.values(ValueTypes);
  }

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private recipesService: RecipesService,
    private toast: ToastsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.modalStateSub$ = this.modalService.getModalState(Modals.EditRecipeModal)?.subscribe(
      ms => {
        this.modalState = ms;
        if (ms.context && ms.context.get('id')) {
          this.recipeId = ms.context.get('id');
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

  saveRecipe() {
    if (this.recipeForm.valid) {
      this.recipesService.saveRecipe(this.recipeForm.value).subscribe(
        response => {
          if (response.status === 200) {
            this.toast.success('Сохранено!');
          }
        }
      );
      this.closeSelf();
    } else {
      this.toast.error('Заполните все обязательные поля!');
    }
  }

  closeSelf() {
    this.recipeId = null;
    this.modalService.closeModal(Modals.EditRecipeModal);
  }

  emptyRecipeInit() {
    this.currentRecipe = new Recipe();
    this.currentRecipe.ingredients.push(new Ingredient({ name: '', value: '', valueType: ValueTypes.Any}));
    this.currentRecipe.steps.push(new Step());
  }

  editableRecipeInit(id: string) {
    this.recipesService.getRecipe(id).subscribe(
      (recipe) => {
        this.currentRecipe = recipe;
      },
      error => console.log(error)
    );
  }

  recipeFormRefresh() {
    this.recipeForm = this.formBuilder.group({
      id: [this.currentRecipe.id],
      date: [this.currentRecipe.date || new Date(Date.now())],
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
            value: [ingr.value, ingr.valueType !== ValueTypes.Any ? [Validators.required, Validators.pattern(/^\d+$/)] : [Validators.pattern(/^\d+$/)]],
            valueType: [ingr.valueType, [Validators.required]]
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

  addInredient() {
    (this.recipeForm.controls['ingredients'] as FormArray).push(
      this.formBuilder.group({
        name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        value: [null, [Validators.pattern(/^\d+$/)]],
        valueType: [ValueTypes.Any, [Validators.required]]
      })
    );
  }

  deleteIngredient(index: number) {
    (this.recipeForm.controls['ingredients'] as FormArray).removeAt(index);
  }

  addStep() {
    (this.recipeForm.controls['steps'] as FormArray).push(
      this.formBuilder.group({
        value: [null, [Validators.required, Validators.minLength(2)]]
      })
    );
  }

  deleteStep(index: number) {
    (this.recipeForm.controls['steps'] as FormArray).removeAt(index);
  }

  updateIngredientValueValidator(index: number) {
    let control = ((this.recipeForm.controls['ingredients'] as FormArray).at(index) as FormGroup);
    if (control.controls['valueType'].value === ValueTypes.Any) {
      control.controls['value'].removeValidators(Validators.required);
      control.controls['value'].updateValueAndValidity();
    } else {
      control.controls['value'].setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
      control.controls['value'].updateValueAndValidity();
    }
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
