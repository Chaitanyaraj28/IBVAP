import React, { useState } from 'react';
import { ForensicRecord, NavigationPage } from '../types';

interface ForensicSearchViewProps {
  records?: ForensicRecord[];
  onNavigate: (page: NavigationPage) => void;
  onSelectCamera: (cameraId: string) => void;
}

export const ForensicSearchView: React.FC<ForensicSearchViewProps> = ({
  onNavigate,
  onSelectCamera,
}) => {
  const [nlQuery, setNlQuery] = useState('Find all trucks entering Gate C between 1 AM and 3 AM');
  const [selectedClassifier, setSelectedClassifier] = useState<'Vehicle' | 'Person' | 'Drone' | 'Animal'>('Vehicle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '2x' | '4x' | '8x'>('2x');
  const [scrubPercent, setScrubPercent] = useState(78);
  const [selectedEventModal, setSelectedEventModal] = useState<any | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleRunQuery = () => {
    showToast(`Neural Cognitive Query parsed: ${nlQuery.slice(0, 45)}... (4 matching tracks located)`);
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

      {/* TOP TITLE & SYSTEM CONTEXT */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#4cd7f6] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
            <span>SIH-COGNITIVE // FORENSIC AI RETRIEVAL ENGINE</span>
            <span className="text-[#869397]">/</span>
            <span className="text-[#bcc9cd]">NODE: VECTOR-INDEX-4A</span>
          </div>
          <h1 className="font-display text-2xl lg:text-3xl tracking-tight text-[#dfe2ee] uppercase font-bold">
            Video Investigation
          </h1>
          <p className="text-xs text-[#bcc9cd] max-w-3xl leading-relaxed">
            AI-Powered Cognitive Multi-Camera Semantic Retrieval & Spatio-Temporal Intercept Analysis. Real-time cross-vector correlation across tactical checkpoints.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#181c24] px-4 py-2.5 rounded border border-[#1f2a3e]">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#869397]">NEURAL RE-ID ACCURACY</span>
            <span className="font-display font-mono text-lg font-bold text-[#4edea3]">98.42%</span>
          </div>
          <div className="w-px h-6 bg-[#31353e] mx-1" />
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#869397]">INDEXED FRAMES (24H)</span>
            <span className="font-display font-mono text-lg font-bold text-[#4cd7f6]">4,819,204</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: SEARCH & FILTER COMPONENT DOCK */}
      <div className="bg-[#181c24] p-4 lg:p-5 rounded space-y-4 shadow-sm border border-[#1f2a3e]">
        {/* Natural Language Cognitive Prompt Row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-2">
          <div className="relative flex-1 flex items-center bg-[#0a0e16] rounded border border-[#1f2a3e]">
            <span className="material-symbols-outlined absolute left-3 text-[#4cd7f6] text-[20px]">psychology</span>
            <input
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              onKeyDown={(e) => {
                if ((e.altKey || e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                  handleRunQuery();
                }
              }}
              className="w-full bg-transparent pl-11 pr-24 py-3 text-[#dfe2ee] text-sm placeholder:text-[#869397] focus:outline-none"
              placeholder="Ask anything in natural language..."
              type="text"
            />
            <div className="absolute right-3 flex items-center gap-1">
              <button
                onClick={() => showToast('Listening for natural language voice prompt...')}
                className="p-1 text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors"
                title="Voice Dictation"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </button>
              <button
                onClick={() => setNlQuery('')}
                className="p-1 text-[#bcc9cd] hover:text-[#ef4444] transition-colors"
                title="Clear Query"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
              <button
                onClick={() => setNlQuery('Find all trucks entering Gate C between 1 AM and 3 AM')}
                className="p-1 text-[#bcc9cd] hover:text-[#4edea3] transition-colors"
                title="Recent Prompts"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">history</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleRunQuery}
            className="flex items-center justify-center gap-2 bg-[#4cd7f6] text-[#003640] hover:bg-[#acedff] px-6 py-3 rounded font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_16px_rgba(76,215,246,0.35)] active:scale-[0.98]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span>RUN NEURAL QUERY</span>
            <span className="bg-[#003640]/20 text-[#003640] px-1.5 py-0.5 rounded font-mono text-[9px]">
              ALT+ENTER
            </span>
          </button>
        </div>

        {/* Structured Parameter Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2 pt-1 font-mono text-xs">
          {/* Date */}
          <div className="bg-[#1c2028] rounded p-2.5 flex flex-col justify-between border border-[#1f2a3e]">
            <span className="text-[9px] text-[#869397] uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>DATE
            </span>
            <div className="flex items-center justify-between text-[#dfe2ee] font-bold mt-1">
              <span>02 NOV 2024</span>
              <span className="material-symbols-outlined text-[#869397] text-[16px]">edit_calendar</span>
            </div>
          </div>

          {/* Time Window */}
          <div className="bg-[#1c2028] rounded p-2.5 flex flex-col justify-between border border-[#1f2a3e]">
            <span className="text-[9px] text-[#869397] uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>WINDOW (IST)
            </span>
            <div className="flex items-center justify-between text-[#4edea3] font-bold mt-1">
              <span>01:00 — 03:30</span>
              <span className="material-symbols-outlined text-[#869397] text-[16px]">tune</span>
            </div>
          </div>

          {/* Sites / Checkposts */}
          <div className="bg-[#1c2028] rounded p-2.5 flex flex-col justify-between border border-[#1f2a3e]">
            <span className="text-[9px] text-[#869397] uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">fence</span>CHECKPOST SECTOR
            </span>
            <div className="flex items-center justify-between text-[#dfe2ee] font-bold mt-1 truncate">
              <span className="truncate">Gate C / BOP North</span>
              <span className="material-symbols-outlined text-[#869397] text-[16px]">arrow_drop_down</span>
            </div>
          </div>

          {/* Optical Sensor Nodes */}
          <div className="bg-[#1c2028] rounded p-2.5 flex flex-col justify-between border border-[#1f2a3e]">
            <span className="text-[9px] text-[#869397] uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">videocam</span>CAMERAS
            </span>
            <div className="flex items-center justify-between text-[#4cd7f6] font-bold mt-1">
              <span className="truncate">001, 003, 008 (3)</span>
              <span className="material-symbols-outlined text-[#869397] text-[16px]">check_box</span>
            </div>
          </div>

          {/* Classification Target Pills (Spans 2 cols) */}
          <div className="bg-[#1c2028] rounded p-2.5 flex flex-col justify-between sm:col-span-2 xl:col-span-2 border border-[#1f2a3e]">
            <span className="text-[9px] text-[#869397] uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">category</span>OBJECT CLASSIFIER
            </span>
            <div className="flex items-center gap-1.5 mt-1 overflow-x-auto">
              {(['Vehicle', 'Person', 'Drone', 'Animal'] as const).map((cls) => (
                <span
                  key={cls}
                  onClick={() => setSelectedClassifier(cls)}
                  className={`px-2.5 py-0.5 text-[10px] rounded font-bold uppercase cursor-pointer transition-colors ${
                    selectedClassifier === cls
                      ? 'bg-[#4cd7f6] text-[#003640]'
                      : 'bg-[#262a33] text-[#bcc9cd] hover:text-[#dfe2ee]'
                  }`}
                >
                  {cls}
                </span>
              ))}
            </div>
          </div>

          {/* Risk Filter */}
          <div className="bg-[#1c2028] rounded p-2.5 flex flex-col justify-between border border-[#1f2a3e]">
            <span className="text-[9px] text-[#869397] uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">security</span>THREAT LEVEL
            </span>
            <div className="flex items-center justify-between text-[#ffb95f] font-bold mt-1">
              <span>&gt;= 50 [MED+]</span>
              <span className="material-symbols-outlined text-[#ffb95f] text-[16px]">warning</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: RESULTS META & VIEW CONTROLS */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold text-[#dfe2ee] uppercase tracking-wide">
            QUERY CORRELATION RESULTS
          </span>
          <span className="px-2 py-0.5 bg-[#06b6d4] text-[#00424f] font-mono text-[10px] rounded font-bold">
            4 DETECTIONS FOUND
          </span>
          <span className="hidden md:inline text-xs text-[#869397]">
            Semantic confidence scored via SIH-ResNet-50 v2
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-xs">
          <span className="text-[#869397]">SORT:</span>
          <span className="text-[#4cd7f6] font-bold uppercase cursor-pointer">CHRONOLOGICAL [INGRESS]</span>
          <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">swap_vert</span>
        </div>
      </div>

      {/* SECTION 3: FORENSIC RESULT CARDS (4 RESULTS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* RESULT CARD 1 */}
        <div className="bg-[#181c24] rounded overflow-hidden flex flex-col justify-between shadow-md border border-[#1f2a3e] group">
          {/* Media Header */}
          <div className="relative w-full h-48 bg-[#0a0e16] overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              alt="Night vision truck"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ-Iz6FmfPio8WoISYH5dId7HmLeiQYPgKTvGXNO7mY1gIzvBsELnYSCwh-aSkPijlhutaIGN5XTlLEEjkerJ48diLCAbBGELV5AOJoqPp-qmpjOS8viMZ1hMbOQAFO_F3iTmfffMz_dNdGjMTibYnGNyTp-t0liQ2dzdjxFY8kggRFAC4SEnZuhq4yzBOHRTfkarhFDIHYo8r-JXSeUxi5J7569FPq63NgzHSFCTz4gC3TR63JGbHag"
            />
            {/* Bounding Box HUD Overlay */}
            <div className="absolute inset-4 border-2 border-[#4cd7f6]/80 pointer-events-none flex flex-col justify-between p-1">
              <div className="flex items-center justify-between">
                <span className="bg-[#4cd7f6] text-[#003640] px-1 font-mono text-[10px] font-bold">
                  TRUCK-A9 #0981
                </span>
                <span className="text-[#4cd7f6] font-mono text-[10px] bg-[#0a0e16]/80 px-1">
                  CONF: 96.4%
                </span>
              </div>
              <div className="flex justify-end">
                <span className="bg-[#ef4444] text-white px-1 font-mono text-[10px] font-bold">
                  ANOMALY: SPEED
                </span>
              </div>
            </div>
            {/* Absolute Badges */}
            <div className="absolute top-2 left-2 flex items-center gap-1">
              <span className="bg-[#0a0e16]/90 text-[#4edea3] font-mono text-[10px] px-1.5 py-0.5 rounded font-bold border border-[#4edea3]/30">
                CAM-003
              </span>
            </div>
            <div className="absolute bottom-2 left-2 bg-[#0a0e16]/90 text-[#dfe2ee] font-mono text-[10px] px-1.5 py-0.5 rounded">
              01:14:22 IST
            </div>
          </div>

          {/* Body Content */}
          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] text-[#869397] uppercase tracking-wider">PRIMARY MATCH</span>
                <span className="text-[#4edea3] font-mono text-xs font-bold">96% MATCH</span>
              </div>
              <h3 className="font-display text-sm font-bold text-[#dfe2ee]">Heavy 6x6 Flatbed Replica</h3>
              <p className="text-xs text-[#bcc9cd]">Gate C Ingress // Barrier #2</p>
            </div>

            {/* Telemetry Data Grid */}
            <div className="bg-[#1c2028] p-2.5 rounded grid grid-cols-2 gap-2 font-mono text-[10px] border border-[#1f2a3e]">
              <div>
                <span className="text-[#869397] block text-[8px]">PLATE OCR</span>
                <span className="text-[#ef4444] font-bold">UNREGISTERED / OBS</span>
              </div>
              <div>
                <span className="text-[#869397] block text-[8px]">RECORDED SPEED</span>
                <span className="text-[#dfe2ee] font-bold">34 km/h</span>
              </div>
              <div>
                <span className="text-[#869397] block text-[8px]">PAYLOAD SIG</span>
                <span className="text-[#ffb95f] font-bold">METALLIC / HEAVY</span>
              </div>
              <div>
                <span className="text-[#869397] block text-[8px]">OCCUPANCY</span>
                <span className="text-[#dfe2ee] font-bold">2 TARGETS (CABIN)</span>
              </div>
            </div>

            {/* Threat Meter */}
            <div className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#869397]">COMPOSITE RISK INDEX</span>
                <span className="text-[#ef4444] font-bold">88 / 100 [HIGH]</span>
              </div>
              <div className="w-full bg-[#1c2028] h-1.5 rounded overflow-hidden">
                <div className="bg-[#ef4444] h-full rounded" style={{ width: '88%' }} />
              </div>
            </div>
          </div>

          {/* Card Actions */}
          <div className="bg-[#1c2028] p-2 flex items-center justify-between gap-1 border-t border-[#1f2a3e]">
            <button
              onClick={() =>
                setSelectedEventModal({
                  title: 'Heavy 6x6 Flatbed Replica (#0981)',
                  cam: 'CAM-003 Gate C Ingress',
                  time: '01:14:22 IST',
                  risk: '88 / 100 [HIGH]',
                  desc: 'Unregistered commercial vehicle observed driving at elevated velocity into Gate C perimeter zone without active manifest.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ-Iz6FmfPio8WoISYH5dId7HmLeiQYPgKTvGXNO7mY1gIzvBsELnYSCwh-aSkPijlhutaIGN5XTlLEEjkerJ48diLCAbBGELV5AOJoqPp-qmpjOS8viMZ1hMbOQAFO_F3iTmfffMz_dNdGjMTibYnGNyTp-t0liQ2dzdjxFY8kggRFAC4SEnZuhq4yzBOHRTfkarhFDIHYo8r-JXSeUxi5J7569FPq63NgzHSFCTz4gC3TR63JGbHag',
                })
              }
              className="flex-1 py-1 bg-[#06b6d4]/20 hover:bg-[#4cd7f6] text-[#4cd7f6] hover:text-[#003640] rounded font-mono text-[10px] font-bold uppercase transition-colors text-center"
              type="button"
            >
              View Event
            </button>
            <button
              onClick={() => onSelectCamera('CAM-003')}
              className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] rounded text-xs transition-colors"
              title="Open Live Camera Feed"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">videocam</span>
            </button>
            <button
              onClick={() => onNavigate('multi-camera-correlation')}
              className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] rounded text-xs transition-colors"
              title="Correlate Path"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">alt_route</span>
            </button>
          </div>
        </div>

        {/* RESULT CARD 2 */}
        <div className="bg-[#181c24] rounded overflow-hidden flex flex-col justify-between shadow-md border border-[#1f2a3e] group">
          <div className="relative w-full h-48 bg-[#0a0e16] overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              alt="Night pickup CCTV"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWoEXhRIy3Hy3swLtf_vVqok49LQvYTjSmeDi2an3IjaembZnxLj0zwmfTVacK8Dz7Y9l0TtZZJTIwnZmzx0SCq80LkDUHTHAeAaaOQ2nvG_W4b1qTT3O0jEtqM_uVfoauvASe8rkUYgYefVwjvfgqggQ_Bv4TSlP9ju1DDQyJEdO83MCriV2TfZM6L5RsVnET0w3c5lgGaMXPd0X6RhQd-K7sJ-4aka31IOLDjzfaaJL_oSSmpKmPPg"
            />
            <div className="absolute inset-5 border-2 border-[#4cd7f6]/80 pointer-events-none flex flex-col justify-between p-1">
              <div className="flex items-center justify-between">
                <span className="bg-[#4cd7f6] text-[#003640] px-1 font-mono text-[10px] font-bold">
                  PICKUP-X1 #0442
                </span>
                <span className="text-[#4cd7f6] font-mono text-[10px] bg-[#0a0e16]/80 px-1">
                  CONF: 91.8%
                </span>
              </div>
              <div className="flex justify-end">
                <span className="bg-[#ffb95f] text-[#472a00] px-1 font-mono text-[10px] font-bold">
                  LOITER DETECTED
                </span>
              </div>
            </div>
            <div className="absolute top-2 left-2 flex items-center gap-1">
              <span className="bg-[#0a0e16]/90 text-[#4edea3] font-mono text-[10px] px-1.5 py-0.5 rounded font-bold border border-[#4edea3]/30">
                CAM-003
              </span>
            </div>
            <div className="absolute bottom-2 left-2 bg-[#0a0e16]/90 text-[#dfe2ee] font-mono text-[10px] px-1.5 py-0.5 rounded">
              01:48:05 IST
            </div>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] text-[#869397] uppercase tracking-wider">SECONDARY MATCH</span>
                <span className="text-[#4edea3] font-mono text-xs font-bold">91% MATCH</span>
              </div>
              <h3 className="font-display text-sm font-bold text-[#dfe2ee]">White Tata Xenon Pickup</h3>
              <p className="text-xs text-[#bcc9cd]">Gate C Culvert Perimeter</p>
            </div>

            <div className="bg-[#1c2028] p-2.5 rounded grid grid-cols-2 gap-2 font-mono text-[10px] border border-[#1f2a3e]">
              <div>
                <span className="text-[#869397] block text-[8px]">PLATE OCR</span>
                <span className="text-[#ffb95f] font-bold">JK-02-AZ-991* [PARTIAL]</span>
              </div>
              <div>
                <span className="text-[#869397] block text-[8px]">LOITER DURATION</span>
                <span className="text-[#ef4444] font-bold">4m 12s [STATIONARY]</span>
              </div>
              <div>
                <span className="text-[#869397] block text-[8px]">HEADLIGHT STATUS</span>
                <span className="text-[#dfe2ee] font-bold">EXTINGUISHED (TACTICAL)</span>
              </div>
              <div>
                <span className="text-[#869397] block text-[8px]">CREW DETECTED</span>
                <span className="text-[#dfe2ee] font-bold">3 DISMOUNTED</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#869397]">COMPOSITE RISK INDEX</span>
                <span className="text-[#ef4444] font-bold">76 / 100 [HIGH]</span>
              </div>
              <div className="w-full bg-[#1c2028] h-1.5 rounded overflow-hidden">
                <div className="bg-[#ef4444] h-full rounded" style={{ width: '76%' }} />
              </div>
            </div>
          </div>

          <div className="bg-[#1c2028] p-2 flex items-center justify-between gap-1 border-t border-[#1f2a3e]">
            <button
              onClick={() =>
                setSelectedEventModal({
                  title: 'White Tata Xenon Pickup (#0442)',
                  cam: 'CAM-003 Culvert Perimeter',
                  time: '01:48:05 IST',
                  risk: '76 / 100 [HIGH]',
                  desc: 'Stationary loitering for >4 minutes with headlights turned off. Dismounted personnel spotted near water culvert wire.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWoEXhRIy3Hy3swLtf_vVqok49LQvYTjSmeDi2an3IjaembZnxLj0zwmfTVacK8Dz7Y9l0TtZZJTIwnZmzx0SCq80LkDUHTHAeAaaOQ2nvG_W4b1qTT3O0jEtqM_uVfoauvASe8rkUYgYefVwjvfgqggQ_Bv4TSlP9ju1DDQyJEdO83MCriV2TfZM6L5RsVnET0w3c5lgGaMXPd0X6RhQd-K7sJ-4aka31IOLDjzfaaJL_oSSmpKmPPg',
                })
              }
              className="flex-1 py-1 bg-[#06b6d4]/20 hover:bg-[#4cd7f6] text-[#4cd7f6] hover:text-[#003640] rounded font-mono text-[10px] font-bold uppercase transition-colors text-center"
              type="button"
            >
              View Event
            </button>
            <button
              onClick={() => onSelectCamera('CAM-003')}
              className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] rounded text-xs transition-colors"
              title="Open Live Camera Feed"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">videocam</span>
            </button>
            <button
              onClick={() => onNavigate('multi-camera-correlation')}
              className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] rounded text-xs transition-colors"
              title="Correlate Path"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">alt_route</span>
            </button>
          </div>
        </div>

        {/* RESULT CARD 3 */}
        <div className="bg-[#181c24] rounded overflow-hidden flex flex-col justify-between shadow-md border border-[#1f2a3e] group">
          <div className="relative w-full h-48 bg-[#0a0e16] overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              alt="SUV IR camera"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5lYZI4m0eS5roficpaeg1Ef7GYWP-13k1_lFQGrHzbsWH9JvuQz17YLLwBP-Hru6QMupnG2SzPQupAj8AXJrSCzQfg12izQ6YLLAzTxd9VhWwTGhCBUsoT5QyAYj1XT15F-D5cuzxYo4ihxU1daY6UpZI8RlWAOlyRDeStSCltDhc2LXQUJrQMTtobk6YjF7ykT-zbsWExD9Wv2En00VhNHiDsoRQi6hE8BI3KaWsJ9M9i45QmukK1w"
            />
            <div className="absolute inset-6 border-2 border-[#4cd7f6]/80 pointer-events-none flex flex-col justify-between p-1">
              <div className="flex items-center justify-between">
                <span className="bg-[#4cd7f6] text-[#003640] px-1 font-mono text-[10px] font-bold">
                  SUV-M4 #1128
                </span>
                <span className="text-[#4cd7f6] font-mono text-[10px] bg-[#0a0e16]/80 px-1">
                  CONF: 88.1%
                </span>
              </div>
              <div className="flex justify-end">
                <span className="bg-[#4edea3] text-[#003824] px-1 font-mono text-[10px] font-bold">
                  V-FENCE LINE
                </span>
              </div>
            </div>
            <div className="absolute top-2 left-2 flex items-center gap-1">
              <span className="bg-[#0a0e16]/90 text-[#4edea3] font-mono text-[10px] px-1.5 py-0.5 rounded font-bold border border-[#4edea3]/30">
                CAM-007
              </span>
            </div>
            <div className="absolute bottom-2 left-2 bg-[#0a0e16]/90 text-[#dfe2ee] font-mono text-[10px] px-1.5 py-0.5 rounded">
              02:22:10 IST
            </div>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] text-[#869397] uppercase tracking-wider">SECTOR CONVOY</span>
                <span className="text-[#4edea3] font-mono text-xs font-bold">88% MATCH</span>
              </div>
              <h3 className="font-display text-sm font-bold text-[#dfe2ee]">Dark Scorpio Utility SUV</h3>
              <p className="text-xs text-[#bcc9cd]">Sector 4 Ridge Line Approach</p>
            </div>

            <div className="bg-[#1c2028] p-2.5 rounded grid grid-cols-2 gap-2 font-mono text-[10px] border border-[#1f2a3e]">
              <div>
                <span className="text-[#869397] block text-[8px]">PLATE OCR</span>
                <span className="text-[#dfe2ee] font-bold">JK-01-E-4019</span>
              </div>
              <div>
                <span className="text-[#869397] block text-[8px]">RECORDED SPEED</span>
                <span className="text-[#ef4444] font-bold">58 km/h (LIMIT 25)</span>
              </div>
              <div>
                <span className="text-[#869397] block text-[8px]">TRAJECTORY VECTOR</span>
                <span className="text-[#4edea3] font-bold">PARALLEL TO FENCE</span>
              </div>
              <div>
                <span className="text-[#869397] block text-[8px]">CORRELATED ID</span>
                <span className="text-[#4cd7f6] font-bold">ESCORT TIE (TRUCK-A9)</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#869397]">COMPOSITE RISK INDEX</span>
                <span className="text-[#ffb95f] font-bold">64 / 100 [MED]</span>
              </div>
              <div className="w-full bg-[#1c2028] h-1.5 rounded overflow-hidden">
                <div className="bg-[#ffb95f] h-full rounded" style={{ width: '64%' }} />
              </div>
            </div>
          </div>

          <div className="bg-[#1c2028] p-2 flex items-center justify-between gap-1 border-t border-[#1f2a3e]">
            <button
              onClick={() =>
                setSelectedEventModal({
                  title: 'Dark Scorpio Utility SUV (#1128)',
                  cam: 'CAM-007 Ridge Line Approach',
                  time: '02:22:10 IST',
                  risk: '64 / 100 [MED]',
                  desc: 'Fast-moving vehicle matching escort convoy profile clocked at 58 km/h on restricted patrol trail.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5lYZI4m0eS5roficpaeg1Ef7GYWP-13k1_lFQGrHzbsWH9JvuQz17YLLwBP-Hru6QMupnG2SzPQupAj8AXJrSCzQfg12izQ6YLLAzTxd9VhWwTGhCBUsoT5QyAYj1XT15F-D5cuzxYo4ihxU1daY6UpZI8RlWAOlyRDeStSCltDhc2LXQUJrQMTtobk6YjF7ykT-zbsWExD9Wv2En00VhNHiDsoRQi6hE8BI3KaWsJ9M9i45QmukK1w',
                })
              }
              className="flex-1 py-1 bg-[#06b6d4]/20 hover:bg-[#4cd7f6] text-[#4cd7f6] hover:text-[#003640] rounded font-mono text-[10px] font-bold uppercase transition-colors text-center"
              type="button"
            >
              View Event
            </button>
            <button
              onClick={() => onSelectCamera('CAM-007')}
              className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] rounded text-xs transition-colors"
              title="Open Live Camera Feed"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">videocam</span>
            </button>
            <button
              onClick={() => onNavigate('multi-camera-correlation')}
              className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] rounded text-xs transition-colors"
              title="Correlate Path"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">alt_route</span>
            </button>
          </div>
        </div>

        {/* RESULT CARD 4 */}
        <div className="bg-[#181c24] rounded overflow-hidden flex flex-col justify-between shadow-md border border-[#ef4444]/50 group">
          <div className="relative w-full h-48 bg-[#0a0e16] overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              alt="Checkpoint truck stop"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1nj2nhuA-Pnr_u4Sl3VTxfcRiL_B2WyelpWMtuq9JS60Tyu570-qBZ6ZtMGSdj3KOE5Vg2EOG7Kj-RH_agBoXxrbB6GR6oIAM9tKoCLHEE2uzDBmXYa_AqpVelGrl5NO3MAApWESICunXOonnUyieI4I2L9lGgFFr65rx_whO3mdbfS2NGowV0ERB8hk2Wak-gdTLJ4ldUrKeVDRiqaM3YQDlahnWR0ruwKX2YLrrxzxWqIavlcKUaA"
            />
            <div className="absolute inset-4 border-2 border-[#ef4444]/80 pointer-events-none flex flex-col justify-between p-1">
              <div className="flex items-center justify-between">
                <span className="bg-[#ef4444] text-white px-1 font-mono text-[10px] font-bold">
                  TARGET LOCKED #0981
                </span>
                <span className="text-[#ef4444] font-mono text-[10px] bg-[#0a0e16]/80 px-1">
                  CONF: 84.6%
                </span>
              </div>
              <div className="flex justify-end">
                <span className="bg-[#ef4444] text-white px-1 font-mono text-[10px] font-bold">
                  SPIKES ARMED
                </span>
              </div>
            </div>
            <div className="absolute top-2 left-2 flex items-center gap-1">
              <span className="bg-[#0a0e16]/90 text-[#4edea3] font-mono text-[10px] px-1.5 py-0.5 rounded font-bold border border-[#4edea3]/30">
                CAM-001
              </span>
            </div>
            <div className="absolute bottom-2 left-2 bg-[#0a0e16]/90 text-[#dfe2ee] font-mono text-[10px] px-1.5 py-0.5 rounded">
              02:58:44 IST
            </div>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] text-[#869397] uppercase tracking-wider">TERMINAL INTERCEPT</span>
                <span className="text-[#4edea3] font-mono text-xs font-bold">84% MATCH</span>
              </div>
              <h3 className="font-display text-sm font-bold text-[#dfe2ee]">Covered Cargo Transport</h3>
              <p className="text-xs text-[#bcc9cd]">Checkpost Alpha Ingress Zone</p>
            </div>

            <div className="bg-[#1c2028] p-2.5 rounded grid grid-cols-2 gap-2 font-mono text-[10px] border border-[#1f2a3e]">
              <div>
                <span className="text-[#869397] block text-[8px]">PLATE OCR</span>
                <span className="text-[#ef4444] font-bold">FALSE RE-STICKERED</span>
              </div>
              <div>
                <span className="text-[#869397] block text-[8px]">INTERCEPT STATUS</span>
                <span className="text-[#ef4444] font-bold">HYDRAULIC RETENTION</span>
              </div>
              <div>
                <span className="text-[#869397] block text-[8px]">CARGO SCAN</span>
                <span className="text-[#ffb95f] font-bold">NON-DECL. CONTAINERS</span>
              </div>
              <div>
                <span className="text-[#869397] block text-[8px]">QRF STATUS</span>
                <span className="text-[#4edea3] font-bold">DEPLOYED ON-SITE</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#869397]">COMPOSITE RISK INDEX</span>
                <span className="text-[#ef4444] font-bold">94 / 100 [CRITICAL]</span>
              </div>
              <div className="w-full bg-[#1c2028] h-1.5 rounded overflow-hidden">
                <div className="bg-[#ef4444] h-full rounded" style={{ width: '94%' }} />
              </div>
            </div>
          </div>

          <div className="bg-[#1c2028] p-2 flex items-center justify-between gap-1 border-t border-[#1f2a3e]">
            <button
              onClick={() => showToast('Command Directive: Hydraulic road spikes locked and physical interdiction held.')}
              className="flex-1 py-1 bg-[#ef4444] text-white hover:bg-[#ffb4ab] hover:text-[#690005] rounded font-mono text-[10px] font-bold uppercase transition-colors text-center shadow-[0_0_8px_rgba(239,68,68,0.4)]"
              type="button"
            >
              Interdict
            </button>
            <button
              onClick={() => onSelectCamera('CAM-001')}
              className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] rounded text-xs transition-colors"
              title="Open Live Camera Feed"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">videocam</span>
            </button>
            <button
              onClick={() => onNavigate('multi-camera-correlation')}
              className="px-2 py-1 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] rounded text-xs transition-colors"
              title="Correlate Path"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">alt_route</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: SPATIO-TEMPORAL TRAJECTORY RECONSTRUCTION & TIMELINE */}
      <div className="bg-[#181c24] p-4 lg:p-6 rounded space-y-4 shadow-sm border border-[#1f2a3e]">
        {/* Timeline Section Header & Action Suite */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-1">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#4cd7f6] uppercase">
              <span className="material-symbols-outlined text-[16px]">route</span>
              <span>MULTI-CAMERA CROSS-CORRELATION TIMELINE // TARGET TRAJECTORY RECONSTRUCTION</span>
            </div>
            <h2 className="font-display text-base lg:text-lg font-bold text-[#dfe2ee] mt-0.5">
              Kinematic Path Analysis: Suspect Vehicle Vector #TRUCK-A9
            </h2>
          </div>

          <div className="flex items-center flex-wrap gap-2 font-mono text-xs">
            <button
              onClick={() => showToast('KMZ GPS trajectory file exported.')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c2028] text-[#dfe2ee] hover:text-[#4cd7f6] rounded uppercase transition-colors border border-[#1f2a3e]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">map</span>
              <span>Export KMZ Telemetry</span>
            </button>
            <button
              onClick={() => showToast('Cryptographic SHA-256 evidence hash generated for court proceedings.')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c2028] text-[#dfe2ee] hover:text-[#4cd7f6] rounded uppercase transition-colors border border-[#1f2a3e]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">fingerprint</span>
              <span>Generate Forensic Hash</span>
            </button>
            <button
              onClick={() => showToast('Case Dossier #SIH-2024-TRUCK9 created and synced to Central Command.')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4cd7f6] text-[#003640] hover:bg-[#acedff] rounded font-bold uppercase transition-all shadow-[0_0_12px_rgba(76,215,246,0.3)]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">folder_special</span>
              <span>Create Case Dossier</span>
            </button>
          </div>
        </div>

        {/* Video Playback & Scrubber Controls */}
        <div className="bg-[#0a0e16] p-3 rounded space-y-2 border border-[#1f2a3e]">
          <div className="flex items-center justify-between text-[#bcc9cd] font-mono text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setScrubPercent(Math.max(4, scrubPercent - 20))}
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
                onClick={() => setScrubPercent(Math.min(100, scrubPercent + 20))}
                className="text-[#dfe2ee] hover:text-[#4cd7f6]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">skip_next</span>
              </button>
              <span className="text-[#dfe2ee] font-bold">01:04:18 IST</span>
              <span className="text-[#869397]">/ 03:00:00 IST (TOTAL: 1h 56m)</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#869397] text-[10px]">REPLAY SPEED:</span>
              {(['1x', '2x', '4x', '8x'] as const).map((spd) => (
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

          {/* Scrub Progress Bar with Hop Pin Indicators */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
              setScrubPercent(pos);
            }}
            className="relative w-full h-3 bg-[#1c2028] rounded cursor-pointer group"
          >
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#4cd7f6]/40 rounded"
              style={{ width: `${scrubPercent}%` }}
            />
            {/* Hop markers */}
            <div className="absolute top-0 bottom-0 w-1 bg-[#4edea3] rounded" style={{ left: '4%' }} title="Hop 1: 01:04 IST" />
            <div className="absolute top-0 bottom-0 w-1 bg-[#ef4444] rounded" style={{ left: '36%' }} title="Hop 2: 01:48 IST" />
            <div className="absolute top-0 bottom-0 w-1 bg-[#ffb95f] rounded" style={{ left: '56%' }} title="Hop 3: 02:15 IST" />
            <div className="absolute top-0 bottom-0 w-1 bg-[#ef4444] rounded" style={{ left: '78%' }} title="Hop 4: 02:40 IST" />

            {/* Scrubber Handle */}
            <div
              className="absolute -top-1 w-5 h-5 bg-[#4cd7f6] text-[#003640] rounded-full shadow-[0_0_8px_rgba(76,215,246,0.8)] -ml-2.5 flex items-center justify-center cursor-grab"
              style={{ left: `${scrubPercent}%` }}
            >
              <div className="w-1.5 h-1.5 bg-[#003640] rounded-full" />
            </div>
          </div>
        </div>

        {/* Trajectory Hop Progression Cards (4 Spatio-temporal Nodes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {/* HOP 1 */}
          <div className="bg-[#1c2028] p-4 rounded space-y-2 relative overflow-hidden border border-[#1f2a3e]">
            <div className="flex items-center justify-between">
              <span className="px-1.5 py-0.5 bg-[#00a572]/30 text-[#4edea3] font-mono text-[10px] rounded font-bold border border-[#00a572]/40">
                HOP 01 // ENTRY
              </span>
              <span className="font-mono text-[#4edea3] font-bold text-xs">01:04:18 IST</span>
            </div>
            <div>
              <div className="font-display font-bold text-sm text-[#dfe2ee]">Node CAM-011</div>
              <div className="text-xs text-[#bcc9cd]">BOP North Bypass Road</div>
            </div>
            <div className="bg-[#181c24] p-2 rounded font-mono text-[10px] space-y-0.5 text-[#bcc9cd] border border-[#1f2a3e]">
              <div className="flex justify-between">
                <span>EVENT:</span>
                <span className="text-[#dfe2ee] font-semibold">Heavy Vehicle Ingress</span>
              </div>
              <div className="flex justify-between">
                <span>VELOCITY:</span>
                <span className="text-[#4edea3] font-semibold">32 km/h</span>
              </div>
              <div className="flex justify-between">
                <span>CONFIDENCE:</span>
                <span className="text-[#4cd7f6] font-semibold">97.8%</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#4edea3]">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>CLEARED OUTER PERIMETER</span>
            </div>
          </div>

          {/* HOP 2 */}
          <div className="bg-[#1c2028] p-4 rounded space-y-2 relative overflow-hidden border border-[#1f2a3e]">
            <div className="flex items-center justify-between">
              <span className="px-1.5 py-0.5 bg-[#93000a]/40 text-[#ef4444] font-mono text-[10px] rounded font-bold border border-[#ef4444]/40">
                HOP 02 // BREACH
              </span>
              <span className="font-mono text-[#ef4444] font-bold text-xs">01:48:05 IST</span>
            </div>
            <div>
              <div className="font-display font-bold text-sm text-[#dfe2ee]">Node CAM-003</div>
              <div className="text-xs text-[#bcc9cd]">Gate C Perimeter Culvert</div>
            </div>
            <div className="bg-[#181c24] p-2 rounded font-mono text-[10px] space-y-0.5 text-[#bcc9cd] border border-[#1f2a3e]">
              <div className="flex justify-between">
                <span>EVENT:</span>
                <span className="text-[#ef4444] font-semibold">Obscured Plate / Loiter</span>
              </div>
              <div className="flex justify-between">
                <span>STATIONARY:</span>
                <span className="text-[#ef4444] font-semibold">4m 12s Duration</span>
              </div>
              <div className="flex justify-between">
                <span>RISK SCORE:</span>
                <span className="text-[#ef4444] font-semibold">88 / 100 [HIGH]</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#ef4444]">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              <span>ANOMALY FLAGGED BY SIH ENGINE</span>
            </div>
          </div>

          {/* HOP 3 */}
          <div className="bg-[#1c2028] p-4 rounded space-y-2 relative overflow-hidden border border-[#1f2a3e]">
            <div className="flex items-center justify-between">
              <span className="px-1.5 py-0.5 bg-[#e79400]/30 text-[#ffb95f] font-mono text-[10px] rounded font-bold border border-[#e79400]/40">
                HOP 03 // SPLIT
              </span>
              <span className="font-mono text-[#ffb95f] font-bold text-xs">02:15:33 IST</span>
            </div>
            <div>
              <div className="font-display font-bold text-sm text-[#dfe2ee]">Node CAM-007</div>
              <div className="text-xs text-[#bcc9cd]">Sector 4 Ridge Line Approach</div>
            </div>
            <div className="bg-[#181c24] p-2 rounded font-mono text-[10px] space-y-0.5 text-[#bcc9cd] border border-[#1f2a3e]">
              <div className="flex justify-between">
                <span>EVENT:</span>
                <span className="text-[#ffb95f] font-semibold">Secondary Escort Rendezvous</span>
              </div>
              <div className="flex justify-between">
                <span>TACTICAL:</span>
                <span className="text-[#dfe2ee] font-semibold">Lights Off Movement</span>
              </div>
              <div className="flex justify-between">
                <span>RISK SCORE:</span>
                <span className="text-[#ffb95f] font-semibold">79 / 100 [ELEV]</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#ffb95f]">
              <span className="material-symbols-outlined text-[14px]">sensors</span>
              <span>GEO-FENCE CROSSING RECORDED</span>
            </div>
          </div>

          {/* HOP 4 */}
          <div className="bg-[#1c2028] p-4 rounded space-y-2 relative overflow-hidden border border-[#ef4444]/60">
            <div className="flex items-center justify-between">
              <span className="px-1.5 py-0.5 bg-[#ef4444] text-white font-mono text-[10px] rounded font-bold uppercase">
                HOP 04 // INTERCEPT
              </span>
              <span className="font-mono text-[#ef4444] font-bold text-xs">02:40:19 IST</span>
            </div>
            <div>
              <div className="font-display font-bold text-sm text-[#dfe2ee]">Node CAM-001</div>
              <div className="text-xs text-[#bcc9cd]">Checkpost Alpha Checkpoint</div>
            </div>
            <div className="bg-[#181c24] p-2 rounded font-mono text-[10px] space-y-0.5 text-[#bcc9cd] border border-[#1f2a3e]">
              <div className="flex justify-between">
                <span>INTERCEPT:</span>
                <span className="text-[#ef4444] font-semibold">Target Lock Initiated</span>
              </div>
              <div className="flex justify-between">
                <span>DEFENSIVE:</span>
                <span className="text-[#ef4444] font-semibold">Hydraulic Spikes Armed</span>
              </div>
              <div className="flex justify-between">
                <span>RISK SCORE:</span>
                <span className="text-[#ef4444] font-semibold">94 / 100 [CRIT]</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#4cd7f6] font-bold animate-pulse">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>TACTICAL VEHICLE RETENTION ENGAGED</span>
            </div>
          </div>
        </div>

        {/* Live Geographic Path Continuity Status Vector Strip */}
        <div className="bg-[#0a0e16] p-4 rounded flex flex-col md:flex-row items-center justify-between gap-4 border border-[#1f2a3e]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-[#06b6d4]/20 flex items-center justify-center text-[#4cd7f6] shrink-0 border border-[#06b6d4]/40">
              <span className="material-symbols-outlined text-[24px]">satellite_alt</span>
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-[#dfe2ee] uppercase">
                Spatio-Temporal Vector Continuity Status
              </div>
              <div className="text-xs text-[#869397]">
                Kinematic velocity match confirmed across all 4 optical hops. Estimated target stop coordinate: 33.7214° N, 74.8911° E.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs shrink-0">
            <span className="px-2.5 py-1 bg-[#1c2028] text-[#4edea3] rounded border border-[#1f2a3e]">
              RE-ID CONFIDENCE: 98.4%
            </span>
            <span className="px-2.5 py-1 bg-[#93000a] text-[#ffdad6] rounded font-bold border border-[#ef4444]/40">
              STATUS: INTERCEPTED
            </span>
          </div>
        </div>
      </div>

      {/* EVENT DETAIL MODAL */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#28354d] rounded-xl w-full max-w-lg p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1f2a3e] pb-2">
              <h3 className="font-display font-bold text-sm uppercase text-white">
                {selectedEventModal.title}
              </h3>
              <button onClick={() => setSelectedEventModal(null)} className="text-[#869397] hover:text-white">✕</button>
            </div>
            <div className="relative rounded overflow-hidden h-48 bg-black">
              <img src={selectedEventModal.img} alt={selectedEventModal.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded font-mono text-[10px] text-[#4edea3]">
                {selectedEventModal.cam}
              </div>
              <div className="absolute bottom-2 left-2 bg-[#ef4444] text-white px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                RISK: {selectedEventModal.risk}
              </div>
            </div>
            <p className="text-xs text-[#bcc9cd] leading-relaxed">{selectedEventModal.desc}</p>
            <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-[#1f2a3e]">
              <span className="text-[#869397]">{selectedEventModal.time}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedEventModal(null);
                    onNavigate('multi-camera-correlation');
                  }}
                  className="px-3 py-1 bg-[#4cd7f6] text-[#003640] rounded font-bold text-xs"
                >
                  TRACK IN CORRELATION AI &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
