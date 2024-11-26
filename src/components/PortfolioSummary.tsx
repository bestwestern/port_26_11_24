import React, { useMemo } from 'react';
import { DollarSign, Briefcase, TrendingUp } from 'lucide-react';
import { Stock } from '../types';

interface PortfolioSummaryProps {
  stocks: Stock[];
}

export const PortfolioSummary = ({ stocks }: PortfolioSummaryProps) => {
  const summary = useMemo(() => {
    const portfolioStocks = stocks.filter(stock => stock.portfolio1 > 0);
    const totalStocks = portfolioStocks.length;
    
    const totalMarketCap = portfolioStocks.reduce((sum, stock) => {
      const value = parseFloat(stock.marketCap.replace(/[^0-9.]/g, '')) * 
        (stock.marketCap.includes('T') ? 1000 : 1);
      return sum + (value * stock.portfolio1);
    }, 0);

    const portfolioValue = totalMarketCap / 1000; // Convert to billions for display

    return {
      stockCount: totalStocks,
      marketCap: portfolioValue > 1000 
        ? `$${(portfolioValue / 1000).toFixed(2)}T` 
        : `$${portfolioValue.toFixed(2)}B`,
      stocksCount: portfolioStocks.reduce((sum, stock) => sum + stock.portfolio1, 0)
    };
  }, [stocks]);

  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-indigo-600" />
          <span className="text-sm text-gray-600">Stocks in Portfolio 1:</span>
          <span className="text-sm font-semibold text-gray-900">{summary.stockCount} companies ({summary.stocksCount} shares)</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          <span className="text-sm text-gray-600">Portfolio Value:</span>
          <span className="text-sm font-semibold text-gray-900">{summary.marketCap}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-600">Average Position:</span>
          <span className="text-sm font-semibold text-gray-900">
            {summary.stockCount > 0 ? `${(summary.stocksCount / summary.stockCount).toFixed(1)} shares` : '0 shares'}
          </span>
        </div>
      </div>
    </div>
  );
};