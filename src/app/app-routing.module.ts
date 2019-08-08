import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-management/user-login/user-login.component';
import { NewBankTransactionComponent } from './new-bank-transaction/new-bank-transaction/new-bank-transaction.component';
import { ViewBankTransactionsComponent } from './view-bank-transactions/view-bank-transactions/view-bank-transactions.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouteGuardService } from './route-guard.service';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'new-transaction', component: NewBankTransactionComponent,canActivate:[RouteGuardService] },
  { path: 'view-transaction', component: ViewBankTransactionsComponent,canActivate:[RouteGuardService]  },
  { path: 'home', component: HomePageComponent,canActivate:[RouteGuardService]  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponentComponent,canActivate:[RouteGuardService]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[RouteGuardService]
})
export class AppRoutingModule { }
