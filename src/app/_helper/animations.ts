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