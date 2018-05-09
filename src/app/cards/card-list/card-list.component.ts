import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { HttpModule, Response } from '@angular/http';
import 'rxjs/Rx';
import { Subject, Observable, Observer, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// App Models
import { Card } from '../card.model';
import { Loan } from './../../models/loan.model';

// App Services
import { CardsService } from '../cards.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { ContractsService } from './../../services/contracts.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})


export class CardListComponent implements OnInit, OnDestroy {
  public cards: Card[] = [
    new Card(1, 'TarjetaNaranja', 'initial', '0xdc...da86', 500, 30, 25, 50),
    new Card(3, 'BankEtiopia', 'blocked', '0xdc...da86', 500, 30, 25, 50),
    new Card(7, 'BorrowerX', 'initial', '0xdc...da86', 500, 30, 25, 50),
    new Card(9, 'BorrowerXX', 'initial', '0xdc...da86', 500, 30, 25, 50)
  ];
  // public loans: Loan[] = [];
  public loans: Loan[] = [];
  allowLendStatus = true; // this tell me if lending fuction is available
  availableLoans = this.cards.length; // this shows me the number of available contracts
  bestLoan = this.cards[0]; // best loan suggested
  customObsSubscription: Subscription;
  constructor(
    private cardsService: CardsService,
    private dataStorageService: DataStorageService,
    private contractsService: ContractsService
  ) {}
  onCreateContract() {
    this.cardsService.createContract.next(this.availableLoans);
    console.log('You have created a contract!');
  }
  updateLoans() {
    this.contractsService.getOpenLoans().then((result: Loan[]) => {
      this.loans = result;
      console.log(this.loans);
      console.log(this.loans[0]);
      setTimeout(function() {
        console.log(this.loans);
      }, 2000);
    });
  }

  ngOnInit() {
    if (this.cards === undefined || this.cards.length === 0) {
      // console.log('cards is empty');
    } else {
      // console.log('Card[] is full of contracts');
    }
  }
   ngOnDestroy() {
    this.customObsSubscription.unsubscribe();
  }

}
