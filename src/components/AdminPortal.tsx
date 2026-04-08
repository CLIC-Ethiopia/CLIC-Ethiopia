import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Database, Plus, Edit2, Trash2, RefreshCw, LogOut, Save } from 'lucide-react';
import { GOOGLE_SCRIPT_URL } from '../constants';

const SHEETS = [
  'Content_STEAM', 'Content_IE', 'Content_Curriculum', 'Content_Labs', 'Content_Projects',
  'Content_Spotlight', 'Content_Videos', 'Products', 'Orders', 'Students', 'Mentors',
  'Donations', 'Messages', 'newsletter sub', 'site_admin'
];

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const AdminPortal = ({ isOpen, onClose, user }: AdminPortalProps) => {
  const [activeSheet, setActiveSheet] = useState(SHEETS[0]);
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Edit/Add state
  const [isEditing, setIsEditing] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (isOpen) {
      fetchData(activeSheet);
    }
  }, [isOpen, activeSheet]);

  const fetchData = async (sheetName: string) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          action: 'admin_get_data',
          sheetName: sheetName
        }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setData(result.data);
        setHeaders(result.headers);
      } else {
        setError(result.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({});
    setEditRowIndex(null);
    setIsEditing(true);
  };

  const handleEdit = (rowIndex: number, rowData: any) => {
    setFormData(rowData);
    setEditRowIndex(rowIndex);
    setIsEditing(true);
  };

  const handleDelete = async (rowIndex: number) => {
    if (!window.confirm('Are you sure you want to delete this row?')) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          action: 'admin_delete_row',
          sheetName: activeSheet,
          rowIndex: rowIndex.toString()
        }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        fetchData(activeSheet);
      } else {
        setError(result.message || 'Failed to delete row');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred while deleting row');
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const action = editRowIndex !== null ? 'admin_update_row' : 'admin_add_row';
    const params: any = {
      action: action,
      sheetName: activeSheet,
      rowData: JSON.stringify(formData)
    };
    
    if (editRowIndex !== null) {
      params.rowIndex = editRowIndex.toString();
    }

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(params),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setIsEditing(false);
        fetchData(activeSheet);
      } else {
        setError(result.message || 'Failed to save data');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred while saving data');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-7xl h-[90vh] shadow-2xl relative overflow-hidden flex flex-col md:flex-row"
        >
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold">
                <Database size={20} className="text-[var(--color-clic-blue)]" />
                <span>Admin Portal</span>
              </div>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Database Tables</div>
              <ul className="space-y-1">
                {SHEETS.map(sheet => (
                  <li key={sheet}>
                    <button
                      onClick={() => { setActiveSheet(sheet); setIsEditing(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSheet === sheet 
                          ? 'bg-[var(--color-clic-blue)] text-white' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {sheet}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
                Logged in as: <span className="font-medium text-gray-900 dark:text-white">{user?.name || user?.email}</span>
              </div>
              <button 
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 rounded-lg transition-colors text-sm font-medium"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-gray-900 relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-900 z-10 pr-16">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{activeSheet}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage records for {activeSheet}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => fetchData(activeSheet)}
                  disabled={isLoading}
                  className="p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
                  title="Refresh Data"
                >
                  <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                </button>
                {!isEditing && (
                  <button 
                    onClick={handleAdd}
                    className="flex items-center gap-1 px-3 py-2 bg-[var(--color-clic-blue)] text-white hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Plus size={16} /> Add New
                  </button>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-4 md:p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-800">
                  {error}
                </div>
              )}

              {isEditing ? (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {editRowIndex !== null ? 'Edit Record' : 'Add New Record'}
                  </h3>
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {headers.map(header => (
                        <div key={header}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                            {header.replace(/_/g, ' ')}
                          </label>
                          {header.includes('markdown') || header.includes('description') || header.includes('message') ? (
                            <textarea
                              value={formData[header] || ''}
                              onChange={(e) => setFormData({...formData, [header]: e.target.value})}
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none min-h-[100px]"
                            />
                          ) : (
                            <input
                              type="text"
                              value={formData[header] || ''}
                              onChange={(e) => setFormData({...formData, [header]: e.target.value})}
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none"
                              disabled={header.toLowerCase().includes('id') && editRowIndex !== null}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--color-clic-blue)] text-white hover:bg-blue-700 rounded-lg transition-colors font-medium disabled:opacity-70"
                      >
                        {isLoading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Records</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.length}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Columns</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{headers.length}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Updated</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">Just now</div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                            <th className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                            {headers.map(header => (
                              <th key={header} className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                {header.replace(/_/g, ' ')}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {isLoading && data.length === 0 ? (
                            <tr>
                              <td colSpan={headers.length + 1} className="p-8 text-center text-gray-500">
                                <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
                                Loading data...
                              </td>
                            </tr>
                          ) : data.length === 0 ? (
                            <tr>
                              <td colSpan={headers.length + 1} className="p-8 text-center text-gray-500">
                                No records found in this table.
                              </td>
                            </tr>
                          ) : (
                            data.map((row, rowIndex) => (
                              <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="p-3 whitespace-nowrap">
                                  <div className="flex items-center gap-2">
                                    <button 
                                      onClick={() => handleEdit(rowIndex, row)}
                                      className="p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded transition-colors"
                                      title="Edit"
                                    >
                                      <Edit2 size={16} />
                                    </button>
                                    <button 
                                      onClick={() => handleDelete(rowIndex)}
                                      className="p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </td>
                                {headers.map(header => (
                                  <td key={header} className="p-3 text-sm text-gray-700 dark:text-gray-300 max-w-[200px] truncate">
                                    {typeof row[header] === 'object' ? JSON.stringify(row[header]) : String(row[header] || '')}
                                  </td>
                                ))}
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPortal;
