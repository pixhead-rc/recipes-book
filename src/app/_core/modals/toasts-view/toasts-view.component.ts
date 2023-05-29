import { Component, OnInit } from '@angular/core';
import { ToastsService } from '../../services/toasts.service';
import { ToastState } from '../../models/toastState';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'toasts-view',
  templateUrl: './toasts-view.component.html',
  styleUrls: ['./toasts-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ToastsViewComponent implements OnInit {
  toastStatesSub$!: Subscription;
  toasts!: ToastState[];

  constructor(
    private toast: ToastsService
  ) { }

  ngOnInit() {
    this.toastStatesSub$ = this.toast.getToastStates().subscribe(
      ts => this.toasts = Array.from(ts.values())
    );
  }

  ngOnDestroy() {
    this.toastStatesSub$.unsubscribe();
  }

  closeToast(id: string) {
    this.toast.close(id);
  }

}
