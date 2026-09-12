import React, { useState } from 'react';
import { SiteBOP, CameraFeed, NavigationPage } from '../types';
import {
  Building2,
  Radio,
  Server,
  HardDrive,
  Wifi,
  Shield,
  Video,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  MapPin,
  Map,
  Grid,
  RefreshCw,
  Download,
  PlusCircle,
  Search,
  Activity,
  Terminal,
  Cpu,
  Flame,
  CheckCircle2,
  X,
} from 'lucide-react';

interface SitesBopsViewProps {
  sites: SiteBOP[];
  cameras: CameraFeed[];
  onNavigate: (page: NavigationPage) => void;
  onSelectCamera: (cameraId: string) => void;
  onOpenDispatch: () => void;
}

export const SitesBopsView: React.FC<SitesBopsViewProps> = ({
  sites,
  cameras,
  onNavigate,
  onSelectCamera,
  onOpenDispatch,
}) => {
  const [activeView, setActiveView] = useState<'GRID' | 'MAP'>('GRID');
  const [selectedSector, setSelectedSector] = useState<string>('All 5 Sectors');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(null), 3500);
  };

  const sectors = [
    'All 5 Sectors',
    'Jammu-Kashmir Line',
    'Punjab Border',
    'Riverine Marsh',
    'Desert Sector',
  ];

  const siteList = [
    {
      id: 'BOP-01',
      name: 'BOP NORTH — SECTOR 04',
      sector: 'Jammu-Kashmir Line',
      code: 'ID: BOP-N4-JK // TACTICAL GRID 04',
      statusTag: 'ALERT STATUS: CRITICAL',
      statusColor: 'bg-[#991b1b] text-white',
      borderAccent: 'border-t-[#ef4444]',
      badgePill: '2 CRIT P1 // 1 HIGH P2',
      coords: '34°12\'44"N 74°08\'11"E',
      elevation: '1,840m MSL · Ridgeline Scrub',
      backbone: '10G Fiber + RF (5ms, 99.98%)',
      compute: '4x Jetson AGX Orin (12.8ms)',
      sensorsOnline: '26/28 ONLINE',
      sensorsFault: '2 OFFLINE (DE-ICING)',
      sensorsPct: 92.8,
      bufferCapacity: '92% CAP (72h Retention)',
      bufferPct: 92,
      activeAlertTitle: 'Breach Alert #IBVAP-2048',
      activeAlertDesc: 'Tripwire Zone 03 breached: 2 targets tracked across Ridge Scrub line',
      primaryAction: 'Dispatch Response Unit',
      primaryActionIcon: AlertTriangle,
      primaryActionClass: 'bg-[#ef4444] text-white hover:bg-[#dc2626]',
      customAction: 'Camera Wall',
    },
    {
      id: 'BOP-02',
      name: 'BOP SOUTH — SECTOR 02',
      sector: 'Punjab Border',
      code: 'ID: BOP-S2-PB // FARMLAND BUFFER 02',
      statusTag: 'ALERT STATUS: NOMINAL',
      statusColor: 'bg-[#10b981]/20 text-[#10b981]',
      borderAccent: 'border-t-[#10b981]',
      badgePill: '1 HIGH P2 // 3 MED P3',
      coords: '33°58\'19"N 74°02\'40"E',
      elevation: '420m MSL · Open Farmland',
      backbone: 'Microwave + Starlink (14ms)',
      compute: '4x Jetson AGX (AI Load: 94.8%)',
      sensorsOnline: '34/36 ONLINE',
      sensorsFault: '2 MAINT SCHEDULED',
      sensorsPct: 94.4,
      bufferCapacity: '61% CAP (Nominal Flow)',
      bufferPct: 61,
      activeAlertTitle: 'Buffer Movement #IBVAP-1981',
      activeAlertDesc: 'After-hours motion at farm wire gate perimeter, thermal camera 12',
      primaryAction: 'ANPR Sentry Gate',
      primaryActionIcon: Shield,
      primaryActionClass: 'bg-[#06b6d4] text-[#001f26] hover:bg-[#0891b2]',
      customAction: 'Camera Wall',
    },
    {
      id: 'CKP-01',
      name: 'GATE A — CHECKPOST ALPHA',
      sector: 'Jammu-Kashmir Line',
      code: 'ID: CKP-A1-JK // HIGHWAY TRANSIT CORRIDOR',
      statusTag: 'TRANSIT ACTIVE',
      statusColor: 'bg-[#06b6d4]/20 text-[#4cd7f6]',
      borderAccent: 'border-t-[#06b6d4]',
      badgePill: '1 CRIT HOTLIST LOCK',
      coords: '34°10\'02"N 74°05\'18"E',
      elevation: '610m MSL · Paved Chokepoint',
      backbone: 'Dual 10G Optical (3ms, 100%)',
      compute: 'Dual RTX 6000 Ada (OCR 4.2)',
      sensorsOnline: '30/30 ONLINE',
      sensorsFault: '100% FULL MESH',
      sensorsPct: 100,
      bufferCapacity: '73% CAP (Under-chassis scans)',
      bufferPct: 73,
      activeAlertTitle: 'HOTLIST LOCK: JK-02-AK-9921',
      activeAlertDesc: 'Black Scorpio · Suspicious Cargo Flagged · Chokepoint barrier armed',
      primaryAction: 'Request Checkpoint Response',
      primaryActionIcon: ShieldAlert,
      primaryActionClass: 'bg-[#991b1b] text-white hover:bg-[#7f1d1d]',
      customAction: 'OCR Live Gate',
    },
    {
      id: 'CKP-02',
      name: 'GATE B — SECONDARY TRANSIT',
      sector: 'Jammu-Kashmir Line',
      code: 'ID: CKP-B2-LOG // CULVERT & EGRESS',
      statusTag: 'PATROL READY',
      statusColor: 'bg-[#31353e] text-[#dfe2ee]',
      borderAccent: 'border-t-[#f59e0b]',
      badgePill: '2 MED P3 LOITERING',
      coords: '34°08\'40"N 74°04\'12"E',
      elevation: '580m MSL · Culvert Egress',
      backbone: 'Starlink Term (42ms, 99.1%)',
      compute: '2x Jetson Orin Nano (16.4ms)',
      sensorsOnline: '22/22 ONLINE',
      sensorsFault: '100% OPERATIONAL',
      sensorsPct: 100,
      bufferCapacity: '44% CAP',
      bufferPct: 44,
      activeAlertTitle: 'Loitering Detected',
      activeAlertDesc: 'Culvert 18: stationary presence > 380 seconds outside curfew wire',
      primaryAction: 'Culvert IR Flood',
      primaryActionIcon: Wifi,
      primaryActionClass: 'bg-[#161f30] text-[#f59e0b] border border-[#f59e0b]/40 hover:bg-[#1e293b]',
      customAction: 'Camera Wall',
    },
    {
      id: 'BOP-03',
      name: 'SECTOR 4 — RIVERINE TANGO',
      sector: 'Riverine Marsh',
      code: 'ID: RIV-T4-WET // MARSH & BOAT BASIN',
      statusTag: 'SPECIAL OPS',
      statusColor: 'bg-[#f59e0b]/20 text-[#f59e0b]',
      borderAccent: 'border-t-[#f59e0b]',
      badgePill: '1 HIGH P2 SONAR TRIP',
      coords: '34°11\'05"N 74°07\'30"E',
      elevation: '720m MSL · River Ingress/Marsh',
      backbone: 'Solar Mesh + UHF Link (28ms)',
      compute: 'Coral TPU + Jetson (FLIR/Sonar)',
      sensorsOnline: '30/32 ONLINE',
      sensorsFault: '2 SOLAR RECHARGING',
      sensorsPct: 93.75,
      bufferCapacity: '58% CAP',
      bufferPct: 58,
      activeAlertTitle: 'Sonar Tripwire Triggered',
      activeAlertDesc: 'Unmanned floating cargo detected moving downstream at 2.4 knots',
      primaryAction: 'FLIR Thermal Sweep',
      primaryActionIcon: Video,
      primaryActionClass: 'bg-[#161f30] text-[#4cd7f6] border border-[#06b6d4]/40 hover:bg-[#1e293b]',
      customAction: 'Patrol Radio',
    },
  ];

  const filteredSites = siteList.filter((s) => {
    if (selectedSector !== 'All 5 Sectors' && s.sector !== selectedSector) return false;
    if (
      searchQuery &&
      !s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !s.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !s.sector.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col p-4 md:p-6 gap-6 text-[#dfe2ee] select-none">
      {/* 1. Top Operational Banner & Controls */}
      <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 md:p-5 flex flex-col gap-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#06b6d4]/20 text-[#4cd7f6] font-mono text-[10px] font-bold uppercase rounded">
                SEC-OP // DIR-09
              </span>
              <span className="text-xs font-mono text-[#869397] uppercase">C2 TACTICAL INFRASTRUCTURE GRID</span>
              <span className="inline-flex items-center gap-1 text-[#10b981] font-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" /> MESH ACTIVE
              </span>
            </div>
            <h1 className="font-display text-lg md:text-xl font-bold text-white tracking-tight mt-1">
              Border Outposts & Tactical Sector Operations — Multi-Site C2
            </h1>
            <p className="font-mono text-xs text-[#869397]">
              Tactical Directory // Forward Operating Outposts (BOPs) & Edge Gateway Nodes // Health & Sensor Grid
            </p>
          </div>

          {/* Action cluster */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-[#111827] border border-[#1f2a3e] p-0.5 rounded-lg">
              <button
                onClick={() => setActiveView('MAP')}
                className={`px-3 py-1.5 rounded font-mono text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeView === 'MAP'
                    ? 'bg-[#06b6d4] text-[#001f26] shadow-sm'
                    : 'text-[#869397] hover:text-white'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Map View</span>
              </button>
              <button
                onClick={() => setActiveView('GRID')}
                className={`px-3 py-1.5 rounded font-mono text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeView === 'GRID'
                    ? 'bg-[#06b6d4] text-[#001f26] shadow-sm'
                    : 'text-[#869397] hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>List / Grid View</span>
              </button>
            </div>

            <button
              onClick={() => showToast('Sync Calibration successfully broadcast to all 148 nodes.')}
              className="px-3 py-1.5 bg-[#161f30] hover:bg-[#1e293b] text-white border border-[#28354d] rounded font-mono text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>Sync Calibration</span>
            </button>

            <button
              onClick={() => showToast('KMZ Tactical Overlay exported to local downloads.')}
              className="px-3 py-1.5 bg-[#161f30] hover:bg-[#1e293b] text-white border border-[#28354d] rounded font-mono text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#869397]" />
              <span>Export KMZ</span>
            </button>

            <button
              onClick={() => showToast('New Edge Node provision wizard initialized.')}
              className="px-3 py-1.5 bg-[#06b6d4] hover:bg-[#0891b2] text-[#001f26] rounded font-mono text-xs font-bold uppercase flex items-center gap-1.5 shadow-sm transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Add Edge BOP Node</span>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 items-center pt-1 border-t border-[#1f2a3e]">
          {/* Search */}
          <div className="xl:col-span-4 relative">
            <Search className="w-4 h-4 text-[#869397] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter BOPs, Gateways, Sectors, IP nodes, Frequencies..."
              className="w-full bg-[#111827] border border-[#1f2a3e] pl-9 pr-8 py-1.5 rounded font-mono text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#06b6d4]"
            />
          </div>

          {/* Sector tags */}
          <div className="xl:col-span-5 flex items-center gap-1.5 overflow-x-auto py-0.5">
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1 rounded font-mono text-xs uppercase whitespace-nowrap transition-colors ${
                  selectedSector === sec
                    ? 'bg-[#161f30] text-[#4cd7f6] border border-[#06b6d4]/40 font-bold'
                    : 'bg-[#111827] text-[#869397] hover:text-white border border-[#1f2a3e]'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* DEFCON pill */}
          <div className="xl:col-span-3 flex items-center justify-end gap-2">
            <div className="flex items-center gap-2 bg-[#991b1b]/30 border border-[#ef4444]/40 px-3 py-1.5 rounded-lg shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
              <div className="flex flex-col font-mono text-[10px]">
                <span className="text-[#ef4444] font-bold uppercase tracking-wider">DEFCON-2 ELEVATED</span>
                <span className="text-[#869397]">Mesh Sync: 100% OK (148/148 Nodes)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Toast Notification */}
      {activeToast && (
        <div className="bg-[#0e7490] text-white px-4 py-2 rounded-lg border border-[#38bdf8] text-xs font-mono font-bold flex items-center justify-between shadow-xl animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>DIRECTIVE:</span>
            <span className="font-normal text-[#e0f2fe]">{activeToast}</span>
          </div>
          <button onClick={() => setActiveToast(null)} className="text-white/80 hover:text-white ml-4">
            ✕
          </button>
        </div>
      )}

      {/* 2. SUMMARY METRIC STRIP (6 HIGH-DENSITY TILES) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="p-3 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl flex flex-col justify-between">
          <div className="text-[10px] text-[#869397] uppercase font-mono">Perimeter Line</div>
          <div className="text-lg font-mono font-bold text-white mt-1">
            142.8 <span className="text-xs text-[#869397]">KM</span>
          </div>
          <div className="text-[10px] text-[#869397] truncate">LoC / Zero Line Direct</div>
        </div>

        <div className="p-3 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl flex flex-col justify-between">
          <div className="text-[10px] text-[#869397] uppercase font-mono">Tactical Sites</div>
          <div className="text-lg font-mono font-bold text-[#10b981] mt-1">
            05 <span className="text-xs">FOB/BOP</span>
          </div>
          <div className="text-[10px] text-[#10b981] truncate">5 Forward Outposts Online</div>
        </div>

        <div className="p-3 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl flex flex-col justify-between">
          <div className="text-[10px] text-[#869397] uppercase font-mono">Optical Feeds</div>
          <div className="text-lg font-mono font-bold text-white mt-1">
            142<span className="text-xs text-[#869397]"> /148</span>
          </div>
          <div className="text-[10px] text-[#10b981] truncate">95.9% Live (6 Maint/Ice)</div>
        </div>

        <div className="p-3 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl flex flex-col justify-between">
          <div className="text-[10px] text-[#869397] uppercase font-mono">Edge TPU / AI</div>
          <div className="text-lg font-mono font-bold text-[#4cd7f6] mt-1">99.2%</div>
          <div className="text-[10px] text-[#869397] truncate">Jetson AGX & RTX 6000</div>
        </div>

        <div className="p-3 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl flex flex-col justify-between">
          <div className="text-[10px] text-[#869397] uppercase font-mono">Active Alerts</div>
          <div className="text-lg font-mono font-bold text-[#ef4444] mt-1">
            14 <span className="text-xs">ACT</span>
          </div>
          <div className="text-[10px] text-[#ef4444] truncate">3 Critical P1 Breaches</div>
        </div>

        <div className="p-3 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl flex flex-col justify-between">
          <div className="text-[10px] text-[#869397] uppercase font-mono">Backbone Mesh</div>
          <div className="text-lg font-mono font-bold text-[#10b981] mt-1">
            12 <span className="text-xs text-[#869397]">ms</span>
          </div>
          <div className="text-[10px] text-[#869397] truncate">Fiber Primary + Starlink</div>
        </div>
      </div>

      {/* 3. SITE CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
        {filteredSites.map((site) => {
          const ActionIcon = site.primaryActionIcon;
          return (
            <div
              key={site.id}
              className={`bg-[#0b0f17] border border-[#1f2a3e] ${site.borderAccent} border-t-2 rounded-xl p-4 flex flex-col justify-between gap-4 shadow-xl relative`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
                      <h3 className="font-display text-sm font-bold text-white truncate">{site.name}</h3>
                    </div>
                    <div className="font-mono text-[11px] text-[#06b6d4] mt-0.5">{site.code}</div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase ${site.statusColor}`}>
                      {site.statusTag}
                    </span>
                    <span className="font-mono text-[10px] text-[#869397] mt-0.5">{site.badgePill}</span>
                  </div>
                </div>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 bg-[#111827] border border-[#1f2a3e] rounded font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-[#869397] block">COORDINATES</span>
                    <span className="text-white font-bold">{site.coords}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#869397] block">ELEVATION / TERRAIN</span>
                    <span className="text-[#869397]">{site.elevation}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#869397] block">BACKBONE / LATENCY</span>
                    <span className="text-[#10b981] font-bold">{site.backbone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#869397] block">EDGE AI COMPUTE</span>
                    <span className="text-[#4cd7f6]">{site.compute}</span>
                  </div>
                </div>

                {/* Sensor and storage bars */}
                <div className="mt-3 space-y-2 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#869397]">OPTICAL SENSORS ({site.sensorsOnline})</span>
                      <span className="text-[#ef4444] font-bold">{site.sensorsFault}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1f2a3e] rounded-full overflow-hidden">
                      <div className="bg-[#10b981] h-full rounded-full" style={{ width: `${site.sensorsPct}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#869397]">NVMe STORAGE BUFFER</span>
                      <span className="text-[#f59e0b] font-bold">{site.bufferCapacity}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1f2a3e] rounded-full overflow-hidden">
                      <div className="bg-[#f59e0b] h-full rounded-full" style={{ width: `${site.bufferPct}%` }} />
                    </div>
                  </div>
                </div>

                {/* Threat banner */}
                <div className="mt-3 p-2.5 bg-[#161f30] border border-[#28354d] rounded-lg flex items-center gap-2.5 font-mono">
                  <AlertTriangle className="w-4 h-4 text-[#ef4444] shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-[#ef4444] font-bold uppercase">{site.activeAlertTitle}</div>
                    <div className="text-[10px] text-[#869397] truncate">{site.activeAlertDesc}</div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 border-t border-[#1f2a3e] flex items-center justify-between gap-2 font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onNavigate('live-cameras')}
                    className="px-2.5 py-1 bg-[#161f30] hover:bg-[#1e293b] text-white border border-[#28354d] rounded flex items-center gap-1"
                  >
                    <Video className="w-3.5 h-3.5 text-[#06b6d4]" />
                    <span>Camera Wall</span>
                  </button>
                  <button
                    onClick={() => setIsConsoleOpen(true)}
                    className="px-2.5 py-1 bg-[#161f30] hover:bg-[#1e293b] text-white border border-[#28354d] rounded flex items-center gap-1"
                  >
                    <Activity className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>Diagnostics</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    showToast(`${site.primaryAction} directive transmitted to ${site.name}.`);
                    if (site.primaryAction === 'Deploy QRF') onOpenDispatch();
                  }}
                  className={`px-3 py-1 rounded font-bold uppercase flex items-center gap-1 shadow-sm ${site.primaryActionClass}`}
                >
                  <ActionIcon className="w-3.5 h-3.5" />
                  <span>{site.primaryAction}</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Mesh Summary Tile */}
        <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col justify-between gap-4 shadow-xl">
          <div className="space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-[#06b6d4]" />
                <h3 className="font-display text-sm font-bold text-white">TACTICAL MESH TOPOLOGY</h3>
              </div>
              <span className="px-2 py-0.5 bg-[#10b981]/20 text-[#10b981] text-[10px] font-bold rounded">
                100% ROUTABLE
              </span>
            </div>
            <p className="text-xs text-[#869397] leading-relaxed">
              Zero-Trust border mesh active across all 5 operational sectors. Automatic edge failover reroutes packets over UHF/Starlink in case of fiber interdiction within 400ms.
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="p-2 bg-[#111827] rounded flex justify-between">
                <span className="text-[#869397]">PRIMARY CORE FIBER:</span>
                <span className="text-[#10b981] font-bold">ONLINE (10 Gbps)</span>
              </div>
              <div className="p-2 bg-[#111827] rounded flex justify-between">
                <span className="text-[#869397]">STARLINK REDUNDANCY:</span>
                <span className="text-[#06b6d4] font-bold">ARMED (4x Dishes)</span>
              </div>
              <div className="p-2 bg-[#111827] rounded flex justify-between">
                <span className="text-[#869397]">DEFENSE CRYPTO:</span>
                <span className="text-white font-bold">AES-256 GCM</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#1f2a3e] flex items-center justify-between text-xs font-mono">
            <span className="text-[#869397]">FIRMWARE: v4.2.8-PROD</span>
            <button
              onClick={() => showToast('Mesh network integrity self-test passed across all 148 nodes.')}
              className="px-3 py-1 bg-[#161f30] hover:bg-[#1e293b] text-[#06b6d4] border border-[#06b6d4]/40 font-bold rounded"
            >
              Mesh Self-Test
            </button>
          </div>
        </div>
      </div>

      {/* 4. GIS VECTOR MAP & HARDWARE TELEMETRY MATRIX (SPLIT) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* LEFT: GIS Map (5 Cols) */}
        <div className="xl:col-span-5 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#06b6d4]" />
              <h3 className="font-display text-sm font-bold text-white uppercase">Perimeter Vector Layout (GIS)</h3>
            </div>
            <span className="text-[11px] font-mono text-[#869397]">SECTOR-04 TO SECTOR-02</span>
          </div>

          {/* Inline SVG Tactical Map Canvas */}
          <div className="relative w-full h-80 bg-[#070a0f] border border-[#1f2a3e] rounded-lg overflow-hidden p-2 flex items-center justify-center">
            <svg className="w-full h-full text-[#1f2a3e]" viewBox="0 0 600 340">
              <defs>
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridPattern)" />

              {/* Zero Line */}
              <path
                d="M 40,280 C 140,240 220,180 290,130 C 360,80 440,60 550,50"
                fill="none"
                stroke="#ffb4ab"
                strokeWidth="2"
                strokeDasharray="6,4"
                opacity="0.8"
              />
              <text x="450" y="40" fill="#ffb4ab" fontFamily="monospace" fontSize="10">
                ZERO LINE / LoC
              </text>

              {/* Mesh Links */}
              <path d="M 80,240 L 210,180 L 320,150 L 460,100 L 510,70" fill="none" stroke="#4cd7f6" strokeWidth="1.5" opacity="0.6" />
              <path d="M 210,180 L 260,250 L 320,150" fill="none" stroke="#4edea3" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />

              {/* Breach Polygon */}
              <polygon
                points="440,80 500,60 520,110 450,130"
                fill="rgba(239, 68, 68, 0.2)"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="3,2"
              />
              <text x="440" y="145" fill="#ffb4ab" fontFamily="monospace" fontSize="9" fontWeight="bold">
                BREACH ZONE #2048
              </text>

              {/* Nodes */}
              <g transform="translate(480, 85)" className="cursor-pointer" onClick={() => showToast('Focusing on BOP NORTH.')}>
                <circle r="12" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" />
                <circle r="4" fill="#ef4444" />
                <text x="18" y="4" fill="#dfe2ee" fontFamily="sans-serif" fontSize="11" fontWeight="bold">
                  BOP NORTH
                </text>
                <text x="18" y="16" fill="#ffb4ab" fontFamily="monospace" fontSize="9">
                  P1 CRIT (26/28)
                </text>
              </g>

              <g transform="translate(330, 145)" className="cursor-pointer" onClick={() => showToast('Focusing on RIVERINE TANGO.')}>
                <circle r="10" fill="rgba(255, 185, 95, 0.2)" stroke="#ffb95f" strokeWidth="1.5" />
                <circle r="3.5" fill="#ffb95f" />
                <text x="16" y="2" fill="#dfe2ee" fontFamily="sans-serif" fontSize="11" fontWeight="bold">
                  RIVERINE TANGO
                </text>
                <text x="16" y="14" fill="#ffb95f" fontFamily="monospace" fontSize="9">
                  SONAR TRIP (30/32)
                </text>
              </g>

              <g transform="translate(260, 240)" className="cursor-pointer" onClick={() => showToast('Focusing on GATE A CHECKPOST.')}>
                <circle r="10" fill="rgba(6, 182, 212, 0.2)" stroke="#4cd7f6" strokeWidth="1.5" />
                <circle r="3.5" fill="#4cd7f6" />
                <text x="16" y="2" fill="#dfe2ee" fontFamily="sans-serif" fontSize="11" fontWeight="bold">
                  GATE A (ALPHA)
                </text>
                <text x="16" y="14" fill="#4cd7f6" fontFamily="monospace" fontSize="9">
                  ANPR CHOKE (30/30)
                </text>
              </g>

              <g transform="translate(80, 240)" className="cursor-pointer" onClick={() => showToast('Focusing on BOP SOUTH.')}>
                <circle r="10" fill="rgba(78, 222, 163, 0.2)" stroke="#4edea3" strokeWidth="1.5" />
                <circle r="3.5" fill="#4edea3" />
                <text x="16" y="2" fill="#dfe2ee" fontFamily="sans-serif" fontSize="11" fontWeight="bold">
                  BOP SOUTH
                </text>
                <text x="16" y="14" fill="#4edea3" fontFamily="monospace" fontSize="9">
                  NOMINAL (34/36)
                </text>
              </g>
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-[#869397] pt-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#ef4444]" /> Critical
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> Warning
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" /> Nominal
              </span>
            </div>
            <span>5 OUTPOST NODES CONFIGURED</span>
          </div>
        </div>

        {/* RIGHT: Real-time Hardware Telemetry Matrix Table (7 Cols) */}
        <div className="xl:col-span-7 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#10b981]" />
              <h3 className="font-display text-sm font-bold text-white uppercase">
                Edge Gateway Nodes & Hardware Telemetry
              </h3>
            </div>
            <span className="text-xs font-mono text-[#10b981]">IBVAP Core Edge v4.2.8</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-[#869397] uppercase border-b border-[#1f2a3e]">
                  <th className="py-2 px-3">Node / Site</th>
                  <th className="py-2 px-3">Subnet</th>
                  <th className="py-2 px-3">AI Compute</th>
                  <th className="py-2 px-3">GPU Temp</th>
                  <th className="py-2 px-3">Inference</th>
                  <th className="py-2 px-3">Failover</th>
                  <th className="py-2 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2a3e] text-[11px]">
                <tr className="hover:bg-[#111827] transition-colors">
                  <td className="py-2 px-3 text-white font-bold">BOP North (Sec 04)</td>
                  <td className="py-2 px-3 text-[#869397]">10.14.40.0/24</td>
                  <td className="py-2 px-3 text-[#06b6d4]">4x Jetson AGX</td>
                  <td className="py-2 px-3 text-[#10b981]">51°C</td>
                  <td className="py-2 px-3 text-white">12.8ms</td>
                  <td className="py-2 px-3 text-[#10b981]">RF Microwave OK</td>
                  <td className="py-2 px-3 text-right">
                    <span className="px-1.5 py-0.5 bg-[#991b1b] text-white rounded text-[9px] font-bold">CRIT P1</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#111827] transition-colors">
                  <td className="py-2 px-3 text-white font-bold">BOP South (Sec 02)</td>
                  <td className="py-2 px-3 text-[#869397]">10.14.20.0/24</td>
                  <td className="py-2 px-3 text-[#06b6d4]">4x Jetson AGX</td>
                  <td className="py-2 px-3 text-[#10b981]">48°C</td>
                  <td className="py-2 px-3 text-white">14.1ms</td>
                  <td className="py-2 px-3 text-[#10b981]">Starlink Standby</td>
                  <td className="py-2 px-3 text-right">
                    <span className="px-1.5 py-0.5 bg-[#10b981]/20 text-[#10b981] rounded text-[9px] font-bold">NOMINAL</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#111827] transition-colors">
                  <td className="py-2 px-3 text-white font-bold">Gate A (Checkpost Alpha)</td>
                  <td className="py-2 px-3 text-[#869397]">10.14.10.0/24</td>
                  <td className="py-2 px-3 text-[#06b6d4]">2x RTX 6000 Ada</td>
                  <td className="py-2 px-3 text-[#f59e0b]">56°C</td>
                  <td className="py-2 px-3 text-white">6.2ms</td>
                  <td className="py-2 px-3 text-[#10b981]">10G Redundant OK</td>
                  <td className="py-2 px-3 text-right">
                    <span className="px-1.5 py-0.5 bg-[#06b6d4]/20 text-[#4cd7f6] rounded text-[9px] font-bold">TRANSIT</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#111827] transition-colors">
                  <td className="py-2 px-3 text-white font-bold">Gate B (Secondary Egress)</td>
                  <td className="py-2 px-3 text-[#869397]">10.14.12.0/24</td>
                  <td className="py-2 px-3 text-[#06b6d4]">2x Orin Nano</td>
                  <td className="py-2 px-3 text-[#10b981]">46°C</td>
                  <td className="py-2 px-3 text-white">16.4ms</td>
                  <td className="py-2 px-3 text-[#10b981]">Starlink Active</td>
                  <td className="py-2 px-3 text-right">
                    <span className="px-1.5 py-0.5 bg-[#10b981]/20 text-[#10b981] rounded text-[9px] font-bold">NOMINAL</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#111827] transition-colors">
                  <td className="py-2 px-3 text-white font-bold">Sector 4 (Riverine Marsh)</td>
                  <td className="py-2 px-3 text-[#869397]">10.14.44.0/24</td>
                  <td className="py-2 px-3 text-[#06b6d4]">Coral TPU</td>
                  <td className="py-2 px-3 text-[#10b981]">49°C</td>
                  <td className="py-2 px-3 text-white">18.2ms</td>
                  <td className="py-2 px-3 text-[#f59e0b]">UHF Solar Mesh</td>
                  <td className="py-2 px-3 text-right">
                    <span className="px-1.5 py-0.5 bg-[#f59e0b]/20 text-[#f59e0b] rounded text-[9px] font-bold">ALERT P2</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-[#1f2a3e] flex items-center justify-between font-mono text-xs">
            <span className="text-[#869397]">148/148 NODES SYNCED • GCM-256</span>
            <button
              onClick={() => setIsConsoleOpen(true)}
              className="px-3 py-1.5 bg-[#161f30] hover:bg-[#1e293b] text-white border border-[#28354d] rounded flex items-center gap-1.5 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>Open Edge Hardware Console</span>
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Hardware Console Modal */}
      {isConsoleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
          <div className="w-full max-w-3xl bg-[#070a0f] border border-[#28354d] rounded-xl shadow-2xl overflow-hidden font-mono flex flex-col">
            <div className="p-3 bg-[#111827] border-b border-[#1f2a3e] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#06b6d4]" />
                <span className="font-bold text-white uppercase">IBVAP Core Edge Terminal // SSH Shell Session</span>
              </div>
              <button
                onClick={() => setIsConsoleOpen(false)}
                className="p-1 text-[#869397] hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-[#05080c] text-xs text-[#10b981] space-y-1.5 max-h-96 overflow-y-auto">
              <div>[IBVAP-INIT] Connecting to Gateway 10.14.40.1 (BOP-North-Edge-Orin)...</div>
              <div>[SEC-AUTH] FIPS-140-2 Level 4 key verified for Insp. R. Verma. Session lease: 8h.</div>
              <div>[STATUS] 4x NVIDIA Jetson AGX Orin 64GB detected. CUDA 12.2, TensorRT 9.4.</div>
              <div>[V-FENCE] Zone 03 Tripwire trigger running at 30.2 FPS (batch=4, latency=12.8ms).</div>
              <div className="text-[#ef4444]">[WARN-04] Tripwire 03 low-stance crawl detected at coords [34.1244°N, 74.0811°E].</div>
              <div className="text-[#06b6d4]">[RE-ID] Embedding vector hash: #0f8b7e29a1 committed to Merkle ledger.</div>
              <div>[MESH] Secondary Starlink terminal: Online (Latency: 14ms, Packet loss: 0.00%).</div>
              <div className="text-white animate-pulse">&gt; root@ibvap-edge-node04:~# _</div>
            </div>

            <div className="p-3 bg-[#111827] border-t border-[#1f2a3e] flex justify-between items-center text-xs">
              <span className="text-[#869397]">Press ESC or click close to return to operations</span>
              <button
                onClick={() => {
                  showToast('Hardware diagnostics bundle downloaded.');
                  setIsConsoleOpen(false);
                }}
                className="px-3 py-1 bg-[#06b6d4] text-[#001f26] font-bold rounded"
              >
                Export Diagnostics Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
