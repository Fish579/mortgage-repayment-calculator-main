import React, { useState } from 'react';
import './App.css'; // Assuming you have a CSS file for styling

function MortgageCalculator() {
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [mortgageTerm, setMortgageTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [mortgageType, setMortgageType] = useState('');
  const [monthlyRepayment, setMonthlyRepayment] = useState(null);

  const handleCalculate = () => {
    // Validate inputs
    if (!mortgageAmount || !mortgageTerm || !interestRate || !mortgageType) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const amount = parseFloat(mortgageAmount);
    const term = parseFloat(mortgageTerm);
    const rate = parseFloat(interestRate) / 100 / 12; // Convert annual rate to monthly
    const payments = term * 12;

    let repayment;

    if (mortgageType === 'repayment') {
      // Repayment mortgage formula
      repayment = (amount * rate) / (1 - Math.pow(1 + rate, -payments));
    } else if (mortgageType === 'interest-only') {
      // Interest-only formula
      repayment = amount * rate;
    }

    setMonthlyRepayment(repayment ? repayment.toFixed(2) : null);
  };

  const handleClear = () => {
    setMortgageAmount('');
    setMortgageTerm('');
    setInterestRate('');
    setMortgageType('');
    setMonthlyRepayment(null);
  };

  return (
    <div className="flex-container">
      <div className="box box-left">
        <div className="header">
          <h2>Mortgage Calculator</h2>
          <button className="clear-btn" onClick={handleClear}>Clear All</button>
        </div>

        <div className="input-container">
          <label htmlFor="mortgage-amount">Mortgage Amount</label>
          <span className="pound-symbol">£</span>
          <input
            type="text"
            id="mortgage-amount"
            className="input-field"
            value={mortgageAmount}
            onChange={(e) => setMortgageAmount(e.target.value)}
          />
        </div>

        <div className="inputs-row">
          <div className="input-container">
            <label htmlFor="mortgage-term">Mortgage Term</label>
            <input
              type="text"
              id="mortgage-term"
              className="input-field-40"
              value={mortgageTerm}
              onChange={(e) => setMortgageTerm(e.target.value)}
            />
            <span className="years-symbol">years</span>
          </div>

          <div className="input-container">
            <label htmlFor="interest-rate">Interest Rate</label>
            <input
              type="text"
              id="interest-rate"
              className="input-field-40"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
            <span className="percent-symbol">%</span>
          </div>
        </div>

        <div className="input-container">
          <label>Mortgage Type</label>
          <label className="radio-label">
            <input
              type="radio"
              name="mortgage-type"
              value="repayment"
              checked={mortgageType === 'repayment'}
              onChange={(e) => setMortgageType(e.target.value)}
            />
            Repayment
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="mortgage-type"
              value="interest-only"
              checked={mortgageType === 'interest-only'}
              onChange={(e) => setMortgageType(e.target.value)}
            />
            Interest Only
          </label>
        </div>

        <button className="calculate-btn" onClick={handleCalculate}>
          Calculate Repayments
        </button>
      </div>

      <div className="box box-right">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="50%" fill="none" viewBox="0 0 24 24">
          {/* Empty SVG, you can add shapes or paths if needed */}
        </svg>
        <p>Your results will be shown here:</p>
        {monthlyRepayment !== null ? (
          <p>Monthly Repayment: £{monthlyRepayment}</p>
        ) : (
          <p>Complete the form and click "Calculate Repayments" to see what your monthly repayments would be.</p>
        )}
      </div>
    </div>
  );
}

export default MortgageCalculator;
