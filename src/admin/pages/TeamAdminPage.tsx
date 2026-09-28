import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { MediaSelectorModal } from '../components/MediaSelectorModal';
import {
  Users,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  X,
  Linkedin,
  Award,
  Plus,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface TeamMemberItem {
  id: string;
  name: string;
  qualification?: string;
  designation: string;
  role?: string;
  bio?: string;
  profileImage?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  achievements: string[];
  skills: string[];
  category: 'leadership' | 'team';
  displayOrder: number;
  status: 'published' | 'draft' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

export const TeamAdminPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [members, setMembers] = useState<TeamMemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<'all' | 'leadership' | 'team'>('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberItem | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [designation, setDesignation] = useState('');
  const [category, setCategory] = useState<'leadership' | 'team'>('leadership');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [achievements, setAchievements] = useState<string[]>([]);
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<'published' | 'draft' | 'hidden'>('published');
  const [submitting, setSubmitting] = useState(false);

  // Media selector modal
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  // Delete modal
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id?: string; name?: string }>({
    isOpen: false,
  });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/team/admin', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setMembers(data.members || []);
      } else {
        error('Failed to load team members.');
      }
    } catch {
      error('Network error loading team members.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openCreateModal = () => {
    setEditingMember(null);
    setName('');
    setQualification('');
    setDesignation('');
    setCategory('leadership');
    setBio('');
    setProfileImage('');
    setLinkedinUrl('');
    setAchievements(['']);
    setDisplayOrder(members.length + 1);
    setStatus('published');
    setModalOpen(true);
  };

  const openEditModal = (member: TeamMemberItem) => {
    setEditingMember(member);
    setName(member.name);
    setQualification(member.qualification || '');
    setDesignation(member.designation || member.role || '');
    setCategory(member.category || 'leadership');
    setBio(member.bio || '');
    setProfileImage(member.profileImage || member.imageUrl || '');
    setLinkedinUrl(member.linkedinUrl || '');
    setAchievements(member.achievements && member.achievements.length > 0 ? [...member.achievements] : ['']);
    setDisplayOrder(member.displayOrder || 0);
    setStatus(member.status || 'published');
    setModalOpen(true);
  };

  const handleAddAchievement = () => {
    setAchievements([...achievements, '']);
  };

  const handleAchievementChange = (index: number, val: string) => {
    const updated = [...achievements];
    updated[index] = val;
    setAchievements(updated);
  };

  const handleRemoveAchievement = (index: number) => {
    setAchievements(achievements.filter((_, idx) => idx !== index));
  };

  const handleMoveAchievement = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === achievements.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...achievements];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setAchievements(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      error('Full Name is required.');
      return;
    }
    if (!designation.trim()) {
      error('Designation / Role is required.');
      return;
    }

    setSubmitting(true);
    const cleanAchievements = achievements.filter((a) => a.trim().length > 0);

    const payload = {
      name: name.trim(),
      qualification: qualification.trim(),
      designation: designation.trim(),
      category,
      bio: bio.trim(),
      profileImage: profileImage.trim(),
      linkedinUrl: linkedinUrl.trim(),
      achievements: cleanAchievements,
      displayOrder: Number(displayOrder) || 0,
      status,
    };

    try {
      const url = editingMember ? `/api/team/admin/${editingMember.id}` : '/api/team/admin';
      const method = editingMember ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        success(editingMember ? 'Team member updated.' : 'Team member created.');
        setModalOpen(false);
        fetchMembers();
      } else {
        const data = await res.json();
        error(data.error || 'Failed to save team member.');
      }
    } catch {
      error('Network error saving team member.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (member: TeamMemberItem) => {
    const nextStatus = member.status === 'published' ? 'hidden' : 'published';
    try {
      const res = await fetch(`/api/team/admin/${member.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        success(`Status updated to ${nextStatus}.`);
        setMembers(members.map((m) => (m.id === member.id ? { ...m, status: nextStatus } : m)));
      } else {
        error('Failed to update status.');
      }
    } catch {
      error('Network error updating status.');
    }
  };

  const confirmDelete = async () => {
    if (!deleteModalState.id) return;
    try {
      const res = await fetch(`/api/team/admin/${deleteModalState.id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        success('Team member deleted.');
        setMembers(members.filter((m) => m.id !== deleteModalState.id));
      } else {
        error('Failed to delete team member.');
      }
    } catch {
      error('Network error deleting team member.');
    } finally {
      setDeleteModalState({ isOpen: false });
    }
  };

  const filteredMembers =
    filterCategory === 'all' ? members : members.filter((m) => m.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-cyan-400" />
            <span>Team & Leadership CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage executive leadership and team member profiles, achievements, and display orders.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-900/30 flex items-center gap-2 cursor-pointer transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {(['all', 'leadership', 'team'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
              filterCategory === cat
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/40 border border-slate-800'
            }`}
          >
            {cat === 'all' ? 'All Members' : cat === 'leadership' ? 'Executive Leadership' : 'Practice Team'}
          </button>
        ))}
      </div>

      {/* Grid of Team Cards */}
      {loading ? (
        <div className="flex items-center justify-center p-16 text-slate-400 text-xs font-mono">
          Loading team records...
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center p-16 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 space-y-3">
          <Users className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm">No team members found in this category.</p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-slate-800 text-cyan-300 text-xs font-semibold rounded-xl hover:bg-slate-700 cursor-pointer"
          >
            + Create First Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`p-5 rounded-2xl bg-[#0B132B] border transition-all flex flex-col justify-between group ${
                member.status === 'hidden'
                  ? 'border-slate-800/80 opacity-60'
                  : 'border-slate-800 hover:border-cyan-500/40 shadow-lg'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {member.profileImage || member.imageUrl ? (
                      <img
                        src={member.profileImage || member.imageUrl}
                        alt={member.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        {member.name}
                      </h3>
                      <div className="text-xs text-cyan-400 font-semibold">{member.designation || member.role}</div>
                      {member.qualification && (
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{member.qualification}</div>
                      )}
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      member.status === 'published'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>

                {member.bio && (
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">{member.bio}</p>
                )}

                {/* Achievements List */}
                {member.achievements && member.achievements.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-1 mb-4">
                    <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1 font-semibold">
                      <Award className="w-3 h-3 text-cyan-400" />
                      <span>{member.achievements.length} Key Achievements:</span>
                    </div>
                    <div className="space-y-1">
                      {member.achievements.slice(0, 2).map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{ach}</span>
                        </div>
                      ))}
                      {member.achievements.length > 2 && (
                        <span className="text-[10px] font-mono text-cyan-400 pl-4">
                          +{member.achievements.length - 2} more...
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span>Order: #{member.displayOrder}</span>
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleStatus(member)}
                    title={member.status === 'published' ? 'Hide from website' : 'Publish to website'}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                  >
                    {member.status === 'published' ? (
                      <Eye className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-amber-400" />
                    )}
                  </button>

                  <button
                    onClick={() => openEditModal(member)}
                    title="Edit Member"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteModalState({ isOpen: true, id: member.id, name: member.name })}
                    title="Delete Member"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0B132B] border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</span>
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Fill in the member's profile, role, qualifications, and repeatable achievements list.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Vance, Ph.D."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Designation / Role <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Founder & Global Managing Director"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Qualification</label>
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="e.g. Ph.D. in Computer Science & AI Ethics"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as 'leadership' | 'team')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="leadership">Executive Leadership (Homepage Showcase)</option>
                    <option value="team">Practice Team Member (About Page)</option>
                  </select>
                </div>
              </div>

              {/* Profile Image with Media Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Profile Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    placeholder="https://... or /assets/..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaModalOpen(true)}
                    className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Media Library</span>
                  </button>
                </div>
                {profileImage && (
                  <div className="mt-2 flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <img
                      src={profileImage}
                      alt="Preview"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                    />
                    <span className="text-[11px] text-slate-400 font-mono truncate">{profileImage}</span>
                  </div>
                )}
              </div>

              {/* Biography */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Short Biography</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Summary of experience, technical practice, and impact..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* LinkedIn URL & Display Order & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Display Order</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="published">Published (Visible)</option>
                    <option value="hidden">Hidden</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Repeatable Achievements List */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white font-display">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span>Repeatable Key Achievements</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddAchievement}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold hover:bg-cyan-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Achievement</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400">
                  Each achievement renders as an individual verified bullet point on the card.
                </p>

                <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                  {achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 w-4 text-center shrink-0">
                        {idx + 1}.
                      </span>
                      <input
                        type="text"
                        value={ach}
                        onChange={(e) => handleAchievementChange(idx, e.target.value)}
                        placeholder={`Achievement #${idx + 1}...`}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleMoveAchievement(idx, 'up')}
                        disabled={idx === 0}
                        title="Move Up"
                        className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveAchievement(idx, 'down')}
                        disabled={idx === achievements.length - 1}
                        title="Move Down"
                        className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveAchievement(idx)}
                        title="Delete Achievement"
                        className="p-1 rounded bg-slate-800 text-slate-400 hover:text-rose-400 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/30 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingMember ? 'Update Member' : 'Create Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete Team Member"
        message={`Are you sure you want to delete "${deleteModalState.name}"? This action cannot be undone.`}
        confirmText="Delete Member"
        isDestructive={true}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalState({ isOpen: false })}
      />

      {/* Media Selector Modal */}
      <MediaSelectorModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => setProfileImage(url)}
      />
    </div>
  );
};
