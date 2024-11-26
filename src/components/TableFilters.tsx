import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Stock, ColumnConfig } from '../types';
import { ColumnSelector } from './ColumnSelector';

interface TableFiltersProps {
  stocks: Stock[];
  selectedSector: string;
  selectedCountry: string;
  searchQuery: string;
  showPortfolioOnly: boolean;
  columns: ColumnConfig[];
  onSectorChange: (sector: string) => void;
  onCountryChange: (country: string) => void;
  onSearchChange: (query: string) => void;
  onPortfolioFilterChange: (checked: boolean) => void;
  onColumnsChange: (columns: ColumnConfig[]) => void;
}

export const TableFilters = ({
  stocks,
  selectedSector,
  selectedCountry,
  searchQuery,
  showPortfolioOnly,
  columns,
  onSectorChange,
  onCountryChange,
  onSearchChange,
  onPortfolioFilterChange,
  onColumnsChange,
}: TableFiltersProps) => {
  const sectors = Array.from(new Set(stocks.map(stock => stock.sector))).sort();
  const countries = Array.from(new Set(stocks.map(stock => stock.country))).sort();

  return (
    <div className="px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 min-w-fit">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search company or ticker..."
            className="pl-10 w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <select
          value={selectedSector}
          onChange={(e) => onSectorChange(e.target.value)}
          className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Sectors</option>
          {sectors.map(sector => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>

        <select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Countries</option>
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <label className="inline-flex items-center whitespace-nowrap">
          <input
            type="checkbox"
            checked={showPortfolioOnly}
            onChange={(e) => onPortfolioFilterChange(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-600">Show Portfolio 1 Only</span>
        </label>

        <ColumnSelector columns={columns} onChange={onColumnsChange} />
      </div>
    </div>
  );
};