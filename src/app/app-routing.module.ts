import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { TransactionGraphComponent } from './components/transaction-graph/transaction-graph.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerTableComponent },
  { path: 'transactions/:id', component: TransactionGraphComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
