import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { Modals } from '../../models/modals.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'edit-recipe-modal',
  templateUrl: './edit-recipe-modal.component.html',
  styleUrls: ['./edit-recipe-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class EditRecipeModalComponent implements OnInit {
  isModalOpened$!: Observable<boolean> | undefined;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.isModalOpened$ = this.modalService.modalsStates.get(Modals.EditRecipeModal)?.asObservable();
  }

  closeSelf() {
    this.modalService.closeModal(Modals.EditRecipeModal);
  }

}
