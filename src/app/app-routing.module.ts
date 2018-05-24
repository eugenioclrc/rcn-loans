import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App Component
import { OpenLoansComponent } from './views/open-loans/open-loans.component';
import { MyLoansComponent } from './views/my-loans/my-loans.component';
import { ProfileComponent } from './views/profile/profile.component';

import { LoanDetailComponent } from './views/loan-detail/loan-detail.component';
import { DetailTableComponent } from './views/loan-detail/detail-table/detail-table.component';
import { DetailCosignerComponent } from './views/loan-detail/detail-cosigner/detail-cosigner.component';
import { DetailIdentityComponent } from './views/loan-detail/detail-identity/detail-identity.component';
import { DecentralandCosignerComponent } from './views/loan-detail/detail-cosigner/decentraland-cosigner/decentraland-cosigner.component';
import { DecentralandMapComponent } from './views/loan-detail/detail-cosigner/decentraland-cosigner/decentraland-map/decentraland-map.component';

const appRoutes: Routes = [
  { path: 'requests', component: OpenLoansComponent },
  { path: 'loan/:id', component: LoanDetailComponent },
  { path: 'my-loans', component: MyLoansComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '',
    redirectTo: '/requests',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{ enableTracing: false })],
  declarations: [RouterModule]
})
export class AppRoutingModule { }

