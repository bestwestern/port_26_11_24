import React, { useState, useMemo } from 'react';
import { TableHeader } from './components/TableHeader';
import { TableFilters } from './components/TableFilters';
import { StockRow } from './components/StockRow';
import { SectorPieChart } from './components/SectorPieChart';
import { CountryPieChart } from './components/CountryPieChart';
import { SectionToggle } from './components/SectionToggle';
import { PortfolioSummary } from './components/PortfolioSummary';
import { PortfolioGenerator } from './components/PortfolioGenerator';
import { PortfolioBarChart } from './components/PortfolioBarChart';
import { stocks as initialStocks } from './data/stocks';
import { Stock, SortField, SortDirection, ColumnConfig } from './types';

function App() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPortfolioOnly, setShowPortfolioOnly] = useState(false);
  const [showSectorCharts, setShowSectorCharts] = useState(true);
  const [showCountryCharts, setShowCountryCharts] = useState(true);
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: 'name', label: 'Company', visible: true },
    { id: 'sector', label: 'Sector', visible: true },
    { id: 'country', label: 'Country', visible: true },
    { id: 'price', label: 'Price', visible: true },
    { id: 'change', label: 'Change', visible: true },
    { id: 'marketCap', label: 'Market Cap', visible: true },
    { id: 'portfolio1', label: 'Portfolio 1', visible: true },
    { id: 'portfolio2', label: 'Portfolio 2', visible: true },
  ]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleUpdatePortfolio = (stockName: string, value: number) => {
    setStocks(stocks.map(stock => {
      if (stock.name === stockName) {
        if (value >= stock.portfolio2) {
          alert('Portfolio 1 must have fewer shares than Portfolio 2');
          return stock;
        }
        return { ...stock, portfolio1: value };
      }
      return stock;
    }));
  };

  const handleGeneratePortfolio = (newStocks: Stock[]) => {
    // Ensure Portfolio 1 always has fewer stocks than Portfolio 2
    const adjustedStocks = newStocks.map(stock => ({
      ...stock,
      portfolio1: Math.min(stock.portfolio1, Math.max(0, stock.portfolio2 - 1))
    }));
    setStocks(adjustedStocks);
  };

  const sortedAndFilteredStocks = useMemo(() => {
    let filtered = [...stocks];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(stock => 
        stock.name.toLowerCase().includes(query) || 
        stock.ticker.toLowerCase().includes(query)
      );
    }

    if (selectedSector) {
      filtered = filtered.filter(stock => stock.sector === selectedSector);
    }

    if (selectedCountry) {
      filtered = filtered.filter(stock => stock.country === selectedCountry);
    }

    if (showPortfolioOnly) {
      filtered = filtered.filter(stock => stock.portfolio1 > 0);
    }

    if (sortField) {
      filtered.sort((a, b) => {
        let comparison = 0;
        if (sortField === 'marketCap') {
          const aValue = parseFloat(a[sortField].replace(/[^0-9.]/g, '')) * 
            (a[sortField].includes('T') ? 1000 : 1);
          const bValue = parseFloat(b[sortField].replace(/[^0-9.]/g, '')) * 
            (b[sortField].includes('T') ? 1000 : 1);
          comparison = aValue - bValue;
        } else {
          comparison = a[sortField] > b[sortField] ? 1 : -1;
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [stocks, searchQuery, selectedSector, selectedCountry, showPortfolioOnly, sortField, sortDirection]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TableHeader />
        
        <div className="mt-8 flex flex-wrap gap-4 mb-6">
          <SectionToggle
            label="Sector Distribution"
            checked={showSectorCharts}
            onChange={setShowSectorCharts}
          />
          <SectionToggle
            label="Country Distribution"
            checked={showCountryCharts}
            onChange={setShowCountryCharts}
          />
        </div>

        <PortfolioBarChart stocks={sortedAndFilteredStocks} />

        {showSectorCharts && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <SectorPieChart
                stocks={stocks}
                portfolioKey="portfolio1"
                title="Portfolio 1 Sector Distribution"
              />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <SectorPieChart
                stocks={stocks}
                portfolioKey="portfolio2"
                title="Portfolio 2 Sector Distribution"
              />
            </div>
          </div>
        )}

        {showCountryCharts && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CountryPieChart
                stocks={stocks}
                portfolioKey="portfolio1"
                title="Portfolio 1 Country Distribution"
              />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CountryPieChart
                stocks={stocks}
                portfolioKey="portfolio2"
                title="Portfolio 2 Country Distribution"
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <PortfolioGenerator 
            stocks={stocks}
            onGenerate={handleGeneratePortfolio}
          />
          <TableFilters
            stocks={stocks}
            selectedSector={selectedSector}
            selectedCountry={selectedCountry}
            searchQuery={searchQuery}
            showPortfolioOnly={showPortfolioOnly}
            columns={columns}
            onSectorChange={setSelectedSector}
            onCountryChange={setSelectedCountry}
            onSearchChange={setSearchQuery}
            onPortfolioFilterChange={setShowPortfolioOnly}
            onColumnsChange={setColumns}
          />
          <PortfolioSummary stocks={sortedAndFilteredStocks} />
          <div className="relative overflow-x-auto">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    {columns.map(column => column.visible && (
                      <th 
                        key={column.id} 
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                        style={{ position: 'sticky', top: 0 }}
                      >
                        {column.id === 'name' || column.id === 'marketCap' || column.id === 'portfolio1' ? (
                          <button
                            onClick={() => handleSort(column.id as SortField)}
                            className="group inline-flex items-center space-x-1"
                          >
                            <span>{column.label}</span>
                          </button>
                        ) : (
                          column.label
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedAndFilteredStocks.map((stock) => (
                    <StockRow 
                      key={stock.ticker} 
                      stock={stock}
                      columns={columns}
                      onUpdatePortfolio={handleUpdatePortfolio}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {sortedAndFilteredStocks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No stocks match the selected filters
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          Data is for demonstration purposes only
        </div>
      </div>
    </div>
  );
}

export default App;