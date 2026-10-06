import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import {
  GraduationCap,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  Plus,
  CheckCircle2,
  Search,
  MapPin,
  Clock,
} from 'lucide-react';

interface CareerItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  displayOrder: number;
  status: 'published' | 'draft' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

import { safeApiFetch, loadOfflineCache, saveOfflineCache } from '../utils/adminFallbackData';
import { siteConfig } from '../../config/siteConfig';

export const CareersAdminPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [careers, setCareers] = useState<CareerItem[]>(() =>
    loadOfflineCache('infosbrain_cms_careers', (siteConfig.careers as any) || [])
  );
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CareerItem | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [location, setLocation] = useState('Remote / Global');
  const [type, setType] = useState('Full-time');
  const [experience, setExperience] = useState('3+ Years');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [responsibilities, setResponsibilities] = useState<string[]>(['']);
  const [salary, setSalary] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<'published' | 'draft' | 'hidden'>('published');
  const [submitting, setSubmitting] = useState(false);

  // Delete modal
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id?: string; title?: string }>({
    isOpen: false,
  });

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await safeApiFetch('/api/cms/careers/admin', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.isOffline && res.ok && Array.isArray(res.data?.careers)) {
        setCareers(res.data.careers);
        saveOfflineCache('infosbrain_cms_careers', res.data.careers);
      } else {
        const cached = loadOfflineCache('infosbrain_cms_careers', (siteConfig.careers as any) || []);
        setCareers(cached);
      }
    } catch {
      const cached = loadOfflineCache('infosbrain_cms_careers', (siteConfig.careers as any) || []);
      setCareers(cached);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setDepartment('Engineering');
    setLocation('Remote / Global');
    setType('Full-time');
    setExperience('3+ Years');
    setDescription('');
    setRequirements(['']);
    setResponsibilities(['']);
    setSalary('Competitive / Equity');
    setDisplayOrder(careers.length + 1);
    setStatus('published');
    setModalOpen(true);
  };

  const openEditModal = (item: CareerItem) => {
    setEditingItem(item);
    setTitle(item.title || '');
    setDepartment(item.department || 'Engineering');
    setLocation(item.location || 'Remote / Global');
    setType(item.type || 'Full-time');
    setExperience(item.experience || '');
    setDescription(item.description || '');
    setRequirements(item.requirements && item.requirements.length > 0 ? item.requirements : ['']);
    setResponsibilities(item.responsibilities && item.responsibilities.length > 0 ? item.responsibilities : ['']);
    setSalary(item.salary || '');
    setDisplayOrder(item.displayOrder || 0);
    setStatus(item.status || 'published');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !department.trim()) {
      error('Job title and department are required.');
      return;
    }

    setSubmitting(true);
    const payload = {
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      type: type.trim(),
      experience: experience.trim() || undefined,
      description: description.trim(),
      requirements: requirements.map((r) => r.trim()).filter(Boolean),
      responsibilities: responsibilities.map((r) => r.trim()).filter(Boolean),
      salary: salary.trim() || undefined,
      displayOrder: Number(displayOrder) || 0,
      status,
    };

    try {
      const url = editingItem ? `/api/cms/careers/admin/${editingItem.id}` : '/api/cms/careers/admin';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        success(editingItem ? 'Job updated!' : 'Job created!');
        setModalOpen(false);
        fetchCareers();
      } else {
        error(data.error || 'Failed to save job opening.');
      }
    } catch {
      error('Network error saving job opening.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (item: CareerItem) => {
    const newStatus = item.status === 'published' ? 'hidden' : 'published';
    try {
      const res = await fetch(`/api/cms/careers/admin/${item.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        success(`Status set to ${newStatus}`);
        setCareers((prev) => prev.map((c) => (c.id === item.id ? { ...c, status: newStatus as any } : c)));
      } else {
        error('Failed to change status.');
      }
    } catch {
      error('Network error changing status.');
    }
  };

  const confirmDelete = async () => {
    if (!deleteModalState.id) return;
    try {
      const res = await fetch(`/api/cms/careers/admin/${deleteModalState.id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        success('Job opening deleted.');
        setCareers((prev) => {
          const updated = prev.filter((c) => c.id !== deleteModalState.id);
          saveOfflineCache('infosbrain_cms_careers', updated);
          return updated;
        });
        setDeleteModalState({ isOpen: false });
        window.dispatchEvent(new Event('infosbrain_cms_updated'));
      } else {
        const data = await res.json();
        error(data.error || 'Failed to delete job opening.');
      }
    } catch {
      setCareers((prev) => {
        const updated = prev.filter((c) => c.id !== deleteModalState.id);
        saveOfflineCache('infosbrain_cms_careers', updated);
        return updated;
      });
      setDeleteModalState({ isOpen: false });
      window.dispatchEvent(new Event('infosbrain_cms_updated'));
      success('Job opening deleted.');
    }
  };

  const filtered = careers.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            Careers & Job Openings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage global open positions, requirements, responsibilities, and application status.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-cyan-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          Add Job Opening
        </button>
      </div>

      <div className="bg-[#0A1022] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search job title, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0E172E] border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">Open Positions: {careers.length}</span>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-2 text-slate-400">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span className="text-xs font-mono">Loading job listings...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 bg-[#0A1022] border border-slate-800 rounded-xl">
            <GraduationCap className="w-12 h-12 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No career openings found</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#0A1022] border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                    {item.department}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3 text-slate-500" /> {item.location}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3 text-slate-500" /> {item.type}
                  </span>
                  {item.salary && (
                    <span className="text-[11px] font-semibold text-emerald-400 font-mono">
                      {item.salary}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white mt-1">{item.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>

                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-mono">
                  <span>{item.requirements?.length || 0} Requirements</span>
                  <span>•</span>
                  <span>{item.responsibilities?.length || 0} Responsibilities</span>
                  <span>•</span>
                  <span>Order: {item.displayOrder}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleStatus(item)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                    item.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {item.status === 'published' ? 'Active' : 'Draft / Closed'}
                </button>
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setDeleteModalState({
                      isOpen: true,
                      id: item.id,
                      title: item.title,
                    })
                  }
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0A1022] border border-slate-750 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0E172E]/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                {editingItem ? 'Edit Job Opening' : 'Add New Job Opening'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Job Title <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior Full-Stack Engineer (React / Node)"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Department *</label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Engineering, Design, AI Labs"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Remote, London, New York"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Employment Type</label>
                  <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Full-time, Contract"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Experience</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 4+ Years"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Overview & Role Summary</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of the mission, team dynamic, and expectations..."
                  className="w-full bg-[#0E172E] border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Repeatable Requirements */}
              <div className="bg-[#0E172E]/40 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Candidate Requirements</h3>
                  <button
                    type="button"
                    onClick={() => setRequirements([...requirements, ''])}
                    className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Requirement
                  </button>
                </div>
                <div className="space-y-2">
                  {requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => {
                          const newArr = [...requirements];
                          newArr[idx] = e.target.value;
                          setRequirements(newArr);
                        }}
                        placeholder="e.g. Proven proficiency in React, TypeScript, and state management"
                        className="flex-1 bg-[#0E172E] border border-slate-750 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => setRequirements(requirements.filter((_, i) => i !== idx))}
                        className="p-1 text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Repeatable Responsibilities */}
              <div className="bg-[#0E172E]/40 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Responsibilities</h3>
                  <button
                    type="button"
                    onClick={() => setResponsibilities([...responsibilities, ''])}
                    className="px-2.5 py-1 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Responsibility
                  </button>
                </div>
                <div className="space-y-2">
                  {responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => {
                          const newArr = [...responsibilities];
                          newArr[idx] = e.target.value;
                          setResponsibilities(newArr);
                        }}
                        placeholder="e.g. Architect high-traffic services and collaborate with product teams"
                        className="flex-1 bg-[#0E172E] border border-slate-750 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                      />
                      <button
                        type="button"
                        onClick={() => setResponsibilities(responsibilities.filter((_, i) => i !== idx))}
                        className="p-1 text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Salary / Compensation</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. $90k - $120k + Equity"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft / Closed</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5"
                >
                  {submitting ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  {editingItem ? 'Update Opening' : 'Publish Opening'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete Job Opening"
        message={`Are you sure you want to delete the job opening "${deleteModalState.title}"?`}
        confirmText="Yes, Delete"
        isDestructive={true}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalState({ isOpen: false })}
      />
    </div>
  );
};
