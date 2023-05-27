import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Modals } from '../models/modals.enum';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalsStates: Map<Modals, BehaviorSubject<boolean>> = new Map();

  constructor() { 
    Object.values(Modals).forEach(
      m => {
        this.modalsStates.set(+m, new BehaviorSubject<boolean>(false));
      }
    );
  }

  openModal(modal: Modals) {
    this.modalsStates.get(modal)?.next(true);
  }

  closeModal(modal: Modals) {
    this.modalsStates.get(modal)?.next(false);
  }

  closeAllModals() {
    this.modalsStates.forEach(
      ms => ms.next(false)
    );
  }

}
