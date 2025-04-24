import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { CalculatorComponent } from "./calculator/calculator.component";
import { InvestmentResult } from '../utils';
import { InvestmentTableComponent } from "./investment-table/investment-table.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CalculatorComponent, InvestmentTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'investment-calculator';

  investmentData: InvestmentResult[] = []

  onCalculate(data: InvestmentResult[]) {
    this.investmentData = data
  }
}
