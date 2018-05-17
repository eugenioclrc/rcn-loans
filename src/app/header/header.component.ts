import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
// App Component
import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';
import { DialogApproveContractComponent } from '../dialogs/dialog-approve-contract/dialog-approve-contract.component';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { Web3Service, Type } from '../services/web3.service';

// App Component

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  account: string;

  constructor(public dialog: MatDialog, private web3: Web3Service) {}
  @ViewChild('tref', {read: ElementRef}) tref: ElementRef;

  openDialog() {
    if (this.hasAccount) {
      const dialogRef: MatDialogRef<DialogApproveContractComponent> = this.dialog.open(DialogApproveContractComponent, {
        width: '800px'
      });
      dialogRef.componentInstance.autoClose = false;
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    } else {
      if (this.web3.web3Type === Type.Injected) {
        window.open('https://metamask.io/', '_blank');
      } else {
        alert(
          'Couldn\'t get any accounts! Make sure your Ethereum client is unlocked and configured correctly.'
        );
      }
    }
  }
  ngAfterViewInit(): any {}
  ngOnInit() {
    this.web3.getAccount().then((account) => {
      this.account = account;
      console.log(this.account);
    });
  }
  get hasAccount(): boolean {
    return this.account !== undefined;
  }
}


