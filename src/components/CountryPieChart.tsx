import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Stock } from '../types';

interface CountryPieChartProps {
  stocks: Stock[];
  portfolioKey: 'portfolio1' | 'portfolio2';
  title: string;
}

const COLORS = [
  '#2563EB', // blue
  '#DC2626', // red
  '#059669', // green
  '#D97706', // amber
  '#7C3AED', // violet
  '#DB2777', // pink
  '#4F46E5', // indigo
  '#0D9488', // teal
  '#9333EA', // purple
  '#2563EB', // blue
  '#DC2626', // red
  '#059669', // green
];

export const CountryPieChart = ({ stocks, portfolioKey, title }: CountryPieChartProps) => {
  const countryData = useMemo(() => {
    const countryMap = stocks.reduce((acc, stock) => {
      acc[stock.country] = (acc[stock.country] || 0) + stock[portfolioKey];
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(countryMap)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [stocks, portfolioKey]);

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={countryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => 
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              labelLine={true}
            >
              {countryData.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value} shares`, 'Portfolio Shares']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};