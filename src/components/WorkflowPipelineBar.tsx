import React, { useState } from 'react';
import {
  Video,
  Scan,
  GitCommit,
  Cpu,
  ShieldAlert,
  Bell,
  Eye,
  Send,
  Info,
  ChevronRight,
  X,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export type PipelineStage =
  | 'cctv'
  | 'detection'
  | 'tracking'
  | 'rule_engine'
  | 'risk_scoring'
  | 'alert'
  | 'investigation'
  | 'dispatch';

interface WorkflowPipelineBarProps {
  activeStage?: PipelineStage;
  compact?: boolean;
}

interface StageDetail {
  id: PipelineStage;
  num: number;
  label: string;
  sublabel: string;
  tech: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STAGES: StageDetail[] = [
  {
    id: 'cctv',
    num: 1,
    label: 'CCTV / RTSP STREAM',
    sublabel: 'Ingestion Layer',
    tech: 'GStreamer / FFmpeg RTSP H.264/H.265',
    desc: 'Low-latency ingest from legacy analog, IP, and thermal FLIR border cameras without replacing existing physical cabling.',
    icon: Video,
  },
  {
    id: 'detection',
    num: 2,
    label: 'AI DETECTION',
    sublabel: 'Edge Inference',
    tech: 'YOLOv8 / YOLOv11 on TensorRT Edge',
    desc: 'Real-time multi-class object detection (Person, Vehicle, Drone, Weapon, Fauna) running directly on BOP edge accelerators.',
    icon: Scan,
  },
  {
    id: 'tracking',
    num: 3,
    label: 'OBJECT TRACKING',
    sublabel: 'Trajectory & Re-ID',
    tech: 'ByteTrack & OSNet Appearance Embeddings',
    desc: 'Continuous track association across frame occlusions, predicting motion velocity vectors and cross-camera trajectory handoffs.',
    icon: GitCommit,
  },
  {
    id: 'rule_engine',
    num: 4,
    label: 'EVENT / RULE ENGINE',
    sublabel: 'Spatio-Temporal Logic',
    tech: 'Geo-Polygon & Directional Tripwire Evaluator',
    desc: 'Evaluates spatial virtual fences, loitering dwell timers, after-hours curfew bounds, and route-deviation triggers in <5ms.',
    icon: Cpu,
  },
  {
    id: 'risk_scoring',
    num: 5,
    label: 'RISK SCORING',
    sublabel: 'Demo Risk Model',
    tech: 'Multi-Factor Heuristic Risk Aggregator (0-100)',
    desc: 'Synthesizes zone sensitivity (+30), crawling posture (+20), curfew window (+15), and face concealment (+10) into an objective score.',
    icon: ShieldAlert,
  },
  {
    id: 'alert',
    num: 6,
    label: 'ALERT GENERATION',
    sublabel: 'Threat Prioritization',
    tech: 'Critical / High / Medium Queue Dispatch',
    desc: 'Surfaces highest-severity threats first with optical/thermal evidence snapshots, bounding boxes, and sensor source metadata.',
    icon: Bell,
  },
  {
    id: 'investigation',
    num: 7,
    label: 'OPERATOR INVESTIGATION',
    sublabel: 'Decision-Support',
    tech: 'Re-ID Correlation & PTZ Slew-to-Cue',
    desc: 'Enables duty commanders to inspect correlated multi-camera timeline steps, target dossiers, and synchronized DVR replays.',
    icon: Eye,
  },
  {
    id: 'dispatch',
    num: 8,
    label: 'RESPONSE / DISPATCH',
    sublabel: 'Field Unit Action',
    tech: 'Encrypted Tactical Unit Dispatch & SITREP',
    desc: 'Generates structured digital SITREP summaries and notifies Quick Reaction Teams (QRF) or checkpoint intercept personnel.',
    icon: Send,
  },
];

export const WorkflowPipelineBar: React.FC<WorkflowPipelineBarProps> = ({
  activeStage = 'cctv',
  compact = false,
}) => {
  const [showArchitectureModal, setShowArchitectureModal] = useState(false);
  const [selectedStageDetail, setSelectedStageDetail] = useState<StageDetail | null>(null);

  const activeIndex = STAGES.findIndex((s) => s.id === activeStage);

  return (
    <>
      <div className="w-full bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-3 shadow-lg select-none">
        {/* Top bar with heading and architecture button */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#1f2a3e]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
            <span className="font-mono text-[10px] text-[#06b6d4] font-bold uppercase tracking-wider">
              IBVAP END-TO-END PIPELINE ARCHITECTURE
            </span>
            <span className="hidden md:inline font-mono text-[10px] text-[#869397]">
              // CCTV to Tactical Decision-Support
            </span>
            <span className="px-1.5 py-0.2 bg-[#161f30] text-[#10b981] border border-[#10b981]/30 rounded font-mono text-[9px] font-bold">
              PROTOTYPE PIPELINE
            </span>
          </div>

          <button
            onClick={() => setShowArchitectureModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#111827] hover:bg-[#161f30] text-[#06b6d4] border border-[#28354d] rounded font-mono text-[10px] font-semibold transition-colors"
            type="button"
          >
            <Info className="w-3.5 h-3.5 text-[#06b6d4]" />
            <span>HOW IT WORKS (ARCHITECTURE)</span>
          </button>
        </div>

        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isCurrent = stage.id === activeStage;
            const isCompleted = idx < activeIndex;

            return (
              <div
                key={stage.id}
                onClick={() => {
                  setSelectedStageDetail(stage);
                  setShowArchitectureModal(true);
                }}
                className={`group relative p-2 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#111827] border-[#06b6d4] shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : isCompleted
                    ? 'bg-[#0a0e16] border-[#10b981]/40 hover:border-[#10b981]'
                    : 'bg-[#070a0f] border-[#1f2a3e] hover:border-[#28354d]'
                }`}
              >
                {/* Header step number & indicator */}
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-[9px] font-bold px-1 rounded ${
                      isCurrent
                        ? 'bg-[#06b6d4] text-[#001f26]'
                        : isCompleted
                        ? 'bg-[#10b981]/20 text-[#10b981]'
                        : 'bg-[#161f30] text-[#869397]'
                    }`}
                  >
                    0{stage.num}
                  </span>
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isCurrent
                        ? 'text-[#06b6d4]'
                        : isCompleted
                        ? 'text-[#10b981]'
                        : 'text-[#64748b] group-hover:text-[#dfe2ee]'
                    }`}
                  />
                </div>

                {/* Step title */}
                <div>
                  <h4
                    className={`font-mono text-[10px] font-bold leading-tight uppercase ${
                      isCurrent ? 'text-[#f8fafc]' : 'text-[#dfe2ee]'
                    }`}
                  >
                    {stage.label}
                  </h4>
                  <span className="text-[9px] font-mono text-[#869397] block truncate mt-0.5">
                    {stage.sublabel}
                  </span>
                </div>

                {/* Progress bar line at bottom */}
                <div className="w-full h-0.5 mt-1.5 rounded-full overflow-hidden bg-[#161f30]">
                  <div
                    className={`h-full ${
                      isCurrent
                        ? 'bg-[#06b6d4] w-full animate-pulse'
                        : isCompleted
                        ? 'bg-[#10b981] w-full'
                        : 'w-0'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture Explanatory Modal */}
      {showArchitectureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 select-none animate-fadeIn">
          <div className="w-full max-w-4xl bg-[#0b0f17] border border-[#1f2a3e] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#111827] px-5 py-4 border-b border-[#1f2a3e] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#06b6d4]/20 border border-[#06b6d4] flex items-center justify-center text-[#06b6d4]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#f8fafc] tracking-wide">
                    IBVAP PIPELINE ARCHITECTURE // TECHNICAL WORKFLOW
                  </h3>
                  <p className="font-mono text-[11px] text-[#869397]">
                    Turning Existing CCTV Infrastructure into an AI-Powered Smart Border System
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowArchitectureModal(false);
                  setSelectedStageDetail(null);
                }}
                className="p-1.5 rounded hover:bg-[#1f2a3e] text-[#869397] hover:text-[#f8fafc] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-5 text-xs font-mono">
              {/* Overview banner */}
              <div className="bg-[#070a0f] border border-[#06b6d4]/30 p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[#06b6d4] font-bold text-xs uppercase">
                    Smart India Hackathon Prototype Architecture
                  </span>
                  <p className="text-[#94a3b8] text-[11px] leading-relaxed">
                    IBVAP transforms existing analog &amp; digital border CCTV feeds into an automated
                    decision-support pipeline without requiring new physical cameras or weaponized systems.
                  </p>
                </div>
                <div className="px-3 py-1.5 bg-[#161f30] border border-[#28354d] rounded shrink-0 text-right">
                  <span className="text-[#869397] text-[10px] block">DEMO DISCLOSURE</span>
                  <span className="text-[#10b981] font-bold text-[11px]">SIMULATED EDGE INFERENCE</span>
                </div>
              </div>

              {/* 8-Stage Detailed Cards List */}
              <div className="space-y-2.5">
                <span className="text-[#869397] text-[10px] uppercase tracking-wider block font-bold">
                  STAGE-BY-STAGE PIPELINE SPECIFICATION
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {STAGES.map((s) => {
                    const Icon = s.icon;
                    const isSelected = selectedStageDetail?.id === s.id;
                    return (
                      <div
                        key={s.id}
                        className={`p-3.5 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-[#161f30] border-[#06b6d4]'
                            : 'bg-[#111827] border-[#1f2a3e]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-[#070a0f] border border-[#28354d] flex items-center justify-center text-[10px] font-bold text-[#06b6d4]">
                              {s.num}
                            </span>
                            <span className="font-bold text-[#f8fafc] text-xs">{s.label}</span>
                          </div>
                          <Icon className="w-4 h-4 text-[#06b6d4]" />
                        </div>
                        <div className="text-[10px] text-[#06b6d4] font-semibold mb-1">
                          Stack: {s.tech}
                        </div>
                        <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#111827] border-t border-[#1f2a3e] flex items-center justify-between text-xs font-mono">
              <span className="text-[#869397] text-[11px]">
                IBVAP Prototype • Decision-Support System • Human-in-the-Loop Operations
              </span>
              <button
                onClick={() => {
                  setShowArchitectureModal(false);
                  setSelectedStageDetail(null);
                }}
                className="px-4 py-1.5 bg-[#06b6d4] hover:bg-[#0891b2] text-[#001f26] font-bold uppercase rounded transition-colors"
              >
                Close Architecture
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
