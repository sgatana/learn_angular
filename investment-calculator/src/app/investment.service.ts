import { Injectable, signal } from '@angular/core';
import { InvestmentResult } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor() { }

  investmentData = signal<InvestmentResult[]>([]);

  calculateInvestmentResults(
    initialAmount: number,
    annualInvestment: number,
    expectedReturn: number,
    duration: number,
  ) {
    const annualData = [];
    let investmentValue = initialAmount
    for (let year = 1; year <= duration; year++) {
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - (annualInvestment * year - initialAmount);
  
      annualData.push({
        year,
        interestEarnedInYear,
        investmentValue,
        annualInvestment,
        totalInterest,
        totalInvestment: initialAmount + annualInvestment * year,
      });
    }
    console.log(annualData);
    this.investmentData.set(annualData);
  }

 
}
