import React from 'react';
import {
  Grid,
  Video,
  AlertTriangle,
  Flame,
  Users,
  Search,
  GitFork,
  BarChart3,
  Building2,
  Spline,
  Activity,
  Settings,
  Shield,
  Radio,
  Lock,
} from 'lucide-react';
import { LogOut } from 'lucide-react';
import { NavigationPage, UserSession } from '../types';

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  criticalAlertCount?: number;
  alertCount?: number;
  activeIncidentCount?: number;
  incidentCount?: number;
  systemStatus?: string;
  onLogout?: () => void;
  user?: UserSession;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  criticalAlertCount,
  alertCount,
  activeIncidentCount,
  incidentCount,
  systemStatus = 'ONLINE',
  onLogout,
  user,
}) => {
  const alertBadgeNum = criticalAlertCount ?? alertCount ?? 0;
  const incidentBadgeNum = activeIncidentCount ?? incidentCount ?? 1;

  const navItems = [
    {
      id: 'command-center' as NavigationPage,
      label: 'Command Center',
      icon: Grid,
      badge: 'ACT',
      badgeColor: 'text-[#06b6d4]',
    },
    {
      id: 'live-cameras' as NavigationPage,
      label: 'Live Cameras',
      icon: Video,
      badge: '142/148',
      badgeColor: 'text-[#10b981] font-mono',
    },
    {
      id: 'alerts' as NavigationPage,
      label: 'Alerts',
      icon: AlertTriangle,
      badge: `${alertBadgeNum} CRIT`,
      badgeColor: 'bg-[#991b1b] text-[#fca5a5] font-bold animate-pulse',
      isPing: true,
    },
    {
      id: 'incidents' as NavigationPage,
      label: 'Incidents',
      icon: Flame,
      badge: `${incidentBadgeNum} ACT`,
      badgeColor: 'bg-[#f59e0b]/20 text-[#f59e0b]',
    },
    {
      id: 'watchlists' as NavigationPage,
      label: 'Watchlists',
      icon: Users,
      badge: 'FACE/ANPR',
      badgeColor: 'text-[#869397]',
    },
    {
      id: 'forensic-search' as NavigationPage,
      label: 'Forensic Search',
      icon: Search,
    },
    {
      id: 'multi-camera-correlation' as NavigationPage,
      label: 'Correlation AI',
      icon: GitFork,
      badge: 'RE-ID',
      badgeColor: 'text-[#4cd7f6] font-mono',
    },
    {
      id: 'intelligence-analytics' as NavigationPage,
      label: 'Intelligence Analytics',
      icon: BarChart3,
    },
    {
      id: 'sites-and-bops' as NavigationPage,
      label: 'Sites & BOPs',
      icon: Building2,
    },
    {
      id: 'virtual-fence-builder' as NavigationPage,
      label: 'Virtual Fence',
      icon: Spline,
    },
    {
      id: 'system-health' as NavigationPage,
      label: 'System Health',
      icon: Activity,
      badge: 'NODES OK',
      badgeColor: 'text-[#10b981] font-mono',
    },
    {
      id: 'settings-audit-logs' as NavigationPage,
      label: 'Settings & Audit',
      icon: Settings,
    },
  ];

  return (
    <aside
      id="tactical-sidebar"
      className="w-72 shrink-0 h-screen bg-[#070a0f] border-r border-[#1f2a3e] flex flex-col z-30 select-none"
    >
      {/* Brand Header */}
      <div className="p-3.5 bg-[#0b0f17] border-b border-[#1f2a3e] flex items-center gap-3">
        <div className="w-9 h-9 rounded bg-[#111827] border border-[#28354d] flex items-center justify-center p-1.5 shadow-md">
          <Shield className="w-full h-full text-[#06b6d4]" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-lg tracking-wider text-[#06b6d4] font-bold leading-none">
              IBVAP
            </span>
            <span className="px-1.5 py-0.5 bg-[#161f30] text-[#06b6d4] font-mono text-[10px] tracking-wider rounded font-bold uppercase">
              SOC
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#869397] truncate tracking-wider">
            BORDER SOC v4.2 // SIH-CORE
          </span>
        </div>
      </div>

      {/* Tactical Directory Status Rail */}
      <div className="px-3.5 py-1.5 bg-[#0e1420] border-b border-[#1f2a3e] flex items-center justify-between text-[10px] font-mono tracking-wider text-[#869397]">
        <span className="uppercase tracking-widest text-[#64748b]">TACTICAL DIRECTORY</span>
        <span className="text-[#10b981] flex items-center gap-1.5 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
          SYS ONLINE
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs transition-all ${
                isActive
                  ? 'bg-[#06b6d4] text-[#001f26] font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'text-[#94a3b8] hover:bg-[#111827] hover:text-[#f8fafc]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive
                      ? 'text-[#001f26]'
                      : item.id === 'alerts'
                      ? 'text-[#ef4444]'
                      : item.id === 'incidents'
                      ? 'text-[#f59e0b]'
                      : 'text-[#06b6d4]'
                  }`}
                />
                <span className="truncate text-[13px] font-medium">{item.label}</span>
              </div>

              {item.badge && (
                <div className="flex items-center gap-1.5">
                  {item.isPing && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-ping" />
                  )}
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] uppercase ${
                      isActive ? 'bg-[#003640] text-[#4cd7f6] font-mono font-bold' : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Operator Session Footer */}
      <div className="p-3 bg-[#0b0f17] border-t border-[#1f2a3e] space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#161f30] border border-[#28354d] flex items-center justify-center text-[#06b6d4] font-mono text-xs font-bold shrink-0">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'RV'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#f8fafc] font-semibold truncate">
                {user?.name || 'Insp. R. Verma'}
              </span>
              <span className="font-mono text-[10px] text-[#06b6d4] font-bold">
                {user?.clearanceLevel ? user.clearanceLevel.replace('LEVEL_', 'L') : 'SEC-L4'}
              </span>
            </div>
            <p className="text-[11px] text-[#869397] truncate leading-tight">
              {user?.badgeId || 'Tactical Watch Commander'}
            </p>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-1 rounded text-[#869397] hover:text-[#ef4444] hover:bg-[#161f30] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="px-2 py-1 bg-[#070a0f] rounded border border-[#1f2a3e] flex items-center justify-between text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[#10b981] font-bold">{systemStatus}</span>
          </div>
          <span className="text-[#64748b]">AES-256 GCM</span>
        </div>
      </div>
    </aside>
  );
};
