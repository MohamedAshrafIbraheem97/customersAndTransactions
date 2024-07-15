import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerTransaction } from 'src/app/models/customerTransaction.model';
import { Transaction } from 'src/app/models/transaction.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
  customers: Customer[] = [];
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['name', 'totalTransactionAmount'];
  customersTransactions:CustomerTransaction[]=[];
  dataSource: MatTableDataSource<CustomerTransaction> = new MatTableDataSource<CustomerTransaction>();
  filterText = '';

  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit(): void {
    this.dataService.getTransactions().subscribe(transactions => {
      this.transactions = transactions
      this.processData();
    });
    this.dataService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers
      this.processData();
    } );

    // this.dataSource.data.push({customerName: this.customers.forEach(customer => customer.name),})
    
  }

  processData(): void {
    if (this.customers.length > 0 && this.transactions.length > 0) {
      const customersTransactions: CustomerTransaction[] = this.customers.map(customer => ({
        customerName: customer.name,
        totalTransactionAmount: this.getTotalTransactionAmount(customer.id),
        customerId:customer.id
      }));
      
      this.dataSource.data = customersTransactions;
    }
  }

  applyFilter(event: Event): void {    
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotalTransactionAmount(customerId: number): number {
    return this.transactions.filter(t => t.customer_id === customerId).reduce((sum, t) => sum + t.amount, 0);
  }
  
  onRowClick(customer:CustomerTransaction){
    this.router.navigate(['/transactions',customer.customerId])
  }
}
