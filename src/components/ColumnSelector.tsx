import React, { useState, useRef, useEffect } from 'react';
import { Columns } from 'lucide-react';
import { ColumnConfig } from '../types';

interface ColumnSelectorProps {
  columns: ColumnConfig[];
  onChange: (columns: ColumnConfig[]) => void;
}

export const ColumnSelector = ({ columns, onChange }: ColumnSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = (columnId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedColumns = columns.map(col => 
      col.id === columnId ? { ...col, visible: !col.visible } : col
    );
    onChange(updatedColumns);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Columns className="h-4 w-4 mr-2" />
        Columns
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {columns.map(column => (
              <div
                key={column.id}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => handleToggle(column.id, e)}
              >
                <input
                  type="checkbox"
                  checked={column.visible}
                  onChange={() => {}} // Controlled component
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-3"
                  onClick={(e) => e.stopPropagation()}
                />
                {column.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};