import React, { useState } from 'react';
import { WatchlistPerson, WatchlistVehicle, NavigationPage } from '../types';

interface WatchlistsViewProps {
  persons?: WatchlistPerson[];
  vehicles?: WatchlistVehicle[];
  onNavigate: (page: NavigationPage) => void;
  onSelectCamera: (cameraId: string) => void;
}

export const WatchlistsView: React.FC<WatchlistsViewProps> = ({
  onNavigate,
  onSelectCamera,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [sirenActive, setSirenActive] = useState(false);
  const [barrierState, setBarrierState] = useState<'UP' | 'DEPLOYING' | 'LOWERED'>('UP');
  const [activeSpikeRow, setActiveSpikeRow] = useState<string | null>(null);

  // Modals
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [dossierTarget, setDossierTarget] = useState<any | null>(null);
  const [ocrPreviewTarget, setOcrPreviewTarget] = useState<any | null>(null);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Add person form state
  const [formPersonName, setFormPersonName] = useState('');
  const [formPersonAlias, setFormPersonAlias] = useState('');
  const [formPersonCategory, setFormPersonCategory] = useState('RED NOTICE • INFILTRATION');

  // Add vehicle form state
  const [formPlate, setFormPlate] = useState('');
  const [formModel, setFormModel] = useState('');
  const [formCategory, setFormCategory] = useState('STOLEN // WEAPONS SUSPECT');

  const triggerToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleSirenToggle = () => {
    setSirenActive(!sirenActive);
    triggerToast(sirenActive ? 'SOC Alert Tone Silenced' : 'Tactical Alert Tone Broadcast Initiated across Sector-04');
  };

  const handleBarrierToggle = () => {
    if (barrierState === 'UP') {
      setBarrierState('DEPLOYING');
      setTimeout(() => {
        setBarrierState('LOWERED');
        triggerToast('Checkpoint Security Barrier: OPENED (Traffic Normal)');
      }, 1200);
    } else {
      setBarrierState('DEPLOYING');
      setTimeout(() => {
        setBarrierState('UP');
        triggerToast('Checkpoint Security Barrier: SECURED (Intercept Protocol Active)');
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col w-full text-[#dfe2ee] select-none pb-12">
      {/* NOTIFICATION TOAST */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161f30] border border-[#06b6d4] text-[#f8fafc] px-4 py-2.5 rounded shadow-2xl flex items-center gap-3 font-mono text-xs animate-fadeIn">
          <span className="material-symbols-outlined text-[#06b6d4] text-[18px]">verified</span>
          <span>{notificationToast}</span>
        </div>
      )}

      {/* TOP TELEMETRY RIBBON & MISSION HEADER */}
      <div className="w-full bg-[#181c24] px-4 lg:px-6 py-3 border-b border-[#1f2a3e] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Breadcrumb & Title Area */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#869397] font-mono text-[10px] uppercase tracking-widest">
              <span>TACTICAL DIRECTORY</span>
              <span>//</span>
              <span className="text-[#4cd7f6]">INTELLIGENCE & WATCHLIST REGISTRY</span>
              <span>//</span>
              <span className="text-[#4edea3]">ENCRYPTED LEDGER</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="font-display text-xl lg:text-2xl text-[#dfe2ee] tracking-tight uppercase font-bold">
                Tactical Watchlist Registry — Facial & ANPR Biometrics
              </h1>
              <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-[#31353e]">
                <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
                <span className="font-mono text-[10px] text-[#ef4444] font-bold uppercase tracking-wider">
                  1 ACTIVE INTERCEPT LOCK
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-[#bcc9cd]">
              <span className="text-[#dfe2ee] font-semibold">184 ACTIVE FACE TARGETS</span>
              <span className="text-[#869397]">•</span>
              <span className="text-[#dfe2ee] font-semibold">62 ANPR HOTLIST VEHICLES</span>
              <span className="text-[#869397]">•</span>
              <span className="text-[#4edea3]">SYNCED WITH IB / CCTNS / NATGRID (HASH: 8F2A)</span>
              <span className="text-[#869397]">•</span>
              <span className="text-[#869397]">VECTOR REFRESH: 42s AGO</span>
            </div>
          </div>

          {/* Action Button Group */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <button
              onClick={() => setShowAddPersonModal(true)}
              className="flex items-center gap-1.5 bg-[#4cd7f6] text-[#003640] hover:bg-[#acedff] font-mono text-xs font-bold px-3 py-2 rounded shadow-sm transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              <span>+ ADD PERSON TARGET</span>
            </button>
            <button
              onClick={() => setShowAddVehicleModal(true)}
              className="flex items-center gap-1.5 bg-[#262a33] text-[#dfe2ee] hover:bg-[#31353e] font-mono text-xs font-semibold px-3 py-2 rounded shadow-sm transition-colors border border-[#3d494c]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">directions_car</span>
              <span>+ ADD BLACKLIST VEHICLE</span>
            </button>
            <button
              onClick={() => triggerToast('IB & CCTNS National Database Synced. 184 facial embeddings verified.')}
              className="flex items-center gap-1.5 bg-[#262a33] text-[#bcc9cd] hover:text-[#dfe2ee] hover:bg-[#31353e] font-mono text-xs px-2.5 py-2 rounded transition-colors"
              title="Sync with IB / CCTNS databases"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">sync_saved_locally</span>
              <span>IMPORT IB/CCTNS</span>
            </button>
            <button
              onClick={() => triggerToast('Exported Watchlist Vectors & Coordinates as KMZ / JSON archive.')}
              className="flex items-center gap-1.5 bg-[#262a33] text-[#bcc9cd] hover:text-[#dfe2ee] hover:bg-[#31353e] font-mono text-xs px-2.5 py-2 rounded transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>EXPORT KMZ/JSON</span>
            </button>
            <button
              onClick={() => triggerToast('Mesh sync: 148 of 148 distributed edge nodes refreshed in 180ms.')}
              className="flex items-center gap-1.5 bg-[#262a33] text-[#4edea3] hover:bg-[#31353e] font-mono text-xs px-2.5 py-2 rounded transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">cell_tower</span>
              <span>SYNC EDGE (148/148)</span>
            </button>
          </div>
        </div>
      </div>

      {/* INTERCEPT LOCK CRITICAL BANNER (PULSING TACTICAL ALERT) */}
      <div className="w-full bg-[#93000a] text-[#ffdad6] px-4 lg:px-6 py-2.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 shadow-md border-b border-[#ef4444]/40">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-1.5 bg-[#ef4444] text-[#070a0f] rounded flex items-center justify-center animate-pulse shrink-0">
            <span className="material-symbols-outlined text-[20px]">e911_emergency</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display text-sm font-bold tracking-tight text-white">
                CRITICAL THREAT INTERCEPT TRIGGERED
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#0a0e16] text-[#ef4444] font-bold">
                MATCH CONFIDENCE 94.2%
              </span>
              <span className="font-mono text-[10px] text-[#ffdad6]/80">
                SENSOR: FLIR LWIR • SECTOR-04 RIDGE [CAM-004]
              </span>
            </div>
            <p className="text-xs text-[#ffdad6]/90 truncate">
              Target #T-904 [Asif R. / &apos;Al-Kashmir&apos;] detected traversing Perimeter Line K-9. Linked vehicle JK-02-AK-9921 held at Checkpost Alpha.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            onClick={handleSirenToggle}
            className={`flex items-center gap-1 px-3 py-1 rounded font-mono text-[11px] font-bold tracking-wider uppercase transition-colors ${
              sirenActive ? 'bg-[#ffb4ab] text-[#690005]' : 'bg-[#0a0e16] text-[#ffb4ab] hover:bg-[#181c24]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">{sirenActive ? 'volume_off' : 'volume_up'}</span>
            <span>{sirenActive ? 'SILENCE ALERT' : 'ACTIVATE ALERT TONE'}</span>
          </button>
          <button
            onClick={handleBarrierToggle}
            className="flex items-center gap-1 bg-[#ef4444] hover:bg-[#ffb4ab] text-white hover:text-[#690005] px-3 py-1 rounded font-mono text-[11px] font-bold tracking-wider uppercase shadow-sm transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>{barrierState === 'LOWERED' ? 'OPEN CHECKPOINT BARRIER' : 'SECURE CHECKPOINT BARRIER'}</span>
          </button>
        </div>
      </div>

      {/* SEARCH & ADVANCED FILTER DOCK */}
      <div className="px-4 lg:px-6 py-3 bg-[#0a0e16] border-b border-[#1f2a3e]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
          {/* Search input */}
          <div className="md:col-span-5 relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#869397]">
              fingerprint
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#181c24] pl-10 pr-16 py-2 rounded text-[#dfe2ee] text-xs placeholder:text-[#869397] focus:outline-none focus:ring-1 focus:ring-[#4cd7f6] border border-[#1f2a3e]"
              placeholder="Search Target Name, Alias, Plate Number, Chassis, Threat Category, Sensor..."
              type="text"
            />
            <span className="absolute right-2.5 top-2 px-1.5 py-0.5 bg-[#31353e] text-[#869397] font-mono text-[10px] rounded">
              ⌘K
            </span>
          </div>

          {/* Threat Category Filter */}
          <div className="md:col-span-2">
            <div className="relative bg-[#181c24] rounded px-3 py-1.5 flex items-center justify-between cursor-pointer border border-[#1f2a3e]">
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[9px] text-[#869397] uppercase tracking-wider leading-none">
                  CATEGORY
                </span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-xs text-[#dfe2ee] font-medium truncate focus:outline-none cursor-pointer pr-4"
                >
                  <option value="ALL" className="bg-[#181c24] text-[#dfe2ee]">All Threat Classes</option>
                  <option value="INFILTRATION" className="bg-[#181c24] text-[#dfe2ee]">Red Notice Infiltration</option>
                  <option value="ARMS" className="bg-[#181c24] text-[#dfe2ee]">Arms Transit</option>
                  <option value="NARCO" className="bg-[#181c24] text-[#dfe2ee]">Narco-Contraband</option>
                  <option value="SPOTTER" className="bg-[#181c24] text-[#dfe2ee]">Suspected Spotter</option>
                </select>
              </div>
            </div>
          </div>

          {/* Operational Status Filter */}
          <div className="md:col-span-2">
            <div className="relative bg-[#181c24] rounded px-3 py-1.5 flex items-center justify-between cursor-pointer border border-[#1f2a3e]">
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[9px] text-[#869397] uppercase tracking-wider leading-none">
                  STATUS
                </span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-transparent text-xs text-[#dfe2ee] font-medium truncate focus:outline-none cursor-pointer pr-4"
                >
                  <option value="ALL" className="bg-[#181c24] text-[#dfe2ee]">Active & Wanted Leads</option>
                  <option value="HIT" className="bg-[#181c24] text-[#dfe2ee]">Active Intercept Hit</option>
                  <option value="MONITORED" className="bg-[#181c24] text-[#dfe2ee]">Escalated Monitored</option>
                  <option value="DETAINED" className="bg-[#181c24] text-[#dfe2ee]">Barrier Detained</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sector / Match Sensor Filter */}
          <div className="md:col-span-2">
            <div className="relative bg-[#181c24] rounded px-3 py-1.5 flex items-center justify-between cursor-pointer border border-[#1f2a3e]">
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[9px] text-[#869397] uppercase tracking-wider leading-none">
                  SECTOR / NODE
                </span>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="bg-transparent text-xs text-[#dfe2ee] font-medium truncate focus:outline-none cursor-pointer pr-4"
                >
                  <option value="ALL" className="bg-[#181c24] text-[#dfe2ee]">Sector-04 (Jammu Line)</option>
                  <option value="SEC02" className="bg-[#181c24] text-[#dfe2ee]">Sector-02 (South Ridge)</option>
                  <option value="GATE" className="bg-[#181c24] text-[#dfe2ee]">Checkpost Alpha</option>
                  <option value="RIVER" className="bg-[#181c24] text-[#dfe2ee]">Riverine Tango Axis</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="md:col-span-1 flex items-center justify-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedStatus('ALL');
                setSelectedSector('ALL');
                triggerToast('Search filters reset to default');
              }}
              className="w-full py-2 bg-[#1c2028] text-[#bcc9cd] hover:text-[#dfe2ee] hover:bg-[#262a33] rounded font-mono text-[10px] flex items-center justify-center gap-1 border border-[#1f2a3e]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">filter_alt_off</span>
              <span>RESET</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN OPERATIONAL GRID */}
      <div className="p-4 lg:p-6 space-y-6">
        {/* TOP TACTICAL TELEMETRY CARDS (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: 24h Face Inferences */}
          <div className="bg-[#181c24] p-4 rounded flex flex-col justify-between shadow-sm relative overflow-hidden border border-[#1f2a3e]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
                24H FACIAL INFERENCES
              </span>
              <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">face</span>
            </div>
            <div className="my-1.5 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold font-mono text-[#dfe2ee]">12,480</span>
              <span className="font-mono text-[11px] text-[#4edea3] font-semibold">+14.2%</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-[#bcc9cd]">
              <span>98.6% Vector Confidence</span>
              <span className="text-[#4cd7f6] font-bold">4 Hits Flagged</span>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none text-[#4cd7f6]">
              <span className="material-symbols-outlined text-[80px]">face</span>
            </div>
          </div>

          {/* Card 2: 24h ANPR Reads */}
          <div className="bg-[#181c24] p-4 rounded flex flex-col justify-between shadow-sm relative overflow-hidden border border-[#1f2a3e]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
                24H ANPR OCR READS
              </span>
              <span className="material-symbols-outlined text-[18px] text-[#ffb95f]">pin</span>
            </div>
            <div className="my-1.5 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold font-mono text-[#dfe2ee]">4,820</span>
              <span className="font-mono text-[11px] text-[#4edea3] font-semibold">99.1% OCR Valid</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-[#bcc9cd]">
              <span>Checkpost Alpha • Gate 02</span>
              <span className="text-[#ef4444] font-bold">1 Active Lock</span>
            </div>
          </div>

          {/* Card 3: Edge Nodes Cache Sync */}
          <div className="bg-[#181c24] p-4 rounded flex flex-col justify-between shadow-sm relative overflow-hidden border border-[#1f2a3e]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
                EDGE EMBEDDING CACHE
              </span>
              <span className="material-symbols-outlined text-[18px] text-[#4edea3]">memory</span>
            </div>
            <div className="my-1.5 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold font-mono text-[#4edea3]">148 / 148</span>
              <span className="font-mono text-[11px] text-[#4edea3] font-semibold">100% MESH</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-[#bcc9cd]">
              <span>Local Vector DB (Milvus v2.4)</span>
              <span className="text-[#869397]">0 Failures</span>
            </div>
          </div>

          {/* Card 4: Federated Intelligence */}
          <div className="bg-[#181c24] p-4 rounded flex flex-col justify-between shadow-sm relative overflow-hidden border border-[#1f2a3e]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
                FEDERATED INTELLIGENCE
              </span>
              <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">cloud_sync</span>
            </div>
            <div className="my-1.5 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold font-mono text-[#4cd7f6]">CCTNS-LIVE</span>
              <span className="font-mono text-[11px] text-[#869397]">512-D RESNET</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-[#bcc9cd]">
              <span>Inter-Agency Match Latency</span>
              <span className="text-[#4edea3] font-bold">&lt; 120ms</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: FACIAL BIOMETRICS WATCHLIST */}
        <div className="bg-[#181c24] rounded shadow-sm overflow-hidden flex flex-col border border-[#1f2a3e]">
          {/* Section Header */}
          <div className="p-4 bg-[#1c2028] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#4cd7f6] rounded-xs" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-base text-[#dfe2ee] font-bold uppercase tracking-tight">
                    Biometric Face Watchlist
                  </h2>
                  <span className="px-2 py-0.5 bg-[#31353e] text-[#4cd7f6] font-mono text-[10px] rounded font-bold">
                    184 REPUTATION PROFILES
                  </span>
                </div>
                <p className="text-xs text-[#bcc9cd]">
                  Deep Metric Learning Embeddings active across 148 perimeter edge cameras & PTZ optical arrays.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#869397] uppercase text-[10px]">SORT: RECENT DETECTIONS</span>
              <button
                onClick={() => triggerToast('Sorted by biometric detection timestamp')}
                className="p-1.5 bg-[#31353e] hover:bg-[#353942] text-[#dfe2ee] rounded"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-[#31353e]/60 text-[#869397] font-mono text-[10px] uppercase tracking-wider border-b border-[#1f2a3e]">
                  <th className="py-2.5 px-4">Target Mugshot & Mesh</th>
                  <th className="py-2.5 px-4">ID & Code</th>
                  <th className="py-2.5 px-4">Designation & Aliases</th>
                  <th className="py-2.5 px-4">Threat Category</th>
                  <th className="py-2.5 px-4">Tactical Status</th>
                  <th className="py-2.5 px-4">Last Verified Sighting</th>
                  <th className="py-2.5 px-4 text-right">Confidence & Sensor</th>
                  <th className="py-2.5 px-4 text-right">Action Directives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2a3e]">
                {/* ROW 1: CRITICAL ACTIVE HIT */}
                <tr className="bg-[#93000a]/20 hover:bg-[#93000a]/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-12 rounded bg-[#31353e] overflow-hidden shadow-sm shrink-0 border border-[#ef4444]/60">
                      <img
                        className="w-full h-full object-cover"
                        alt="Target Asif R."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFgCXBus_QrjhE5D2iQh8picE1lZSQhwNPlk9n6afrlttSAD99UzeeipNNnvxP_GphQws3boUFjc26QLRFZUbqO5SIC4NaO7wC59pFxaC5HCTKA8yDKkP4ZqRmJheFuW5n8uwe5NNBld4MyoBAfLocKTrzZaAkMaxfYcatwJlIpw9FMMLUc-V7c5D0o0lJFds7vfSq25mepB1P3DeZ_0bqsp9GWlz4vfDRSz3P6YGCJp8VtIDPX1FVZw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16]/80 via-transparent to-transparent flex items-end justify-center pb-0.5">
                        <span className="font-mono text-[9px] text-[#4cd7f6] leading-none font-bold">MESH 98%</span>
                      </div>
                      <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#4cd7f6]">
                    #T-904
                    <div className="text-[10px] text-[#869397] font-normal">CCTNS-9914</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#dfe2ee]">Asif R. (Gul)</div>
                    <div className="text-[11px] text-[#bcc9cd] font-mono">&apos;Al-Kashmir&apos; • Former Cell Leader</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#93000a] text-[#ffdad6] font-mono text-[10px] font-bold uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
                      RED NOTICE • INFILTRATION
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-ping" />
                      <span className="font-mono text-[11px] font-bold text-[#ef4444] uppercase tracking-wider">
                        ACTIVE HIT (02:14 IST)
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-[#dfe2ee] font-semibold">02:14:02 IST • 3m ago</div>
                    <div className="font-mono text-[10px] text-[#4cd7f6]">Sector 4 Ridge Line [CAM-004-FLIR]</div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono">
                    <div className="text-[#ef4444] font-bold text-sm">94.2%</div>
                    <div className="text-[10px] text-[#869397]">FLIR LWIR Dual-Thermal</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-mono">
                      <button
                        onClick={() => triggerToast('Platoon QRF Dispatched to Sector 4 Ridge Line coordinates')}
                        className="px-2 py-1 bg-[#ef4444] text-white hover:bg-[#ffb4ab] hover:text-[#690005] text-[10px] font-bold rounded shadow-sm uppercase"
                        type="button"
                      >
                        DISPATCH QRF
                      </button>
                      <button
                        onClick={() =>
                          setDossierTarget({
                            name: 'Asif R. (Gul) // Alias: \'Al-Kashmir\'',
                            code: '#T-904',
                            status: 'DEFCON-2 INTERCEPT TARGET',
                            cctns: 'JK-FIR-2022-881',
                            vehicle: 'JK-02-AK-9921',
                            similarity: '94.2% (ResNet-101)',
                            force: 'LEVEL-4 ARREST / INTERDICT',
                            desc: 'Subject identified during thermal breach assessment in Sector 4 Ridge Line. Historical vector matches cross-referenced with 2023 Poonch sector interdiction records.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKHFkbqrkmLAa8kws4Ow4FQwdk6zCB5OvAUPWh-YsJg8JbjPAFEr39fKDBPpRXZVj-VuZzK-KjjuL4wrSp5s6YAkG__TGNGSqBgpNlmRtXIN0NjnZTyFgvcJ7QCtn9rcB8qmtbjF93ol5K2mibe42hTWxG-4mVlf_TYS33_bBAIDGaiG3HcTGw6ozJYa6mQl-b0KtLTR8mZtnkIEk5J5GgIxoFXPsEmz3zEBftRf419jmuuWK8w_Vr0Q',
                          })
                        }
                        className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[10px] rounded"
                        type="button"
                      >
                        DOSSIER
                      </button>
                      <button
                        onClick={() => onNavigate('multi-camera-correlation')}
                        className="p-1 bg-[#262a33] hover:text-[#4cd7f6] text-[#869397] rounded"
                        title="Correlate Track Across Cameras"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">alt_route</span>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* ROW 2: ESCALATED ARMS TRANSIT */}
                <tr className="bg-[#181c24] hover:bg-[#1c2028] transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-12 rounded bg-[#31353e] overflow-hidden shadow-sm shrink-0 border border-[#1f2a3e]">
                      <img
                        className="w-full h-full object-cover"
                        alt="Unknown Courier #12"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLWaP1sSPGCZWbPAJh_kGtwCiSbAkD8WRxdgjtdcFxiBs4TNe54GFejCWbU-cn68IIFWM2guHnKIDMb42TJuYYiEgLoNT-rEkUznOyiJiuYDiUMzUCgyuRsliB1DnnUimJSOb4Cq9mvYanExJSsp-DAcy8ciAhFcKSYOqL4CBFxUgOy8kMp9Nx-f6BSgtgC9mQQOD4MMfutQn8eemy7yAgUfvsCZ3iXC06PzIB-4k_XbChLRTgd-DBKA"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16]/80 via-transparent to-transparent flex items-end justify-center pb-0.5">
                        <span className="font-mono text-[9px] text-[#869397] leading-none">MESH 84%</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#dfe2ee]">
                    #T-882
                    <div className="text-[10px] text-[#869397] font-normal">UNIDENT-SEC03</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#dfe2ee]">Unknown Courier #12</div>
                    <div className="text-[11px] text-[#bcc9cd] font-mono">&apos;Shadow-4&apos; • Trans-River Courier</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#e79400]/20 text-[#ffb95f] font-mono text-[10px] font-bold uppercase">
                      ARMS TRANSIT • DRONE LINK
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ffb95f]" />
                      <span className="font-mono text-[10px] font-semibold text-[#ffb95f] uppercase">
                        ESCALATED MONITORED
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-[#dfe2ee]">18h ago • Yesterday 08:12 IST</div>
                    <div className="font-mono text-[10px] text-[#869397]">BOP South Gate 01 Culvert</div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono">
                    <div className="text-[#ffb95f] font-bold text-sm">89.6%</div>
                    <div className="text-[10px] text-[#869397]">Optical 4K PTZ Array</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-mono">
                      <button
                        onClick={() =>
                          setDossierTarget({
                            name: 'Unknown Courier #12 // Alias: \'Shadow-4\'',
                            code: '#T-882',
                            status: 'ESCALATED ARMS LOGISTICS',
                            cctns: 'UNIDENT-SEC03',
                            vehicle: 'PB-08-E-4412 (Tata Xenon)',
                            similarity: '89.6%',
                            force: 'SURVEIL & APPREHEND',
                            desc: 'Presumed drone receiver operating along riverine culvert boundaries.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLWaP1sSPGCZWbPAJh_kGtwCiSbAkD8WRxdgjtdcFxiBs4TNe54GFejCWbU-cn68IIFWM2guHnKIDMb42TJuYYiEgLoNT-rEkUznOyiJiuYDiUMzUCgyuRsliB1DnnUimJSOb4Cq9mvYanExJSsp-DAcy8ciAhFcKSYOqL4CBFxUgOy8kMp9Nx-f6BSgtgC9mQQOD4MMfutQn8eemy7yAgUfvsCZ3iXC06PzIB-4k_XbChLRTgd-DBKA',
                          })
                        }
                        className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[10px] rounded"
                        type="button"
                      >
                        DOSSIER
                      </button>
                      <button
                        onClick={() => onNavigate('multi-camera-correlation')}
                        className="px-2 py-1 bg-[#4cd7f6]/20 text-[#4cd7f6] hover:bg-[#4cd7f6]/30 text-[10px] font-semibold rounded"
                        type="button"
                      >
                        TRACK RE-ID
                      </button>
                      <button
                        onClick={() => triggerToast('Target #T-882 telemetry exported')}
                        className="p-1 bg-[#262a33] hover:text-[#dfe2ee] text-[#869397] rounded"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* ROW 3: NARCO-TERROR ACTIVE WANTED */}
                <tr className="bg-[#1c2028] hover:bg-[#262a33]/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-12 rounded bg-[#31353e] overflow-hidden shadow-sm shrink-0 border border-[#1f2a3e]">
                      <img
                        className="w-full h-full object-cover"
                        alt="Vikramjit S."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUpTIfxO7ViCPDKvTSLi2wkecHxg-y2FH2oFQfr_GjZQqbABzjMbxZInsUOEVQuWISXgp1M6j1mA9kLYVPGaeVa8d1P5L9CwfZud9UYUOCEgLUreN1URs0JhwAW5k_X9KiqsDMlmKkuZGUVVghzNzCDs7HgjuULbsyLz9slKEp0wPbQV4t5jL2S7YQDqr1FGGgSr-IyQE5GEYMB3_QMB5JugXMiBEfDFaKE6sPudKOYIXzd1YVDBqL1g"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16]/80 via-transparent to-transparent flex items-end justify-center pb-0.5">
                        <span className="font-mono text-[9px] text-[#4edea3] leading-none">MESH 96%</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#dfe2ee]">
                    #T-715
                    <div className="text-[10px] text-[#869397] font-normal">FIR-441/PB</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#dfe2ee]">Vikramjit S.</div>
                    <div className="text-[11px] text-[#bcc9cd] font-mono">&apos;Vicky&apos; • Cross-Border Logistics</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#31353e] text-[#dfe2ee] font-mono text-[10px] font-bold uppercase">
                      NARCO-CONTRABAND
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#4edea3]" />
                      <span className="font-mono text-[10px] font-semibold text-[#4edea3] uppercase">
                        WANTED / ACTIVE
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-[#dfe2ee]">2d ago • Sector 02 Outpost</div>
                    <div className="font-mono text-[10px] text-[#869397]">Checkpost Alpha Perimeter</div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono">
                    <div className="text-[#dfe2ee] font-bold text-sm">82.1%</div>
                    <div className="text-[10px] text-[#869397]">IR Sentry Static Node</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-mono">
                      <button
                        onClick={() =>
                          setDossierTarget({
                            name: 'Vikramjit S. // Alias: \'Vicky\'',
                            code: '#T-715',
                            status: 'WANTED NARCOTICS INTERDICT',
                            cctns: 'FIR-441/PB',
                            vehicle: 'HR-26-BR-0091 (Fortuner)',
                            similarity: '82.1%',
                            force: 'INTERCEPT & SEIZE',
                            desc: 'Narcotics courier network coordinator cross-referenced across Punjab & J&K police registries.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUpTIfxO7ViCPDKvTSLi2wkecHxg-y2FH2oFQfr_GjZQqbABzjMbxZInsUOEVQuWISXgp1M6j1mA9kLYVPGaeVa8d1P5L9CwfZud9UYUOCEgLUreN1URs0JhwAW5k_X9KiqsDMlmKkuZGUVVghzNzCDs7HgjuULbsyLz9slKEp0wPbQV4t5jL2S7YQDqr1FGGgSr-IyQE5GEYMB3_QMB5JugXMiBEfDFaKE6sPudKOYIXzd1YVDBqL1g',
                          })
                        }
                        className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[10px] rounded"
                        type="button"
                      >
                        DOSSIER
                      </button>
                      <button
                        onClick={() => triggerToast('Editing profile #T-715')}
                        className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[10px] rounded"
                        type="button"
                      >
                        EDIT PROFILE
                      </button>
                      <button
                        onClick={() => triggerToast('More options')}
                        className="p-1 bg-[#262a33] hover:text-[#dfe2ee] text-[#869397] rounded"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* ROW 4: SUSPECTED SPOTTER */}
                <tr className="bg-[#181c24] hover:bg-[#1c2028] transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-12 rounded bg-[#31353e] overflow-hidden shadow-sm shrink-0 border border-[#1f2a3e]">
                      <img
                        className="w-full h-full object-cover"
                        alt="Tariq H."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuANA-8p18q86waPoC-YHulGBVvPbk2yOxp8K0mx8gYLyP-IsnDzTOncMfogTzfJ3LwyJrHnf2UOtceg6tR3p0jp-9tnSvJXMsAjFPHxnGO1zLgxtmPkZLfmByGnEisYjdsrC-wBwpfn-uG-OSnmFbK4esLHEOD939KaVVJP_eZrPk1cXGtQ-AbBG2SVgTA8Qy7wTHq5oDYoudKNPDMNwE7EdyGuuhaHVwYrxUtGiMneW23Fb_AMsMspAA"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16]/80 via-transparent to-transparent flex items-end justify-center pb-0.5">
                        <span className="font-mono text-[9px] text-[#869397] leading-none">MESH 91%</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#dfe2ee]">
                    #T-920
                    <div className="text-[10px] text-[#869397] font-normal">IB-INTEL-08</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#dfe2ee]">Tariq H.</div>
                    <div className="text-[11px] text-[#bcc9cd] font-mono">&apos;Falcon&apos; • Recce Operative</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#31353e] text-[#869397] font-mono text-[10px] uppercase">
                      SUSPECTED SPOTTER
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#869397]" />
                      <span className="font-mono text-[10px] text-[#869397] uppercase">SURVEILLANCE ONLY</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-[#dfe2ee]">5d ago • Riverine Tango Line</div>
                    <div className="font-mono text-[10px] text-[#869397]">Riverine Boat CAM-12</div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono">
                    <div className="text-[#dfe2ee] font-bold text-sm">91.0%</div>
                    <div className="text-[10px] text-[#869397]">Thermal Long-Range PTZ</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-mono">
                      <button
                        onClick={() =>
                          setDossierTarget({
                            name: 'Tariq H. // Alias: \'Falcon\'',
                            code: '#T-920',
                            status: 'COVERT RECCE WATCH',
                            cctns: 'IB-INTEL-08',
                            vehicle: 'DL-1C-5421 (Camper)',
                            similarity: '91.0%',
                            force: 'MAINTAIN DISTANT TRACK',
                            desc: 'Monitored conducting binocular surveillance near Riverine Tango Line reed banks.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANA-8p18q86waPoC-YHulGBVvPbk2yOxp8K0mx8gYLyP-IsnDzTOncMfogTzfJ3LwyJrHnf2UOtceg6tR3p0jp-9tnSvJXMsAjFPHxnGO1zLgxtmPkZLfmByGnEisYjdsrC-wBwpfn-uG-OSnmFbK4esLHEOD939KaVVJP_eZrPk1cXGtQ-AbBG2SVgTA8Qy7wTHq5oDYoudKNPDMNwE7EdyGuuhaHVwYrxUtGiMneW23Fb_AMsMspAA',
                          })
                        }
                        className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[10px] rounded"
                        type="button"
                      >
                        DOSSIER
                      </button>
                      <button
                        onClick={() => triggerToast('Timeline history opened for #T-920')}
                        className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[10px] rounded"
                        type="button"
                      >
                        TIMELINE
                      </button>
                      <button
                        onClick={() => triggerToast('More options')}
                        className="p-1 bg-[#262a33] hover:text-[#dfe2ee] text-[#869397] rounded"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination Ribbon */}
          <div className="px-4 py-2.5 bg-[#1c2028] flex items-center justify-between font-mono text-xs text-[#bcc9cd] border-t border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <span>Showing 4 of 184 registered facial signatures</span>
              <span className="text-[#869397]">•</span>
              <span className="text-[#4edea3]">All local edge models active</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))}
                className="px-2 py-0.5 rounded bg-[#31353e] text-[#bcc9cd] hover:text-[#dfe2ee]"
                type="button"
              >
                PREV
              </button>
              <span className="px-2 py-0.5 rounded bg-[#4cd7f6] text-[#003640] font-bold">1</span>
              <button
                onClick={() => setCurrentPageNum(2)}
                className="px-2 py-0.5 rounded bg-[#31353e] text-[#bcc9cd] hover:text-[#dfe2ee]"
                type="button"
              >
                2
              </button>
              <button
                onClick={() => setCurrentPageNum(3)}
                className="px-2 py-0.5 rounded bg-[#31353e] text-[#bcc9cd] hover:text-[#dfe2ee]"
                type="button"
              >
                3
              </button>
              <span className="px-1 text-[#869397]">...</span>
              <button
                onClick={() => setCurrentPageNum(46)}
                className="px-2 py-0.5 rounded bg-[#31353e] text-[#bcc9cd] hover:text-[#dfe2ee]"
                type="button"
              >
                46
              </button>
              <button
                onClick={() => setCurrentPageNum(currentPageNum + 1)}
                className="px-2 py-0.5 rounded bg-[#31353e] text-[#bcc9cd] hover:text-[#dfe2ee]"
                type="button"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: ANPR & VEHICLE BLACKLIST */}
        <div className="bg-[#181c24] rounded shadow-sm overflow-hidden flex flex-col border border-[#1f2a3e]">
          {/* Section Header */}
          <div className="p-4 bg-[#1c2028] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#ffb95f] rounded-xs" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-base text-[#dfe2ee] font-bold uppercase tracking-tight">
                    Automated Number Plate Recognition (ANPR) Blacklist
                  </h2>
                  <span className="px-2 py-0.5 bg-[#31353e] text-[#ffb95f] font-mono text-[10px] rounded font-bold">
                    62 HOTLIST PLATES
                  </span>
                </div>
                <p className="text-xs text-[#bcc9cd]">
                  Toll & Border Checkpoint multi-lane OCR cameras linked with State Motor Vehicle Registries.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerToast('Filtered by OCR certainty > 90% (58 plates qualify)')}
                className="flex items-center gap-1 px-3 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] font-mono text-[11px] font-semibold rounded border border-[#1f2a3e]"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">filter_list</span>
                <span>FILTER BY OCR CERTAINTY (&gt;90%)</span>
              </button>
            </div>
          </div>

          {/* Vehicle Table Container */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-[#31353e]/60 text-[#869397] font-mono text-[10px] uppercase tracking-wider border-b border-[#1f2a3e]">
                  <th className="py-2.5 px-4">Plate Badge & State</th>
                  <th className="py-2.5 px-4">Make, Model & Visual Specs</th>
                  <th className="py-2.5 px-4">Threat Categorization</th>
                  <th className="py-2.5 px-4">Interception Status</th>
                  <th className="py-2.5 px-4">Last Observed Node</th>
                  <th className="py-2.5 px-4">Speed & Direction Vector</th>
                  <th className="py-2.5 px-4 text-right">Interdiction Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2a3e]">
                {/* VEHICLE 1: ACTIVE INTERCEPT LOCK */}
                <tr className="bg-[#93000a]/20 hover:bg-[#93000a]/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded bg-[#0a0e16] text-[#dfe2ee] font-mono font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 shadow-sm border border-[#ef4444]/50">
                        <span className="text-[9px] px-1 py-0.5 bg-[#4cd7f6] text-[#003640] rounded-xs font-bold leading-none">
                          IND
                        </span>
                        <span className="text-[#ef4444]">JK-02-AK-9921</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#dfe2ee]">Black Mahindra Scorpio</div>
                    <div className="font-mono text-[11px] text-[#bcc9cd]">
                      Tinted 100%, Mud-obscured tailgate, Reinforced front bar
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#93000a] text-[#ffdad6] font-mono text-[10px] font-bold uppercase">
                      STOLEN // WEAPONS SUSPECT
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-ping" />
                      <span className="font-mono text-[11px] font-bold text-[#ef4444] uppercase tracking-wider">
                        INTERCEPT ACTIVE
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-[#dfe2ee] font-semibold">02:09:18 IST • 8m ago</div>
                    <div className="font-mono text-[10px] text-[#4cd7f6]">Checkpost Alpha [CAM-001] Lane 1</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-mono text-xs text-[#ef4444] font-bold">14 km/h • Crawling South</div>
                    <div className="text-[10px] text-[#869397]">Approaching Intercept Checkpoint</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-mono">
                      <button
                        onClick={() => {
                          setActiveSpikeRow(activeSpikeRow === 'JK-02-AK-9921' ? null : 'JK-02-AK-9921');
                          triggerToast('Intercept Alert Transmitted to Checkpost Alpha Security Team');
                        }}
                        className="px-2.5 py-1 bg-[#ef4444] text-white hover:bg-[#ffb4ab] hover:text-[#690005] text-[10px] font-bold rounded shadow-sm uppercase tracking-wider"
                        type="button"
                      >
                        {activeSpikeRow === 'JK-02-AK-9921' ? 'CHECKPOINT NOTIFIED' : 'REQUEST CHECKPOINT RESPONSE'}
                      </button>
                      <button
                        onClick={() =>
                          setOcrPreviewTarget({
                            plate: 'JK-02-AK-9921',
                            make: 'Black Mahindra Scorpio',
                            node: 'CAM-001 Lane 1 (Checkpost Alpha)',
                            time: '02:09:18 IST',
                            ocrScore: '98.8%',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5lYZI4m0eS5roficpaeg1Ef7GYWP-13k1_lFQGrHzbsWH9JvuQz17YLLwBP-Hru6QMupnG2SzPQupAj8AXJrSCzQfg12izQ6YLLAzTxd9VhWwTGhCBUsoT5QyAYj1XT15F-D5cuzxYo4ihxU1daY6UpZI8RlWAOlyRDeStSCltDhc2LXQUJrQMTtobk6YjF7ykT-zbsWExD9Wv2En00VhNHiDsoRQi6hE8BI3KaWsJ9M9i45QmukK1w',
                          })
                        }
                        className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[10px] rounded"
                        type="button"
                      >
                        OCR CLIP
                      </button>
                      <button
                        onClick={() => onSelectCamera('CAM-001')}
                        className="p-1 bg-[#262a33] hover:text-[#4cd7f6] text-[#869397] rounded"
                        title="Open CAM-001 Checkpoint Feed"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* VEHICLE 2: CONVOY DEVIATION */}
                <tr className="bg-[#181c24] hover:bg-[#1c2028] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded bg-[#0a0e16] text-[#dfe2ee] font-mono font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 shadow-sm border border-[#1f2a3e]">
                        <span className="text-[9px] px-1 py-0.5 bg-[#4cd7f6] text-[#003640] rounded-xs font-bold leading-none">
                          IND
                        </span>
                        <span>PB-08-E-4412</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#dfe2ee]">White Tata Xenon Pickup</div>
                    <div className="font-mono text-[11px] text-[#bcc9cd]">
                      Flatbed tarp cover, Extended auxiliary fuel tank
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#e79400]/20 text-[#ffb95f] font-mono text-[10px] font-bold uppercase">
                      CONVOY DEVIATION • ROUTE FLAGGED
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ffb95f]" />
                      <span className="font-mono text-[10px] font-semibold text-[#ffb95f] uppercase">
                        LOGGED / TRACKING
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-[#dfe2ee]">00:34 IST • 1h 40m ago</div>
                    <div className="font-mono text-[10px] text-[#869397]">Cleared Gate 2 • Secondary Axis</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-mono text-xs text-[#dfe2ee] font-semibold">62 km/h • Egress East</div>
                    <div className="text-[10px] text-[#869397]">Targeting Outpost Delta Road</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-mono">
                      <button
                        onClick={() => triggerToast('Vehicle Dossier opened: PB-08-E-4412')}
                        className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[10px] rounded"
                        type="button"
                      >
                        VEHICLE DOSSIER
                      </button>
                      <button
                        onClick={() => triggerToast('Alert transmitted to Outpost Delta / Guard Post 03')}
                        className="px-2 py-1 bg-[#4cd7f6]/20 text-[#4cd7f6] hover:bg-[#4cd7f6]/30 text-[10px] font-semibold rounded"
                        type="button"
                      >
                        ALERT NEXT POST
                      </button>
                      <button
                        onClick={() => triggerToast('Vehicle actions')}
                        className="p-1 bg-[#262a33] hover:text-[#dfe2ee] text-[#869397] rounded"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* VEHICLE 3: INTERDICTED / DETAINED */}
                <tr className="bg-[#1c2028] hover:bg-[#262a33]/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded bg-[#0a0e16] text-[#dfe2ee] font-mono font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 shadow-sm border border-[#1f2a3e]">
                        <span className="text-[9px] px-1 py-0.5 bg-[#4cd7f6] text-[#003640] rounded-xs font-bold leading-none">
                          IND
                        </span>
                        <span className="text-[#4edea3]">HR-26-BR-0091</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#dfe2ee]">Grey Toyota Fortuner</div>
                    <div className="font-mono text-[11px] text-[#bcc9cd]">
                      Heavy front bull-guard, VHF whip antenna installed
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#31353e] text-[#dfe2ee] font-mono text-[10px] font-bold uppercase">
                      NARCOTICS CARRIER
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#4edea3]" />
                      <span className="font-mono text-[10px] font-semibold text-[#4edea3] uppercase">
                        BARRIER INTERDICTED
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-[#dfe2ee]">Yesterday 23:14 IST</div>
                    <div className="font-mono text-[10px] text-[#869397]">BOP South Road Holding Bay 3</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-mono text-xs text-[#4edea3] font-bold">0 km/h • Stationary Culvert</div>
                    <div className="text-[10px] text-[#4edea3]">Secured by Guard Post 04</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-mono">
                      <button
                        onClick={() => triggerToast('Inspection Report: 12.4 kg contraband confiscated at Bay 3')}
                        className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[10px] rounded"
                        type="button"
                      >
                        INSPECTION REPORT
                      </button>
                      <button
                        onClick={() => triggerToast('Log note appended to vehicle registry HR-26-BR-0091')}
                        className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[10px] rounded"
                        type="button"
                      >
                        ADD NOTE
                      </button>
                      <button
                        onClick={() => triggerToast('Vehicle actions')}
                        className="p-1 bg-[#262a33] hover:text-[#dfe2ee] text-[#869397] rounded"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* VEHICLE 4: UNREGISTERED ACCESS */}
                <tr className="bg-[#181c24] hover:bg-[#1c2028] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded bg-[#0a0e16] text-[#dfe2ee] font-mono font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 shadow-sm border border-[#1f2a3e]">
                        <span className="text-[9px] px-1 py-0.5 bg-[#4cd7f6] text-[#003640] rounded-xs font-bold leading-none">
                          IND
                        </span>
                        <span>DL-1C-5421</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#dfe2ee]">White Bolero Camper</div>
                    <div className="font-mono text-[11px] text-[#bcc9cd]">
                      Faded commercial livery, Damaged left headlight
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#31353e] text-[#869397] font-mono text-[10px] uppercase">
                      UNREGISTERED BORDER ACCESS
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#869397]" />
                      <span className="font-mono text-[10px] text-[#869397] uppercase">MONITORED</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-[#dfe2ee]">3h ago • Sector 4 Outer Ridge</div>
                    <div className="font-mono text-[10px] text-[#869397]">Patrol Link CAM-019</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-mono text-xs text-[#dfe2ee]">28 km/h • North Access Trail</div>
                    <div className="text-[10px] text-[#869397]">Permit Checkpoint 1 pending</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-mono">
                      <button
                        onClick={() => triggerToast('Dossier DL-1C-5421 loaded')}
                        className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[10px] rounded"
                        type="button"
                      >
                        DOSSIER
                      </button>
                      <button
                        onClick={() => triggerToast('Plate DL-1C-5421 flagged for mandatory inspection')}
                        className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[10px] rounded"
                        type="button"
                      >
                        FLAG PLATE
                      </button>
                      <button
                        onClick={() => triggerToast('Vehicle actions')}
                        className="p-1 bg-[#262a33] hover:text-[#dfe2ee] text-[#869397] rounded"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Vehicle Table Footer */}
          <div className="px-4 py-2.5 bg-[#1c2028] flex items-center justify-between font-mono text-xs text-[#bcc9cd] border-t border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <span>Showing 4 of 62 vehicle profiles in active barrier buffer</span>
              <span className="text-[#869397]">•</span>
              <span className="text-[#4edea3]">Auto-hydraulic drop: ARMED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#869397] uppercase text-[10px]">CHECKPOINT BUFFER SYNC: 100%</span>
            </div>
          </div>
        </div>

        {/* QUICK DOSSIER PREVIEW / ACTIVE THREAT INSPECTOR DRAWER */}
        <div className="bg-[#181c24] p-4 lg:p-6 rounded shadow-md border border-[#1f2a3e]">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Mugshot + Vector Mesh Overlay Frame */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded bg-[#0a0e16] overflow-hidden shadow-lg shrink-0 border border-[#06b6d4]/40">
                <img
                  className="w-full h-full object-cover"
                  alt="Asif R. (Gul)"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKHFkbqrkmLAa8kws4Ow4FQwdk6zCB5OvAUPWh-YsJg8JbjPAFEr39fKDBPpRXZVj-VuZzK-KjjuL4wrSp5s6YAkG__TGNGSqBgpNlmRtXIN0NjnZTyFgvcJ7QCtn9rcB8qmtbjF93ol5K2mibe42hTWxG-4mVlf_TYS33_bBAIDGaiG3HcTGw6ozJYa6mQl-b0KtLTR8mZtnkIEk5J5GgIxoFXPsEmz3zEBftRf419jmuuWK8w_Vr0Q"
                />
                <div className="absolute inset-0 bg-[#4cd7f6]/10 pointer-events-none" />
                {/* Target Reticle Overlay */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#4cd7f6]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#4cd7f6]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#4cd7f6]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#4cd7f6]" />
                <div className="absolute bottom-1 right-1 bg-[#0a0e16]/90 px-1.5 py-0.5 rounded font-mono text-[9px] text-[#ef4444] font-bold border border-[#ef4444]/40">
                  LOCK: #T-904
                </div>
              </div>

              {/* Dossier Overview */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-display text-base sm:text-lg text-[#dfe2ee] font-bold">
                    Asif R. (Gul) // Alias: &apos;Al-Kashmir&apos;
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#93000a] text-[#ffdad6] font-mono text-[10px] font-bold uppercase">
                    DEFCON-2 INTERCEPT TARGET
                  </span>
                </div>
                <p className="text-xs text-[#bcc9cd] max-w-2xl leading-relaxed">
                  Subject identified during thermal breach assessment in Sector 4 Ridge Line. Historical vector matches cross-referenced with 2023 Poonch sector interdiction records. Presumed equipped with night-optics and encrypted comms handset.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
                  <div className="bg-[#1c2028] p-2 rounded border border-[#1f2a3e]">
                    <span className="text-[#869397] uppercase text-[9px] block">CCTNS RECORD</span>
                    <span className="text-[#dfe2ee] font-bold">JK-FIR-2022-881</span>
                  </div>
                  <div className="bg-[#1c2028] p-2 rounded border border-[#1f2a3e]">
                    <span className="text-[#869397] uppercase text-[9px] block">LINKED CONVEYANCE</span>
                    <span className="text-[#ef4444] font-bold">JK-02-AK-9921</span>
                  </div>
                  <div className="bg-[#1c2028] p-2 rounded border border-[#1f2a3e]">
                    <span className="text-[#869397] uppercase text-[9px] block">BIOMETRIC SIMILARITY</span>
                    <span className="text-[#4cd7f6] font-bold">94.2% (ResNet-101)</span>
                  </div>
                  <div className="bg-[#1c2028] p-2 rounded border border-[#1f2a3e]">
                    <span className="text-[#869397] uppercase text-[9px] block">AUTHORIZED FORCE</span>
                    <span className="text-[#ef4444] font-bold">LEVEL-4 ARREST / INTERDICT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rapid Actions for Active Dossier */}
            <div className="flex flex-col gap-2 w-full lg:w-64 shrink-0 font-mono">
              <span className="text-[10px] text-[#869397] uppercase tracking-wider">COMMAND ESCALATION</span>
              <button
                onClick={() => triggerToast('Dossier broadcast transmitted to all 5 Sector BOP outposts & patrols')}
                className="w-full flex items-center justify-center gap-2 bg-[#ef4444] text-white hover:bg-[#ffb4ab] hover:text-[#690005] py-2 rounded text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">cell_tower</span>
                <span>TRANSMIT TO ALL BOPs</span>
              </button>
              <button
                onClick={() => onNavigate('multi-camera-correlation')}
                className="w-full flex items-center justify-center gap-2 bg-[#31353e] hover:bg-[#353942] text-[#dfe2ee] py-2 rounded text-xs font-semibold transition-colors border border-[#3d494c]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">videocam</span>
                <span>OPEN 4-CAMERA TRACK CLUSTER</span>
              </button>
              <button
                onClick={() => triggerToast('Immutable audit trail block SHA-256 #9041 verified')}
                className="w-full flex items-center justify-center gap-2 bg-[#262a33] hover:bg-[#31353e] text-[#bcc9cd] hover:text-[#dfe2ee] py-1.5 rounded text-[11px] transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">history_edu</span>
                <span>AUDIT TRAIL & REASON CODES</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: ADD PERSON TARGET */}
      {showAddPersonModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#28354d] rounded-xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1f2a3e] pb-3">
              <div className="flex items-center gap-2 text-[#4cd7f6]">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                <h3 className="font-display font-bold uppercase text-sm tracking-wide text-white">
                  Add Target To Biometric Face Watchlist
                </h3>
              </div>
              <button onClick={() => setShowAddPersonModal(false)} className="text-[#869397] hover:text-white">
                ✕
              </button>
            </div>
            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="block text-[#869397] font-mono text-[10px] uppercase mb-1">Target Name</label>
                <input
                  value={formPersonName}
                  onChange={(e) => setFormPersonName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full bg-[#181c24] border border-[#1f2a3e] rounded p-2 text-white focus:outline-none focus:border-[#4cd7f6]"
                />
              </div>
              <div>
                <label className="block text-[#869397] font-mono text-[10px] uppercase mb-1">Aliases & Call Signs</label>
                <input
                  value={formPersonAlias}
                  onChange={(e) => setFormPersonAlias(e.target.value)}
                  placeholder="e.g. 'Falcon' // Former Guide"
                  className="w-full bg-[#181c24] border border-[#1f2a3e] rounded p-2 text-white focus:outline-none focus:border-[#4cd7f6]"
                />
              </div>
              <div>
                <label className="block text-[#869397] font-mono text-[10px] uppercase mb-1">Threat Category</label>
                <select
                  value={formPersonCategory}
                  onChange={(e) => setFormPersonCategory(e.target.value)}
                  className="w-full bg-[#181c24] border border-[#1f2a3e] rounded p-2 text-white focus:outline-none focus:border-[#4cd7f6]"
                >
                  <option value="RED NOTICE • INFILTRATION">RED NOTICE • INFILTRATION</option>
                  <option value="ARMS TRANSIT • DRONE LINK">ARMS TRANSIT • DRONE LINK</option>
                  <option value="NARCO-CONTRABAND">NARCO-CONTRABAND</option>
                  <option value="SUSPECTED SPOTTER">SUSPECTED SPOTTER</option>
                </select>
              </div>
              <div className="border border-dashed border-[#1f2a3e] p-3 rounded text-center text-[#869397]">
                <span className="material-symbols-outlined text-[24px] text-[#4cd7f6]">upload_file</span>
                <p className="mt-1">Drag and drop mugshot image or embedding vector (.npy / .bin)</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#1f2a3e]">
              <button
                onClick={() => setShowAddPersonModal(false)}
                className="px-3 py-1.5 bg-[#181c24] text-[#bcc9cd] rounded hover:bg-[#1c2028] text-xs font-mono"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  setShowAddPersonModal(false);
                  triggerToast(`New target ${formPersonName || 'Target'} provisioned to 148 edge cameras.`);
                }}
                className="px-4 py-1.5 bg-[#4cd7f6] text-[#003640] rounded font-bold text-xs font-mono hover:bg-[#acedff]"
              >
                REGISTER TARGET
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD BLACKLIST VEHICLE */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#28354d] rounded-xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1f2a3e] pb-3">
              <div className="flex items-center gap-2 text-[#ffb95f]">
                <span className="material-symbols-outlined text-[20px]">directions_car</span>
                <h3 className="font-display font-bold uppercase text-sm tracking-wide text-white">
                  Add Vehicle To ANPR Blacklist
                </h3>
              </div>
              <button onClick={() => setShowAddVehicleModal(false)} className="text-[#869397] hover:text-white">
                ✕
              </button>
            </div>
            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="block text-[#869397] font-mono text-[10px] uppercase mb-1">Registration Plate</label>
                <input
                  value={formPlate}
                  onChange={(e) => setFormPlate(e.target.value)}
                  placeholder="e.g. JK-02-AB-1234"
                  className="w-full bg-[#181c24] border border-[#1f2a3e] rounded p-2 text-white focus:outline-none focus:border-[#ffb95f] font-mono uppercase"
                />
              </div>
              <div>
                <label className="block text-[#869397] font-mono text-[10px] uppercase mb-1">Make, Model & Color</label>
                <input
                  value={formModel}
                  onChange={(e) => setFormModel(e.target.value)}
                  placeholder="e.g. White Bolero Pickup, Tarp cover"
                  className="w-full bg-[#181c24] border border-[#1f2a3e] rounded p-2 text-white focus:outline-none focus:border-[#ffb95f]"
                />
              </div>
              <div>
                <label className="block text-[#869397] font-mono text-[10px] uppercase mb-1">Threat Class</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-[#181c24] border border-[#1f2a3e] rounded p-2 text-white focus:outline-none focus:border-[#ffb95f]"
                >
                  <option value="STOLEN // WEAPONS SUSPECT">STOLEN // WEAPONS SUSPECT</option>
                  <option value="CONVOY DEVIATION">CONVOY DEVIATION</option>
                  <option value="NARCOTICS CARRIER">NARCOTICS CARRIER</option>
                  <option value="UNREGISTERED BORDER ACCESS">UNREGISTERED BORDER ACCESS</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#1f2a3e]">
              <button
                onClick={() => setShowAddVehicleModal(false)}
                className="px-3 py-1.5 bg-[#181c24] text-[#bcc9cd] rounded hover:bg-[#1c2028] text-xs font-mono"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  setShowAddVehicleModal(false);
                  triggerToast(`Plate ${formPlate || 'Vehicle'} added to barrier trap triggers.`);
                }}
                className="px-4 py-1.5 bg-[#ffb95f] text-[#472a00] rounded font-bold text-xs font-mono hover:bg-[#ffddb8]"
              >
                ARM OCR TRIGGER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DOSSIER INSPECTOR */}
      {dossierTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#28354d] rounded-xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1f2a3e] pb-3">
              <div className="flex items-center gap-2 text-[#4cd7f6]">
                <span className="material-symbols-outlined text-[20px]">badge</span>
                <h3 className="font-display font-bold uppercase text-sm tracking-wide text-white">
                  Classified Target Dossier: {dossierTarget.code}
                </h3>
              </div>
              <button onClick={() => setDossierTarget(null)} className="text-[#869397] hover:text-white">
                ✕
              </button>
            </div>
            <div className="flex gap-4">
              <img src={dossierTarget.img} alt={dossierTarget.name} className="w-24 h-24 rounded object-cover border border-[#4cd7f6]" />
              <div className="space-y-1">
                <h4 className="text-white font-bold text-sm">{dossierTarget.name}</h4>
                <div className="text-[10px] font-mono text-[#ef4444] font-bold">{dossierTarget.status}</div>
                <p className="text-xs text-[#bcc9cd] pt-1">{dossierTarget.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs bg-[#181c24] p-3 rounded border border-[#1f2a3e]">
              <div><span className="text-[#869397] block text-[9px]">CCTNS RECORD:</span> {dossierTarget.cctns}</div>
              <div><span className="text-[#869397] block text-[9px]">LINKED VEHICLE:</span> <span className="text-[#ef4444] font-bold">{dossierTarget.vehicle}</span></div>
              <div><span className="text-[#869397] block text-[9px]">BIOMETRIC MATCH:</span> <span className="text-[#4cd7f6] font-bold">{dossierTarget.similarity}</span></div>
              <div><span className="text-[#869397] block text-[9px]">AUTHORIZED FORCE:</span> <span className="text-[#ef4444] font-bold">{dossierTarget.force}</span></div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#1f2a3e]">
              <button
                onClick={() => {
                  setDossierTarget(null);
                  onNavigate('multi-camera-correlation');
                }}
                className="px-3 py-1.5 bg-[#4cd7f6] text-[#003640] rounded font-bold text-xs font-mono"
              >
                OPEN TRACKING CORRELATION &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: OCR CLIP PREVIEW */}
      {ocrPreviewTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#28354d] rounded-xl w-full max-w-lg p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1f2a3e] pb-2">
              <div className="flex items-center gap-2 text-[#ffb95f]">
                <span className="material-symbols-outlined text-[20px]">pin</span>
                <h3 className="font-display font-bold uppercase text-sm tracking-wide text-white">
                  OCR Video Capture: {ocrPreviewTarget.plate}
                </h3>
              </div>
              <button onClick={() => setOcrPreviewTarget(null)} className="text-[#869397] hover:text-white">✕</button>
            </div>
            <div className="relative rounded overflow-hidden h-52 bg-black">
              <img src={ocrPreviewTarget.img} alt={ocrPreviewTarget.plate} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded font-mono text-[10px] text-[#4edea3]">
                {ocrPreviewTarget.node}
              </div>
              <div className="absolute bottom-2 left-2 bg-[#ef4444] text-white px-2 py-0.5 rounded font-mono text-[11px] font-bold">
                PLATE: {ocrPreviewTarget.plate} [CONF: {ocrPreviewTarget.ocrScore}]
              </div>
            </div>
            <div className="flex justify-between items-center text-xs font-mono text-[#bcc9cd]">
              <span>Time: {ocrPreviewTarget.time}</span>
              <button
                onClick={() => {
                  setOcrPreviewTarget(null);
                  triggerToast('High-resolution OCR frame downloaded with cryptographically signed hash.');
                }}
                className="px-3 py-1 bg-[#262a33] text-white hover:bg-[#31353e] rounded flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">download</span>
                <span>SAVE EVIDENCE FRAME</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
