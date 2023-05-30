import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, Subscription, filter, interval, timer } from 'rxjs';
import { ToastState, ToastTypes } from '../models/toastState';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  private toastsStates: BehaviorSubject<Map<string, ToastState>>  = new BehaviorSubject(new Map(undefined));
  private toasts: Map<string, ToastState> = new Map(undefined);
  private toastsLife: Map<string, number> = new Map(undefined);

  constructor() { 
    this.getCheckTimer().subscribe(
      check => this.checkToasts()
    );
  }

  getCheckTimer(): Observable<number> {
    return interval(1000);
  }

  checkToasts() {
    Array.from(this.toastsLife.entries()).forEach(
      toast => {
        if (toast[1] + 5000 < Date.now()) {
          this.toasts.delete(toast[0]);
          this.toastsLife.delete(toast[0]);
        }
      }
    );
    this.updateStates();
  }

  getToastStates(): Observable<Map<string, ToastState>> {
    return this.toastsStates.asObservable();
  }

  updateStates() {
    this.toastsStates.next(this.toasts);
  }

  success(msg: string) {
    const id = Guid.create().toString();
    this.toasts.set(id, {id: id, type: ToastTypes.Success, message: msg});
    this.toastsLife.set(id, Date.now());
    this.updateStates();
  }

  info(msg: string) {
    const id = Guid.create().toString();
    this.toasts.set(id, {id: id, type: ToastTypes.Info, message: msg});
    this.toastsLife.set(id, Date.now());
    this.updateStates();
  }

  warning(msg: string) {
    const id = Guid.create().toString();
    this.toasts.set(id, {id: id, type: ToastTypes.Warning, message: msg});
    this.toastsLife.set(id, Date.now());
    this.updateStates();
  }

  error(msg: string) {
    const id = Guid.create().toString();
    this.toasts.set(id, {id: id, type: ToastTypes.Error, message: msg});
    this.toastsLife.set(id, Date.now());
    this.updateStates();
  }

  close(id: string) {
    this.toasts.delete(id);
    this.updateStates();
  }

}
