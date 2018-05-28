import {
  Component,
  Input,
  Directive,
  HostBinding,
  HostListener
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Directive({
  selector: '[appOpacityOut]',
  animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class OpacityOutDirective {
  @HostBinding('class.fadeToggle') isToggled = false;

  @HostListener('click') toggleOpen() {
    this.isToggled = !this.isToggled;
  }

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
  }
}
