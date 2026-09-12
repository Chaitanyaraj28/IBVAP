import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  ChevronDown,
  Bell,
  AlertOctagon,
  Volume2,
  VolumeX,
  Radio,
  Wifi,
  Cpu,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { AlertItem, UserSession } from '../types';

interface TopNavProps {
  currentSector?: string;
  selectedSector?: string;
  onSelectSector: (sector: string) => void;
  onOpenSearch: () => void;
  onOpenDispatch: () => void;
  alerts?: AlertItem[];
  alertsCount?: number;
  onSelectAlert?: (alertId: string) => void;
  threatLevel?: 'NOMINAL' | 'ELEVATED' | 'CRITICAL';
  onToggleThreat?: () => void;
  isLive?: boolean;
  onToggleLive?: () => void;
  user?: UserSession;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentSector,
  selectedSector,
  onSelectSector,
  onOpenSearch,
  onOpenDispatch,
  alerts = [],
  alertsCount,
  onSelectAlert,
  threatLevel = 'ELEVATED',
  onToggleThreat,
  isLive = true,
  onToggleLive,
  user,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [showBellDropdown, setShowBellDropdown] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const activeSectorName = currentSector || selectedSector || 'SECTOR-04: BOP NORTH (KASHMIR-JAMMU LINE)';
  const safeAlerts = Array.isArray(alerts) ? alerts : [];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${mins}:${secs} IST`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const criticalPendingAlerts = safeAlerts.filter(
    (a) => a && a.severity === 'CRITICAL' && a.status === 'PENDING'
  );

  return (
    <header
      id="tactical-header"
      className="w-full h-14 shrink-0 bg-[#070a0f]/95 backdrop-blur-md border-b border-[#1f2a3e] z-30 px-4 flex items-center justify-between gap-4 select-none"
    >
      {/* Left: Operational Zone Selector & Quick Search */}
      <div className="flex items-center gap-3 min-w-0 flex-1 max-w-2xl">
        {/* Sector Selector Dropdown */}
        <div className="relative group">
          <div className="flex items-center bg-[#111827] border border-[#1f2a3e] px-3 py-1.5 rounded cursor-pointer hover:border-[#06b6d4] transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#06b6d4] mr-2 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="font-mono text-[9px] text-[#869397] tracking-wider uppercase leading-none">
                ACTIVE OPERATIONAL ZONE
              </span>
              <span className="font-mono text-xs text-[#f8fafc] font-bold truncate max-w-[210px] md:max-w-[280px]">
                {activeSectorName}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#869397] ml-2" />
          </div>

          <div className="hidden group-hover:block absolute left-0 top-full mt-1 w-64 bg-[#0e1420] border border-[#28354d] rounded shadow-2xl py-1 z-50">
            <div className="px-3 py-1 text-[10px] font-mono text-[#869397] uppercase tracking-wider border-b border-[#1f2a3e]">
              SELECT COMMAND SECTOR
            </div>
            {[
              'SECTOR-04: BOP NORTH (KASHMIR-JAMMU LINE)',
              'SECTOR-02: BOP SOUTH (CHENAB PLAIN)',
              'SECTOR-01: GATE ALPHA HIGHWAY TERMINAL',
              'SECTOR-03: GATE BRAVO FREIGHT CORRIDOR',
              'SECTOR-02-B: POST CHARLIE FORWARD POST',
            ].map((sector) => (
              <button
                key={sector}
                onClick={() => onSelectSector(sector)}
                className={`w-full text-left px-3 py-1.5 text-xs font-mono truncate hover:bg-[#161f30] ${
                  activeSectorName === sector ? 'text-[#06b6d4] font-bold bg-[#111827]' : 'text-[#dfe2ee]'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>

        {/* Global Quick Search Button */}
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <button
            id="global-search-trigger"
            onClick={onOpenSearch}
            className="w-full bg-[#111827] border border-[#1f2a3e] hover:border-[#28354d] px-3 py-1.5 rounded flex items-center justify-between text-xs text-[#869397] transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#869397] group-hover:text-[#06b6d4]" />
              <span className="truncate">Search Person ID, Plate, CAM-xxx...</span>
            </div>
            <span className="px-1.5 py-0.5 bg-[#161f30] text-[#869397] font-mono text-[10px] rounded border border-[#1f2a3e]">
              ⌘K
            </span>
          </button>
        </div>
      </div>

      {/* Right: Telemetry Indicators & Quick Actions */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Real-time Telemetry Stats Pill (Desktop) */}
        <div className="hidden xl:flex items-center gap-4 font-mono text-[11px] bg-[#111827] border border-[#1f2a3e] px-3 py-1 rounded">
          <div className="flex flex-col leading-tight">
            <span className="text-[#64748b] text-[9px] uppercase">LATENCY</span>
            <span className="text-[#10b981] font-bold">18ms</span>
          </div>
          <div className="w-px h-5 bg-[#1f2a3e]" />
          <div className="flex flex-col leading-tight">
            <span className="text-[#64748b] text-[9px] uppercase">EDGE AI</span>
            <span className="text-[#06b6d4] font-bold">29.4 fps</span>
          </div>
          <div className="w-px h-5 bg-[#1f2a3e]" />
          <div className="flex flex-col leading-tight">
            <span className="text-[#64748b] text-[9px] uppercase">NETWORK</span>
            <span className="text-[#10b981] font-bold">99.98%</span>
          </div>
          <div className="w-px h-5 bg-[#1f2a3e]" />
          <div className="flex flex-col leading-tight">
            <span className="text-[#64748b] text-[9px] uppercase">THREAT</span>
            <span className="text-[#f59e0b] font-bold uppercase">ELEVATED</span>
          </div>
        </div>

        {/* Live IST Clock */}
        <div className="flex items-center gap-1.5 font-mono text-xs text-[#f8fafc] bg-[#111827] border border-[#1f2a3e] px-2.5 py-1.5 rounded">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span className="font-bold">{timeStr || '02:14:38 IST'}</span>
          <span className="text-[#64748b] text-[10px] hidden sm:inline">(UTC+05:30)</span>
        </div>

        {/* Audio Siren Toggle */}
        <button
          id="audio-toggle-btn"
          onClick={() => setAudioEnabled(!audioEnabled)}
          title={audioEnabled ? 'Alarm Audio Muted' : 'Alarm Audio Active'}
          className={`p-1.5 rounded border ${
            audioEnabled
              ? 'bg-[#161f30] border-[#06b6d4]/40 text-[#06b6d4]'
              : 'bg-[#111827] border-[#1f2a3e] text-[#64748b]'
          } hover:text-[#f8fafc] transition-colors`}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Notification Alert Bell */}
        <div className="relative">
          <button
            id="alert-bell-trigger"
            onClick={() => setShowBellDropdown(!showBellDropdown)}
            className="p-1.5 rounded bg-[#111827] border border-[#1f2a3e] text-[#94a3b8] hover:text-[#f8fafc] hover:border-[#28354d] relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            {criticalPendingAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#ef4444] text-[9px] font-mono font-bold flex items-center justify-center text-white animate-pulse">
                {criticalPendingAlerts.length}
              </span>
            )}
          </button>

          {showBellDropdown && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[#0b0f17] border border-[#28354d] rounded-lg shadow-2xl z-50 p-2 text-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1f2a3e]">
                <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider font-bold">
                  HIGH-PRIORITY ALERTS ({safeAlerts.length})
                </span>
                <span className="px-1.5 py-0.5 bg-[#991b1b] text-[#fca5a5] rounded text-[10px] font-mono font-bold">
                  {criticalPendingAlerts.length} CRIT
                </span>
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {safeAlerts.slice(0, 4).map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      if (onSelectAlert) onSelectAlert(alert.id);
                      setShowBellDropdown(false);
                    }}
                    className="p-2 rounded bg-[#111827] hover:bg-[#161f30] cursor-pointer border-l-2 transition-colors border-[#ef4444]"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#ef4444] font-bold uppercase">{alert.eventType}</span>
                      <span className="text-[#869397]">{alert.timestamp}</span>
                    </div>
                    <p className="text-[#dfe2ee] text-[11px] mt-0.5 truncate">{alert.description}</p>
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#869397] mt-1">
                      <span>{alert.camera}</span>
                      <span className="text-[#ef4444] font-bold">RISK: {alert.riskScore}/100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Emergency Dispatch Button */}
        <button
          id="global-dispatch-btn"
          onClick={onOpenDispatch}
          className="flex items-center gap-1.5 bg-[#991b1b] hover:bg-[#ef4444] text-white px-3 py-1.5 rounded font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_14px_rgba(239,68,68,0.4)]"
        >
          <AlertOctagon className="w-3.5 h-3.5 animate-pulse" />
          <span>DISPATCH QRF</span>
        </button>
      </div>
    </header>
  );
};
