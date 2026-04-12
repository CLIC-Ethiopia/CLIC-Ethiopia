import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Database, Plus, Edit2, Trash2, RefreshCw, LogOut, Save } from 'lucide-react';
import { GOOGLE_SCRIPT_URL } from '../constants';

const SHEETS = [
  'Content_STEAM', 'Content_IE', 'Content_Curriculum', 'Content_Labs', 'Content_Projects',
  'Content_Spotlight', 'Content_Videos', 'Products', 'Orders', 'Students', 'Mentors',
  'Donations', 'Messages', 'newsletter sub', 'Events', 'Event Registration', 'site_admin'
];

const formatSheetName = (name: string) => {
  return name
    .replace('Content_', '')
    .replace('newsletter sub', 'Newsletter Subscriptions')
    .replace('site_admin', 'Site Admins')
    .replace(/_/g, ' ');
};

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

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchData(activeSheet);
    }
  }, [isOpen, activeSheet]);

  const fetchData = async (sheetName: string) => {
    setIsLoading(true);
    setIsInitialLoading(true);
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
      setIsInitialLoading(false);
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

  const getDynamicStat = () => {
    if (data.length === 0) return { label: 'Total Value', value: '-' };

    if (activeSheet === 'Orders') {
      const total = data.reduce((sum, row) => {
        const amount = parseFloat(row.total_amount || row.total || 0);
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
      return { label: 'Total Revenue', value: `${total.toLocaleString()} ETB` };
    }
    
    if (activeSheet === 'Donations') {
      const total = data.reduce((sum, row) => {
        const amount = parseFloat(row.amount || 0);
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
      return { label: 'Total Donations', value: `${total.toLocaleString()} ETB` };
    }

    if (activeSheet === 'Products') {
      const inStock = data.filter(row => row.stock_status === 'In Stock').length;
      return { label: 'In Stock Items', value: inStock };
    }

    if (activeSheet === 'Students' || activeSheet === 'Mentors') {
      const pending = data.filter(row => row.status === 'Pending').length;
      return { label: 'Pending Approvals', value: pending };
    }

    // Default for content sheets
    return { label: 'Data Fields', value: headers.length };
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
          className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-7xl h-[90vh] shadow-2xl relative overflow-hidden flex flex-col md:flex-row border border-[var(--color-clic-blue)]/20"
        >
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 md:h-full">
            <div className="p-3 md:p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-[var(--color-clic-blue)]/5">
              <div className="flex items-center gap-2 text-[var(--color-clic-blue)] font-bold">
                <Database size={20} />
                <span>Admin Portal</span>
              </div>
              <button 
                onClick={onClose}
                className="md:hidden p-2 text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400 rounded-lg"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
            <div className="p-2 md:p-4 overflow-x-auto md:overflow-y-auto flex-none md:flex-1">
              <div className="hidden md:block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Database Tables</div>
              <ul className="flex md:flex-col gap-2 md:gap-0 md:space-y-1 pb-1 md:pb-0">
                {SHEETS.map(sheet => (
                  <li key={sheet} className="shrink-0">
                    <button
                      onClick={() => { setActiveSheet(sheet); setIsEditing(false); }}
                      className={`whitespace-nowrap w-full text-left px-3 py-2 md:py-2.5 rounded-lg text-sm font-medium transition-all ${
                        activeSheet === sheet 
                          ? 'bg-[var(--color-clic-blue)] text-white shadow-md shadow-blue-500/20' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {formatSheetName(sheet)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/50">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-2 truncate">
                Logged in as: <span className="font-semibold text-slate-700 dark:text-slate-300">{user?.name || user?.email}</span>
              </div>
              <button 
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 rounded-lg transition-colors text-sm font-semibold"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-slate-950 relative">
            <button 
              onClick={onClose}
              className="hidden md:block absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-950 z-10 pr-4 md:pr-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-clic-blue)] via-blue-400 to-[var(--color-clic-green)] opacity-50"></div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{formatSheetName(activeSheet)}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage records for {formatSheetName(activeSheet)}</p>
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
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-[var(--color-clic-blue)] rounded-full"></span>
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
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-clic-blue)]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Records</div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{isInitialLoading ? '-' : data.length}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-clic-green)]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{getDynamicStat().label}</div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{isInitialLoading ? '-' : getDynamicStat().value}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Last Updated</div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white text-lg mt-2">Just now</div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-x-auto flex-1 w-full">
                      <table className="w-full text-left border-collapse min-w-max">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap sticky top-0 bg-slate-50 dark:bg-slate-900 z-10 shadow-sm">Actions</th>
                            {headers.map(header => (
                              <th key={header} className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap sticky top-0 bg-slate-50 dark:bg-slate-900 z-10 shadow-sm">
                                {header.replace(/_/g, ' ')}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          {isInitialLoading ? (
                            <tr>
                              <td colSpan={headers.length + 1} className="p-12 text-center text-slate-500">
                                <div className="flex flex-col items-center justify-center">
                                  <div className="w-10 h-10 border-4 border-[var(--color-clic-blue)]/20 border-t-[var(--color-clic-blue)] rounded-full animate-spin mb-4"></div>
                                  <p className="font-medium text-slate-600 dark:text-slate-400">Loading {formatSheetName(activeSheet)} data...</p>
                                </div>
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
