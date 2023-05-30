import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const enterContainerFromBottom = trigger("enterContainerFromBottom", [
  state(
    "void",
    style({
      transform: "translateY(1%)",
    })
  ),
  transition("void <=> *", animate(200)),
]);

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({transform: 'translateY(-100%)'}),
    animate('200ms ease-in', style({transform: 'translateY(0%)'}))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({opacity: 0}))
  ])
]);