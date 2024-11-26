import React, { useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import { Stock, ColumnConfig } from '../types';

interface StockRowProps {
  stock: Stock;
  columns: ColumnConfig[];
  onUpdatePortfolio: (stockName: string, value: number) => void;
}

export const StockRow = ({ stock, columns, onUpdatePortfolio }: StockRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(stock.portfolio1.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newValue = parseInt(editValue, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue < stock.portfolio2) {
      onUpdatePortfolio(stock.name, newValue);
      setIsEditing(false);
    } else {
      alert('Portfolio 1 must have fewer shares than Portfolio 2');
      setEditValue(stock.portfolio1.toString());
    }
  };

  const renderCell = (columnId: string) => {
    switch (columnId) {
      case 'name':
        return (
          <div className="text-sm font-medium text-gray-900">
            {stock.name} <span className="text-gray-500">({stock.ticker})</span>
          </div>
        );
      case 'sector':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            {stock.sector}
          </span>
        );
      case 'country':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
            {stock.country}
          </span>
        );
      case 'marketCap':
        return stock.marketCap;
      case 'price':
        return stock.price;
      case 'change':
        return (
          <span className={stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
            {stock.change}
          </span>
        );
      case 'portfolio1':
        return (
          <div className="flex items-center justify-end space-x-2">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max={stock.portfolio2 - 1}
                  autoFocus
                  onBlur={() => setIsEditing(false)}
                />
              </form>
            ) : (
              <>
                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {stock.portfolio1}
                </span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  {stock.portfolio1 === 0 ? (
                    <Plus className="h-4 w-4" />
                  ) : (
                    <Pencil className="h-4 w-4" />
                  )}
                </button>
              </>
            )}
          </div>
        );
      case 'portfolio2':
        return (
          <span className="text-sm font-medium bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
            {stock.portfolio2}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      {columns.map(column => column.visible && (
        <td key={column.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {renderCell(column.id)}
        </td>
      ))}
    </tr>
  );
};