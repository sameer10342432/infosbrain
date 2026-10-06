import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { MediaSelectorModal } from '../components/MediaSelectorModal';
import {
  Globe,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  X,
  CheckCircle2,
  Search,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';

interface LocationItem {
  id: string;
  city: string;
  country: string;
  role: string;
  address: string;
  phone?: string;
  email?: string;
  timeZone?: string;
  isHeadquarters: boolean;
  coordinates: { x: number; y: number };
  localImpactStory?: string;
  imageUrl?: string;
  displayOrder: number;
  status: 'published' | 'draft' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

import { safeApiFetch, loadOfflineCache, saveOfflineCache } from '../utils/adminFallbackData';
import { siteConfig } from '../../config/siteConfig';

export const LocationsAdminPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [locations, setLocations] = useState<LocationItem[]>(() =>
    loadOfflineCache('infosbrain_cms_locations', (siteConfig.globalOffices as any) || [])
  );
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LocationItem | null>(null);

  // Form Fields
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('Global Delivery Hub');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [timeZone, setTimeZone] = useState('UTC');
  const [isHeadquarters, setIsHeadquarters] = useState(false);
  const [coordX, setCoordX] = useState(50);
  const [coordY, setCoordY] = useState(50);
  const [localImpactStory, setLocalImpactStory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<'published' | 'draft' | 'hidden'>('published');
  const [submitting, setSubmitting] = useState(false);

  // Media selector
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  // Delete modal
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id?: string; city?: string }>({
    isOpen: false,
  });

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await safeApiFetch('/api/cms/locations/admin', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.isOffline && res.ok && Array.isArray(res.data?.locations)) {
        setLocations(res.data.locations);
        saveOfflineCache('infosbrain_cms_locations', res.data.locations);
      } else {
        const cached = loadOfflineCache('infosbrain_cms_locations', (siteConfig.globalOffices as any) || []);
        setLocations(cached);
      }
    } catch {
      const cached = loadOfflineCache('infosbrain_cms_locations', (siteConfig.globalOffices as any) || []);
      setLocations(cached);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setCity('');
    setCountry('');
    setRole('Regional Technology Center');
    setAddress('');
    setPhone('+1 (555) 000-0000');
    setEmail('contact@infosbrain.com');
    setTimeZone('UTC');
    setIsHeadquarters(false);
    setCoordX(50);
    setCoordY(50);
    setLocalImpactStory('');
    setImageUrl('');
    setDisplayOrder(locations.length + 1);
    setStatus('published');
    setModalOpen(true);
  };

  const openEditModal = (item: LocationItem) => {
    setEditingItem(item);
    setCity(item.city || '');
    setCountry(item.country || '');
    setRole(item.role || '');
    setAddress(item.address || '');
    setPhone(item.phone || '');
    setEmail(item.email || '');
    setTimeZone(item.timeZone || 'UTC');
    setIsHeadquarters(Boolean(item.isHeadquarters));
    setCoordX(item.coordinates?.x || 50);
    setCoordY(item.coordinates?.y || 50);
    setLocalImpactStory(item.localImpactStory || '');
    setImageUrl(item.imageUrl || '');
    setDisplayOrder(item.displayOrder || 0);
    setStatus(item.status || 'published');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() || !country.trim() || !address.trim()) {
      error('City, Country, and Address are required.');
      return;
    }

    setSubmitting(true);
    const payload = {
      city: city.trim(),
      country: country.trim(),
      role: role.trim(),
      address: address.trim(),
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      timeZone: timeZone.trim() || undefined,
      isHeadquarters,
      coordinates: { x: Number(coordX) || 50, y: Number(coordY) || 50 },
      localImpactStory: localImpactStory.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      displayOrder: Number(displayOrder) || 0,
      status,
    };

    try {
      const url = editingItem ? `/api/cms/locations/admin/${editingItem.id}` : '/api/cms/locations/admin';
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
        success(editingItem ? 'Location updated!' : 'Location created!');
        setModalOpen(false);
        fetchLocations();
      } else {
        error(data.error || 'Failed to save location.');
      }
    } catch {
      error('Network error saving location.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (item: LocationItem) => {
    const newStatus = item.status === 'published' ? 'hidden' : 'published';
    try {
      const res = await fetch(`/api/cms/locations/admin/${item.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        success(`Status set to ${newStatus}`);
        setLocations((prev) => prev.map((l) => (l.id === item.id ? { ...l, status: newStatus as any } : l)));
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
      const res = await fetch(`/api/cms/locations/admin/${deleteModalState.id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        success('Location deleted.');
        setLocations((prev) => {
          const updated = prev.filter((l) => l.id !== deleteModalState.id);
          saveOfflineCache('infosbrain_cms_locations', updated);
          return updated;
        });
        setDeleteModalState({ isOpen: false });
        window.dispatchEvent(new Event('infosbrain_cms_updated'));
      } else {
        const data = await res.json();
        error(data.error || 'Failed to delete location.');
      }
    } catch {
      setLocations((prev) => {
        const updated = prev.filter((l) => l.id !== deleteModalState.id);
        saveOfflineCache('infosbrain_cms_locations', updated);
        return updated;
      });
      setDeleteModalState({ isOpen: false });
      window.dispatchEvent(new Event('infosbrain_cms_updated'));
      success('Location deleted.');
    }
  };

  const filtered = locations.filter(
    (l) =>
      l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Globe className="w-6 h-6 text-cyan-400" />
            Global Locations & Hubs
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage global offices, delivery centers, timezone details, contact emails, and map coordinates.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-cyan-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          Add Location
        </button>
      </div>

      <div className="bg-[#0A1022] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by city, country or hub type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0E172E] border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">Total Locations: {locations.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 flex flex-col items-center justify-center gap-2 text-slate-400">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span className="text-xs font-mono">Loading global locations...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-[#0A1022] border border-slate-800 rounded-xl">
            <Globe className="w-12 h-12 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No locations found</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#0A1022] border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                      {item.country}
                    </span>
                    {item.isHeadquarters && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        HQ
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleStatus(item)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                      item.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {item.status === 'published' ? 'Published' : 'Hidden'}
                  </button>
                </div>

                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  {item.city}
                </h3>
                <div className="text-xs text-cyan-300/80 font-medium mt-0.5">{item.role}</div>

                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{item.address}</p>

                <div className="mt-4 pt-3 border-t border-slate-800/70 space-y-1.5 text-xs text-slate-400">
                  {item.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.phone}</span>
                    </div>
                  )}
                  {item.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.email}</span>
                    </div>
                  )}
                  {item.timeZone && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.timeZone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">Order: {item.displayOrder}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setDeleteModalState({
                        isOpen: true,
                        id: item.id,
                        city: item.city,
                      })
                    }
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0A1022] border border-slate-750 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0E172E]/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                {editingItem ? `Edit Location: ${editingItem.city}` : 'Add New Location'}
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
                    City <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. London"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Country <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. United Kingdom"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Role / Function</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. European Strategic Hub"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Timezone</label>
                  <input
                    type="text"
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    placeholder="e.g. GMT / BST"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Street Address <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, Building, Postal Code"
                  className="w-full bg-[#0E172E] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Direct Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 20 7946 0991"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="uk@infosbrain.com"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Map Coordinate X (%)</label>
                  <input
                    type="number"
                    value={coordX}
                    onChange={(e) => setCoordX(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Map Coordinate Y (%)</label>
                  <input
                    type="number"
                    value={coordY}
                    onChange={(e) => setCoordY(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Local Impact Story / Highlights</label>
                <textarea
                  rows={2}
                  value={localImpactStory}
                  onChange={(e) => setLocalImpactStory(e.target.value)}
                  placeholder="Key regional achievements or client partnerships..."
                  className="w-full bg-[#0E172E] border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
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
                    <option value="draft">Draft</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isHqToggle"
                    checked={isHeadquarters}
                    onChange={(e) => setIsHeadquarters(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500 h-4 w-4"
                  />
                  <label htmlFor="isHqToggle" className="text-xs text-slate-300 font-medium">
                    Global Headquarters
                  </label>
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
                  {editingItem ? 'Update Location' : 'Create Location'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete Location"
        message={`Are you sure you want to delete the location "${deleteModalState.city}"?`}
        confirmText="Yes, Delete"
        isDestructive={true}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalState({ isOpen: false })}
      />

      <MediaSelectorModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => {
          setImageUrl(url);
          setMediaModalOpen(false);
        }}
      />
    </div>
  );
};
