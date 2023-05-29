import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modals } from 'src/app/_core/models/modals';
import { ModalService } from 'src/app/_core/services/modal.service';
import { ToastsService } from 'src/app/_core/services/toasts.service';

@Component({
  selector: 'recipes-view-menu',
  templateUrl: './recipes-view-menu.component.html',
  styleUrls: ['./recipes-view-menu.component.scss']
})
export class RecipesViewMenuComponent implements OnInit {
  recipeId!: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private toast: ToastsService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      pm => this.recipeId = pm.get('id')
    );
  }

  openEditRecipeModal() {
    this.modalService.openModal(Modals.EditRecipeModal, { id: this.recipeId });
  }

  openDeleteRecipeModal() {
    this.modalService.openModal(Modals.DeleteRecipeModal, { id: this.recipeId });
  }

  test() {
    this.toast.success(new Date().toString());
  }

}
