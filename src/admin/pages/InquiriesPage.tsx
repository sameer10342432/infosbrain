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
  Download,
  Sparkles,
  Briefcase,
  Calendar,
  Zap,
  Globe,
  RefreshCw,
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
  const [sourceFilter, setSourceFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Status & Source counts
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  const [sourceCounts, setSourceCounts] = useState<Record<string, number>>({});
  const [isExporting, setIsExporting] = useState(false);

  // Detail Modal
  const [activeInquiry, setActiveInquiry] = useState<InquiryItem | null>(null);

  // Delete modal
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id?: string }>({
    isOpen: false,
  });

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '15',
        status: statusFilter,
        source: sourceFilter,
        search: search.trim(),
      });

      const res = await fetch(`/api/inquiries/admin?${queryParams.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
        setStatusCounts(data.statusCounts || {});
        setSourceCounts(data.sourceCounts || {});
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
  }, [page, statusFilter, sourceFilter, search, token]);

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

  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      const queryParams = new URLSearchParams({
        status: statusFilter,
        source: sourceFilter,
        search: search.trim(),
      });

      const res = await fetch(`/api/inquiries/admin/export?${queryParams.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error('Export failed');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `infosbrain-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      success('Inquiries exported successfully.');
    } catch {
      error('Failed to export inquiries.');
    } finally {
      setIsExporting(false);
    }
  };

  const statuses = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed', 'Spam'];

  const formSources = [
    { id: 'all', label: 'All Forms', icon: Layers },
    { id: 'Contact', label: 'Contact Page', icon: Globe },
    { id: 'Homepage', label: 'Homepage Leads', icon: Zap },
    { id: 'Consultation', label: 'Consultations', icon: Calendar },
    { id: 'AI', label: 'AI Scoping', icon: Sparkles },
    { id: 'Career', label: 'Job Applications', icon: Briefcase },
    { id: 'Newsletter', label: 'Newsletter Subscribers', icon: Mail },
  ];

  const getSourceMeta = (source?: string) => {
    const s = (source || '').toLowerCase();
    if (s.includes('newsletter')) {
      return {
        label: 'Newsletter',
        badgeClass: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
        icon: Mail,
      };
    }
    if (s.includes('career') || s.includes('job') || s.includes('candidate')) {
      return {
        label: 'Job Application',
        badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
        icon: Briefcase,
      };
    }
    if (s.includes('consultation')) {
      return {
        label: 'Consultation Booking',
        badgeClass: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40',
        icon: Calendar,
      };
    }
    if (s.includes('ai') || s.includes('feasibility')) {
      return {
        label: 'AI Feasibility Scoping',
        badgeClass: 'bg-purple-950/60 text-purple-300 border-purple-500/40',
        icon: Sparkles,
      };
    }
    if (s.includes('homepage')) {
      return {
        label: 'Homepage Quick Form',
        badgeClass: 'bg-blue-950/60 text-blue-300 border-blue-500/40',
        icon: Zap,
      };
    }
    return {
      label: source || 'Contact Page Form',
      badgeClass: 'bg-indigo-950/60 text-indigo-300 border-indigo-500/40',
      icon: Globe,
    };
  };

  // Calculate aggregated category counts
  const careerCount = Object.entries(sourceCounts).reduce((acc, [k, v]) => k.toLowerCase().includes('career') ? acc + v : acc, 0);
  const newsletterCount = Object.entries(sourceCounts).reduce((acc, [k, v]) => k.toLowerCase().includes('newsletter') ? acc + v : acc, 0);
  const consultCount = Object.entries(sourceCounts).reduce((acc, [k, v]) => k.toLowerCase().includes('consultation') ? acc + v : acc, 0);
  const aiCount = Object.entries(sourceCounts).reduce((acc, [k, v]) => k.toLowerCase().includes('ai') ? acc + v : acc, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Website Form Inquiries & Leads</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono">
              {totalCount} Total
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage incoming inquiries, consultations, job applications, and newsletter subscribers from all website forms
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchInquiries()}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 cursor-pointer"
            title="Refresh Inquiries"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
          <button
            onClick={handleExportCsv}
            disabled={isExporting || totalCount === 0}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold text-white flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* Form Origin Filter Tabs */}
      <div className="p-3 rounded-2xl bg-[#090E1F] border border-slate-800/90 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Filter By Form Origin:</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {sourceFilter === 'all' ? 'Showing all forms' : `Filtered: ${sourceFilter}`}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {formSources.map((fs) => {
            const Icon = fs.icon;
            const isSelected = sourceFilter === fs.id;
            return (
              <button
                key={fs.id}
                onClick={() => {
                  setSourceFilter(fs.id);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-900/40'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{fs.label}</span>
                {fs.id === 'Career' && careerCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300">
                    {careerCount}
                  </span>
                )}
                {fs.id === 'Newsletter' && newsletterCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300">
                    {newsletterCount}
                  </span>
                )}
                {fs.id === 'Consultation' && consultCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300">
                    {consultCount}
                  </span>
                )}
                {fs.id === 'AI' && aiCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-500/20 text-purple-300">
                    {aiCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => {
              setStatusFilter('all');
              setPage(1);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            All Statuses ({totalCount})
          </button>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, email, form..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#090E1F] border border-slate-800/90 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4">Contact</th>
                <th className="p-4">Form Origin</th>
                <th className="p-4">Service & Budget</th>
                <th className="p-4">Details / Brief</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-cyan-400" />
                    <span>Loading inquiries from all forms...</span>
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    No inquiries found matching your current filter criteria.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => {
                  const sourceMeta = getSourceMeta(inq.source);
                  const SourceIcon = sourceMeta.icon;

                  return (
                    <tr key={inq.id} className="hover:bg-slate-900/50 transition-colors">
                      {/* Contact Column */}
                      <td className="p-4 max-w-xs">
                        <div className="font-semibold text-white">{inq.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">{inq.email}</div>
                        {inq.phone && (
                          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-cyan-500 shrink-0" />
                            <span>{inq.phone}</span>
                          </div>
                        )}
                        {inq.business && (
                          <div className="text-[10px] font-mono text-cyan-400 truncate mt-0.5">
                            {inq.business}
                          </div>
                        )}
                      </td>

                      {/* Form Origin Column */}
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium border ${sourceMeta.badgeClass}`}
                        >
                          <SourceIcon className="w-3 h-3 shrink-0" />
                          <span>{sourceMeta.label}</span>
                        </span>
                        {inq.source && inq.source !== sourceMeta.label && (
                          <div className="text-[9px] font-mono text-slate-500 mt-1 max-w-[140px] truncate" title={inq.source}>
                            {inq.source}
                          </div>
                        )}
                      </td>

                      {/* Service & Budget Column */}
                      <td className="p-4 whitespace-nowrap max-w-[180px]">
                        <div className="font-semibold text-slate-200 truncate" title={inq.service}>
                          {inq.service || 'General Brief'}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {inq.budget || 'Custom'}
                        </div>
                      </td>

                      {/* Project Brief Column */}
                      <td className="p-4 max-w-xs">
                        <p className="text-slate-300 line-clamp-2 leading-relaxed text-[11px]">
                          {inq.projectDetails}
                        </p>
                      </td>

                      {/* Status Column */}
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

                      {/* Date Column */}
                      <td className="p-4 whitespace-nowrap font-mono text-[11px] text-slate-400">
                        {new Date(inq.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      {/* Actions Column */}
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing Page <span className="text-white font-bold">{page}</span> of{' '}
            <span className="text-white font-bold">{totalPages}</span> ({totalCount} total entries)
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
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                      activeInquiry.status === 'New'
                        ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                        : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {activeInquiry.status}
                  </span>
                  {activeInquiry.source && (
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono">
                      {activeInquiry.source}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-mono">
                    Received: {new Date(activeInquiry.createdAt).toLocaleString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{activeInquiry.name}</h3>
              </div>
              <button
                onClick={() => setActiveInquiry(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
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
                Requested Practice / Subject
              </span>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-white">
                {activeInquiry.service || 'General Strategic Brief'}
              </div>
            </div>

            {/* Message / Brief */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Project Scope, Requirements, or Candidate Statement
              </span>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed max-h-56 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
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
