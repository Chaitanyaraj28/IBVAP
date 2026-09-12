import React, { useState } from 'react';
import { NavigationPage } from '../types';

interface MultiCameraCorrelationViewProps {
  onNavigate: (page: NavigationPage) => void;
  onSelectCamera: (cameraId: string) => void;
}

export const MultiCameraCorrelationView: React.FC<MultiCameraCorrelationViewProps> = ({
  onNavigate,
  onSelectCamera,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '2x' | '4x'>('2x');
  const [scrubPercent, setScrubPercent] = useState(72);
  const [threshold, setThreshold] = useState(85);
  const [selectedHop, setSelectedHop] = useState<number>(4);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="flex flex-col w-full p-4 lg:p-6 space-y-6 text-[#dfe2ee] select-none pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161f30] border border-[#06b6d4] text-[#f8fafc] px-4 py-2.5 rounded shadow-2xl flex items-center gap-3 font-mono text-xs animate-fadeIn">
          <span className="material-symbols-outlined text-[#06b6d4] text-[18px]">verified</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* TOP HEADER & MISSION CONTEXT */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#4cd7f6] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
            <span>AI RE-IDENTIFICATION ENGINE // MULTI-CAMERA CORRELATION</span>
            <span className="text-[#869397]">/</span>
            <span className="text-[#bcc9cd]">HASH: #REID-8924</span>
          </div>
          <h1 className="font-display text-2xl lg:text-3xl tracking-tight text-[#dfe2ee] uppercase font-bold">
            Re-Identification &amp; Tracking
          </h1>
          <p className="text-xs text-[#bcc9cd] max-w-3xl leading-relaxed">
            AI correlates visual features and temporal context across cameras to maintain a continuous target track.
            Cross-Camera Feature Matching &amp; Real-time Trajectory Mapping with ResNet-101 / OSNet Embeddings.
          </p>
        </div>

        {/* Global Correlation Controls */}
        <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
          <button
            onClick={() => showToast('Auto-correlating 5 synchronized camera tracks... (Completed in 42ms)')}
            className="px-3 py-2 bg-[#262a33] hover:bg-[#31353e] text-[#4cd7f6] rounded border border-[#3d494c] flex items-center gap-1.5 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
            <span>AUTO-CORRELATE ALL (5)</span>
          </button>
          <button
            onClick={() => showToast('KMZ GPS trajectory file exported with 5 node pins.')}
            className="px-3 py-2 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] rounded border border-[#3d494c] flex items-center gap-1.5 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">map</span>
            <span>EXPORT KMZ</span>
          </button>
          <button
            onClick={() => showToast('Dossier generated with SHA-256 evidence chain.')}
            className="px-3 py-2 bg-[#4cd7f6] hover:bg-[#acedff] text-[#003640] font-bold rounded flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(76,215,246,0.3)]"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">folder_special</span>
            <span>GENERATE DOSSIER</span>
          </button>
        </div>
      </div>

      {/* TARGET INGESTION & VECTOR PROFILE BAR */}
      <div className="bg-[#181c24] p-3 lg:p-4 rounded border border-[#1f2a3e] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded bg-[#0a0e16] border border-[#ef4444] overflow-hidden shrink-0 relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ-Iz6FmfPio8WoISYH5dId7HmLeiQYPgKTvGXNO7mY1gIzvBsELnYSCwh-aSkPijlhutaIGN5XTlLEEjkerJ48diLCAbBGELV5AOJoqPp-qmpjOS8viMZ1hMbOQAFO_F3iTmfffMz_dNdGjMTibYnGNyTp-t0liQ2dzdjxFY8kggRFAC4SEnZuhq4yzBOHRTfkarhFDIHYo8r-JXSeUxi5J7569FPq63NgzHSFCTz4gC3TR63JGbHag"
              alt="Target Face"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border border-[#ef4444] pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#ef4444] font-bold">TARGET #T-882</span>
              <span className="px-1.5 py-0.2 bg-[#ef4444]/20 text-[#ef4444] text-[9px] font-bold rounded border border-[#ef4444]/40">
                ACTIVE PURSUIT
              </span>
            </div>
            <div className="text-[#dfe2ee] text-[11px] font-semibold mt-0.5">
              MALE, ~32 YRS, DARK TACTICAL VEST, MIL-SPEC BOOTS
            </div>
            <div className="text-[#869397] text-[10px] truncate max-w-md">
              EMBEDDING: [0.8421, -0.1942, 0.5512, 0.0419, -0.7712, 0.3341, ...] (512-D)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-[#0a0e16] px-3 py-1.5 rounded border border-[#1f2a3e]">
            <span className="text-[#869397] text-[10px]">THRESHOLD:</span>
            <input
              type="range"
              min="70"
              max="99"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-20 accent-[#4cd7f6] cursor-pointer"
            />
            <span className="text-[#4cd7f6] font-bold">{threshold}%</span>
          </div>
          <div className="flex items-center gap-3 bg-[#0a0e16] px-3 py-1.5 rounded border border-[#1f2a3e] text-[11px]">
            <div>
              <span className="text-[#869397] block text-[9px]">TOTAL DISTANCE</span>
              <span className="text-[#dfe2ee] font-bold">1.42 KM</span>
            </div>
            <div className="w-px h-6 bg-[#31353e]" />
            <div>
              <span className="text-[#869397] block text-[9px]">INGRESS TIME</span>
              <span className="text-[#4edea3] font-bold">02:04:12</span>
            </div>
            <div className="w-px h-6 bg-[#31353e]" />
            <div>
              <span className="text-[#869397] block text-[9px]">MEAN VELOCITY</span>
              <span className="text-[#4cd7f6] font-bold">4.2 KM/H</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LEFT PANE: TACTICAL GEOLOCATION MAP & MULTI-ANGLE FEEDS (Col 8) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* 1. TACTICAL GEOLOCATION MAP */}
          <div className="bg-[#181c24] p-4 lg:p-5 rounded border border-[#1f2a3e] flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">explore</span>
                <span className="font-display text-sm text-[#dfe2ee] font-bold tracking-wider uppercase">
                  Sector 04 Intercept Corridor — Topographic Recon
                </span>
              </div>
              <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-mono text-[10px] font-bold rounded border border-[#00a572]/40">
                LIVE MESH (5 CAMERAS SYNCED)
              </span>
            </div>

            {/* Interactive Vector Terrain Canvas */}
            <div className="relative w-full h-80 bg-[#070a0f] rounded overflow-hidden border border-[#1f2a3e]">
              {/* Tactical Topographic Contour Grid SVG */}
              <svg className="w-full h-full" viewBox="0 0 800 400">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f2a3e" strokeWidth="0.5" />
                  </pattern>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4cd7f6" />
                    <stop offset="60%" stopColor="#ffb95f" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>

                {/* Grid Background */}
                <rect width="800" height="400" fill="url(#grid)" />

                {/* Topographic Elevation Curves */}
                <path d="M0,180 Q200,120 400,220 T800,160" fill="none" stroke="#162235" strokeWidth="1.5" />
                <path d="M0,240 Q250,190 500,280 T800,220" fill="none" stroke="#162235" strokeWidth="1.5" />
                <path d="M0,120 Q180,70 380,140 T800,100" fill="none" stroke="#162235" strokeWidth="1.5" />

                {/* Sector Grid Zones */}
                <text x="60" y="40" fill="#31353e" fontFamily="monospace" fontSize="12" fontWeight="bold">ZONE 04-A (NORTH RIDGE)</text>
                <text x="360" y="40" fill="#31353e" fontFamily="monospace" fontSize="12" fontWeight="bold">ZONE 04-B (CULVERT TRENCH)</text>
                <text x="640" y="40" fill="#31353e" fontFamily="monospace" fontSize="12" fontWeight="bold">ZONE 04-C (CHECKPOST)</text>

                {/* Intercept Projection Hazard Polygon */}
                <polygon
                  points="620,240 760,210 770,330 640,350"
                  fill="rgba(239, 68, 68, 0.12)"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <text x="650" y="270" fill="#ef4444" fontFamily="monospace" fontSize="9" fontWeight="bold">
                  PROJECTED INTERCEPT ZONE
                </text>
                <text x="650" y="285" fill="#ffdad6" fontFamily="monospace" fontSize="8">
                  ETA 02:44:00 (SPATIAL BUFFER 40M)
                </text>

                {/* Trajectory Handoff Path */}
                <path
                  d="M 120,280 L 260,180 L 420,220 L 590,170 L 680,260"
                  fill="none"
                  stroke="url(#pathGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                />

                {/* Completed Solid Trajectory */}
                <path
                  d="M 120,280 L 260,180 L 420,220 L 590,170"
                  fill="none"
                  stroke="#4cd7f6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Camera Node 1 */}
                <g className="cursor-pointer" onClick={() => setSelectedHop(1)}>
                  <circle cx="120" cy="280" r="14" fill="#181c24" stroke="#4edea3" strokeWidth="2" />
                  <circle cx="120" cy="280" r="4" fill="#4edea3" />
                  <text x="120" y="310" fill="#4edea3" fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="middle">
                    CAM-003
                  </text>
                  <text x="120" y="322" fill="#869397" fontFamily="monospace" fontSize="8" textAnchor="middle">
                    02:14 IST
                  </text>
                </g>

                {/* Camera Node 2 */}
                <g className="cursor-pointer" onClick={() => setSelectedHop(2)}>
                  <circle cx="260" cy="180" r="14" fill="#181c24" stroke="#4edea3" strokeWidth="2" />
                  <circle cx="260" cy="180" r="4" fill="#4edea3" />
                  <text x="260" y="155" fill="#4edea3" fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="middle">
                    CAM-007
                  </text>
                  <text x="260" y="143" fill="#869397" fontFamily="monospace" fontSize="8" textAnchor="middle">
                    02:22 IST
                  </text>
                </g>

                {/* Camera Node 3 */}
                <g className="cursor-pointer" onClick={() => setSelectedHop(3)}>
                  <circle cx="420" cy="220" r="14" fill="#181c24" stroke="#ffb95f" strokeWidth="2" />
                  <circle cx="420" cy="220" r="4" fill="#ffb95f" />
                  <text x="420" y="250" fill="#ffb95f" fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="middle">
                    CAM-009
                  </text>
                  <text x="420" y="262" fill="#869397" fontFamily="monospace" fontSize="8" textAnchor="middle">
                    02:31 IST
                  </text>
                </g>

                {/* Camera Node 4 (CURRENT ACTIVE LOCK) */}
                <g className="cursor-pointer" onClick={() => setSelectedHop(4)}>
                  {/* Radar pulse rings */}
                  <circle cx="590" cy="170" r="28" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.4" className="animate-ping" />
                  <circle cx="590" cy="170" r="18" fill="#181c24" stroke="#ef4444" strokeWidth="2.5" />
                  <circle cx="590" cy="170" r="6" fill="#ef4444" />
                  <text x="590" y="138" fill="#ef4444" fontFamily="monospace" fontSize="11" fontWeight="bold" textAnchor="middle">
                    CAM-012 [NOW]
                  </text>
                  <text x="590" y="126" fill="#ffdad6" fontFamily="monospace" fontSize="9" textAnchor="middle">
                    02:38:19 IST
                  </text>
                </g>

                {/* Camera Node 5 (FUTURE INTERCEPT LOCK) */}
                <g className="cursor-pointer" onClick={() => setSelectedHop(5)}>
                  <circle cx="680" cy="260" r="14" fill="#181c24" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="680" cy="260" r="4" fill="#ef4444" />
                  <text x="680" y="295" fill="#ef4444" fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="middle">
                    CAM-001 (SPIKES)
                  </text>
                  <text x="680" y="307" fill="#869397" fontFamily="monospace" fontSize="8" textAnchor="middle">
                    ETA 02:44 IST
                  </text>
                </g>
              </svg>

              {/* Map Floating HUD Info Box */}
              <div className="absolute top-3 left-3 bg-[#0a0e16]/90 border border-[#1f2a3e] p-2.5 rounded font-mono text-[10px] space-y-1">
                <div className="flex items-center gap-1.5 text-[#4edea3] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                  <span>BEARING: 142° SE</span>
                </div>
                <div className="text-[#dfe2ee]">COORDS: 33.7219° N, 74.8904° E</div>
                <div className="text-[#869397]">ELEVATION: 1,840m MSL</div>
                <div className="text-[#ffb95f]">KINETIC SPEED: 4.8 km/h (TROTTING)</div>
              </div>
            </div>

            {/* Playback & Scrubber Controls */}
            <div className="bg-[#0a0e16] p-3 rounded space-y-2 border border-[#1f2a3e]">
              <div className="flex items-center justify-between text-[#bcc9cd] font-mono text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setScrubPercent(Math.max(10, scrubPercent - 15))}
                    className="text-[#dfe2ee] hover:text-[#4cd7f6]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">skip_previous</span>
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-[#4cd7f6] hover:scale-110 transition-transform"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {isPlaying ? 'pause_circle' : 'play_circle'}
                    </span>
                  </button>
                  <button
                    onClick={() => setScrubPercent(Math.min(100, scrubPercent + 15))}
                    className="text-[#dfe2ee] hover:text-[#4cd7f6]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">skip_next</span>
                  </button>
                  <span className="text-[#dfe2ee] font-bold">02:38:19 IST</span>
                  <span className="text-[#869397]">/ 02:45:00 IST (TOTAL: 30m 48s)</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#869397] text-[10px]">SPEED:</span>
                  {(['1x', '2x', '4x'] as const).map((spd) => (
                    <span
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`cursor-pointer px-1.5 py-0.5 rounded text-[11px] ${
                        playbackSpeed === spd ? 'text-[#4cd7f6] font-bold bg-[#1c2028]' : 'text-[#dfe2ee] hover:text-[#4cd7f6]'
                      }`}
                    >
                      {spd}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scrubber track */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                  setScrubPercent(pos);
                }}
                className="relative w-full h-2.5 bg-[#1c2028] rounded cursor-pointer group"
              >
                <div className="absolute left-0 top-0 bottom-0 bg-[#4cd7f6]/40 rounded" style={{ width: `${scrubPercent}%` }} />
                <div className="absolute top-0 bottom-0 w-1 bg-[#4edea3]" style={{ left: '10%' }} title="Hop 1: 02:14 IST" />
                <div className="absolute top-0 bottom-0 w-1 bg-[#4edea3]" style={{ left: '32%' }} title="Hop 2: 02:22 IST" />
                <div className="absolute top-0 bottom-0 w-1 bg-[#ffb95f]" style={{ left: '55%' }} title="Hop 3: 02:31 IST" />
                <div className="absolute top-0 bottom-0 w-1 bg-[#ef4444]" style={{ left: '72%' }} title="Hop 4: 02:38 IST (Active)" />
                <div className="absolute top-0 bottom-0 w-1 bg-[#ef4444] border-r border-dashed" style={{ left: '92%' }} title="Hop 5: ETA 02:44 IST" />

                <div
                  className="absolute -top-1 w-4.5 h-4.5 bg-[#4cd7f6] rounded-full shadow-[0_0_8px_rgba(76,215,246,0.8)] -ml-2 flex items-center justify-center cursor-grab"
                  style={{ left: `${scrubPercent}%` }}
                >
                  <div className="w-1.5 h-1.5 bg-[#003640] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. SYNCHRONIZED MULTI-ANGLE OPTICAL FEEDS (4 Cameras) */}
          <div className="bg-[#181c24] p-4 lg:p-5 rounded border border-[#1f2a3e] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">grid_view</span>
                <span className="font-display text-sm text-[#dfe2ee] font-bold tracking-wider uppercase">
                  Synchronized Multi-Angle Optical Feeds
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#869397]">LATENCY SYNC &lt;18ms</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* FEED 1: CAM-003 */}
              <div
                onClick={() => setSelectedHop(1)}
                className={`bg-[#0a0e16] rounded overflow-hidden border transition-all cursor-pointer ${
                  selectedHop === 1 ? 'border-[#4cd7f6] shadow-[0_0_12px_rgba(76,215,246,0.25)]' : 'border-[#1f2a3e]'
                }`}
              >
                <div className="relative h-44 bg-black">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ-Iz6FmfPio8WoISYH5dId7HmLeiQYPgKTvGXNO7mY1gIzvBsELnYSCwh-aSkPijlhutaIGN5XTlLEEjkerJ48diLCAbBGELV5AOJoqPp-qmpjOS8viMZ1hMbOQAFO_F3iTmfffMz_dNdGjMTibYnGNyTp-t0liQ2dzdjxFY8kggRFAC4SEnZuhq4yzBOHRTfkarhFDIHYo8r-JXSeUxi5J7569FPq63NgzHSFCTz4gC3TR63JGbHag"
                    alt="CAM-003 Feed"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-4 border-2 border-[#ef4444] pointer-events-none flex flex-col justify-between p-1">
                    <span className="bg-[#ef4444] text-white px-1 font-mono text-[9px] font-bold w-fit">
                      T-882 (98.4% MATCH)
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 bg-[#0a0e16]/80 text-[#4edea3] font-mono text-[10px] px-1.5 py-0.5 rounded">
                    CAM-003 [BOP NORTH]
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#0a0e16]/80 text-[#dfe2ee] font-mono text-[10px] px-1.5 py-0.5 rounded">
                    02:14:22 IST
                  </div>
                </div>
                <div className="p-2.5 flex items-center justify-between font-mono text-[10px] bg-[#1c2028]">
                  <span className="text-[#bcc9cd]">HOP 1 // INGRESS PERIMETER</span>
                  <span className="text-[#4edea3] font-bold">RE-ID PASS (98.4%)</span>
                </div>
              </div>

              {/* FEED 2: CAM-007 */}
              <div
                onClick={() => setSelectedHop(2)}
                className={`bg-[#0a0e16] rounded overflow-hidden border transition-all cursor-pointer ${
                  selectedHop === 2 ? 'border-[#4cd7f6] shadow-[0_0_12px_rgba(76,215,246,0.25)]' : 'border-[#1f2a3e]'
                }`}
              >
                <div className="relative h-44 bg-black">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5lYZI4m0eS5roficpaeg1Ef7GYWP-13k1_lFQGrHzbsWH9JvuQz17YLLwBP-Hru6QMupnG2SzPQupAj8AXJrSCzQfg12izQ6YLLAzTxd9VhWwTGhCBUsoT5QyAYj1XT15F-D5cuzxYo4ihxU1daY6UpZI8RlWAOlyRDeStSCltDhc2LXQUJrQMTtobk6YjF7ykT-zbsWExD9Wv2En00VhNHiDsoRQi6hE8BI3KaWsJ9M9i45QmukK1w"
                    alt="CAM-007 Feed"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-6 border-2 border-[#4cd7f6] pointer-events-none flex flex-col justify-between p-1">
                    <span className="bg-[#4cd7f6] text-[#003640] px-1 font-mono text-[9px] font-bold w-fit">
                      T-882 (94.1% MATCH)
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 bg-[#0a0e16]/80 text-[#4edea3] font-mono text-[10px] px-1.5 py-0.5 rounded">
                    CAM-007 [RIDGE LINE]
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#0a0e16]/80 text-[#dfe2ee] font-mono text-[10px] px-1.5 py-0.5 rounded">
                    02:22:10 IST
                  </div>
                </div>
                <div className="p-2.5 flex items-center justify-between font-mono text-[10px] bg-[#1c2028]">
                  <span className="text-[#bcc9cd]">HOP 2 // ELEVATED TRAIL</span>
                  <span className="text-[#4edea3] font-bold">RE-ID PASS (94.1%)</span>
                </div>
              </div>

              {/* FEED 3: CAM-009 */}
              <div
                onClick={() => setSelectedHop(3)}
                className={`bg-[#0a0e16] rounded overflow-hidden border transition-all cursor-pointer ${
                  selectedHop === 3 ? 'border-[#4cd7f6] shadow-[0_0_12px_rgba(76,215,246,0.25)]' : 'border-[#1f2a3e]'
                }`}
              >
                <div className="relative h-44 bg-black">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWoEXhRIy3Hy3swLtf_vVqok49LQvYTjSmeDi2an3IjaembZnxLj0zwmfTVacK8Dz7Y9l0TtZZJTIwnZmzx0SCq80LkDUHTHAeAaaOQ2nvG_W4b1qTT3O0jEtqM_uVfoauvASe8rkUYgYefVwjvfgqggQ_Bv4TSlP9ju1DDQyJEdO83MCriV2TfZM6L5RsVnET0w3c5lgGaMXPd0X6RhQd-K7sJ-4aka31IOLDjzfaaJL_oSSmpKmPPg"
                    alt="CAM-009 Feed"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-8 border-2 border-[#ffb95f] pointer-events-none flex flex-col justify-between p-1">
                    <span className="bg-[#ffb95f] text-[#472a00] px-1 font-mono text-[9px] font-bold w-fit">
                      T-882 (89.6% MATCH)
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 bg-[#0a0e16]/80 text-[#ffb95f] font-mono text-[10px] px-1.5 py-0.5 rounded">
                    CAM-009 [CULVERT WIRE]
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#0a0e16]/80 text-[#dfe2ee] font-mono text-[10px] px-1.5 py-0.5 rounded">
                    02:31:45 IST
                  </div>
                </div>
                <div className="p-2.5 flex items-center justify-between font-mono text-[10px] bg-[#1c2028]">
                  <span className="text-[#bcc9cd]">HOP 3 // LOW VISIBILITY OCCLUSION</span>
                  <span className="text-[#ffb95f] font-bold">PRESERVED (89.6%)</span>
                </div>
              </div>

              {/* FEED 4: CAM-012 */}
              <div
                onClick={() => setSelectedHop(4)}
                className={`bg-[#0a0e16] rounded overflow-hidden border transition-all cursor-pointer ${
                  selectedHop === 4 ? 'border-[#ef4444] shadow-[0_0_16px_rgba(239,68,68,0.4)]' : 'border-[#1f2a3e]'
                }`}
              >
                <div className="relative h-44 bg-black">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1nj2nhuA-Pnr_u4Sl3VTxfcRiL_B2WyelpWMtuq9JS60Tyu570-qBZ6ZtMGSdj3KOE5Vg2EOG7Kj-RH_agBoXxrbB6GR6oIAM9tKoCLHEE2uzDBmXYa_AqpVelGrl5NO3MAApWESICunXOonnUyieI4I2L9lGgFFr65rx_whO3mdbfS2NGowV0ERB8hk2Wak-gdTLJ4ldUrKeVDRiqaM3YQDlahnWR0ruwKX2YLrrxzxWqIavlcKUaA"
                    alt="CAM-012 Feed"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-5 border-2 border-[#ef4444] pointer-events-none flex flex-col justify-between p-1">
                    <span className="bg-[#ef4444] text-white px-1 font-mono text-[9px] font-bold w-fit animate-pulse">
                      TARGET LOCKED (96.8%)
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 bg-[#0a0e16]/80 text-[#ef4444] font-mono text-[10px] px-1.5 py-0.5 rounded font-bold">
                    CAM-012 [ALPHA LANE]
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#0a0e16]/80 text-[#dfe2ee] font-mono text-[10px] px-1.5 py-0.5 rounded">
                    02:38:19 IST [LIVE]
                  </div>
                </div>
                <div className="p-2.5 flex items-center justify-between font-mono text-[10px] bg-[#1c2028]">
                  <span className="text-[#bcc9cd]">HOP 4 // CHECKPOST APPROACH</span>
                  <span className="text-[#ef4444] font-bold animate-pulse">ACTIVE RETENTION LOCK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: CHRONOLOGICAL RE-ID VECTOR LOG & QUICK ACTIONS (Col 4) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* 1. CHRONOLOGICAL RE-ID CORRELATION VECTOR LOG */}
          <div className="bg-[#181c24] p-4 lg:p-5 rounded border border-[#1f2a3e] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">linear_scale</span>
                <span className="font-display text-sm text-[#dfe2ee] font-bold tracking-wider uppercase">
                  Re-ID Handoff Log
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#4edea3] font-bold">5 NODES</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {/* HOP 1 */}
              <div
                onClick={() => setSelectedHop(1)}
                className={`p-3 rounded border transition-all cursor-pointer ${
                  selectedHop === 1 ? 'bg-[#262a33] border-[#4cd7f6]' : 'bg-[#1c2028] border-[#1f2a3e]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#4edea3] font-bold">HOP 01 // CAM-003</span>
                  <span className="text-[#869397] text-[10px]">02:14:22 IST</span>
                </div>
                <div className="text-[11px] text-[#dfe2ee] font-semibold mt-1">BOP North Outer Perimeter Fence</div>
                <div className="text-[10px] text-[#bcc9cd] mt-0.5">Ingress over low-tier barbed wire. Speed 3.8 km/h.</div>
                <div className="mt-2 flex items-center justify-between text-[10px] pt-1.5 border-t border-[#31353e]">
                  <span className="text-[#869397]">SIMILARITY</span>
                  <span className="text-[#4edea3] font-bold">98.4% (PASS)</span>
                </div>
              </div>

              {/* HOP 2 */}
              <div
                onClick={() => setSelectedHop(2)}
                className={`p-3 rounded border transition-all cursor-pointer ${
                  selectedHop === 2 ? 'bg-[#262a33] border-[#4cd7f6]' : 'bg-[#1c2028] border-[#1f2a3e]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#4edea3] font-bold">HOP 02 // CAM-007</span>
                  <span className="text-[#869397] text-[10px]">02:22:10 IST</span>
                </div>
                <div className="text-[11px] text-[#dfe2ee] font-semibold mt-1">Sector 4 Ridge Patrol Path</div>
                <div className="text-[10px] text-[#bcc9cd] mt-0.5">Target bearing NW along drainage ditch ravine.</div>
                <div className="mt-2 flex items-center justify-between text-[10px] pt-1.5 border-t border-[#31353e]">
                  <span className="text-[#869397]">SIMILARITY</span>
                  <span className="text-[#4edea3] font-bold">94.1% (PASS)</span>
                </div>
              </div>

              {/* HOP 3 */}
              <div
                onClick={() => setSelectedHop(3)}
                className={`p-3 rounded border transition-all cursor-pointer ${
                  selectedHop === 3 ? 'bg-[#262a33] border-[#ffb95f]' : 'bg-[#1c2028] border-[#1f2a3e]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#ffb95f] font-bold">HOP 03 // CAM-009</span>
                  <span className="text-[#869397] text-[10px]">02:31:45 IST</span>
                </div>
                <div className="text-[11px] text-[#dfe2ee] font-semibold mt-1">Culvert East Drainage Crossing</div>
                <div className="text-[10px] text-[#bcc9cd] mt-0.5">Partial thermal foliage occlusion; gait vector preserved.</div>
                <div className="mt-2 flex items-center justify-between text-[10px] pt-1.5 border-t border-[#31353e]">
                  <span className="text-[#869397]">SIMILARITY</span>
                  <span className="text-[#ffb95f] font-bold">89.6% (HOLD)</span>
                </div>
              </div>

              {/* HOP 4 (ACTIVE) */}
              <div
                onClick={() => setSelectedHop(4)}
                className={`p-3 rounded border transition-all cursor-pointer ${
                  selectedHop === 4 ? 'bg-[#262a33] border-[#ef4444]' : 'bg-[#1c2028] border-[#ef4444]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#ef4444] font-bold animate-pulse">HOP 04 // CAM-012 [ACTIVE]</span>
                  <span className="text-[#ef4444] font-bold text-[10px]">02:38:19 IST</span>
                </div>
                <div className="text-[11px] text-[#dfe2ee] font-semibold mt-1">Checkpost Alpha Perimeter Approach</div>
                <div className="text-[10px] text-[#ffdad6] mt-0.5">Approaching barrier lane #1. QRF notified on channel 4.</div>
                <div className="mt-2 flex items-center justify-between text-[10px] pt-1.5 border-t border-[#31353e]">
                  <span className="text-[#869397]">SIMILARITY</span>
                  <span className="text-[#ef4444] font-bold">96.8% (CRITICAL MATCH)</span>
                </div>
              </div>

              {/* HOP 5 (PROJECTED) */}
              <div
                onClick={() => setSelectedHop(5)}
                className={`p-3 rounded border transition-all cursor-pointer border-dashed ${
                  selectedHop === 5 ? 'bg-[#262a33] border-[#ef4444]' : 'bg-[#1c2028] border-[#31353e]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#869397] font-bold">HOP 05 // CAM-001 (PROJECTED)</span>
                  <span className="text-[#869397] text-[10px]">ETA 02:44:00 IST</span>
                </div>
                <div className="text-[11px] text-[#dfe2ee] font-semibold mt-1">Main Gate Alpha Intercept Gate</div>
                <div className="text-[10px] text-[#869397] mt-0.5">Hydraulic retention plates primed for deploy.</div>
                <div className="mt-2 flex items-center justify-between text-[10px] pt-1.5 border-t border-[#31353e]">
                  <span className="text-[#869397]">PROBABILITY</span>
                  <span className="text-[#4cd7f6] font-bold">92.0% INTERCEPT CONFIDENCE</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. BIOMETRIC VECTOR MATCHING RADAR / VISUAL FINGERPRINT */}
          <div className="bg-[#181c24] p-4 lg:p-5 rounded border border-[#1f2a3e] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm text-[#dfe2ee] font-bold uppercase tracking-wider">
                Biometric Vector Signature
              </span>
              <span className="text-[#4edea3] text-[10px] font-bold">CONFIRMATION: 95.8%</span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div>
                <div className="flex justify-between text-[#bcc9cd] mb-1">
                  <span>GAIT RHYTHM VELOCITY</span>
                  <span className="text-[#4edea3] font-bold">94.2% MATCH</span>
                </div>
                <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                  <div className="bg-[#4edea3] h-full" style={{ width: '94.2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#bcc9cd] mb-1">
                  <span>APPAREL SPECTRAL TEXTURE</span>
                  <span className="text-[#4edea3] font-bold">97.8% MATCH</span>
                </div>
                <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                  <div className="bg-[#4edea3] h-full" style={{ width: '97.8%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#bcc9cd] mb-1">
                  <span>THERMAL SIGNATURE IR</span>
                  <span className="text-[#ffb95f] font-bold">91.5% MATCH</span>
                </div>
                <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                  <div className="bg-[#ffb95f] h-full" style={{ width: '91.5%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#bcc9cd] mb-1">
                  <span>FACIAL LANDMARKS (LWIR)</span>
                  <span className="text-[#4cd7f6] font-bold">88.4% MATCH</span>
                </div>
                <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                  <div className="bg-[#4cd7f6] h-full" style={{ width: '88.4%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* 3. TACTICAL QUICK-ACTION DOCK */}
          <div className="bg-[#181c24] p-4 lg:p-5 rounded border border-[#ef4444]/60 space-y-2.5">
            <div className="flex items-center gap-2 text-[#ef4444] font-mono text-xs font-bold">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>DECISION-SUPPORT DIRECTIVES</span>
            </div>

            <button
              onClick={() => showToast('Dispatch alert transmitted to Field Response Unit Bravo.')}
              className="w-full py-2.5 bg-[#ef4444] hover:bg-[#ffb4ab] text-white hover:text-[#690005] font-mono text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors shadow-[0_0_12px_rgba(239,68,68,0.4)]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">group_add</span>
              <span>DISPATCH RESPONSE UNIT</span>
            </button>

            <button
              onClick={() => showToast('Checkpoint Response Request sent to Checkpost Alpha Team.')}
              className="w-full py-2.5 bg-[#262a33] hover:bg-[#31353e] text-[#ffb95f] font-mono text-xs font-bold rounded flex items-center justify-center gap-2 border border-[#3d494c] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">fence</span>
              <span>REQUEST CHECKPOINT RESPONSE</span>
            </button>

            <button
              onClick={() => showToast('Perimeter Sector 04 auxiliary lighting request logged.')}
              className="w-full py-2.5 bg-[#262a33] hover:bg-[#31353e] text-[#4cd7f6] font-mono text-xs font-bold rounded flex items-center justify-center gap-2 border border-[#3d494c] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
              <span>COORDINATE PERIMETER LIGHTING</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
