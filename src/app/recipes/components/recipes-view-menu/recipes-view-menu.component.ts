import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modals } from 'src/app/_core/models/modals';
import { ModalService } from 'src/app/_core/services/modal.service';

@Component({
  selector: 'recipes-view-menu',
  templateUrl: './recipes-view-menu.component.html',
  styleUrls: ['./recipes-view-menu.component.scss']
})
export class RecipesViewMenuComponent implements OnInit {
  recipeId!: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
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

}
