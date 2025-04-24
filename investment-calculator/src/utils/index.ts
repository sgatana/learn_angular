export interface InvestmentResult {
  year: number;
  interestEarnedInYear: number;
  investmentValue: number;
  annualInvestment: number;
  totalInterest: number;
  totalInvestment: number;
}

export function calculateInvestmentResults(
  initialAmount: number,
  annualInvestment: number,
  expectedReturn: number,
  duration: number,
): InvestmentResult[] {
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
  return annualData;
}
