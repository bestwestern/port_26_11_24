import React from 'react';
import { Building2, TrendingUp } from 'lucide-react';

export const TableHeader = () => (
  <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Building2 className="h-6 w-6 text-indigo-600" />
        <h1 className="text-xl font-semibold text-gray-900">Market Sectors Overview</h1>
      </div>
      <TrendingUp className="h-5 w-5 text-green-500" />
    </div>
  </div>
);