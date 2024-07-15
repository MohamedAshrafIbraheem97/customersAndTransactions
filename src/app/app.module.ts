import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { TransactionGraphComponent } from './components/transaction-graph/transaction-graph.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { HttpRequestInterceptor } from './http-request.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CustomerTableComponent,
    TransactionGraphComponent,
    TransactionsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    HttpClientModule,
    FormsModule,    
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
