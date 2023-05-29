import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastState, ToastTypes } from '../models/toastState';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  private toastsStates: BehaviorSubject<Map<string, ToastState>>  = new BehaviorSubject(new Map(undefined));
  private toasts: Map<string, ToastState> = new Map(undefined);

  constructor() { }

  getToastStates(): Observable<Map<string, ToastState>> {
    return this.toastsStates.asObservable();
  }

  updateStates() {
    this.toastsStates.next(this.toasts);
  }

  success(msg: string) {
    const id = Guid.create().toString();
    this.toasts.set(id, {id: id, type: ToastTypes.Success, message: msg});
    this.updateStates();
  }

  info(msg: string) {
    const id = Guid.create().toString();
    this.toasts.set(id, {id: id, type: ToastTypes.Info, message: msg});
    this.updateStates();
  }

  warning(msg: string) {
    const id = Guid.create().toString();
    this.toasts.set(id, {id: id, type: ToastTypes.Warning, message: msg});
    this.updateStates();
  }

  error(msg: string) {
    const id = Guid.create().toString();
    this.toasts.set(id, {id: id, type: ToastTypes.Error, message: msg});
    this.updateStates();
  }

  close(id: string) {
    this.toasts.delete(id);
    this.updateStates();
  }

}
