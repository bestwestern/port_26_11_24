import { Stock } from '../types';

const sectors = [
  'Technology', 'Financial Services', 'Healthcare', 'Consumer Goods', 
  'Energy', 'Industrial', 'Materials', 'Real Estate', 'Utilities',
  'Telecommunications', 'Consumer Discretionary', 'Consumer Staples'
];

const countries = [
  'USA', 'China', 'Japan', 'Germany', 'UK', 'France', 'Canada', 'Switzerland',
  'Australia', 'South Korea', 'Netherlands', 'Sweden', 'Spain', 'Italy',
  'Singapore', 'Brazil', 'India', 'Taiwan', 'Denmark', 'Belgium'
];

const generateMarketCap = (): string => {
  const size = Math.random();
  if (size > 0.98) { // Mega caps
    return `$${(Math.random() * 2 + 1).toFixed(2)}T`;
  } else if (size > 0.9) { // Large caps
    return `$${(Math.random() * 800 + 200).toFixed(1)}B`;
  } else if (size > 0.7) { // Mid caps
    return `$${(Math.random() * 180 + 20).toFixed(1)}B`;
  } else { // Small caps
    return `$${(Math.random() * 19 + 1).toFixed(1)}B`;
  }
};

const generatePrice = (): string => {
  const price = Math.random() * 990 + 10;
  return `$${price.toFixed(2)}`;
};

const generateChange = (): string => {
  const change = (Math.random() * 5 - 2.5);
  return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
};

const generateTicker = (name: string): string => {
  // Extract initials or significant parts of the name
  const words = name.split(' ');
  let ticker = '';
  
  if (words.length === 1) {
    ticker = words[0].substring(0, 4);
  } else {
    ticker = words.map(word => word[0]).join('');
  }
  
  ticker = ticker.toUpperCase();
  
  // Add random numbers for uniqueness if needed
  if (Math.random() > 0.7) {
    ticker += Math.floor(Math.random() * 100).toString();
  }
  
  return ticker;
};

const companyPrefixes = [
  'Global', 'Advanced', 'United', 'International', 'National', 'Pacific',
  'Atlantic', 'Digital', 'First', 'American', 'European', 'Asian',
  'Modern', 'Future', 'Smart', 'Strategic', 'Dynamic', 'Innovative'
];

const companyWords = [
  'Technologies', 'Solutions', 'Systems', 'Industries', 'Electronics',
  'Dynamics', 'Robotics', 'Pharmaceuticals', 'Healthcare', 'Energy',
  'Materials', 'Communications', 'Networks', 'Semiconductors', 'Biotechnology',
  'Resources', 'Manufacturing', 'Enterprises', 'Corporation', 'Group'
];

const generateCompanyName = (): string => {
  if (Math.random() > 0.7) {
    return `${companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)]} ${
      companyWords[Math.floor(Math.random() * companyWords.length)]}`;
  } else {
    const surname = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
      'Davis', 'Rodriguez', 'Martinez', 'Chen', 'Zhang', 'Li', 'Liu', 'Wang',
      'Kim', 'Lee', 'Park', 'Singh', 'Kumar'
    ][Math.floor(Math.random() * 20)];
    
    return `${surname} ${companyWords[Math.floor(Math.random() * companyWords.length)]}`;
  }
};

export const generateStocks = (count: number): Stock[] => {
  const stocks: Stock[] = [];
  const usedNames = new Set<string>();
  const usedTickers = new Set<string>();

  for (let i = 0; i < count; i++) {
    let name = generateCompanyName();
    while (usedNames.has(name)) {
      name = generateCompanyName();
    }
    usedNames.add(name);

    let ticker = generateTicker(name);
    while (usedTickers.has(ticker)) {
      ticker = generateTicker(name) + Math.floor(Math.random() * 100);
    }
    usedTickers.add(ticker);

    stocks.push({
      name,
      ticker,
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      price: generatePrice(),
      change: generateChange(),
      marketCap: generateMarketCap(),
      portfolio1: Math.random() > 0.7 ? Math.floor(Math.random() * 200) + 1 : 0,
      portfolio2: Math.random() > 0.7 ? Math.floor(Math.random() * 200) + 1 : 0
    });
  }

  return stocks;
};