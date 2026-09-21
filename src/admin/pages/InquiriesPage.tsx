import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import {
  MessageSquareText,
  Search,
  Trash2,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Building,
  DollarSign,
  Layers,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';

interface InquiryItem {
  id: string;
  name: string;
  business?: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  projectDetails: string;
  source?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed' | 'Spam';
  createdAt: string;
}

export const InquiriesPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Status counts
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});

  // Detail Modal
  const [activeInquiry, setActiveInquiry] = useState<InquiryItem | null>(null);

  // Delete modal
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id?: string }>({
    isOpen: false,
  });

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/inquiries/admin?page=${page}&limit=15&status=${statusFilter}&search=${encodeURIComponent(
          search
        )}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
        setStatusCounts(data.statusCounts || {});
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
      } else {
        error('Failed to load inquiries.');
      }
    } catch {
      error('Network error loading inquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [page, statusFilter, search, token]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/admin/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        success(`Status updated to ${newStatus}.`);
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus as any } : i))
        );
        if (activeInquiry && activeInquiry.id === id) {
          setActiveInquiry({ ...activeInquiry, status: newStatus as any });
        }
        fetchInquiries();
      } else {
        error('Failed to update status.');
      }
    } catch {
      error('Network error updating status.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/inquiries/admin/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        success('Inquiry record deleted.');
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (activeInquiry?.id === id) setActiveInquiry(null);
      } else {
        error('Failed to delete inquiry.');
      }
    } catch {
      error('Network error deleting inquiry.');
    } finally {
      setDeleteModalState({ isOpen: false });
    }
  };

  const statuses = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed', 'Spam'];

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Prospective Client Inquiries</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage incoming project briefs, consultations, and sales leads ({totalCount} total)
          </p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-1">
        <button
          onClick={() => {
            setStatusFilter('all');
            setPage(1);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          All Leads ({totalCount})
        </button>
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => {
              setStatusFilter(st);
              setPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === st
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {st} ({statusCounts[st] || 0})
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-[#090E1F] border border-slate-800/90 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, email, company, or details..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#090E1F] border border-slate-800/90 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4">Contact</th>
                <th className="p-4">Service & Budget</th>
                <th className="p-4">Project Brief</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date Received</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    Loading inquiries...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    No inquiries found.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-4 max-w-xs">
                      <div className="font-semibold text-white">{inq.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{inq.email}</div>
                      {inq.business && (
                        <div className="text-[10px] font-mono text-cyan-400 truncate">
                          {inq.business}
                        </div>
                      )}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-200">{inq.service || 'General Brief'}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{inq.budget || 'Custom'}</div>
                    </td>
                    <td className="p-4 max-w-sm">
                      <p className="text-slate-300 line-clamp-2 leading-relaxed">
                        {inq.projectDetails}
                      </p>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <select
                        value={inq.status}
                        onChange={(e) => updateStatus(inq.id, e.target.value)}
                        className={`text-[11px] font-mono uppercase px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                          inq.status === 'New'
                            ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                            : inq.status === 'Converted'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                            : inq.status === 'In Progress'
                            ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30'
                            : inq.status === 'Contacted'
                            ? 'bg-blue-950/60 text-blue-300 border-blue-500/30'
                            : inq.status === 'Spam'
                            ? 'bg-zinc-900 text-zinc-400 border-zinc-700'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st} className="bg-slate-900 text-white">
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 whitespace-nowrap font-mono text-[11px] text-slate-400">
                      {new Date(inq.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setActiveInquiry(inq)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 cursor-pointer"
                          title="View Full Brief"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteModalState({ isOpen: true, id: inq.id })}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing Page <span className="text-white font-bold">{page}</span> of{' '}
            <span className="text-white font-bold">{totalPages}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:text-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:text-white cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#0C1326] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                      activeInquiry.status === 'New'
                        ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                        : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {activeInquiry.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Received: {new Date(activeInquiry.createdAt).toLocaleString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{activeInquiry.name}</h3>
              </div>
              <button
                onClick={() => setActiveInquiry(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${activeInquiry.email}`}
                  className="text-cyan-300 hover:underline truncate"
                >
                  {activeInquiry.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300">{activeInquiry.phone || 'No phone provided'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300">{activeInquiry.business || 'Individual / Startup'}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300">{activeInquiry.budget || 'Custom Scope'}</span>
              </div>
            </div>

            {/* Requested Service */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Requested Practice
              </span>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-white">
                {activeInquiry.service || 'General Strategic Brief'}
              </div>
            </div>

            {/* Message */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Project Scope & Requirements
              </span>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed max-h-48 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                {activeInquiry.projectDetails}
              </div>
            </div>

            {/* Status Update & Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-slate-400">Update Status:</span>
                <select
                  value={activeInquiry.status}
                  onChange={(e) => updateStatus(activeInquiry.id, e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={`mailto:${activeInquiry.email}?subject=Re: Your inquiry with InfosBrain`}
                  className="px-4 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete Inquiry Record"
        message="Are you sure you want to permanently remove this inquiry from your CRM records?"
        confirmText="Delete Inquiry"
        onConfirm={() => {
          if (deleteModalState.id) handleDelete(deleteModalState.id);
        }}
        onClose={() => setDeleteModalState({ isOpen: false })}
      />
    </div>
  );
};
