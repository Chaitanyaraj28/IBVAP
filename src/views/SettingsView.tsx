import React, { useState } from 'react';
import { AlertRule, VirtualFenceZone } from '../types';
import {
  Settings,
  Spline,
  Sliders,
  Shield,
  FileText,
  Plus,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  Radio,
  Lock,
  Download,
} from 'lucide-react';

interface SettingsViewProps {
  rules: AlertRule[];
  fences: VirtualFenceZone[];
  defaultTab?: 'RULES' | 'FENCES' | 'WEIGHTS' | 'AUDIT';
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  rules: initialRules,
  fences: initialFences,
  defaultTab = 'RULES',
}) => {
  const [activeTab, setActiveTab] = useState<'RULES' | 'FENCES' | 'WEIGHTS' | 'AUDIT'>(defaultTab);
  const [rules, setRules] = useState<AlertRule[]>(initialRules);
  const [fences, setFences] = useState<VirtualFenceZone[]>(initialFences);

  // Risk weight sliders
  const [weightRestricted, setWeightRestricted] = useState(30);
  const [weightSneaking, setWeightSneaking] = useState(20);
  const [weightCurfew, setWeightCurfew] = useState(15);
  const [weightLoiter, setWeightLoiter] = useState(10);
  const [weightMasked, setWeightMasked] = useState(10);

  const [savedChanges, setSavedChanges] = useState(false);

  const toggleRule = (ruleId: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const toggleFence = (fenceId: string) => {
    setFences((prev) =>
      prev.map((f) => (f.id === fenceId ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const handleSaveWeights = () => {
    setSavedChanges(true);
    setTimeout(() => setSavedChanges(false), 2000);
  };

  const auditLogs = [
    { time: '02:16:15 IST', officer: 'Sub-Insp. M. Khan (Duty Officer)', action: 'Engaged PTZ 4.8x lock on CAM-007', status: 'SUCCESS' },
    { time: '02:15:02 IST', officer: 'Insp. R. Verma (SOC L4)', action: 'Initiated QRF Alert to Squad Echo-4', status: 'TRANSMITTED' },
    { time: '02:14:38 IST', officer: 'System Daemon (Edge-01)', action: 'Tripwire #4 Violation Triggered Alert #ALT-9042', status: 'LOGGED' },
    { time: '02:09:12 IST', officer: 'ANPR Daemon (Gate-A)', action: 'Stolen Vehicle Match Plate JK-02-AK-9921', status: 'LOCKED' },
    { time: '01:34:10 IST', officer: 'Insp. R. Verma (SOC L4)', action: 'Resolved Optical Tampering Alert #ALT-9018', status: 'VERIFIED' },
    { time: '00:02:11 IST', officer: 'BSF-OFFICER-4492', action: 'Authenticated at Terminal TRM-04 with Smartcard', status: 'CRYPTO_OK' },
  ];

  return (
    <div className="w-full flex flex-col p-4 md:p-6 gap-6 text-[#dfe2ee] select-none">
      {/* Header & Settings Tab Switcher */}
      <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#111827] border border-[#28354d] flex items-center justify-center text-[#06b6d4]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-[#f8fafc] uppercase tracking-wide">
              SECURITY RULES, VIRTUAL FENCES & AUDIT VAULT
            </h2>
            <p className="font-mono text-[10px] text-[#869397]">
              CONFIGURABLE ANALYTIC THRESHOLDS • IMMUTABLE FORENSIC AUDIT TRAIL
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-[#111827] border border-[#1f2a3e] rounded-lg p-1 font-mono text-xs">
          <button
            onClick={() => setActiveTab('RULES')}
            className={`px-3 py-1.5 rounded font-bold uppercase transition-colors ${
              activeTab === 'RULES' ? 'bg-[#06b6d4] text-[#001f26]' : 'text-[#869397] hover:text-[#f8fafc]'
            }`}
          >
            RULES ({rules.length})
          </button>
          <button
            onClick={() => setActiveTab('FENCES')}
            className={`px-3 py-1.5 rounded font-bold uppercase transition-colors ${
              activeTab === 'FENCES' ? 'bg-[#06b6d4] text-[#001f26]' : 'text-[#869397] hover:text-[#f8fafc]'
            }`}
          >
            VIRTUAL FENCE ({fences.length})
          </button>
          <button
            onClick={() => setActiveTab('WEIGHTS')}
            className={`px-3 py-1.5 rounded font-bold uppercase transition-colors ${
              activeTab === 'WEIGHTS' ? 'bg-[#06b6d4] text-[#001f26]' : 'text-[#869397] hover:text-[#f8fafc]'
            }`}
          >
            RISK SCORING
          </button>
          <button
            onClick={() => setActiveTab('AUDIT')}
            className={`px-3 py-1.5 rounded font-bold uppercase transition-colors ${
              activeTab === 'AUDIT' ? 'bg-[#06b6d4] text-[#001f26]' : 'text-[#869397] hover:text-[#f8fafc]'
            }`}
          >
            AUDIT LOGS
          </button>
        </div>
      </div>

      {/* TAB 1: ALERT RULE BUILDER */}
      {activeTab === 'RULES' && (
        <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <h3 className="font-display text-sm font-bold text-[#f8fafc]">
              CONFIGURED DETECTION DIRECTIVES
            </h3>
            <span className="font-mono text-xs text-[#10b981]">
              ALL ACTIVE RULES EVALUATED AT 30 FPS
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="bg-[#111827] border border-[#1f2a3e] p-3.5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#f8fafc] text-sm">{rule.name}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                        rule.actionSeverity === 'CRITICAL'
                          ? 'bg-[#991b1b] text-white'
                          : rule.actionSeverity === 'HIGH'
                          ? 'bg-[#f59e0b]/20 text-[#f59e0b]'
                          : 'bg-[#161f30] text-[#06b6d4]'
                      }`}
                    >
                      {rule.actionSeverity}
                    </span>
                    <span className="text-[#06b6d4] font-bold">+{rule.riskScoreAddition} PTS</span>
                  </div>
                  <p className="text-[11px] text-[#869397]">
                    ZONE: {rule.zoneCondition} • TIME: {rule.timeCondition} • TARGET: {rule.triggerEntity}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={() => toggleRule(rule.id)}
                      className="w-4 h-4 accent-[#06b6d4] rounded"
                    />
                    <span className="text-[11px] font-bold text-[#dfe2ee]">
                      {rule.enabled ? 'ACTIVE' : 'MUTED'}
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VIRTUAL FENCE ZONE BUILDER */}
      {activeTab === 'FENCES' && (
        <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-5 shadow-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <Spline className="w-4 h-4 text-[#06b6d4]" />
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">
                ACTIVE VIRTUAL TRIPWIRES & POLYGONS
              </h3>
            </div>
            <span className="text-xs text-[#06b6d4] font-bold">
              4 ZONES LOADED ON EDGE TPUS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fences.map((fence) => (
              <div
                key={fence.id}
                className="bg-[#111827] border border-[#1f2a3e] p-4 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#f8fafc]">{fence.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      fence.severity === 'CRITICAL'
                        ? 'bg-[#991b1b] text-white'
                        : 'bg-[#f59e0b]/20 text-[#f59e0b]'
                    }`}
                  >
                    {fence.severity}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-[#869397]">
                  <div className="flex justify-between">
                    <span>SENSOR SOURCE:</span>
                    <span className="text-[#06b6d4] font-bold">{fence.camera}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ZONE TYPE:</span>
                    <span className="text-[#dfe2ee] font-semibold">{fence.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ACTIVE SCHEDULE:</span>
                    <span className="text-[#10b981] font-semibold">{fence.activeHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SENSITIVITY:</span>
                    <span className="text-[#f8fafc] font-bold">{fence.sensitivity}%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1f2a3e] flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fence.enabled}
                      onChange={() => toggleFence(fence.id)}
                      className="w-4 h-4 accent-[#06b6d4] rounded"
                    />
                    <span className="font-bold text-[#dfe2ee]">
                      {fence.enabled ? 'ENGAGED' : 'BYPASS'}
                    </span>
                  </label>
                  <span className="text-[#06b6d4] cursor-pointer hover:underline">
                    Edit Geometry &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RISK SCORING WEIGHTS */}
      {activeTab === 'WEIGHTS' && (
        <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-5 shadow-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#06b6d4]" />
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">
                AI RISK SCORING ALGORITHM COEFFICIENTS
              </h3>
            </div>
            <span className="text-xs text-[#869397]">AGGREGATE RISK CAPPED AT 100 PTS</span>
          </div>

          <div className="space-y-4 max-w-2xl">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Person Detected in Restricted Zone:</span>
                <span className="text-[#ef4444] font-bold">+{weightRestricted} PTS</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={weightRestricted}
                onChange={(e) => setWeightRestricted(parseInt(e.target.value))}
                className="w-full accent-[#06b6d4]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Sneaking / Crawling Concealment Posture:</span>
                <span className="text-[#ef4444] font-bold">+{weightSneaking} PTS</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={weightSneaking}
                onChange={(e) => setWeightSneaking(parseInt(e.target.value))}
                className="w-full accent-[#06b6d4]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>After-Hours Curfew Violation (22:00-05:00 IST):</span>
                <span className="text-[#f59e0b] font-bold">+{weightCurfew} PTS</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={weightCurfew}
                onChange={(e) => setWeightCurfew(parseInt(e.target.value))}
                className="w-full accent-[#06b6d4]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Loitering Dwell Exceeded (&gt;5 min):</span>
                <span className="text-[#f59e0b] font-bold">+{weightLoiter} PTS</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                value={weightLoiter}
                onChange={(e) => setWeightLoiter(parseInt(e.target.value))}
                className="w-full accent-[#06b6d4]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Masked / Obscured Face Signature:</span>
                <span className="text-[#06b6d4] font-bold">+{weightMasked} PTS</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                value={weightMasked}
                onChange={(e) => setWeightMasked(parseInt(e.target.value))}
                className="w-full accent-[#06b6d4]"
              />
            </div>

            <button
              onClick={handleSaveWeights}
              className="px-4 py-2 bg-[#06b6d4] text-[#001f26] font-bold uppercase rounded shadow transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{savedChanges ? 'WEIGHTS PERSISTED TO EDGE NODES' : 'SAVE THRESHOLDS'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: IMMUTABLE AUDIT LOGS */}
      {activeTab === 'AUDIT' && (
        <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-5 shadow-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#10b981]" />
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">
                CRYPTOGRAPHIC IMMUTABLE AUDIT CHAIN
              </h3>
            </div>
            <span className="text-[#10b981] font-bold">BLOCK #8841-SHA256 OK</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-[#64748b] uppercase border-b border-[#1f2a3e]">
                  <th className="py-2 px-2">TIMESTAMP</th>
                  <th className="py-2 px-2">OFFICER / DAEMON</th>
                  <th className="py-2 px-2">TACTICAL ACTION</th>
                  <th className="py-2 px-2 text-right">INTEGRITY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#161f30] text-[11px]">
                {auditLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-[#111827] transition-colors">
                    <td className="py-2 px-2 text-[#869397]">{log.time}</td>
                    <td className="py-2 px-2 text-[#06b6d4] font-bold">{log.officer}</td>
                    <td className="py-2 px-2 text-[#f8fafc]">{log.action}</td>
                    <td className="py-2 px-2 text-right text-[#10b981] font-bold">
                      {log.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
