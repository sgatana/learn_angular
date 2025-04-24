import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { calculateInvestmentResults, InvestmentResult } from '../../utils';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-calculator',
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  constructor(private investmentService: InvestmentService) {}

  initialAmount: number = 1000;
  annualInvestment: number = 100;
  expectedReturn: number = 5;
  duration: number = 10;

  onSubmit() {
    this.investmentService.calculateInvestmentResults(
      this.initialAmount,
      this.annualInvestment,
      this.expectedReturn,
      this.duration
    );
  }
}
