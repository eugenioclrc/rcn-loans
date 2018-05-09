import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { CardsComponent } from './cards/cards.component';
import { ImgFluidComponent } from './shared/img-fluid/img-fluid.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  { path: 'allLoans', component: ContentWrapperComponent },
  // { path: 'myLoans', component: ImgFluidComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
  // constructor(private router: Router) {
  //   this.router.errorHandler = (error: any) => {
  //       this.router.navigate(['404']); // or redirect to default route
  //   };
  // }
}
