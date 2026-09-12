import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Shield,
  Activity,
  Calendar,
  Layers,
  Sparkles,
  Download,
  AlertTriangle,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { NavigationPage } from '../types';

interface AnalyticsViewProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState('7D');

  const hourlyVolume = [
    { hour: '00:00', alerts: 8, severity: 'LOW' },
    { hour: '01:00', alerts: 19, severity: 'HIGH' },
    { hour: '02:00', alerts: 34, severity: 'CRITICAL' },
    { hour: '03:00', alerts: 26, severity: 'HIGH' },
    { hour: '04:00', alerts: 14, severity: 'MED' },
    { hour: '05:00', alerts: 6, severity: 'LOW' },
    { hour: '06:00', alerts: 3, severity: 'LOW' },
    { hour: '12:00', alerts: 7, severity: 'LOW' },
    { hour: '18:00', alerts: 11, severity: 'MED' },
    { hour: '21:00', alerts: 22, severity: 'HIGH' },
  ];

  return (
    <div className="w-full flex flex-col p-4 md:p-6 gap-6 text-[#dfe2ee] select-none">
      {/* Header & Range Selector */}
      <div className="bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#111827] border border-[#28354d] flex items-center justify-center text-[#06b6d4]">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-[#f8fafc] uppercase tracking-wide">
              BORDER INTELLIGENCE ANALYTICS & RISK SCORING
            </h2>
            <p className="font-mono text-[10px] text-[#869397]">
              EDGE AI STATISTICAL SYNTHESIS • INTRUSION PATTERN CLUSTERING
            </p>
          </div>
        </div>

        {/* Range Selector */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center bg-[#111827] border border-[#1f2a3e] rounded p-0.5">
            {['24H', '7D', '30D', 'SEASONAL'].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded font-bold uppercase transition-colors ${
                  timeRange === r
                    ? 'bg-[#06b6d4] text-[#001f26]'
                    : 'text-[#869397] hover:text-[#f8fafc]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button className="px-3 py-1.5 bg-[#111827] hover:bg-[#161f30] text-[#06b6d4] border border-[#1f2a3e] rounded font-bold flex items-center gap-1.5 transition-colors">
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* Top 4 Performance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-[#869397] uppercase tracking-wider block">
            FALSE POSITIVE FILTER RATE
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-[#10b981] font-bold">94.2%</span>
            <span className="text-[10px] text-[#869397]">AUTONOMOUS</span>
          </div>
          <p className="text-[11px] text-[#64748b]">
            3,410 fauna & wind alerts pruned by edge classifiers
          </p>
        </div>

        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-[#869397] uppercase tracking-wider block">
            PEAK INFILTRATION WINDOW
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-[#ef4444] font-bold">01:00 – 04:30</span>
            <span className="text-[10px] text-[#869397]">IST</span>
          </div>
          <p className="text-[11px] text-[#64748b]">
            78% of all virtual fence tripwire breaches occur in this window
          </p>
        </div>

        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-[#869397] uppercase tracking-wider block">
            AVERAGE QRF RESPONSE TIME
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-[#06b6d4] font-bold">03m 48s</span>
            <span className="text-[10px] text-[#869397]">-42s vs 2025</span>
          </div>
          <p className="text-[11px] text-[#64748b]">
            From sensor trip to commando boot on ground
          </p>
        </div>

        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-[#869397] uppercase tracking-wider block">
            MODEL EVALUATION (PROTOTYPE)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-[#f8fafc] font-bold">94.6%</span>
            <span className="text-[10px] text-[#10b981] font-bold">TEST BENCHMARK</span>
          </div>
          <p className="text-[11px] text-[#64748b]">
            Demonstration Data — Simulated Edge Inference Pipeline
          </p>
        </div>
      </div>

      {/* Charts Section: Hourly Threat Volume + Sector Vulnerability Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hourly Threat Intensity Graph (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#06b6d4]" />
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">
                24-HOUR THREAT INTENSITY DISTRIBUTION
              </h3>
            </div>
            <span className="font-mono text-xs text-[#ef4444] font-bold">
              PEAK AT 02:00 IST
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-56 flex items-end justify-between gap-2 pt-6 px-2 font-mono text-[10px]">
            {hourlyVolume.map((bar) => {
              const heightPercent = (bar.alerts / 35) * 100;
              const isPeak = bar.alerts > 25;
              return (
                <div key={bar.hour} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[#869397] opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.alerts}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t transition-all ${
                      isPeak
                        ? 'bg-[#ef4444] shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                        : bar.alerts > 15
                        ? 'bg-[#f59e0b]'
                        : 'bg-[#06b6d4]'
                    }`}
                  />
                  <span className="text-[#64748b] rotate-45 sm:rotate-0 mt-1">{bar.hour}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sector Vulnerability Index (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3e]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ef4444]" />
              <h3 className="font-display text-sm font-bold text-[#f8fafc]">
                SECTOR VULNERABILITY INDEX
              </h3>
            </div>
            <span className="font-mono text-xs text-[#869397]">ALERTS / KM</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { sector: 'Sector 4 (BOP North)', score: 91, status: 'CRITICAL', color: 'bg-[#ef4444]', width: '91%' },
              { sector: 'Sector 1 (Gate Alpha Highway)', score: 72, status: 'HIGH', color: 'bg-[#f59e0b]', width: '72%' },
              { sector: 'Sector 2 (BOP South Riverbed)', score: 45, status: 'MODERATE', color: 'bg-[#06b6d4]', width: '45%' },
              { sector: 'Sector 3 (Gate Bravo Logistics)', score: 20, status: 'LOW', color: 'bg-[#10b981]', width: '20%' },
            ].map((sec) => (
              <div key={sec.sector} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#dfe2ee] font-semibold">{sec.sector}</span>
                  <span className="font-bold text-[#f8fafc]">{sec.score} / 100</span>
                </div>
                <div className="w-full h-2 bg-[#111827] rounded-full overflow-hidden">
                  <div className={`h-full ${sec.color}`} style={{ width: sec.width }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#111827] border border-[#1f2a3e] rounded-lg text-xs font-mono space-y-1">
            <span className="text-[10px] text-[#06b6d4] font-bold uppercase block">
              TACTICAL RECOMMENDATION
            </span>
            <p className="text-[#94a3b8] text-[11px] leading-relaxed">
              Elevate night patrol intensity in Sector 4 culvert depression line. Reposition PTZ autotracker preset P2 during 01:00-04:00 window.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
