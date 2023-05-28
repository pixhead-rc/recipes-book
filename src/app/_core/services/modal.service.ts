import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalState, Modals } from '../models/modals';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalsStates: Map<Modals, BehaviorSubject<ModalState>> = new Map();

  constructor() { 
    Object.values(Modals).forEach(
      m => {
        this.modalsStates.set(+m, new BehaviorSubject<ModalState>({active: true, context: new Map()}));
      }
    );
  }

  openModal(modal: Modals, context: Object = {}) {
    const contextMap = new Map(Object.entries(context));
    this.modalsStates.get(modal)?.next({active: true, context: contextMap});
  }

  closeModal(modal: Modals) {
    this.modalsStates.get(modal)?.next({active: false, context: new Map()});
  }

  closeAllModals() {
    this.modalsStates.forEach(
      ms => ms.next({active: false, context: new Map()})
    );
  }

  getModalState(modal: Modals) {
    return this.modalsStates.get(modal)?.asObservable();
  }

}
