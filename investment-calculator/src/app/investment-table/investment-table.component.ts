import { Component, computed, inject } from '@angular/core';
import { InvestmentService } from '../investment.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investment-table',
  imports: [CurrencyPipe],
  templateUrl: './investment-table.component.html',
  styleUrl: './investment-table.component.css',
})
export class InvestmentTableComponent {
  private investmentService = inject(InvestmentService);

  get investmentData() {
    return this.investmentService.investmentData();
  }

  // investmentData = computed(() => {
  //   console.log('investmentData', this.investmentService.investmentData());
  //   return this.investmentService.investmentData();
  // })
}
