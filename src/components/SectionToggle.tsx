import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface SectionToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const SectionToggle = ({ label, checked, onChange }: SectionToggleProps) => {
  return (
    <label className="inline-flex items-center px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="mr-2">
        {checked ? (
          <Eye className="h-4 w-4 text-indigo-600" />
        ) : (
          <EyeOff className="h-4 w-4 text-gray-400" />
        )}
      </span>
      <span className={`text-sm font-medium ${checked ? 'text-gray-900' : 'text-gray-500'}`}>
        {label}
      </span>
    </label>
  );
};