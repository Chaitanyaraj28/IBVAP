import React, { useState } from 'react';
import {
  CameraFeed,
  AlertItem,
  NavigationPage,
} from '../types';
import {
  Video,
  Radar,
  AlertTriangle,
  Flame,
  Users,
  Car,
  Shield,
  Layers,
  Crosshair,
  Maximize2,
  Camera,
  Activity,
  Server,
  Radio,
  Sliders,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  MapPin,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface CommandCenterViewProps {
  cameras: CameraFeed[];
  alerts: AlertItem[];
  onNavigate: (page: NavigationPage) => void;
  onSelectCamera: (cameraId: string) => void;
  onSelectAlert: (alertId: string) => void;
  onOpenDispatch: () => void;
}

export const CommandCenterView: React.FC<CommandCenterViewProps> = ({
  cameras,
  alerts,
  onNavigate,
  onSelectCamera,
  onSelectAlert,
  onOpenDispatch,
}) => {
  const [mapMode, setMapMode] = useState<'VECTOR' | 'SAT_FLIR'>('VECTOR');
  const [showFence, setShowFence] = useState(true);
  const [showPatrols, setShowPatrols] = useState(true);
  const [selectedMapMarker, setSelectedMapMarker] = useState<'BOP_NORTH' | 'BOP_SOUTH' | 'CHARLIE' | null>(
    'BOP_NORTH'
  );
  const [alertFilter, setAlertFilter] = useState<'ALL' | 'CRIT'>('ALL');
  const [cctvLayout, setCctvLayout] = useState<'2x2' | '3x3' | '1+5'>('2x2');

  const safeAlerts = Array.isArray(alerts) ? alerts : [];
  const filteredAlerts = alertFilter === 'CRIT'
    ? safeAlerts.filter((a) => a && a.severity === 'CRITICAL')
    : safeAlerts;

  return (
    <div className="w-full flex flex-col p-4 md:p-6 gap-6 text-[#dfe2ee] select-none">
      {/* 6 TOP KPI TELEMETRY CARDS */}
      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Active Cameras */}
        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-3 rounded-lg flex flex-col justify-between shadow-md relative overflow-hidden group hover:border-[#06b6d4] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
              Active Cameras
            </span>
            <span className="px-1.5 py-0.5 bg-[#10b981]/15 text-[#10b981] font-mono text-[10px] rounded font-semibold">
              97.4% OK
            </span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1.5">
            <span className="font-display text-2xl text-[#f8fafc] font-bold tracking-tight">148</span>
            <span className="font-mono text-xs text-[#64748b]">/ 152</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#869397]">
            <span className="text-[#10b981] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>+4 Comm.
            </span>
            <span className="text-[#64748b]">CLUSTER-A</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10b981]/40"></div>
        </div>

        {/* Online Streams */}
        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-3 rounded-lg flex flex-col justify-between shadow-md relative overflow-hidden group hover:border-[#f59e0b] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
              Online Streams
            </span>
            <span className="px-1.5 py-0.5 bg-[#f59e0b]/15 text-[#f59e0b] font-mono text-[10px] rounded font-semibold">
              4 DEGRADED
            </span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1.5">
            <span className="font-display text-2xl text-[#f59e0b] font-bold tracking-tight">144</span>
            <span className="font-mono text-xs text-[#64748b]">CHANNELS</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#869397]">
            <span className="text-[#f59e0b] truncate">CAM-09/14/22 Sync</span>
            <span className="text-[#64748b]">H.265/4K</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f59e0b]/40"></div>
        </div>

        {/* Active Alerts */}
        <div className="bg-[#0b0f17] border border-[#ef4444]/40 p-3 rounded-lg flex flex-col justify-between shadow-md relative overflow-hidden group hover:border-[#ef4444] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
              Active Alerts
            </span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-ping"></span>
              <span className="px-1.5 py-0.5 bg-[#991b1b] text-white font-mono text-[10px] rounded font-bold">
                3 CRIT
              </span>
            </div>
          </div>
          <div className="my-1.5 flex items-baseline gap-1.5">
            <span className="font-display text-2xl text-[#ef4444] font-bold tracking-tight">14</span>
            <span className="font-mono text-[11px] text-[#869397]">5 High / 6 Med</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#869397]">
            <span className="text-[#ef4444] font-bold">BREACH ACTIVE</span>
            <span className="text-[#64748b]">PRIORITY-1</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ef4444]"></div>
        </div>

        {/* Critical Incidents */}
        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-3 rounded-lg flex flex-col justify-between shadow-md relative overflow-hidden group hover:border-[#ef4444] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
              Incidents
            </span>
            <span className="px-1.5 py-0.5 bg-[#991b1b]/30 text-[#ef4444] font-mono text-[10px] rounded font-bold uppercase">
              INTERDICT
            </span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1.5">
            <span className="font-display text-2xl text-[#f8fafc] font-bold tracking-tight">3</span>
            <span className="font-mono text-xs text-[#ef4444] font-bold uppercase">DISPATCHED</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#869397]">
            <span className="text-[#f8fafc]">QRF Echo-4</span>
            <span className="text-[#10b981] font-bold">ETA 03:12</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ef4444]/60"></div>
        </div>

        {/* Persons Detected */}
        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-3 rounded-lg flex flex-col justify-between shadow-md relative overflow-hidden group hover:border-[#06b6d4] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
              Persons (24H)
            </span>
            <span className="px-1.5 py-0.5 bg-[#06b6d4]/15 text-[#06b6d4] font-mono text-[10px] rounded font-bold">
              +18% Δ
            </span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1.5">
            <span className="font-display text-2xl text-[#06b6d4] font-bold tracking-tight">1,842</span>
            <span className="font-mono text-xs text-[#64748b]">TRACKS</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#869397]">
            <span className="text-[#f8fafc]">Multi-ReID Engine</span>
            <span className="text-[#64748b]">98.9% ACC</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#06b6d4]/40"></div>
        </div>

        {/* Vehicles Detected */}
        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-3 rounded-lg flex flex-col justify-between shadow-md relative overflow-hidden group hover:border-[#f59e0b] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
              Vehicles (24H)
            </span>
            <span className="px-1.5 py-0.5 bg-[#f59e0b]/20 text-[#f59e0b] font-mono text-[10px] rounded font-bold">
              12 MATCH
            </span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1.5">
            <span className="font-display text-2xl text-[#f8fafc] font-bold tracking-tight">427</span>
            <span className="font-mono text-xs text-[#64748b]">ANPR</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#869397]">
            <span className="text-[#f59e0b] font-bold truncate">Stolen Scorpio Flag</span>
            <span className="text-[#64748b]">CAM-01</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f59e0b]/40"></div>
        </div>
      </section>

      {/* SECTION 1 & 2: GIS TACTICAL MAP & REAL-TIME ALERTS PANEL */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: GIS TACTICAL BORDER MAP (7 of 12 columns) */}
        <div className="lg:col-span-7 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-3 shadow-xl">
          {/* Header & Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2.5">
              <Radar className="w-5 h-5 text-[#06b6d4]" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-bold text-[#f8fafc]">
                    GIS TACTICAL GRID // SECTOR-04
                  </h3>
                  <span className="px-1.5 py-0.5 bg-[#991b1b] text-white font-mono text-[10px] rounded uppercase font-bold">
                    BREACH IN S4-ALPHA
                  </span>
                </div>
                <p className="font-mono text-[10px] text-[#869397]">
                  GRID: 33.7782° N, 74.8329° E | ELEV: 1,840m | SENSOR BUFFER: 500m
                </p>
              </div>
            </div>

            {/* Map Controls */}
            <div className="flex items-center gap-1.5 bg-[#111827] border border-[#1f2a3e] px-1.5 py-1 rounded">
              <button
                onClick={() => setMapMode('VECTOR')}
                className={`px-2 py-0.5 font-mono text-[10px] rounded font-bold transition-colors ${
                  mapMode === 'VECTOR'
                    ? 'bg-[#161f30] text-[#06b6d4]'
                    : 'text-[#869397] hover:text-[#f8fafc]'
                }`}
              >
                VECTOR
              </button>
              <button
                onClick={() => setMapMode('SAT_FLIR')}
                className={`px-2 py-0.5 font-mono text-[10px] rounded font-bold transition-colors ${
                  mapMode === 'SAT_FLIR'
                    ? 'bg-[#161f30] text-[#06b6d4]'
                    : 'text-[#869397] hover:text-[#f8fafc]'
                }`}
              >
                SAT-FLIR
              </button>
              <div className="w-px h-3 bg-[#1f2a3e] mx-0.5" />
              <button
                onClick={() => setShowFence(!showFence)}
                className={`px-2 py-0.5 font-mono text-[10px] rounded flex items-center gap-1 transition-colors ${
                  showFence ? 'bg-[#06b6d4]/20 text-[#06b6d4]' : 'text-[#869397]'
                }`}
              >
                FENCE:{showFence ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setShowPatrols(!showPatrols)}
                className={`px-2 py-0.5 font-mono text-[10px] rounded flex items-center gap-1 transition-colors ${
                  showPatrols ? 'bg-[#10b981]/20 text-[#10b981]' : 'text-[#869397]'
                }`}
              >
                QRF
              </button>
            </div>
          </div>

          {/* Interactive Tactical Map Surface Canvas */}
          <div className="relative w-full h-[450px] bg-[#070a0f] border border-[#1f2a3e] rounded-lg overflow-hidden select-none">
            {/* Background Grid & Topography Contour SVG */}
            <svg className="absolute inset-0 w-full h-full text-[#161f30]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="tacticalMapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.4" />
                  <circle cx="0" cy="0" r="1.5" fill="currentColor" fillOpacity="0.6" />
                </pattern>
                <radialGradient id="breachFlare" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                  <stop offset="60%" stopColor="#991b1b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="100%" height="100%" fill="url(#tacticalMapGrid)" />

              {/* Contour Elevation Curves */}
              <path d="M-50,180 C120,160 280,240 450,210 C620,180 800,290 1000,240" fill="none" stroke="#1f2a3e" strokeWidth="1.5" strokeDasharray="4 6" />
              <path d="M-50,260 C150,230 300,340 520,300 C740,260 880,390 1000,340" fill="none" stroke="#1f2a3e" strokeWidth="1.5" />
              <path d="M-50,340 C180,310 340,430 600,380 C820,330 920,470 1000,430" fill="none" stroke="#1f2a3e" strokeWidth="1" strokeDasharray="3 3" />

              {/* Buffer Zone Polygon Overlay */}
              <polygon points="120,40 680,110 820,390 280,360" fill="rgba(239,68,68,0.06)" stroke="#ef4444" strokeWidth="0.8" strokeOpacity="0.3" />

              {/* International Border Zero Line (Red Dotted) */}
              <path d="M 40,80 L 220,130 L 480,180 L 760,260 L 920,310" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />

              {/* Active Virtual Fence Hazard Polyline (Cyan Glow) */}
              {showFence && (
                <path d="M 80,130 L 240,175 L 500,225 L 780,305 L 940,355" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeOpacity="0.9" />
              )}

              {/* Camera Field of View (FOV) Cones */}
              {/* CAM-01 FOV (Gate A) */}
              <polygon points="180,230 130,140 230,130" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="0.75" />
              {/* CAM-03 FOV (Wireline) */}
              <polygon points="620,290 570,200 680,210" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="0.75" />
              {/* CAM-07 FOV (Breach point - Red Triangle) */}
              <polygon points="360,280 300,160 430,170" fill="rgba(239,68,68,0.25)" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />

              {/* Breach Pulse Radar Ripples at CAM-07 */}
              <circle cx="365" cy="205" r="30" fill="url(#breachFlare)" className="animate-pulse" />
              <circle cx="365" cy="205" r="45" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.7" />
            </svg>

            {/* Coordinates & Metadata Marks */}
            <div className="absolute top-2 left-3 font-mono text-[9px] text-[#64748b]">
              LAT 33°46'41.5"N | LON 74°49'58.2"E
            </div>
            <div className="absolute top-2 right-3 font-mono text-[9px] text-[#64748b]">
              DATUM: WGS84 // GRID UTM 43N
            </div>
            <div className="absolute bottom-2 left-3 font-mono text-[9px] text-[#64748b]">
              RANGE RING: 250M SPACING
            </div>

            {/* Map Markers */}
            {/* Post Charlie Marker */}
            <div
              onClick={() => setSelectedMapMarker('CHARLIE')}
              className="absolute top-20 left-28 flex flex-col items-center cursor-pointer group"
            >
              <div className="w-3.5 h-3.5 rounded bg-[#111827] border border-[#869397] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
              </div>
              <span className="mt-1 px-1 py-0.5 bg-[#070a0f]/80 text-[#869397] font-mono text-[9px] rounded border border-[#1f2a3e]">
                POST CHARLIE
              </span>
            </div>

            {/* BOP South Marker */}
            <div
              onClick={() => setSelectedMapMarker('BOP_SOUTH')}
              className="absolute bottom-16 right-36 flex flex-col items-center cursor-pointer group"
            >
              <div className="w-3.5 h-3.5 rounded bg-[#111827] border border-[#869397] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
              </div>
              <span className="mt-1 px-1 py-0.5 bg-[#070a0f]/80 text-[#dfe2ee] font-mono text-[9px] rounded border border-[#1f2a3e]">
                BOP SOUTH
              </span>
            </div>

            {/* QRF Squad in Transit */}
            {showPatrols && (
              <div className="absolute top-44 left-60 flex items-center gap-1.5 bg-[#111827]/90 border border-[#10b981] px-2 py-1 rounded shadow-lg animate-pulse">
                <Shield className="w-3.5 h-3.5 text-[#10b981]" />
                <span className="font-mono text-[10px] text-[#10b981] font-bold">
                  QRF-ECHO4 [IN TRANSIT]
                </span>
                <span className="font-mono text-[9px] text-[#64748b]">38 km/h</span>
              </div>
            )}

            {/* BOP North Breach Target Marker (Active Ping) */}
            <div
              onClick={() => setSelectedMapMarker('BOP_NORTH')}
              className="absolute top-40 left-[46%] -translate-x-1/2 flex flex-col items-center cursor-pointer z-10"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-7 h-7 rounded-full bg-[#ef4444]/30 animate-ping absolute" />
                <div className="w-6 h-6 rounded-full bg-[#991b1b] text-white flex items-center justify-center shadow-lg border border-[#ef4444]">
                  <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                </div>
              </div>
              <span className="mt-1 px-1.5 py-0.5 bg-[#991b1b] text-white font-mono text-[10px] font-bold rounded shadow-md">
                BOP NORTH // CAM-07
              </span>
            </div>

            {/* POPUP INFORMATION CARD FOR SELECTED BREACH (CAM-07) */}
            {selectedMapMarker === 'BOP_NORTH' && (
              <div className="absolute top-12 left-[48%] z-20 w-72 bg-[#0b0f17]/95 border border-[#ef4444] rounded-lg p-3 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#1f2a3e]">
                  <div className="flex items-center gap-1.5 text-[#ef4444]">
                    <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                      PERIMETER BREACH DETECTED
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-white bg-[#991b1b] px-1.5 py-0.5 rounded font-bold">
                    RISK: 91/100
                  </span>
                </div>

                <div className="space-y-1 font-mono text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-[#869397]">LOCATION:</span>
                    <span className="text-[#f8fafc] font-semibold">BOP North Sector 4-A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#869397]">TARGET ID:</span>
                    <span className="text-[#06b6d4] font-bold">P-024 (Crawling Motion)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#869397]">SENSOR / CAM:</span>
                    <span className="text-[#dfe2ee]">CAM-07 (Thermal Dual)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#869397]">VELOCITY:</span>
                    <span className="text-[#f59e0b]">1.8 m/s // Bearing 184°</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#1f2a3e] flex items-center gap-2">
                  <button
                    onClick={onOpenDispatch}
                    className="flex-1 bg-[#991b1b] hover:bg-[#ef4444] text-white py-1 rounded font-mono text-[10px] font-bold uppercase tracking-wider text-center transition-colors shadow-md"
                  >
                    DISPATCH QRF
                  </button>
                  <button
                    onClick={() => {
                      onSelectCamera('CAM-007');
                      onNavigate('live-cameras');
                    }}
                    className="px-2.5 py-1 bg-[#161f30] hover:bg-[#1e293b] text-[#06b6d4] border border-[#28354d] rounded font-mono text-[10px] font-bold"
                  >
                    CAM VIEW
                  </button>
                </div>
              </div>
            )}

            {/* Map Legend (Bottom left) */}
            <div className="absolute bottom-3 left-3 bg-[#0b0f17]/90 border border-[#1f2a3e] backdrop-blur px-3 py-1.5 rounded flex items-center gap-4 text-[10px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#ef4444]"></span>
                <span className="text-[#869397]">IB ZERO LINE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#06b6d4]"></span>
                <span className="text-[#869397]">V-FENCE TRIP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                <span className="text-[#869397]">NORMAL CAM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
                <span className="text-[#869397]">BREACH CAM</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: REAL-TIME ALERTS PANEL (5 of 12 columns) */}
        <div className="lg:col-span-5 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col shadow-xl h-[516px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">TACTICAL ALERT QUEUE</h3>
              <span className="px-1.5 py-0.5 bg-[#991b1b] text-white font-mono text-[10px] font-bold rounded">
                14 PENDING
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setAlertFilter('ALL')}
                className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                  alertFilter === 'ALL' ? 'bg-[#06b6d4] text-[#001f26]' : 'text-[#869397] hover:text-[#f8fafc]'
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setAlertFilter('CRIT')}
                className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                  alertFilter === 'CRIT' ? 'bg-[#991b1b] text-white' : 'text-[#869397] hover:text-[#f8fafc]'
                }`}
              >
                CRIT (3)
              </button>
            </div>
          </div>

          {/* Alert Cards Feed */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredAlerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border transition-all ${
                  alert.severity === 'CRITICAL'
                    ? 'bg-[#111827] border-[#ef4444]/60 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                    : alert.severity === 'HIGH'
                    ? 'bg-[#111827] border-[#f59e0b]/50'
                    : 'bg-[#0e1420] border-[#1f2a3e]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        alert.severity === 'CRITICAL'
                          ? 'bg-[#ef4444] animate-ping'
                          : alert.severity === 'HIGH'
                          ? 'bg-[#f59e0b]'
                          : 'bg-[#869397]'
                      }`}
                    />
                    <span
                      className={`px-1.5 py-0.2 rounded font-mono text-[9px] font-bold uppercase ${
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
                      RISK: {alert.riskScore}/100
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#869397]">{alert.timestamp}</span>
                </div>

                <div className="mt-1.5">
                  <h4 className="font-display text-xs font-bold text-[#f8fafc]">{alert.eventType}</h4>
                  <p className="text-[11px] text-[#94a3b8] mt-0.5 line-clamp-2 leading-tight">
                    {alert.location} // <span className="text-[#06b6d4] font-mono">{alert.camera}</span> —{' '}
                    {alert.description}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#1f2a3e] flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#869397]">
                    <span>TARGET: <strong className="text-[#f8fafc]">{alert.targetId || 'UNKNOWN'}</strong></span>
                    <span>•</span>
                    <span className="text-[#10b981] font-semibold">{alert.confidence}% CONF</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onNavigate('incidents')}
                      className="px-2 py-1 bg-[#161f30] hover:bg-[#1e293b] text-[#f8fafc] border border-[#28354d] rounded font-mono text-[10px] font-semibold transition-colors"
                    >
                      View Incident
                    </button>
                    {alert.severity === 'CRITICAL' ? (
                      <button
                        onClick={onOpenDispatch}
                        className="px-2.5 py-1 bg-[#991b1b] hover:bg-[#ef4444] text-white rounded font-mono text-[10px] font-bold uppercase transition-colors"
                      >
                        Dispatch QRF
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onSelectCamera(alert.camera);
                          onNavigate('live-cameras');
                        }}
                        className="px-2.5 py-1 bg-[#06b6d4]/20 hover:bg-[#06b6d4]/30 text-[#06b6d4] rounded font-mono text-[10px] font-bold transition-colors"
                      >
                        Investigate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: LIVE CCTV WALL (4 CHANNELS FOCUS GRID) */}
      <section className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-3 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#1f2a3e]">
          <div className="flex items-center gap-2.5">
            <Video className="w-5 h-5 text-[#06b6d4]" />
            <div>
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">
                LIVE CCTV TACTICAL MATRIX // 4 CHANNELS FOCUS
              </h3>
              <span className="font-mono text-[10px] text-[#10b981]">AI EDGE PIPELINE: 29.4 FPS ACTIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#111827] border border-[#1f2a3e] px-2 py-1 rounded font-mono text-[10px] gap-2 text-[#869397]">
              <span>LAYOUT:</span>
              <button
                onClick={() => setCctvLayout('2x2')}
                className={`font-bold ${cctvLayout === '2x2' ? 'text-[#06b6d4]' : 'hover:text-[#f8fafc]'}`}
              >
                2x2 FOCUS
              </button>
              <span>|</span>
              <button
                onClick={() => onNavigate('live-cameras')}
                className="hover:text-[#06b6d4] transition-colors"
              >
                FULL MATRIX &rarr;
              </button>
            </div>
            <button
              onClick={() => onNavigate('live-cameras')}
              className="p-1.5 bg-[#111827] hover:bg-[#161f30] border border-[#1f2a3e] rounded text-[#869397] hover:text-[#06b6d4] transition-colors"
              title="Open Camera Wall"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Camera Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {cameras.slice(0, 4).map((cam) => {
            const isBreachCam = cam.id === 'CAM-007';
            return (
              <div
                key={cam.id}
                onClick={() => {
                  onSelectCamera(cam.id);
                  onNavigate('live-cameras');
                }}
                className={`bg-[#070a0f] border rounded-lg overflow-hidden relative cursor-pointer group flex flex-col transition-all ${
                  isBreachCam
                    ? 'border-[#ef4444] shadow-[0_0_18px_rgba(239,68,68,0.25)]'
                    : 'border-[#1f2a3e] hover:border-[#06b6d4]'
                }`}
              >
                {/* Top overlay bar */}
                <div className="absolute top-0 left-0 right-0 z-20 bg-[#070a0f]/80 backdrop-blur-sm px-2.5 py-1.5 flex items-center justify-between border-b border-[#1f2a3e]">
                  <div className="flex items-center gap-1.5 font-mono text-[10px]">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isBreachCam ? 'bg-[#ef4444] animate-ping' : 'bg-[#10b981]'
                      }`}
                    />
                    <span className={`font-bold ${isBreachCam ? 'text-[#ef4444]' : 'text-[#f8fafc]'}`}>
                      {cam.id}
                    </span>
                    <span className="text-[#869397] truncate">{cam.sector}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[9px] text-[#869397]">
                    <span
                      className={`px-1 rounded font-bold ${
                        isBreachCam ? 'bg-[#991b1b] text-white' : 'bg-[#161f30] text-[#06b6d4]'
                      }`}
                    >
                      {cam.type.replace('_', ' ')}
                    </span>
                    <span>{cam.fps} FPS</span>
                  </div>
                </div>

                {/* Video Image Container with Overlays */}
                <div className="relative w-full h-48 bg-[#111827] overflow-hidden">
                  <img
                    src={cam.imageUrl}
                    alt={cam.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* AI Target Overlay Boxes */}
                  {cam.targetOverlays?.map((target, idx) => (
                    <div
                      key={idx}
                      className="absolute border-2 pointer-events-none rounded-sm flex flex-col justify-start"
                      style={{
                        top: target.box.top,
                        left: target.box.left,
                        width: target.box.width,
                        height: target.box.height,
                        borderColor: target.color,
                        backgroundColor: `${target.color}15`,
                      }}
                    >
                      <span
                        style={{ backgroundColor: target.color }}
                        className="text-[#001f26] font-mono text-[9px] font-bold px-1 py-0.5 rounded-sm whitespace-nowrap self-start shadow-md"
                      >
                        {target.label}
                      </span>
                    </div>
                  ))}

                  {/* Camera Reticle Bottom Info */}
                  <div className="absolute bottom-1.5 left-2 font-mono text-[9px] bg-[#070a0f]/80 px-1.5 py-0.5 rounded text-[#869397] border border-[#1f2a3e]">
                    {cam.activeAlert ? (
                      <span className="text-[#ef4444] font-bold">{cam.activeAlert}</span>
                    ) : (
                      <span className="text-[#10b981]">SYSTEM NOMINAL</span>
                    )}
                  </div>

                  <div className="absolute bottom-1.5 right-2 flex items-center gap-1 text-[#869397] group-hover:text-[#06b6d4]">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4 & 5: 24H THREAT CHRONOLOGY & BOP NODE TELEMETRY */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 24-HOUR THREAT DISTRIBUTION & CHRONOLOGY (7 of 12 cols) */}
        <div className="lg:col-span-7 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#06b6d4]" />
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">
                24H THREAT DISTRIBUTION & CHRONOLOGY
              </h3>
            </div>
            <span className="font-mono text-[10px] text-[#869397]">AGGREGATED: 284 SIGNALS</span>
          </div>

          {/* Severity Ratio Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-[#869397]">SEVERITY RATIO</span>
              <div className="flex items-center gap-3">
                <span className="text-[#ef4444] font-bold">14% CRIT</span>
                <span className="text-[#f59e0b] font-bold">28% HIGH</span>
                <span className="text-[#06b6d4] font-bold">38% MED</span>
                <span className="text-[#10b981] font-bold">20% LOW</span>
              </div>
            </div>
            <div className="w-full h-2 bg-[#161f30] rounded-full overflow-hidden flex">
              <div className="bg-[#ef4444] h-full" style={{ width: '14%' }} title="Critical: 14%" />
              <div className="bg-[#f59e0b] h-full" style={{ width: '28%' }} title="High: 28%" />
              <div className="bg-[#06b6d4] h-full" style={{ width: '38%' }} title="Medium: 38%" />
              <div className="bg-[#10b981] h-full" style={{ width: '20%' }} title="Low: 20%" />
            </div>
          </div>

          {/* Incident Chronology Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-[10px] text-[#64748b] uppercase border-b border-[#1f2a3e]">
                  <th className="py-2 px-2">TIME (IST)</th>
                  <th className="py-2 px-2">EVENT SIGNATURE</th>
                  <th className="py-2 px-2">ORIGIN</th>
                  <th className="py-2 px-2">SEV</th>
                  <th className="py-2 px-2 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#161f30] text-[11px]">
                <tr className="hover:bg-[#111827] transition-colors">
                  <td className="py-2 px-2 text-[#ef4444] font-bold">02:14:32</td>
                  <td className="py-2 px-2 text-[#f8fafc] font-semibold">Virtual Fence Tripwire Breach</td>
                  <td className="py-2 px-2 text-[#06b6d4]">BOP North // CAM-07</td>
                  <td className="py-2 px-2">
                    <span className="px-1.5 py-0.5 bg-[#991b1b] text-white rounded text-[9px] font-bold">
                      CRIT
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right text-[#ef4444] font-bold">QRF DISPATCHED</td>
                </tr>
                <tr className="hover:bg-[#111827] transition-colors">
                  <td className="py-2 px-2 text-[#f59e0b]">02:09:12</td>
                  <td className="py-2 px-2 text-[#f8fafc]">ANPR Blacklist Stolen Vehicle Match</td>
                  <td className="py-2 px-2 text-[#06b6d4]">Checkpost Alpha // CAM-01</td>
                  <td className="py-2 px-2">
                    <span className="px-1.5 py-0.5 bg-[#f59e0b]/20 text-[#f59e0b] rounded text-[9px] font-bold">
                      HIGH
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right text-[#f59e0b]">INTERCEPT LOCK</td>
                </tr>
                <tr className="hover:bg-[#111827] transition-colors">
                  <td className="py-2 px-2 text-[#869397]">01:58:40</td>
                  <td className="py-2 px-2 text-[#f8fafc]">Border Patrol Unit Alpha Check-in</td>
                  <td className="py-2 px-2 text-[#869397]">Sector-4 Beacon-09</td>
                  <td className="py-2 px-2">
                    <span className="px-1.5 py-0.5 bg-[#10b981]/20 text-[#10b981] rounded text-[9px] font-bold">
                      INFO
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right text-[#10b981]">VERIFIED</td>
                </tr>
                <tr className="hover:bg-[#111827] transition-colors">
                  <td className="py-2 px-2 text-[#869397]">01:42:15</td>
                  <td className="py-2 px-2 text-[#f8fafc]">Thermal Sensor Recalibration (FLIR-B)</td>
                  <td className="py-2 px-2 text-[#869397]">Post Charlie // CAM-14</td>
                  <td className="py-2 px-2">
                    <span className="px-1.5 py-0.5 bg-[#161f30] text-[#869397] rounded text-[9px] font-bold">
                      SYS
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right text-[#869397]">SYNC COMPLETE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* BOP EDGE AI & NODE TELEMETRY (5 of 12 cols) */}
        <div className="lg:col-span-5 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#10b981]" />
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">
                BOP EDGE AI & NODE TELEMETRY
              </h3>
            </div>
            <span className="px-2 py-0.5 bg-[#10b981]/15 text-[#10b981] font-mono text-[10px] rounded font-bold">
              ALL NODES OK
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* BOP North Node */}
            <div className="bg-[#111827] border-l-2 border-[#ef4444] border-t border-r border-b border-[#1f2a3e] p-2.5 rounded">
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs font-bold text-[#f8fafc]">BOP North</span>
                <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
              </div>
              <div className="mt-1.5 space-y-1 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-[#869397]">TPU LOAD:</span>
                  <span className="text-[#ef4444] font-bold">89% (HIGH)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#869397]">STORAGE:</span>
                  <span className="text-[#dfe2ee]">4.2 / 12 TB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#869397]">LINK:</span>
                  <span className="text-[#10b981]">16ms (OFC)</span>
                </div>
              </div>
            </div>

            {/* BOP South Node */}
            <div className="bg-[#111827] border-l-2 border-[#10b981] border-t border-r border-b border-[#1f2a3e] p-2.5 rounded">
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs font-bold text-[#f8fafc]">BOP South</span>
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              </div>
              <div className="mt-1.5 space-y-1 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-[#869397]">TPU LOAD:</span>
                  <span className="text-[#10b981] font-bold">34% (NORM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#869397]">STORAGE:</span>
                  <span className="text-[#dfe2ee]">9.1 / 12 TB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#869397]">LINK:</span>
                  <span className="text-[#10b981]">12ms (OFC)</span>
                </div>
              </div>
            </div>

            {/* Gate A Main Node */}
            <div className="bg-[#111827] border-l-2 border-[#06b6d4] border-t border-r border-b border-[#1f2a3e] p-2.5 rounded">
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs font-bold text-[#f8fafc]">Gate A Main</span>
                <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
              </div>
              <div className="mt-1.5 space-y-1 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-[#869397]">TPU LOAD:</span>
                  <span className="text-[#06b6d4] font-bold">52% (ANPR)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#869397]">STORAGE:</span>
                  <span className="text-[#dfe2ee]">7.8 / 12 TB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#869397]">LINK:</span>
                  <span className="text-[#10b981]">09ms (SAT)</span>
                </div>
              </div>
            </div>

            {/* Checkpost Alpha Node */}
            <div className="bg-[#111827] border-l-2 border-[#f59e0b] border-t border-r border-b border-[#1f2a3e] p-2.5 rounded">
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs font-bold text-[#f8fafc]">Checkpost Alpha</span>
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
              </div>
              <div className="mt-1.5 space-y-1 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-[#869397]">TPU LOAD:</span>
                  <span className="text-[#f59e0b] font-bold">67% (ANPR)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#869397]">STORAGE:</span>
                  <span className="text-[#dfe2ee]">5.4 / 12 TB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#869397]">LINK:</span>
                  <span className="text-[#10b981]">14ms (OFC)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Platoon Dispatch Bar */}
          <div className="mt-auto pt-2 flex items-center justify-between bg-[#111827] border border-[#1f2a3e] px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <ShieldAlert className="w-4 h-4 text-[#ef4444]" />
              <span>
                STANDBY QRF: <strong className="text-[#10b981]">PLATOON-BRAVO</strong> (4 MINS OUT)
              </span>
            </div>
            <button
              onClick={onOpenDispatch}
              className="px-3 py-1 bg-[#991b1b] hover:bg-[#ef4444] text-white rounded font-mono font-bold text-[10px] uppercase tracking-wider transition-colors shadow-sm"
            >
              DISPATCH PLATOON
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
