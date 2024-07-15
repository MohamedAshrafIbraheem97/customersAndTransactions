import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import {Chart, registerables} from 'chart.js/auto';
import { DataService } from 'src/app/services/data.service';
import { Customer } from 'src/app/models/customer.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { format, parseISO } from 'date-fns';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-transaction-graph',
  templateUrl: './transaction-graph.component.html',
  styleUrls: ['./transaction-graph.component.scss']
})
export class TransactionGraphComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  routeSubscription!: Subscription;
  customerId!: number;
  chart: any = [];

constructor(private dataService: DataService,  private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.customerId = +params['id'];  // Retrieve customer ID from the URL
      if (this.transactions.length > 0) {
        this.loadTransactions();
      }
    });

    this.dataService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      this.createChart();
      if (this.customerId) {
        this.loadTransactions();
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  createChart(): void {
    const ctx = document.getElementById('transactionChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Total Transaction Amount',
          data: [],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
              tooltipFormat: 'yyyy-MM-dd'
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  loadTransactions(): void {
    if (this.customerId) {
      const customerTransactions = this.transactions.filter(t => t.customer_id === this.customerId);

      const data: { [key: string]: number } = customerTransactions.reduce((acc: { [key: string]: number }, transaction) => {
        const date = format(parseISO(transaction.date), 'yyyy-MM-dd');
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += transaction.amount;
        return acc;
      }, {});

      const labels = Object.keys(data);
      const values = Object.values(data);

      if (this.chart) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = values;
        this.chart.update();
      }
    }
  }
}
