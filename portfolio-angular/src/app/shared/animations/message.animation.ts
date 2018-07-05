import {animate, state, style, transition, trigger} from '@angular/animations';

export const messageTrigger = trigger('messageTrigger', [
  state('show', style({})),
  // transition('void => show', [
  //   style({
  //     opacity: 0
  //   }),
  //   animate(100, style({
  //     opacity: 1
  //   }))
  // ]),
  transition('show => void', animate(500, style({
    opacity: 0
  })))
]);
