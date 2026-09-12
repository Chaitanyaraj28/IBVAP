import React, { useState } from 'react';
import { AlertItem, NavigationPage } from '../types';
import {
  AlertTriangle,
  Flame,
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  ExternalLink,
  Camera,
  MapPin,
  Clock,
  Send,
  Download,
  Activity,
  Sliders,
} from 'lucide-react';

interface AlertsViewProps {
  alerts?: AlertItem[];
  selectedAlertId: string | null;
  onSelectAlert: (alertId: string) => void;
  onNavigate: (page: NavigationPage) => void;
  onSelectCamera: (cameraId: string) => void;
  onOpenDispatch: () => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts = [],
  selectedAlertId,
  onSelectAlert,
  onNavigate,
  onSelectCamera,
  onOpenDispatch,
}) => {
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [localAlerts, setLocalAlerts] = useState<AlertItem[]>(Array.isArray(alerts) ? alerts : []);

  const activeAlert =
    localAlerts.find((a) => a.id === selectedAlertId) || localAlerts[0];

  const handleAcknowledge = (alertId: string) => {
    setLocalAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'ACKNOWLEDGED' } : a))
    );
  };

  const handleResolve = (alertId: string) => {
    setLocalAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'RESOLVED' } : a))
    );
  };

  const filteredAlerts = localAlerts.filter((a) => {
    if (severityFilter !== 'ALL' && a.severity !== severityFilter) return false;
    if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;
    if (
      searchQuery &&
      !a.eventType.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !a.camera.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !a.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col p-4 md:p-6 gap-5 text-[#dfe2ee] select-none">
      {/* Header & Filter Controls Bar */}
      <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-3 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1f2a3e]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#111827] border border-[#28354d] flex items-center justify-center text-[#ef4444]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-base font-bold text-[#f8fafc] tracking-wide uppercase">
                  ACTIVE SURVEILLANCE ALERTS
                </h2>
                <span className="px-2 py-0.5 bg-[#991b1b] text-white font-mono text-[10px] font-bold rounded">
                  {localAlerts.filter((a) => a.status === 'PENDING').length} PENDING ACTION
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#869397]">
                MULTI-CAMERA CORRELATED THREAT QUEUE • RISK SCORING ENGINE v3.4
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDispatch}
              className="px-3 py-1.5 bg-[#991b1b] hover:bg-[#ef4444] text-white rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>EMERGENCY DISPATCH</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#64748b]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by event, camera..."
                className="w-full bg-[#111827] border border-[#1f2a3e] rounded pl-8 pr-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#06b6d4]"
              />
            </div>

            {/* Severity Tabs */}
            <div className="flex items-center bg-[#111827] border border-[#1f2a3e] rounded p-0.5">
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                    severityFilter === sev
                      ? sev === 'CRITICAL'
                        ? 'bg-[#991b1b] text-white'
                        : 'bg-[#06b6d4] text-[#001f26]'
                      : 'text-[#869397] hover:text-[#f8fafc]'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>

            {/* Status Tabs */}
            <div className="flex items-center bg-[#111827] border border-[#1f2a3e] rounded p-0.5">
              {['ALL', 'PENDING', 'ACKNOWLEDGED', 'RESOLVED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                    statusFilter === st
                      ? 'bg-[#161f30] text-[#06b6d4]'
                      : 'text-[#869397] hover:text-[#f8fafc]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <span className="text-[#869397] text-[11px]">
            Showing {filteredAlerts.length} of {localAlerts.length} alerts
          </span>
        </div>
      </div>

      {/* Split Alert Layout (Left Feed + Right Detailed Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT: ALERT LIST (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[750px] overflow-y-auto pr-1">
          {filteredAlerts.map((alert) => {
            const isSelected = activeAlert?.id === alert.id;
            return (
              <div
                key={alert.id}
                onClick={() => onSelectAlert(alert.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#111827] border-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : alert.severity === 'CRITICAL'
                    ? 'bg-[#0b0f17] border-[#ef4444]/60 hover:border-[#ef4444]'
                    : alert.severity === 'HIGH'
                    ? 'bg-[#0b0f17] border-[#f59e0b]/40 hover:border-[#f59e0b]'
                    : 'bg-[#0b0f17] border-[#1f2a3e] hover:border-[#28354d]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        alert.severity === 'CRITICAL'
                          ? 'bg-[#ef4444] animate-ping'
                          : alert.severity === 'HIGH'
                          ? 'bg-[#f59e0b]'
                          : 'bg-[#10b981]'
                      }`}
                    />
                    <span
                      className={`px-1.5 py-0.5 rounded font-mono text-[9px] font-bold uppercase ${
                        alert.severity === 'CRITICAL'
                          ? 'bg-[#991b1b] text-white'
                          : alert.severity === 'HIGH'
                          ? 'bg-[#f59e0b]/20 text-[#f59e0b]'
                          : 'bg-[#161f30] text-[#869397]'
                      }`}
                    >
                      {alert.severity}
                    </span>
                    <span className="font-mono text-[10px] text-[#ef4444] font-bold">
                      SCORE: {alert.riskScore}/100
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#869397]">{alert.timestamp}</span>
                </div>

                <div className="mt-2">
                  <h4 className="font-display text-sm font-bold text-[#f8fafc]">{alert.eventType}</h4>
                  <p className="font-mono text-[11px] text-[#869397] mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#06b6d4]" />
                    <span>{alert.location}</span>
                    <span>•</span>
                    <span className="text-[#06b6d4] font-bold">{alert.camera}</span>
                  </p>
                  <p className="text-xs text-[#94a3b8] mt-1.5 line-clamp-2 leading-relaxed">
                    {alert.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#1f2a3e] flex items-center justify-between font-mono text-[10px]">
                  <span
                    className={`px-1.5 py-0.5 rounded font-semibold uppercase ${
                      alert.status === 'PENDING'
                        ? 'bg-[#991b1b]/20 text-[#ef4444]'
                        : alert.status === 'ACKNOWLEDGED'
                        ? 'bg-[#f59e0b]/20 text-[#f59e0b]'
                        : 'bg-[#10b981]/20 text-[#10b981]'
                    }`}
                  >
                    {alert.status}
                  </span>

                  <div className="flex items-center gap-2">
                    {alert.status === 'PENDING' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcknowledge(alert.id);
                        }}
                        className="px-2 py-0.5 bg-[#161f30] hover:bg-[#1e293b] text-[#dfe2ee] rounded border border-[#28354d]"
                      >
                        Acknowledge
                      </button>
                    )}
                    <span className="text-[#06b6d4] font-semibold">Inspect &rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: DETAILED ALERT INSPECTOR (7 Cols) */}
        {activeAlert && (
          <div className="lg:col-span-7 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-5 flex flex-col gap-4 shadow-xl sticky top-20">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2a3e]">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-xs font-bold uppercase ${
                      activeAlert.severity === 'CRITICAL'
                        ? 'bg-[#991b1b] text-white'
                        : 'bg-[#f59e0b]/20 text-[#f59e0b]'
                    }`}
                  >
                    {activeAlert.severity} PRIORITY
                  </span>
                  <span className="font-mono text-xs text-[#ef4444] font-bold">
                    RISK SCORE: {activeAlert.riskScore}/100
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-[#f8fafc] mt-1">
                  {activeAlert.eventType}
                </h3>
              </div>

              <span className="font-mono text-xs text-[#869397] bg-[#111827] px-2.5 py-1 rounded border border-[#1f2a3e]">
                REF #{activeAlert.id}
              </span>
            </div>

            {/* Snapshot Preview Box */}
            <div className="relative w-full h-64 bg-[#070a0f] border border-[#1f2a3e] rounded-lg overflow-hidden flex items-center justify-center">
              {activeAlert.snapshotUrl ? (
                <img
                  src={activeAlert.snapshotUrl}
                  alt={activeAlert.eventType}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center font-mono text-xs text-[#64748b]">
                  Optical snapshot unavailable for sensor log
                </div>
              )}

              {/* Bounding box marker overlay */}
              <div className="absolute top-1/3 left-1/3 w-28 h-36 border-2 border-[#ef4444] bg-[#ef4444]/10 rounded-sm pointer-events-none flex flex-col justify-start">
                <span className="bg-[#ef4444] text-white font-mono text-[9px] font-bold px-1 py-0.5">
                  TARGET: {activeAlert.targetId || 'UNKNOWN'}
                </span>
              </div>

              <div className="absolute bottom-2 left-2 bg-black/80 font-mono text-[10px] text-[#dfe2ee] px-2 py-1 rounded border border-[#1f2a3e]">
                CAMERA: {activeAlert.camera} // {activeAlert.location}
              </div>

              <button
                onClick={() => {
                  onSelectCamera(activeAlert.camera);
                  onNavigate('live-cameras');
                }}
                className="absolute bottom-2 right-2 bg-[#06b6d4] hover:bg-[#0891b2] text-[#001f26] font-mono text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1 shadow-md"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Jump to Live Feed</span>
              </button>
            </div>

            {/* Risk Breakdown Scoring Card */}
            <div className="bg-[#111827] border border-[#1f2a3e] rounded-lg p-3 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#869397] uppercase tracking-wider font-bold">
                  AI RISK CALCULATION BREAKDOWN (DEMO RISK MODEL)
                </span>
                <span className="text-[#ef4444] font-bold">TOTAL RISK: {activeAlert.riskScore}/100</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#dfe2ee]">• Person in Restricted Zero Buffer:</span>
                  <span className="text-[#ef4444] font-bold">+30 PTS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#dfe2ee]">• Sneaking / Concealed Crawl Classification:</span>
                  <span className="text-[#ef4444] font-bold">+20 PTS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#dfe2ee]">• After-hours Operational Breach (02:14 IST):</span>
                  <span className="text-[#f59e0b] font-bold">+15 PTS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#dfe2ee]">• Prior Fence Stalking / Loitering History:</span>
                  <span className="text-[#f59e0b] font-bold">+10 PTS</span>
                </div>
              </div>
            </div>

            {/* Metadata Table */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-[#111827] border border-[#1f2a3e] p-2.5 rounded">
                <span className="text-[#869397] text-[10px] block">TIMESTAMP (IST)</span>
                <span className="text-[#f8fafc] font-bold">{activeAlert.timestamp}</span>
              </div>
              <div className="bg-[#111827] border border-[#1f2a3e] p-2.5 rounded">
                <span className="text-[#869397] text-[10px] block">CONFIDENCE SCORE</span>
                <span className="text-[#10b981] font-bold">{activeAlert.confidence}% TPU Lock</span>
              </div>
              <div className="bg-[#111827] border border-[#1f2a3e] p-2.5 rounded">
                <span className="text-[#869397] text-[10px] block">TARGET OBJECT ID</span>
                <span className="text-[#06b6d4] font-bold">{activeAlert.targetId || 'P-024'}</span>
              </div>
              <div className="bg-[#111827] border border-[#1f2a3e] p-2.5 rounded">
                <span className="text-[#869397] text-[10px] block">COMMAND STATUS</span>
                <span className="text-[#f59e0b] font-bold uppercase">{activeAlert.status}</span>
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAcknowledge(activeAlert.id)}
                  className="px-3 py-2 bg-[#161f30] hover:bg-[#1e293b] text-[#dfe2ee] border border-[#28354d] rounded font-bold transition-colors"
                >
                  Acknowledge
                </button>
                <button
                  onClick={() => handleResolve(activeAlert.id)}
                  className="px-3 py-2 bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#10b981] border border-[#10b981]/40 rounded font-bold transition-colors"
                >
                  Mark Resolved
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('incidents')}
                  className="px-3 py-2 bg-[#161f30] hover:bg-[#1e293b] text-[#06b6d4] border border-[#06b6d4]/40 rounded font-bold transition-colors"
                >
                  Escalate to Incident
                </button>
                <button
                  onClick={onOpenDispatch}
                  className="px-4 py-2 bg-[#991b1b] hover:bg-[#ef4444] text-white font-bold uppercase rounded shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
                >
                  Dispatch Response Unit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
