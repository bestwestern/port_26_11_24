import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Stock } from '../types';

interface PortfolioGeneratorProps {
  stocks: Stock[];
  onGenerate: (newStocks: Stock[]) => void;
}

export const PortfolioGenerator = ({ stocks, onGenerate }: PortfolioGeneratorProps) => {
  const [totalValue, setTotalValue] = useState<string>('1000000');
  const [minStockValue, setMinStockValue] = useState<string>('10000');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    const totalBudget = parseFloat(totalValue);
    const minValue = parseFloat(minStockValue);

    if (isNaN(totalBudget) || isNaN(minValue) || totalBudget <= 0 || minValue <= 0) {
      alert('Please enter valid numbers for total value and minimum stock value');
      setIsGenerating(false);
      return;
    }

    // Calculate market cap for each stock
    const stocksWithValue = stocks.map(stock => {
      const value = parseFloat(stock.marketCap.replace(/[^0-9.]/g, '')) * 
        (stock.marketCap.includes('T') ? 1000 : 1);
      return { ...stock, marketCapValue: value };
    });

    // Filter stocks that meet minimum value requirement
    const eligibleStocks = stocksWithValue.filter(
      stock => stock.marketCapValue * 1000000000 >= minValue
    );

    if (eligibleStocks.length === 0) {
      alert('No stocks meet the minimum value requirement');
      setIsGenerating(false);
      return;
    }

    // Randomly distribute the budget
    let remainingBudget = totalBudget;
    const selectedStocks = [...eligibleStocks]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(20, eligibleStocks.length));

    const updatedStocks = stocks.map(stock => {
      const selectedStock = selectedStocks.find(s => s.ticker === stock.ticker);
      if (!selectedStock) {
        return { ...stock, portfolio2: 0 };
      }

      const stockPrice = parseFloat(stock.price.replace(/[$,]/g, ''));
      const maxShares = Math.floor(remainingBudget / stockPrice);
      const shares = Math.floor(Math.random() * maxShares * 0.4) + 1;
      remainingBudget -= shares * stockPrice;

      return { ...stock, portfolio2: shares };
    });

    onGenerate(updatedStocks);
    setIsGenerating(false);
  };

  return (
    <div className="px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="text-sm font-medium text-gray-700">Portfolio 2 Generator:</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={totalValue}
            onChange={(e) => setTotalValue(e.target.value)}
            placeholder="Total Value ($)"
            className="w-36 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-500">Total Value ($)</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={minStockValue}
            onChange={(e) => setMinStockValue(e.target.value)}
            placeholder="Min Stock Value ($)"
            className="w-36 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-500">Min Stock Value ($)</span>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wand2 className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Portfolio'}
        </button>
      </div>
    </div>
  );
};