import React, { useState, useEffect } from 'react';
import {
  NavigationPage,
  UserSession,
  CameraFeed,
  AlertItem,
  IncidentRecord,
} from './types';
import {
  INITIAL_CAMERAS,
  INITIAL_ALERTS,
  PRIMARY_INCIDENT,
  INITIAL_FACE_WATCHLIST,
  INITIAL_VEHICLE_WATCHLIST,
  INITIAL_FORENSIC_RECORDS,
  INITIAL_SITES,
  INITIAL_RULES,
  INITIAL_VIRTUAL_FENCES,
} from './data/mockData';

// Components
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { DispatchModal } from './components/DispatchModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Views
import { LoginView } from './views/LoginView';
import { CommandCenterView } from './views/CommandCenterView';
import { LiveCamerasView } from './views/LiveCamerasView';
import { AlertsView } from './views/AlertsView';
import { IncidentDetailView } from './views/IncidentDetailView';
import { WatchlistsView } from './views/WatchlistsView';
import { ForensicSearchView } from './views/ForensicSearchView';
import { MultiCameraCorrelationView } from './views/MultiCameraCorrelationView';
import { AnalyticsView } from './views/AnalyticsView';
import { SitesBopsView } from './views/SitesBopsView';
import { SystemHealthView } from './views/SystemHealthView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  // Session State (starts authenticated so live preview is immediately interactive)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserSession>({
    name: 'Insp. Rajesh Verma',
    badgeId: 'BSF-INT-8842',
    role: 'COMMAND_OFFICER',
    clearanceLevel: 'LEVEL_4_TOP_SECRET',
    station: 'BOP North SOC Terminal 04',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  });

  // App Navigation & Selection State
  const [currentPage, setCurrentPage] = useState<NavigationPage>('command-center');
  const [selectedSector, setSelectedSector] = useState<string>('SECTOR-4');
  const [selectedCameraId, setSelectedCameraId] = useState<string>('CAM-007');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>('ALT-9042');
  const [threatLevel, setThreatLevel] = useState<'NOMINAL' | 'ELEVATED' | 'CRITICAL'>('CRITICAL');
  const [isLive, setIsLive] = useState<boolean>(true);

  // Modals
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState<boolean>(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);

  // Core Data State
  const [cameras, setCameras] = useState<CameraFeed[]>(INITIAL_CAMERAS);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [incident, setIncident] = useState<IncidentRecord>(PRIMARY_INCIDENT);

  // Active Alert Notification Toast
  const [activeToast, setActiveToast] = useState<{
    id: string;
    message: string;
    sector: string;
  } | null>({
    id: 'ALT-9042',
    message: 'Virtual Fence Tripwire #4 Breach Detected',
    sector: 'Sector 4-A (BOP North)',
  });

  // Hotkey listener for Ctrl+K (Global Search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsGlobalSearchOpen(false);
        setIsDispatchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = (user: UserSession) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const safeAlerts = Array.isArray(alerts) ? alerts : [];
  const pendingAlertCount = safeAlerts.filter((a) => a && a.status === 'PENDING').length;
  const criticalAlertCount = safeAlerts.filter((a) => a && a.severity === 'CRITICAL' && a.status === 'PENDING').length;

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#070a0f] text-[#dfe2ee] antialiased font-sans">
      {/* 1. Tactical Navigation Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        criticalAlertCount={criticalAlertCount}
        alertCount={pendingAlertCount}
        activeIncidentCount={1}
        incidentCount={1}
        systemStatus="ONLINE"
        onLogout={handleLogout}
        user={currentUser}
      />

      {/* Main Command Center Body */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* 2. Tactical Top Navigation Bar */}
        <TopNav
          currentSector={selectedSector}
          selectedSector={selectedSector}
          onSelectSector={setSelectedSector}
          threatLevel={threatLevel}
          onToggleThreat={() =>
            setThreatLevel((prev) =>
              prev === 'CRITICAL' ? 'ELEVATED' : prev === 'ELEVATED' ? 'NOMINAL' : 'CRITICAL'
            )
          }
          isLive={isLive}
          onToggleLive={() => setIsLive((prev) => !prev)}
          user={currentUser}
          onOpenDispatch={() => setIsDispatchModalOpen(true)}
          onOpenSearch={() => setIsGlobalSearchOpen(true)}
          alerts={alerts}
          alertsCount={pendingAlertCount}
          onSelectAlert={(alertId) => {
            setSelectedAlertId(alertId);
            setCurrentPage('alerts');
          }}
        />

        {/* Tactical Alert Banner / Critical Notification Bar */}
        {activeToast && (
          <div className="bg-[#991b1b] text-white px-4 py-1.5 flex items-center justify-between text-xs font-mono font-bold shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>CRITICAL ALERT [{activeToast.id}]:</span>
              <span className="uppercase">{activeToast.message}</span>
              <span className="text-[#fca5a5] font-normal">• {activeToast.sector}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedAlertId(activeToast.id);
                  setCurrentPage('alerts');
                  setActiveToast(null);
                }}
                className="px-2 py-0.5 bg-white text-[#991b1b] rounded text-[10px] font-bold uppercase hover:bg-[#fee2e2]"
              >
                Inspect Alert &rarr;
              </button>
              <button
                onClick={() => setActiveToast(null)}
                className="text-white/80 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* 3. Primary Content View Area */}
        <main className="flex-1 overflow-y-auto bg-[#070a0f] relative">
          {currentPage === 'command-center' && (
            <CommandCenterView
              cameras={cameras}
              alerts={alerts}
              incident={incident}
              onNavigate={setCurrentPage}
              onSelectCamera={(camId) => {
                setSelectedCameraId(camId);
                setCurrentPage('live-cameras');
              }}
              onSelectAlert={(alertId) => {
                setSelectedAlertId(alertId);
                setCurrentPage('alerts');
              }}
              onOpenDispatch={() => setIsDispatchModalOpen(true)}
            />
          )}

          {currentPage === 'live-cameras' && (
            <LiveCamerasView
              cameras={cameras}
              selectedCameraId={selectedCameraId}
              onSelectCamera={setSelectedCameraId}
              onOpenDispatch={() => setIsDispatchModalOpen(true)}
            />
          )}

          {currentPage === 'alerts' && (
            <AlertsView
              alerts={alerts}
              selectedAlertId={selectedAlertId}
              onSelectAlert={setSelectedAlertId}
              onNavigate={setCurrentPage}
              onSelectCamera={(camId) => {
                setSelectedCameraId(camId);
                setCurrentPage('live-cameras');
              }}
              onOpenDispatch={() => setIsDispatchModalOpen(true)}
            />
          )}

          {currentPage === 'incidents' && (
            <IncidentDetailView
              incident={incident}
              onNavigate={setCurrentPage}
              onSelectCamera={(camId) => {
                setSelectedCameraId(camId);
                setCurrentPage('live-cameras');
              }}
              onOpenDispatch={() => setIsDispatchModalOpen(true)}
            />
          )}

          {currentPage === 'watchlists' && (
            <WatchlistsView
              persons={INITIAL_FACE_WATCHLIST}
              vehicles={INITIAL_VEHICLE_WATCHLIST}
              onNavigate={setCurrentPage}
              onSelectCamera={(camId) => {
                setSelectedCameraId(camId);
                setCurrentPage('live-cameras');
              }}
            />
          )}

          {currentPage === 'forensic-search' && (
            <ForensicSearchView
              records={INITIAL_FORENSIC_RECORDS}
              onNavigate={setCurrentPage}
              onSelectCamera={(camId) => {
                setSelectedCameraId(camId);
                setCurrentPage('live-cameras');
              }}
            />
          )}

          {currentPage === 'multi-camera-correlation' && (
            <MultiCameraCorrelationView
              onNavigate={setCurrentPage}
              onSelectCamera={(camId) => {
                setSelectedCameraId(camId);
                setCurrentPage('live-cameras');
              }}
              onOpenDispatch={() => setIsDispatchModalOpen(true)}
            />
          )}

          {(currentPage === 'intelligence-analytics' || currentPage === 'analytics') && (
            <AnalyticsView onNavigate={setCurrentPage} />
          )}

          {(currentPage === 'sites-and-bops' || currentPage === 'sites') && (
            <SitesBopsView
              sites={INITIAL_SITES}
              cameras={cameras}
              onNavigate={setCurrentPage}
              onSelectCamera={(camId) => {
                setSelectedCameraId(camId);
                setCurrentPage('live-cameras');
              }}
              onOpenDispatch={() => setIsDispatchModalOpen(true)}
            />
          )}

          {currentPage === 'virtual-fence-builder' && (
            <SettingsView
              rules={INITIAL_RULES}
              fences={INITIAL_VIRTUAL_FENCES}
              defaultTab="FENCES"
            />
          )}

          {currentPage === 'system-health' && <SystemHealthView />}

          {(currentPage === 'settings-audit-logs' || currentPage === 'settings') && (
            <SettingsView
              rules={INITIAL_RULES}
              fences={INITIAL_VIRTUAL_FENCES}
              defaultTab="RULES"
            />
          )}
        </main>
      </div>

      {/* Tactical Modals */}
      <DispatchModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
        incidentId={incident.id}
        sector="Sector 4-A (BOP North)"
      />

      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        cameras={cameras}
        alerts={alerts}
        persons={INITIAL_FACE_WATCHLIST}
        vehicles={INITIAL_VEHICLE_WATCHLIST}
        onNavigate={setCurrentPage}
        onSelectCamera={setSelectedCameraId}
        onSelectAlert={setSelectedAlertId}
      />
    </div>
  );
}
