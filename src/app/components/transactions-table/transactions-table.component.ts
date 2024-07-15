import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer.model';
import { Transaction } from 'src/app/models/transaction.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  ngOnInit(): void {
    this.dataService.getTransactions().subscribe(transactions => this.transactions = transactions);

  }
  constructor(private dataService : DataService) {}
  transactions: Transaction[] = [];

  displayedColumns: string[] = ['name ', 'totalTransactionAmount','date'];
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  
  getTotalTransactionAmount(customerId: number): number {
    return this.transactions.filter(t => t.customer_id === customerId).reduce((sum, t) => sum + t.amount, 0);
  }
}
