import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface ColumnMapperProps {
  columns: string[];
  mappings: Record<string, string>;
  onMappingChange: (column: string, dbField: string) => void;
  columnRefs: Record<string, string>;
}

const dbFields = [
  { key: 'last_name', label: 'Last Name' },
  { key: 'first_name', label: 'First Name' },
  { key: 'middle_name', label: 'Middle Name' },
  { key: 'extension_name', label: 'Extension Name (Jr., Sr., III, etc.)' },
  { key: 'birth_month', label: 'Birth Month' },
  { key: 'birth_day', label: 'Birth Day' },
  { key: 'birth_year', label: 'Birth Year' },
  { key: 'sex', label: 'Sex' },
  { key: 'barangay', label: 'Barangay' },
  { key: 'psgc_city', label: 'PSGC City' },
  { key: 'city', label: 'City' },
  { key: 'province', label: 'Province' },
  { key: 'type_of_assistance', label: 'Type of Assistance' },
  { key: 'amount', label: 'Amount' },
  { key: 'philsys_number', label: 'PhilSys Number' },
  { key: 'beneficiary_uniq', label: 'Beneficiary ID' },
  { key: 'contact_number', label: 'Contact Number' },
  { key: 'target_sector', label: 'Target Sector' },
  { key: 'sub_category', label: 'Sub Category' },
  { key: 'civil_status', label: 'Civil Status' }
];

export function ColumnMapper({ columns, mappings, onMappingChange, columnRefs }: ColumnMapperProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFields = dbFields.filter(field => 
    field.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Column Mapping</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {filteredFields.map(({ key: dbField, label }) => (
            <div key={dbField} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <span className="text-xs text-gray-500">
                    Database field: {dbField}
                  </span>
                </div>
                {Object.entries(mappings).find(([_, value]) => value === dbField) && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Mapped
                  </span>
                )}
              </div>
              <select
                value={Object.entries(mappings).find(([_, value]) => value === dbField)?.[0] || ''}
                onChange={(e) => {
                  // Remove any existing mapping for this db field
                  const existingColumn = Object.entries(mappings).find(([_, value]) => value === dbField)?.[0];
                  if (existingColumn) {
                    onMappingChange(existingColumn, '');
                  }
                  // Add new mapping
                  if (e.target.value) {
                    onMappingChange(e.target.value, dbField);
                  }
                }}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Excel Column</option>
                {columns.map((column) => (
                  <option 
                    key={column} 
                    value={column}
                    disabled={mappings[column] && mappings[column] !== dbField}
                  >
                    {columnRefs[column] ? `${columnRefs[column]} - ${column}` : column}
                  </option>
                ))}
              </select>
              {dbField === 'extension_name' && (
                <p className="mt-2 text-xs text-gray-500 italic">
                  Common values: Jr., Sr., III, IV, etc.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Mapping Progress</h3>
        <div className="flex items-center gap-2">
          <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(Object.keys(mappings).length / dbFields.length) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-600 min-w-[4rem]">
            {Object.keys(mappings).length} / {dbFields.length}
          </span>
        </div>
      </div>
    </div>
  );
}