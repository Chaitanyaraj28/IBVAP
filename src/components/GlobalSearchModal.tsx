import React, { useState } from 'react';
import { Search, X, Video, AlertTriangle, Users, Car, FileText, ArrowRight } from 'lucide-react';
import { NavigationPage, CameraFeed, AlertItem, WatchlistPerson, WatchlistVehicle } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: NavigationPage) => void;
  onSelectCamera: (cameraId: string) => void;
  cameras?: CameraFeed[];
  alerts?: AlertItem[];
  persons?: WatchlistPerson[];
  vehicles?: WatchlistVehicle[];
  onSelectAlert?: (alertId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectCamera,
  cameras = [],
  alerts = [],
  persons = [],
  vehicles = [],
  onSelectAlert,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const cameraItems = (cameras.length > 0 ? cameras : [
    { id: 'CAM-007', name: 'BOP North S4 Perimeter Night FLIR', status: 'FAULT' },
    { id: 'CAM-001', name: 'Gate Alpha Main Checkpoint (ANPR)', status: 'ONLINE' },
    { id: 'CAM-003', name: 'Sector 4 Wireline FLIR Sensor', status: 'ONLINE' },
  ]).map((cam) => ({
    id: cam.id,
    label: cam.name,
    action: () => {
      onSelectCamera(cam.id);
      onNavigate('live-cameras');
      onClose();
    },
    icon: Video,
    color: cam.status === 'FAULT' ? 'text-[#ef4444]' : 'text-[#06b6d4]',
  }));

  const alertItems = (alerts.length > 0 ? alerts : [
    { id: 'IBVAP-2048', description: 'Virtual Fence Tripwire Breach', riskScore: 91, eventType: 'TRIPWIRE_BREACH' },
    { id: 'ALT-9039', description: 'Watchlist Hit: Stolen Vehicle', riskScore: 84, eventType: 'ANPR_WATCHLIST_HIT' },
  ]).map((alt) => ({
    id: alt.id,
    label: `${alt.description || alt.eventType} (Risk: ${alt.riskScore}/100)`,
    action: () => {
      if (onSelectAlert) onSelectAlert(alt.id);
      onNavigate('alerts');
      onClose();
    },
    icon: AlertTriangle,
    color: alt.riskScore > 80 ? 'text-[#ef4444]' : 'text-[#f59e0b]',
  }));

  const watchlistItems = [
    ...persons.map((p) => ({
      id: p.id,
      label: `${p.name} (${p.category} - ${p.threatLevel})`,
      action: () => {
        onNavigate('watchlists');
        onClose();
      },
      icon: Users,
      color: p.threatLevel === 'HIGH' ? 'text-[#ef4444]' : 'text-[#f59e0b]',
    })),
    ...vehicles.map((v) => ({
      id: v.plateNumber,
      label: `${v.makeModel} (${v.color}) - ${v.reason}`,
      action: () => {
        onNavigate('watchlists');
        onClose();
      },
      icon: Car,
      color: v.threatLevel === 'HIGH' ? 'text-[#ef4444]' : 'text-[#06b6d4]',
    })),
  ];

  const quickResults = [
    { category: 'ACTIVE CAMERAS', items: cameraItems },
    { category: 'INCIDENTS & CRITICAL ALERTS', items: alertItems },
    { category: 'PERSON & VEHICLE WATCHLIST', items: watchlistItems },
  ];

  const filtered = searchQuery.trim()
    ? quickResults.map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((group) => group.items.length > 0)
    : quickResults;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-sm p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0b0f17] border border-[#28354d] rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Search Bar Input */}
        <div className="p-3 bg-[#111827] border-b border-[#1f2a3e] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#06b6d4] shrink-0" />
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search camera code (CAM-007), plate (JK-02), subject ID (P-024), or incident..."
            className="w-full bg-transparent text-sm font-mono text-[#f8fafc] placeholder-[#64748b] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded bg-[#161f30] hover:bg-[#1e293b] text-[#869397] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-4 text-xs font-mono">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-[#64748b]">
              No direct tactical matches found for "{searchQuery}". Try searching for CAM-007 or P-024.
            </div>
          ) : (
            filtered.map((group) => (
              <div key={group.category} className="space-y-1.5">
                <span className="text-[10px] text-[#64748b] uppercase tracking-wider font-bold block px-1">
                  {group.category}
                </span>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        className="w-full p-2 rounded bg-[#111827] hover:bg-[#161f30] flex items-center justify-between text-left transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                          <span className="font-bold text-[#f8fafc] truncate">{item.id}</span>
                          <span className="text-[#869397] truncate">{item.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#64748b] group-hover:text-[#06b6d4] group-hover:translate-x-0.5 transition-all" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-[#070a0f] border-t border-[#1f2a3e] flex items-center justify-between text-[11px] font-mono text-[#64748b]">
          <span>Tip: Press ESC to close</span>
          <span className="text-[#06b6d4]">IBVAP Unified Intelligence Index</span>
        </div>
      </div>
    </div>
  );
};
