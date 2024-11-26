export interface Stock {
  name: string;
  ticker: string;
  sector: string;
  country: string;
  price: string;
  change: string;
  marketCap: string;
  portfolio1: number;
  portfolio2: number;
}

export type SortField = 'name' | 'marketCap' | 'portfolio1';
export type SortDirection = 'asc' | 'desc';

export interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
}