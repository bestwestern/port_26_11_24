import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Stock } from '../types';

interface PortfolioBarChartProps {
  stocks: Stock[];
}

const formatCurrency = (value: number): string => {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  } else {
    return `$${value.toFixed(0)}K`;
  }
};

export const PortfolioBarChart = ({ stocks }: PortfolioBarChartProps) => {
  const chartData = stocks
    .filter(stock => stock.portfolio1 > 0 || stock.portfolio2 > 0)
    .map(stock => {
      const price = parseFloat(stock.price.replace(/[$,]/g, ''));
      return {
        name: stock.name,
        'Portfolio 1': (stock.portfolio1 * price) / 1000, // Convert to thousands
        'Portfolio 2': (stock.portfolio2 * price) / 1000,
        price
      };
    })
    .sort((a, b) => (b['Portfolio 1'] + b['Portfolio 2']) - (a['Portfolio 1'] + a['Portfolio 2']))
    .slice(0, 20) // Show top 20 holdings
    .map((item, index) => ({
      ...item,
      position: (index + 1).toString(),
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const stockData = chartData[parseInt(label) - 1];
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{stockData.name}</p>
          <p className="text-sm text-gray-600 mb-2">Stock Price: ${stockData.price.toFixed(2)}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-medium">
              {entry.name}: {formatCurrency(entry.value * 1000)}
              <span className="text-gray-500 text-sm font-normal ml-2">
                ({Math.round(entry.value * 1000 / stockData.price)} shares)
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Portfolio Value Distribution (Top 20 Holdings)</h2>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 60, // Increased left margin for Y-axis labels
              bottom: 60, // Increased bottom margin for X-axis labels
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="position"
              angle={0}
              tickMargin={10}
              label={{
                value: 'Position Rank',
                position: 'bottom',
                offset: 40,
                style: { textAnchor: 'middle' }
              }}
            />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value * 1000)}
              label={{ 
                value: 'Portfolio Value', 
                angle: -90, 
                position: 'insideLeft',
                offset: -40,
                style: { textAnchor: 'middle' }
              }}
              tickMargin={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{
                paddingTop: '10px'
              }}
            />
            <Bar 
              dataKey="Portfolio 1" 
              stackId="a" 
              fill="#3B82F6"
              name="Portfolio 1"
            />
            <Bar 
              dataKey="Portfolio 2" 
              stackId="a" 
              fill="#8B5CF6"
              name="Portfolio 2"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};