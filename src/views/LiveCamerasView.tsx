import React, { useState } from 'react';
import { CameraFeed, NavigationPage } from '../types';
import {
  Video,
  Grid,
  Maximize2,
  Camera,
  Sliders,
  Compass,
  ZoomIn,
  ZoomOut,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  VolumeX,
  Radio,
  Eye,
  Crosshair,
  AlertTriangle,
  Play,
  Square,
  Bookmark,
  Sparkles,
  Layers,
  Activity,
  Cpu,
} from 'lucide-react';

interface LiveCamerasViewProps {
  cameras: CameraFeed[];
  selectedCameraId: string;
  onSelectCamera: (cameraId: string) => void;
  onNavigate: (page: NavigationPage) => void;
  onOpenDispatch: () => void;
}

export const LiveCamerasView: React.FC<LiveCamerasViewProps> = ({
  cameras,
  selectedCameraId,
  onSelectCamera,
  onNavigate,
  onOpenDispatch,
}) => {
  const [sectorFilter, setSectorFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [layout, setLayout] = useState<'2x2' | '3x3' | '1+5'>('1+5');
  const [showOverlays, setShowOverlays] = useState(true);
  const [showTracks, setShowTracks] = useState(true);
  const [showFenceLine, setShowFenceLine] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [snapshotTaken, setSnapshotTaken] = useState(false);
  const [ptzZoom, setPtzZoom] = useState(4.2);

  const selectedCam =
    cameras.find((c) => c.id === selectedCameraId) || cameras[0];

  const filteredCameras = cameras.filter((c) => {
    if (sectorFilter !== 'ALL' && !c.sector.includes(sectorFilter)) return false;
    if (typeFilter !== 'ALL' && c.type !== typeFilter) return false;
    return true;
  });

  const handleCaptureSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2000);
  };

  return (
    <div className="w-full flex flex-col p-4 md:p-6 gap-5 text-[#dfe2ee] select-none">
      {/* Top Header & Layout Filter Bar */}
      <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#111827] border border-[#28354d] flex items-center justify-center text-[#06b6d4]">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-sm font-bold text-[#f8fafc] tracking-wide uppercase">
                SURVEILLANCE MATRIX // MULTI-CHANNEL C2
              </h2>
              <span className="px-1.5 py-0.5 bg-[#10b981]/20 text-[#10b981] font-mono text-[10px] font-bold rounded">
                142 ONLINE
              </span>
            </div>
            <p className="font-mono text-[10px] text-[#869397]">
              EDGE INFERENCE TPU CLUSTER ACTIVE • REAL-TIME MOTION RE-ID
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {/* Sector Filter */}
          <div className="flex items-center bg-[#111827] border border-[#1f2a3e] rounded px-2 py-1">
            <span className="text-[10px] text-[#869397] mr-1.5 uppercase">SECTOR:</span>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="bg-transparent text-xs text-[#06b6d4] focus:outline-none cursor-pointer"
            >
              <option value="ALL">ALL SECTORS</option>
              <option value="Sector 4">SECTOR 4 (BOP NORTH)</option>
              <option value="Sector 1">SECTOR 1 (GATE ALPHA)</option>
              <option value="Sector 2">SECTOR 2 (BOP SOUTH)</option>
              <option value="Sector 3">SECTOR 3 (GATE BRAVO)</option>
            </select>
          </div>

          {/* Sensor Type Filter */}
          <div className="flex items-center bg-[#111827] border border-[#1f2a3e] rounded px-2 py-1">
            <span className="text-[10px] text-[#869397] mr-1.5 uppercase">SENSOR:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-xs text-[#06b6d4] focus:outline-none cursor-pointer"
            >
              <option value="ALL">ALL SENSORS</option>
              <option value="THERMAL_FLIR">THERMAL FLIR</option>
              <option value="OPTICAL_PTZ">OPTICAL PTZ</option>
              <option value="ANPR">ANPR CHECKPOST</option>
              <option value="FIXED_BULLET">FIXED BULLET</option>
            </select>
          </div>

          {/* Layout Selector */}
          <div className="flex items-center bg-[#111827] border border-[#1f2a3e] rounded p-0.5">
            <button
              onClick={() => setLayout('1+5')}
              className={`px-2 py-1 rounded text-[10px] font-bold ${
                layout === '1+5' ? 'bg-[#06b6d4] text-[#001f26]' : 'text-[#869397] hover:text-[#f8fafc]'
              }`}
            >
              1+5 FOCUS
            </button>
            <button
              onClick={() => setLayout('2x2')}
              className={`px-2 py-1 rounded text-[10px] font-bold ${
                layout === '2x2' ? 'bg-[#06b6d4] text-[#001f26]' : 'text-[#869397] hover:text-[#f8fafc]'
              }`}
            >
              2x2 GRID
            </button>
            <button
              onClick={() => setLayout('3x3')}
              className={`px-2 py-1 rounded text-[10px] font-bold ${
                layout === '3x3' ? 'bg-[#06b6d4] text-[#001f26]' : 'text-[#869397] hover:text-[#f8fafc]'
              }`}
            >
              3x3 WALL
            </button>
          </div>
        </div>
      </div>

      {/* Main Focus Layout (1 Primary Stream + Controls + Secondary Carousel/Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* PRIMARY STREAM INSPECTOR (8 Cols) */}
        <div className="lg:col-span-8 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-3 shadow-xl">
          {/* Stream Header Info */}
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  selectedCam.id === 'CAM-007' ? 'bg-[#ef4444] animate-ping' : 'bg-[#10b981]'
                }`}
              />
              <span className="font-display text-sm font-bold text-[#f8fafc]">
                {selectedCam.id} — {selectedCam.name}
              </span>
              <span
                className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase ${
                  selectedCam.id === 'CAM-007'
                    ? 'bg-[#991b1b] text-white'
                    : 'bg-[#161f30] text-[#06b6d4]'
                }`}
              >
                {selectedCam.type.replace('_', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-[#869397]">
              <span>{selectedCam.resolution}</span>
              <span>•</span>
              <span className="text-[#10b981] font-bold">{selectedCam.fps} FPS</span>
              <span>•</span>
              <span className="text-[#06b6d4] font-bold">{selectedCam.latencyMs}ms LAT</span>
            </div>
          </div>

          {/* Primary Viewfinder Stream */}
          <div className="relative w-full h-[460px] bg-[#070a0f] border border-[#1f2a3e] rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={selectedCam.imageUrl}
              alt={selectedCam.name}
              className="w-full h-full object-cover"
            />

            {/* Simulated HUD Reticle Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 font-mono text-[10px] text-white/80 bg-black/60 px-2 py-1 rounded backdrop-blur">
                <div>SENSOR: {selectedCam.encoder}</div>
                <div>TPU LOAD: {selectedCam.tpuLoad}% // {selectedCam.temperatureC}°C</div>
                <div>AZIMUTH: {selectedCam.coordinates.azimuth}° | ELEV: {selectedCam.coordinates.alt}m</div>
              </div>

              {/* Crosshair Center Reticle */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <div className="w-16 h-16 border border-cyan-400/50 rounded-full flex items-center justify-center">
                  <div className="w-1 h-3 bg-cyan-400 absolute" />
                  <div className="w-3 h-1 bg-cyan-400 absolute" />
                </div>
              </div>

              {/* Tripwire Line on CAM-007 */}
              {showFenceLine && selectedCam.id === 'CAM-007' && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1="20%"
                    y1="65%"
                    x2="85%"
                    y2="55%"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                  <text
                    x="25%"
                    y="63%"
                    fill="#ef4444"
                    fontSize="11"
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                  >
                    TRIPWIRE #4 [PENETRATED]
                  </text>
                </svg>
              )}

              {/* AI Bounding Boxes */}
              {showOverlays &&
                selectedCam.targetOverlays?.map((target, idx) => (
                  <div
                    key={idx}
                    className="absolute border-2 rounded-sm transition-all"
                    style={{
                      top: target.box.top,
                      left: target.box.left,
                      width: target.box.width,
                      height: target.box.height,
                      borderColor: target.color,
                      backgroundColor: `${target.color}15`,
                    }}
                  >
                    <div
                      style={{ backgroundColor: target.color }}
                      className="text-[#001f26] font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-b-sm whitespace-nowrap self-start shadow-lg"
                    >
                      {target.label}
                    </div>
                    {showTracks && (
                      <div className="mt-1 ml-1 font-mono text-[9px] text-white bg-black/80 px-1 py-0.5 rounded self-start max-w-fit">
                        {target.details}
                      </div>
                    )}
                  </div>
                ))}

              {/* Breach Warning Banner if Active */}
              {selectedCam.activeAlert && (
                <div className="absolute top-4 right-4 bg-[#991b1b]/90 border border-[#ef4444] px-3 py-1.5 rounded text-white font-mono text-xs font-bold flex items-center gap-2 animate-pulse shadow-xl">
                  <AlertTriangle className="w-4 h-4" />
                  <span>ALERT: {selectedCam.activeAlert}</span>
                </div>
              )}

              {/* Snapshot confirmation flash */}
              {snapshotTaken && (
                <div className="absolute inset-0 bg-white/40 flex items-center justify-center font-mono text-sm text-[#001f26] font-bold">
                  SNAPSHOT RECORDED TO FORENSIC LOG
                </div>
              )}
            </div>

            {/* Bottom Stream Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCaptureSnapshot}
                  className="px-2.5 py-1 rounded bg-[#111827]/90 hover:bg-[#161f30] text-[#f8fafc] border border-[#28354d] flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-[#06b6d4]" />
                  <span>Snapshot</span>
                </button>

                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`px-2.5 py-1 rounded border flex items-center gap-1.5 ${
                    isRecording
                      ? 'bg-[#991b1b] text-white border-[#ef4444] animate-pulse'
                      : 'bg-[#111827]/90 text-[#f8fafc] border-[#28354d] hover:bg-[#161f30]'
                  }`}
                >
                  {isRecording ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#ef4444]" />}
                  <span>{isRecording ? 'REC 00:42' : 'Record Clip'}</span>
                </button>

                <button
                  onClick={() => setShowOverlays(!showOverlays)}
                  className={`px-2.5 py-1 rounded border ${
                    showOverlays
                      ? 'bg-[#06b6d4]/20 border-[#06b6d4] text-[#06b6d4]'
                      : 'bg-[#111827]/90 border-[#28354d] text-[#869397]'
                  }`}
                >
                  AI Overlays
                </button>
              </div>

              {/* Emergency Quick Action */}
              <button
                onClick={onOpenDispatch}
                className="px-3 py-1 bg-[#991b1b] hover:bg-[#ef4444] text-white font-bold uppercase rounded shadow-lg flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Dispatch Unit</span>
              </button>
            </div>
          </div>
        </div>

        {/* SIDEBAR INSPECTOR: PTZ CONTROL & SENSOR TELEMETRY (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-4 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#06b6d4]" />
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">PTZ CONTROLS & TELEMETRY</h3>
            </div>
            <span className="font-mono text-[10px] text-[#10b981] font-bold">AUTOTRACK: ON</span>
          </div>

          {/* PTZ Virtual D-Pad */}
          <div className="bg-[#070a0f] border border-[#1f2a3e] rounded-lg p-4 flex flex-col items-center gap-3">
            <span className="font-mono text-[10px] text-[#64748b] uppercase tracking-wider">
              OPTICAL PAN / TILT GIMBAL
            </span>

            {/* D-Pad buttons */}
            <div className="grid grid-cols-3 gap-1.5 w-32 h-32">
              <div />
              <button
                className="bg-[#111827] hover:bg-[#161f30] active:bg-[#06b6d4] text-[#dfe2ee] active:text-[#001f26] border border-[#1f2a3e] rounded flex items-center justify-center transition-colors"
                title="Tilt Up"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <div />

              <button
                className="bg-[#111827] hover:bg-[#161f30] active:bg-[#06b6d4] text-[#dfe2ee] active:text-[#001f26] border border-[#1f2a3e] rounded flex items-center justify-center transition-colors"
                title="Pan Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="bg-[#161f30] text-[#06b6d4] border border-[#06b6d4]/40 rounded flex items-center justify-center text-xs font-mono font-bold"
                title="Center Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                className="bg-[#111827] hover:bg-[#161f30] active:bg-[#06b6d4] text-[#dfe2ee] active:text-[#001f26] border border-[#1f2a3e] rounded flex items-center justify-center transition-colors"
                title="Pan Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div />
              <button
                className="bg-[#111827] hover:bg-[#161f30] active:bg-[#06b6d4] text-[#dfe2ee] active:text-[#001f26] border border-[#1f2a3e] rounded flex items-center justify-center transition-colors"
                title="Tilt Down"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
              <div />
            </div>

            {/* Zoom Slider */}
            <div className="w-full flex items-center justify-between gap-3 font-mono text-xs pt-2 border-t border-[#1f2a3e]">
              <span className="text-[#869397] flex items-center gap-1">
                <ZoomOut className="w-3.5 h-3.5" /> ZOOM
              </span>
              <input
                type="range"
                min="1"
                max="12"
                step="0.1"
                value={ptzZoom}
                onChange={(e) => setPtzZoom(parseFloat(e.target.value))}
                className="flex-1 accent-[#06b6d4] bg-[#111827]"
              />
              <span className="text-[#06b6d4] font-bold w-10 text-right">{ptzZoom}x</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider block">
              GUARD TOUR PRESET PATROLS
            </span>
            <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
              {['P1: FENCE WIRE', 'P2: CULVERT 4', 'P3: RIDGE LINE', 'P4: ZERO GATE', 'P5: ROAD BERM', 'P6: FLIR SCAN'].map(
                (preset, i) => (
                  <button
                    key={preset}
                    className="p-1.5 bg-[#111827] hover:bg-[#161f30] border border-[#1f2a3e] rounded text-[#dfe2ee] hover:text-[#06b6d4] transition-colors"
                  >
                    {preset}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Detailed Sensor Telemetry Card */}
          <div className="bg-[#111827] border border-[#1f2a3e] rounded-lg p-3 space-y-2 font-mono text-xs">
            <span className="text-[10px] text-[#64748b] uppercase tracking-wider block font-bold">
              EDGE INFERENCE TELEMETRY
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-[#869397] text-[10px] block">TPU LATENCY</span>
                <span className="text-[#10b981] font-bold">14.2 ms / frame</span>
              </div>
              <div>
                <span className="text-[#869397] text-[10px] block">CHIP TEMP</span>
                <span className="text-[#f59e0b] font-bold">48°C (SAFE)</span>
              </div>
              <div>
                <span className="text-[#869397] text-[10px] block">CODEC</span>
                <span className="text-[#dfe2ee] font-bold">H.265 Main 10</span>
              </div>
              <div>
                <span className="text-[#869397] text-[10px] block">NETWORK PIPE</span>
                <span className="text-[#06b6d4] font-bold">OFC 10 Gbps</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECONDARY CAMERAS CAROUSEL / MATRIX */}
      <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-3 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
          <h3 className="font-display text-sm font-bold text-[#f8fafc]">
            ALL SECTOR FEEDS ({filteredCameras.length} CHANNELS)
          </h3>
          <span className="font-mono text-[10px] text-[#869397]">
            CLICK TO ENGAGE CAMERA IN PRIMARY INSPECTOR
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {filteredCameras.map((cam) => {
            const isSelected = cam.id === selectedCam.id;
            return (
              <div
                key={cam.id}
                onClick={() => onSelectCamera(cam.id)}
                className={`bg-[#070a0f] border rounded-lg overflow-hidden cursor-pointer relative group transition-all ${
                  isSelected
                    ? 'border-[#06b6d4] shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'border-[#1f2a3e] hover:border-[#28354d]'
                }`}
              >
                <div className="relative w-full h-28 bg-[#111827]">
                  <img
                    src={cam.imageUrl}
                    alt={cam.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-1 left-1 bg-black/70 px-1 py-0.5 rounded font-mono text-[9px] text-[#06b6d4] font-bold">
                    {cam.id}
                  </div>
                  {cam.activeAlert && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
                  )}
                  <div className="absolute bottom-1 left-1 right-1 bg-black/80 px-1 py-0.5 rounded font-mono text-[9px] text-[#dfe2ee] truncate">
                    {cam.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
