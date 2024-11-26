import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { SortDirection, SortField } from '../types';

interface SortHeaderProps {
  label: string;
  field: SortField;
  currentSort: SortField | null;
  direction: SortDirection;
  onSort: (field: SortField) => void;
}

export const SortHeader: React.FC<SortHeaderProps> = ({
  label,
  field,
  currentSort,
  direction,
  onSort,
}) => {
  const isActive = currentSort === field;

  return (
    <button
      onClick={() => onSort(field)}
      className="group inline-flex items-center space-x-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
    >
      <span>{label}</span>
      <span className="relative w-4 h-4 flex items-center justify-center">
        {isActive ? (
          direction === 'asc' ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-40 group-hover:opacity-100 transition-opacity" />
        )}
      </span>
    </button>
  );
};