import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalState, Modals } from '../models/modals';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalsStates: Map<Modals, BehaviorSubject<ModalState>> = new Map();

  constructor() { 
    Object.values(Modals).forEach(
      m => {
        this.modalsStates.set(+m, new BehaviorSubject<ModalState>({active: true, context: {}}));
      }
    );
  }

  openModal(modal: Modals, context: Object = {}) {
    this.modalsStates.get(modal)?.next({active: true, context: context});
  }

  closeModal(modal: Modals) {
    this.modalsStates.get(modal)?.next({active: false, context: {}});
  }

  closeAllModals() {
    this.modalsStates.forEach(
      ms => ms.next({active: false, context: {}})
    );
  }

}
