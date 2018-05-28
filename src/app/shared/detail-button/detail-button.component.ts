import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition, query, animateChild} from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Loan } from './../../models/loan.model';

import { MaterialModule } from './../../material/material.module';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-detail-button',
  templateUrl: './detail-button.component.html',
  styleUrls: ['./detail-button.component.scss'],
  animations: [
    trigger('divState', [
      state('inactive', style({
        opacity: '1',
        transform: 'scale(1)'
      })),
      state('active',   style({
        opacity: '0',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate(300)),
      transition('active => inactive', animate(300))
    ])
  ]
})
export class DetailButtonComponent {
  state = 'inactive';
  constructor(private router: Router, public snackBar: MatSnackBar) { }
  @Input() loan: Loan;

  onAnimate() {
    this.state === 'inactive' ? this.state = 'active' : this.state = 'inactive';
  }

  handleDetail() {
    this.router.navigate(['/loan/', this.loan.id]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });
  }
  /*
  openSnackBar(message: any, action: any) {
    this.snackBar.open(this.loan.amount , this.loan.borrowerShort, {
      duration: 4000,
    });
  }
  */
}


