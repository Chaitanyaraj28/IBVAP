import React, { useState } from 'react';
import { IncidentRecord, NavigationPage } from '../types';
import {
  Flame,
  ShieldAlert,
  MapPin,
  Clock,
  Video,
  Download,
  Printer,
  Radio,
  Send,
  CheckCircle2,
  AlertTriangle,
  GitFork,
  Compass,
  Users,
  Car,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface IncidentDetailViewProps {
  incident: IncidentRecord;
  onNavigate: (page: NavigationPage) => void;
  onSelectCamera: (cameraId: string) => void;
  onOpenDispatch: () => void;
}

export const IncidentDetailView: React.FC<IncidentDetailViewProps> = ({
  incident,
  onNavigate,
  onSelectCamera,
  onOpenDispatch,
}) => {
  const [operatorNotes, setOperatorNotes] = useState(incident.operatorNotes);
  const [newNote, setNewNote] = useState('');
  const [exported, setExported] = useState(false);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} IST`;
    setOperatorNotes((prev) => [
      ...prev,
      {
        time: timeStr,
        author: 'Insp. R. Verma (SOC L4)',
        note: newNote,
      },
    ]);
    setNewNote('');
  };

  const handleExportSitrep = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="w-full flex flex-col p-4 md:p-6 gap-6 text-[#dfe2ee] select-none">
      {/* Top Banner & SITREP Export Bar */}
      <div className="bg-[#0b0f17] border border-[#ef4444] rounded-xl p-5 shadow-[0_0_20px_rgba(239,68,68,0.2)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#991b1b] border border-[#ef4444] flex items-center justify-center text-white shadow-lg">
            <Flame className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#ef4444] font-bold bg-[#991b1b]/30 px-2 py-0.5 rounded border border-[#ef4444]/40">
                #{incident.id}
              </span>
              <h2 className="font-display text-lg font-bold text-[#f8fafc] tracking-wide">
                {incident.title}
              </h2>
              <span className="px-2 py-0.5 bg-[#991b1b] text-white font-mono text-xs font-bold rounded uppercase">
                {incident.status.replace('_', ' ')}
              </span>
            </div>
            <p className="font-mono text-xs text-[#869397] mt-1 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1 text-[#06b6d4]">
                <MapPin className="w-3.5 h-3.5" /> {incident.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#f59e0b]" /> INITIATED: {incident.timestamp}
              </span>
              <span>•</span>
              <span className="text-[#10b981] font-bold">RISK: {incident.riskScore}/100</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 font-mono text-xs">
          <button
            onClick={handleExportSitrep}
            className="px-3.5 py-2 bg-[#111827] hover:bg-[#161f30] text-[#06b6d4] border border-[#1f2a3e] rounded font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{exported ? 'SITREP GENERATED' : 'EXPORT SITREP (PDF)'}</span>
          </button>
          <button
            onClick={onOpenDispatch}
            className="px-4 py-2 bg-[#991b1b] hover:bg-[#ef4444] text-white rounded font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-colors"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>DISPATCH RESPONSE UNIT</span>
          </button>
        </div>
      </div>

      {/* MULTI-CAMERA CORRELATION RE-ID TIMELINE */}
      <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
          <div className="flex items-center gap-2.5">
            <GitFork className="w-5 h-5 text-[#06b6d4]" />
            <div>
              <h3 className="font-display text-sm font-bold text-[#f8fafc] uppercase tracking-wide">
                MULTI-CAMERA CORRELATION & PATH RE-IDENTIFICATION
              </h3>
              <p className="font-mono text-[10px] text-[#869397]">
                AI TRACK RE-ID CROSS-MATCHED ACROSS 4 SENSORS • BEARING VECTOR PREDICTED
              </p>
            </div>
          </div>
          <span className="font-mono text-xs text-[#10b981] font-bold">
            CONFIRMED TRACK: {incident.trackId}
          </span>
        </div>

        {/* 4 Camera Step Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {incident.movementCorrelation.map((node, i) => (
            <div
              key={node.camera}
              className={`p-3.5 rounded-xl border relative flex flex-col justify-between transition-all ${
                node.isBreachPoint
                  ? 'bg-[#111827] border-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                  : node.eta
                  ? 'bg-[#0e1420] border-[#06b6d4]/40 border-dashed'
                  : 'bg-[#070a0f] border-[#1f2a3e]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      node.isBreachPoint
                        ? 'bg-[#991b1b] text-white'
                        : node.eta
                        ? 'bg-[#06b6d4]/20 text-[#06b6d4]'
                        : 'bg-[#161f30] text-[#869397]'
                    }`}
                  >
                    STEP {i + 1} {node.isBreachPoint ? '• BREACH' : node.eta ? '• PROJECTED' : ''}
                  </span>
                  <span className="font-mono text-xs text-[#869397]">{node.time}</span>
                </div>

                <div className="mt-2.5">
                  <span className="font-mono text-xs font-bold text-[#06b6d4] block">
                    {node.camera}
                  </span>
                  <h4 className="font-display text-xs font-bold text-[#f8fafc] mt-0.5">
                    {node.name}
                  </h4>
                  <p className="text-[11px] text-[#94a3b8] mt-1 font-mono">
                    {node.direction}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-[#1f2a3e] flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#10b981] font-bold">
                  {node.confidence}% RE-ID CONF
                </span>
                <button
                  onClick={() => {
                    onSelectCamera(node.camera);
                    onNavigate('live-cameras');
                  }}
                  className="text-[#06b6d4] hover:underline font-bold flex items-center gap-1"
                >
                  Inspect <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* THREE COLUMN DETAILS (Target Dossier + Risk Scoring + Live QRF Dispatch Tracking) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* TARGET DOSSIER (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#06b6d4]" />
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">TARGET DOSSIER</h3>
            </div>
            <span className="px-2 py-0.5 bg-[#ef4444]/20 text-[#ef4444] font-mono text-[10px] font-bold rounded">
              MATCH: 89.2%
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-[#111827] border border-[#1f2a3e] p-3 rounded-lg flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                alt="Suspect photo"
                className="w-14 h-14 rounded-lg object-cover border border-[#28354d]"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-[#f8fafc] truncate">
                  Tariq "Guldar" Ahmed
                </span>
                <span className="text-[10px] text-[#ef4444] font-bold">
                  HIGH VALUE INFILTRATOR
                </span>
                <span className="text-[10px] text-[#869397]">CID RECORD #88210</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-[#111827] border border-[#1f2a3e] p-2 rounded">
                <span className="text-[#869397] text-[10px] block">TARGET CLASS</span>
                <span className="text-[#dfe2ee] font-bold">Person (Crawling)</span>
              </div>
              <div className="bg-[#111827] border border-[#1f2a3e] p-2 rounded">
                <span className="text-[#869397] text-[10px] block">VELOCITY</span>
                <span className="text-[#f59e0b] font-bold">0.8 m/s (Crawl)</span>
              </div>
              <div className="bg-[#111827] border border-[#1f2a3e] p-2 rounded">
                <span className="text-[#869397] text-[10px] block">BEARING</span>
                <span className="text-[#dfe2ee] font-bold">184° WNW Ridge</span>
              </div>
              <div className="bg-[#111827] border border-[#1f2a3e] p-2 rounded">
                <span className="text-[#869397] text-[10px] block">THERMAL DELTA</span>
                <span className="text-[#ef4444] font-bold">+4.8°C Over Rock</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI RISK BREAKDOWN (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#ef4444]" />
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">AI RISK BREAKDOWN</h3>
              <span className="px-1.5 py-0.2 bg-[#161f30] text-[#06b6d4] border border-[#06b6d4]/40 rounded text-[9px] font-mono font-bold">
                DEMO RISK MODEL
              </span>
            </div>
            <span className="font-mono text-xs text-[#ef4444] font-bold">
              TOTAL: {incident.riskScore}/100
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {incident.riskBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#111827] border border-[#1f2a3e] p-2 rounded flex items-center justify-between text-[11px]"
              >
                <div className="flex flex-col pr-2">
                  <span className="text-[#dfe2ee] font-medium">{item.factor}</span>
                  <span className="text-[9px] text-[#869397]">{item.description}</span>
                </div>
                <span className="text-[#ef4444] font-bold shrink-0">+{item.points} PTS</span>
              </div>
            ))}
          </div>
        </div>

        {/* LIVE QRF UNIT TRACKING (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-col gap-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#10b981]" />
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">QRF UNIT ECHO-4</h3>
            </div>
            <span className="px-2 py-0.5 bg-[#10b981]/20 text-[#10b981] font-mono text-[10px] font-bold rounded animate-pulse">
              LIVE TRACKING
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="bg-[#111827] border border-[#1f2a3e] p-3 rounded-lg space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#869397]">SQUAD COMPOSITION:</span>
                <span className="text-[#f8fafc] font-bold">4 Commandos + 1 K9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#869397]">INTERCEPT ETA:</span>
                <span className="text-[#10b981] font-bold text-sm">03m 12s [380m]</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#869397]">TRANSIT SPEED:</span>
                <span className="text-[#dfe2ee]">38 km/h (ALTV Light Armor)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#869397]">RADIO NET:</span>
                <span className="text-[#06b6d4]">TAC-NET-4 (AES-256)</span>
              </div>
            </div>

            <button
              onClick={onOpenDispatch}
              className="w-full py-2 bg-[#991b1b] hover:bg-[#ef4444] text-white rounded font-mono font-bold uppercase text-xs transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>DISPATCH RESPONSE UNIT</span>
            </button>
          </div>
        </div>
      </div>

      {/* OPERATOR DIRECTIVES & INCIDENT TIMELINE LOG */}
      <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#06b6d4]" />
            <h3 className="font-display text-sm font-bold text-[#f8fafc]">
              OPERATOR COMMAND DIRECTIVES & LOG
            </h3>
          </div>
          <span className="font-mono text-xs text-[#869397]">
            CRYPTOGRAPHIC AUDIT CHAIN ENABLED
          </span>
        </div>

        {/* Existing Log Notes */}
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1 font-mono text-xs">
          {operatorNotes.map((entry, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#111827] border border-[#1f2a3e] rounded-lg flex flex-col gap-1"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#06b6d4] font-bold">{entry.author}</span>
                <span className="text-[#869397]">{entry.time}</span>
              </div>
              <p className="text-[#dfe2ee] text-xs leading-relaxed">{entry.note}</p>
            </div>
          ))}
        </div>

        {/* Add Note Form */}
        <form onSubmit={handleAddNote} className="flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Append mission directive or field SITREP note..."
            className="flex-1 bg-[#111827] border border-[#1f2a3e] rounded px-3 py-2 text-xs font-mono text-[#f8fafc] focus:outline-none focus:border-[#06b6d4]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#06b6d4] hover:bg-[#0891b2] text-[#001f26] font-mono text-xs font-bold uppercase rounded flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Append Note</span>
          </button>
        </form>
      </div>
    </div>
  );
};
