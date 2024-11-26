import { generateStocks } from './stockGenerator';

const initialStocks = [
  { name: 'Apple Inc.', ticker: 'AAPL', sector: 'Technology', country: 'USA', price: '$182.52', change: '+1.2%', marketCap: '$2.85T', portfolio1: 150, portfolio2: 200 },
  { name: 'JPMorgan Chase', ticker: 'JPM', sector: 'Financial Services', country: 'USA', price: '$187.63', change: '+0.8%', marketCap: '$542.8B', portfolio1: 75, portfolio2: 100 },
  { name: 'TSMC', ticker: 'TSM', sector: 'Technology', country: 'Taiwan', price: '$142.85', change: '+1.7%', marketCap: '$680.2B', portfolio1: 120, portfolio2: 90 },
  { name: 'Samsung Electronics', ticker: '005930.KS', sector: 'Technology', country: 'South Korea', price: '$1,421.23', change: '+0.9%', marketCap: '$358.4B', portfolio1: 80, portfolio2: 110 },
  { name: 'ASML Holding', ticker: 'ASML', sector: 'Technology', country: 'Netherlands', price: '$987.45', change: '+2.1%', marketCap: '$385.6B', portfolio1: 45, portfolio2: 65 },
  { name: 'Toyota Motor', ticker: 'TM', sector: 'Automotive', country: 'Japan', price: '$242.31', change: '+0.4%', marketCap: '$325.7B', portfolio1: 110, portfolio2: 85 },
  { name: 'Novo Nordisk', ticker: 'NVO', sector: 'Healthcare', country: 'Denmark', price: '$156.85', change: '-0.5%', marketCap: '$520.3B', portfolio1: 200, portfolio2: 150 },
  { name: 'ExxonMobil', ticker: 'XOM', sector: 'Energy', country: 'USA', price: '$104.23', change: '+1.5%', marketCap: '$415.2B', portfolio1: 100, portfolio2: 175 },
  { name: 'LVMH', ticker: 'MC.PA', sector: 'Consumer Goods', country: 'France', price: '$892.45', change: '+1.1%', marketCap: '$445.8B', portfolio1: 60, portfolio2: 95 },
  { name: 'Tesla', ticker: 'TSLA', sector: 'Automotive', country: 'USA', price: '$202.64', change: '-1.2%', marketCap: '$642.1B', portfolio1: 50, portfolio2: 225 },
  { name: 'Nvidia', ticker: 'NVDA', sector: 'Technology', country: 'USA', price: '$875.33', change: '+2.1%', marketCap: '$2.16T', portfolio1: 45, portfolio2: 180 },
  { name: 'Alibaba Group', ticker: 'BABA', sector: 'Technology', country: 'China', price: '$73.42', change: '-0.8%', marketCap: '$186.5B', portfolio1: 150, portfolio2: 130 }
];

// Generate additional stocks and combine with initial stocks
export const stocks = [...initialStocks, ...generateStocks(500)];