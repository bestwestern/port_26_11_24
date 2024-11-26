import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Stock } from '../types';

interface SectorPieChartProps {
  stocks: Stock[];
  portfolioKey: 'portfolio1' | 'portfolio2';
  title: string;
}

const COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // yellow
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#6366F1', // indigo
  '#14B8A6', // teal
];

export const SectorPieChart = ({ stocks, portfolioKey, title }: SectorPieChartProps) => {
  const sectorData = useMemo(() => {
    const sectorMap = stocks.reduce((acc, stock) => {
      acc[stock.sector] = (acc[stock.sector] || 0) + stock[portfolioKey];
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(sectorMap).map(([name, value]) => ({
      name,
      value,
    }));
  }, [stocks, portfolioKey]);

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sectorData}
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
              {sectorData.map((_, index) => (
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