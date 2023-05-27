import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { ModalState, Modals } from '../../models/modals';
import { Observable, Subscription, tap } from 'rxjs';

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
  modalStateSub$!: Subscription | undefined;
  modalState!: ModalState;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.modalStateSub$ = this.modalService.modalsStates.get(Modals.EditRecipeModal)?.asObservable().subscribe(
      ms => {
        this.modalState = ms;
        console.log(ms.context);
      }
    );;
  }

  ngOnDestroy() {
    this.modalStateSub$?.unsubscribe();
  }

  closeSelf() {
    this.modalService.closeModal(Modals.EditRecipeModal);
  }

}
