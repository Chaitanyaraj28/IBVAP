import React, { useState } from 'react';

export const SystemHealthView: React.FC = () => {
  const [logs, setLogs] = useState<Array<{ id: string; time: string; tag: string; tagColor: string; message: string }>>([
    { id: '1', time: '02:14:38.102', tag: '[ORIN-NODE-04]', tagColor: 'text-[#4cd7f6]', message: 'Inference cycle 294829 completed: 148 frames processed, 0 frame drops detected.' },
    { id: '2', time: '02:14:38.214', tag: '[MILVUS-CLUSTER]', tagColor: 'text-[#4edea3]', message: 'Query latency normal: 8.42ms for 512-dim face vector embedding matching against 1,204,180 records.' },
    { id: '3', time: '02:14:38.350', tag: '[SAN-ARRAY-01]', tagColor: 'text-[#4cd7f6]', message: 'NVMe scrub check PASS: Sector 04 write throughput sustained at 1.4 GB/s. Free loop space 76.8 TB.' },
    { id: '4', time: '02:14:38.489', tag: '[TANGO-STARLINK]', tagColor: 'text-[#ffb95f]', message: 'Warning: Latency spike CAM-018 packet transit (42ms). Transmit power auto-compensated (+1.2 dBm).' },
    { id: '5', time: '02:14:38.610', tag: '[AUDIT-GUARD]', tagColor: 'text-[#4edea3]', message: 'SHA-256 block #91482 committed. Signer: Insp. R. Verma [SEC-L4]. Hash: 4e9c7b10...98a3' },
  ]);

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleExecuteDiagnostic = () => {
    setIsDiagnosticRunning(true);
    const now = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100);
    setTimeout(() => {
      setLogs((prev) => [
        {
          id: String(Date.now()),
          time: now,
          tag: '[SYS-DIAG]',
          tagColor: 'text-[#4edea3]',
          message: 'Manual diagnostic sequence triggered by Insp. R. Verma. All 148 nodes responding within SLA.',
        },
        ...prev,
      ]);
      setIsDiagnosticRunning(false);
      showToast('Full system diagnostic completed: 148 nodes responding within SLA');
    }, 600);
  };

  const handleFlushCache = () => {
    const now = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100);
    setLogs((prev) => [
      {
        id: String(Date.now()),
        time: now,
        tag: '[MILVUS]',
        tagColor: 'text-[#ffb95f]',
        message: 'Milvus Vector RAM Cache flushed. 1.2M embedding index reloaded in 410ms. Query latency reset to 7.9ms.',
      },
      ...prev,
    ]);
    showToast('Milvus Vector RAM Cache flushed. Query latency reset to 7.9ms');
  };

  return (
    <div className="flex flex-col w-full text-[#dfe2ee] select-none pb-12">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161f30] border border-[#06b6d4] text-[#f8fafc] px-4 py-2.5 rounded shadow-2xl flex items-center gap-3 font-mono text-xs animate-fadeIn">
          <span className="material-symbols-outlined text-[#06b6d4] text-[18px]">verified</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* SYSTEM ALERT BANNER / STATUS OVERVIEW */}
      <div className="p-4 lg:p-6 bg-[#0a0e16] flex flex-col gap-4 border-b border-[#1f2a3e]">
        {/* Top Meta Context Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#00a572]/20 rounded border border-[#00a572]/40">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-ping" />
              <span className="font-mono text-xs text-[#4edea3] uppercase font-bold tracking-wider">
                ALL SUBSYSTEMS NOMINAL // MESH INTEGRITY VERIFIED
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#869397]">HASH: 8F2A-B99C-MIL-SPEC</span>
            <span className="font-mono text-[11px] text-[#869397]">POLL CYCLE: 500ms</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
            <button
              onClick={handleExecuteDiagnostic}
              disabled={isDiagnosticRunning}
              className="px-3 py-1.5 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] rounded transition-colors flex items-center gap-1.5 border border-[#3d494c]"
              type="button"
            >
              <span className={`material-symbols-outlined text-[16px] text-[#4cd7f6] ${isDiagnosticRunning ? 'animate-spin' : ''}`}>
                {isDiagnosticRunning ? 'sync' : 'play_circle'}
              </span>
              <span>EXECUTE FULL DIAGNOSTIC</span>
            </button>
            <button
              onClick={handleFlushCache}
              className="px-3 py-1.5 bg-[#262a33] hover:bg-[#31353e] text-[#ffb95f] rounded transition-colors flex items-center gap-1.5 border border-[#3d494c]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">cached</span>
              <span>FLUSH MILVUS CACHE</span>
            </button>
            <button
              onClick={() => showToast('System telemetry exported as encrypted JSON/PDF payload.')}
              className="px-3 py-1.5 bg-[#4cd7f6] hover:bg-[#acedff] text-[#003640] rounded font-bold transition-all shadow-md flex items-center gap-1.5"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>EXPORT TELEMETRY [JSON/PDF]</span>
            </button>
          </div>
        </div>

        {/* 1. TOP KPI RIBBON (6 Metric Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5">
          {/* KPI 1: System Status */}
          <div className="p-3.5 bg-[#181c24] rounded flex flex-col justify-between border border-[#1f2a3e]">
            <div className="flex items-center justify-between text-[#bcc9cd]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397]">System Mesh Health</span>
              <span className="material-symbols-outlined text-[#4edea3] text-[18px]">verified_user</span>
            </div>
            <div className="my-1 flex items-baseline gap-2">
              <span className="font-display text-2xl text-[#4edea3] font-mono font-bold">99.98%</span>
              <span className="font-mono text-[10px] text-[#bcc9cd] uppercase">Uptime</span>
            </div>
            <div className="w-full bg-[#31353e] h-1 rounded overflow-hidden">
              <div className="bg-[#4edea3] h-full" style={{ width: '99.98%' }} />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#869397]">
              <span>MTBF: 4,210h</span>
              <span className="text-[#4edea3] font-bold">SLO PASS</span>
            </div>
          </div>

          {/* KPI 2: Edge AI Nodes */}
          <div className="p-3.5 bg-[#181c24] rounded flex flex-col justify-between border border-[#1f2a3e]">
            <div className="flex items-center justify-between text-[#bcc9cd]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397]">Edge AI Nodes</span>
              <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">hub</span>
            </div>
            <div className="my-1 flex items-baseline gap-2">
              <span className="font-display text-2xl text-[#4cd7f6] font-mono font-bold">
                148<span className="text-[#869397] text-base font-normal">/152</span>
              </span>
              <span className="font-mono text-[10px] text-[#4edea3] uppercase font-semibold">Online</span>
            </div>
            <div className="w-full bg-[#31353e] h-1 rounded overflow-hidden flex">
              <div className="bg-[#4cd7f6] h-full" style={{ width: '97.3%' }} />
              <div className="bg-[#ffb95f] h-full" style={{ width: '2.7%' }} />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#869397]">
              <span>4 Standby Failover</span>
              <span className="text-[#4cd7f6] font-bold">ACTIVE</span>
            </div>
          </div>

          {/* KPI 3: Aggregate Edge FPS */}
          <div className="p-3.5 bg-[#181c24] rounded flex flex-col justify-between border border-[#1f2a3e]">
            <div className="flex items-center justify-between text-[#bcc9cd]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397]">Aggregate FPS</span>
              <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">speed</span>
            </div>
            <div className="my-1 flex items-baseline gap-2">
              <span className="font-display text-2xl text-[#dfe2ee] font-mono font-bold">3,840</span>
              <span className="font-mono text-[10px] text-[#bcc9cd]">FPS</span>
            </div>
            <div className="w-full bg-[#31353e] h-1 rounded overflow-hidden">
              <div className="bg-[#4cd7f6] h-full" style={{ width: '87%' }} />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#869397]">
              <span>Mean: 26.2 FPS/Node</span>
              <span className="text-[#4edea3] font-bold">TARGET ≥25</span>
            </div>
          </div>

          {/* KPI 4: Mean Edge Latency */}
          <div className="p-3.5 bg-[#181c24] rounded flex flex-col justify-between border border-[#1f2a3e]">
            <div className="flex items-center justify-between text-[#bcc9cd]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397]">Inference Latency</span>
              <span className="material-symbols-outlined text-[#4edea3] text-[18px]">timer</span>
            </div>
            <div className="my-1 flex items-baseline gap-2">
              <span className="font-display text-2xl text-[#4edea3] font-mono font-bold">14.2</span>
              <span className="font-mono text-[10px] text-[#bcc9cd]">ms</span>
            </div>
            <div className="w-full bg-[#31353e] h-1 rounded overflow-hidden">
              <div className="bg-[#4edea3] h-full" style={{ width: '48%' }} />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#869397]">
              <span>TRT FP16 TensorRT</span>
              <span className="text-[#4edea3] font-bold">&lt;20ms SLA</span>
            </div>
          </div>

          {/* KPI 5: Storage Health */}
          <div className="p-3.5 bg-[#181c24] rounded flex flex-col justify-between border border-[#1f2a3e]">
            <div className="flex items-center justify-between text-[#bcc9cd]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397]">NVMe SAN Loop</span>
              <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">hard_drive</span>
            </div>
            <div className="my-1 flex items-baseline gap-2">
              <span className="font-display text-2xl text-[#dfe2ee] font-mono font-bold">
                163<span className="text-[#869397] text-base font-normal">/240</span>
              </span>
              <span className="font-mono text-[10px] text-[#869397]">TB</span>
            </div>
            <div className="w-full bg-[#31353e] h-1 rounded overflow-hidden">
              <div className="bg-[#ffb95f] h-full" style={{ width: '68%' }} />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#869397]">
              <span>68% Utilized</span>
              <span className="text-[#bcc9cd]">28-day Loop</span>
            </div>
          </div>

          {/* KPI 6: Database & Vector Index */}
          <div className="p-3.5 bg-[#181c24] rounded flex flex-col justify-between border border-[#1f2a3e]">
            <div className="flex items-center justify-between text-[#bcc9cd]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397]">Milvus Vector DB</span>
              <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">neurology</span>
            </div>
            <div className="my-1 flex items-baseline gap-2">
              <span className="font-display text-2xl text-[#4cd7f6] font-mono font-bold">1.2M</span>
              <span className="font-mono text-[10px] text-[#869397]">Vectors</span>
            </div>
            <div className="w-full bg-[#31353e] h-1 rounded overflow-hidden">
              <div className="bg-[#4cd7f6] h-full" style={{ width: '74%' }} />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#869397]">
              <span>Query: 8.4ms</span>
              <span className="text-[#4edea3] font-bold">HNSW OK</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN OPERATIONAL GRID */}
      <div className="p-4 lg:p-6 grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LEFT PANE: HARDWARE COMPUTATION CLUSTERS & SENSOR DIAGNOSTICS (Col 8) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* 2. HARDWARE & COMPUTE GRID (Edge AI Nodes) */}
          <div className="p-4 lg:p-6 bg-[#181c24] rounded flex flex-col gap-4 border border-[#1f2a3e]">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">developer_board</span>
                <span className="font-display text-sm text-[#dfe2ee] tracking-wider uppercase font-bold">
                  Distributed Edge Hardware Clusters [BOP Matrix]
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#4edea3] bg-[#00a572]/20 border border-[#00a572]/40 px-2 py-0.5 rounded font-bold">
                AUTONOMIC LOAD BALANCER ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NODE 1: BOP-NORTH CLUSTER */}
              <div className="p-3.5 bg-[#1c2028] rounded flex flex-col gap-2 border border-[#1f2a3e]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4edea3]" />
                      <span className="font-display text-sm text-[#dfe2ee] font-bold">BOP-NORTH CLUSTER</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#869397]">Jetson AGX Orin 64GB x 8 // Sector 04</span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#4edea3]/10 text-[#4edea3] font-mono text-[10px] rounded font-bold border border-[#4edea3]/30">
                    HEALTHY
                  </span>
                </div>
                {/* Metric Bars */}
                <div className="space-y-2 mt-1 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#bcc9cd] mb-1">
                      <span>CPU (ARM Cortex-A78AE x96)</span>
                      <span className="text-[#dfe2ee]">42%</span>
                    </div>
                    <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                      <div className="bg-[#4cd7f6] h-full" style={{ width: '42%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-[#bcc9cd] mb-1">
                      <span>GPU Compute (Ampere Tensor Cores)</span>
                      <span className="text-[#4edea3] font-bold">88%</span>
                    </div>
                    <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                      <div className="bg-[#4edea3] h-full" style={{ width: '88%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-[#bcc9cd] mb-1">
                      <span>Unified VRAM</span>
                      <span>38 GB / 64 GB</span>
                    </div>
                    <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                      <div className="bg-[#06b6d4] h-full" style={{ width: '59%' }} />
                    </div>
                  </div>
                </div>
                {/* Telemetry Status Pills */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono">
                  <div className="p-1 bg-[#181c24] rounded border border-[#1f2a3e]">
                    <span className="block text-[9px] text-[#869397]">TEMP</span>
                    <span className="text-xs text-[#dfe2ee] font-bold">58°C</span>
                  </div>
                  <div className="p-1 bg-[#181c24] rounded border border-[#1f2a3e]">
                    <span className="block text-[9px] text-[#869397]">FAN PWM</span>
                    <span className="text-xs text-[#dfe2ee] font-bold">65%</span>
                  </div>
                  <div className="p-1 bg-[#181c24] rounded border border-[#1f2a3e]">
                    <span className="block text-[9px] text-[#869397]">THROUGHPUT</span>
                    <span className="text-xs text-[#4cd7f6] font-bold">9.4 Gbps</span>
                  </div>
                </div>
              </div>

              {/* NODE 2: BOP-SOUTH CLUSTER */}
              <div className="p-3.5 bg-[#1c2028] rounded flex flex-col gap-2 border border-[#1f2a3e]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4edea3]" />
                      <span className="font-display text-sm text-[#dfe2ee] font-bold">BOP-SOUTH CLUSTER</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#869397]">Custom Dual RTX 6000 Ada // Sector 02</span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#4edea3]/10 text-[#4edea3] font-mono text-[10px] rounded font-bold border border-[#4edea3]/30">
                    HEALTHY
                  </span>
                </div>
                <div className="space-y-2 mt-1 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#bcc9cd] mb-1">
                      <span>CPU (AMD EPYC 9354 32-Core)</span>
                      <span className="text-[#dfe2ee]">36%</span>
                    </div>
                    <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                      <div className="bg-[#4cd7f6] h-full" style={{ width: '36%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-[#bcc9cd] mb-1">
                      <span>GPU Compute (Ada Lovelace 2x)</span>
                      <span className="text-[#4edea3] font-bold">74%</span>
                    </div>
                    <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                      <div className="bg-[#4edea3] h-full" style={{ width: '74%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-[#bcc9cd] mb-1">
                      <span>GDDR6 ECC VRAM</span>
                      <span>48 GB / 96 GB</span>
                    </div>
                    <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                      <div className="bg-[#06b6d4] h-full" style={{ width: '50%' }} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono">
                  <div className="p-1 bg-[#181c24] rounded border border-[#1f2a3e]">
                    <span className="block text-[9px] text-[#869397]">TEMP</span>
                    <span className="text-xs text-[#dfe2ee] font-bold">62°C</span>
                  </div>
                  <div className="p-1 bg-[#181c24] rounded border border-[#1f2a3e]">
                    <span className="block text-[9px] text-[#869397]">FAN PWM</span>
                    <span className="text-xs text-[#dfe2ee] font-bold">70%</span>
                  </div>
                  <div className="p-1 bg-[#181c24] rounded border border-[#1f2a3e]">
                    <span className="block text-[9px] text-[#869397]">THROUGHPUT</span>
                    <span className="text-xs text-[#4cd7f6] font-bold">14.1 Gbps</span>
                  </div>
                </div>
              </div>

              {/* NODE 3: GATE ALPHA CLUSTER */}
              <div className="p-3.5 bg-[#1c2028] rounded flex flex-col gap-2 border border-[#1f2a3e]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ffb95f] animate-pulse" />
                      <span className="font-display text-sm text-[#dfe2ee] font-bold">GATE ALPHA CLUSTER</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#869397]">Jetson AGX Orin x 4 // Heavy ANPR Traffic</span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#e79400]/20 text-[#ffb95f] font-mono text-[10px] rounded font-bold border border-[#e79400]/30">
                    ELEVATED LOAD
                  </span>
                </div>
                <div className="space-y-2 mt-1 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#bcc9cd] mb-1">
                      <span>CPU Usage</span>
                      <span className="text-[#ffb95f] font-bold">58%</span>
                    </div>
                    <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                      <div className="bg-[#ffb95f] h-full" style={{ width: '58%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-[#bcc9cd] mb-1">
                      <span>GPU Compute</span>
                      <span className="text-[#ffb95f] font-bold">91%</span>
                    </div>
                    <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                      <div className="bg-[#ffb95f] h-full" style={{ width: '91%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-[#bcc9cd] mb-1">
                      <span>Unified VRAM</span>
                      <span>44 GB / 64 GB</span>
                    </div>
                    <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                      <div className="bg-[#06b6d4] h-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono">
                  <div className="p-1 bg-[#181c24] rounded border border-[#1f2a3e]">
                    <span className="block text-[9px] text-[#869397]">TEMP</span>
                    <span className="text-xs text-[#ffb95f] font-bold">67°C</span>
                  </div>
                  <div className="p-1 bg-[#181c24] rounded border border-[#1f2a3e]">
                    <span className="block text-[9px] text-[#869397]">FAN PWM</span>
                    <span className="text-xs text-[#dfe2ee] font-bold">82%</span>
                  </div>
                  <div className="p-1 bg-[#181c24] rounded border border-[#1f2a3e]">
                    <span className="block text-[9px] text-[#869397]">THROUGHPUT</span>
                    <span className="text-xs text-[#4cd7f6] font-bold">8.2 Gbps</span>
                  </div>
                </div>
              </div>

              {/* NODE 4: RIVERINE TANGO OUTPOST */}
              <div className="p-3.5 bg-[#1c2028] rounded flex flex-col gap-2 border border-[#1f2a3e]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4edea3]" />
                      <span className="font-display text-sm text-[#dfe2ee] font-bold">RIVERINE TANGO OUTPOST</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#869397]">Edge TPU Dual + Starlink V4 Relay</span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#4edea3]/10 text-[#4edea3] font-mono text-[10px] rounded font-bold border border-[#4edea3]/30">
                    SOLAR ACTIVE
                  </span>
                </div>
                <div className="space-y-2 mt-1 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#bcc9cd] mb-1">
                      <span>Low-Power CPU</span>
                      <span className="text-[#dfe2ee]">24%</span>
                    </div>
                    <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                      <div className="bg-[#4cd7f6] h-full" style={{ width: '24%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-[#bcc9cd] mb-1">
                      <span>Edge TPU Accelerators</span>
                      <span className="text-[#4edea3]">48%</span>
                    </div>
                    <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                      <div className="bg-[#4edea3] h-full" style={{ width: '48%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-[#bcc9cd] mb-1">
                      <span>Off-Grid Battery Bank</span>
                      <span className="text-[#4edea3] font-bold">100% (Solar Float)</span>
                    </div>
                    <div className="w-full bg-[#31353e] h-1.5 rounded overflow-hidden">
                      <div className="bg-[#4edea3] h-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono">
                  <div className="p-1 bg-[#181c24] rounded border border-[#1f2a3e]">
                    <span className="block text-[9px] text-[#869397]">TEMP</span>
                    <span className="text-xs text-[#dfe2ee] font-bold">44°C</span>
                  </div>
                  <div className="p-1 bg-[#181c24] rounded border border-[#1f2a3e]">
                    <span className="block text-[9px] text-[#869397]">LINK</span>
                    <span className="text-xs text-[#4edea3] font-bold">SAT 42ms</span>
                  </div>
                  <div className="p-1 bg-[#181c24] rounded border border-[#1f2a3e]">
                    <span className="block text-[9px] text-[#869397]">SOLAR PWR</span>
                    <span className="text-xs text-[#4cd7f6] font-bold">480W</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CAMERA & OPTICAL SENSOR TELEMETRY */}
          <div className="p-4 lg:p-6 bg-[#181c24] rounded flex flex-col gap-4 border border-[#1f2a3e]">
            {/* Sensor Matrix Sub-Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">videocam</span>
                <span className="font-display text-sm text-[#dfe2ee] tracking-wider uppercase font-bold">
                  Optical & Sensor Matrix Telemetry
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap font-mono text-[10px]">
                <span className="px-2 py-0.5 bg-[#1c2028] text-[#dfe2ee] rounded border border-[#1f2a3e]">
                  FLIR THERMAL: 100%
                </span>
                <span className="px-2 py-0.5 bg-[#1c2028] text-[#4edea3] rounded border border-[#1f2a3e]">
                  ANPR OCR: 99.1% CONF
                </span>
                <span className="px-2 py-0.5 bg-[#1c2028] text-[#4cd7f6] rounded border border-[#1f2a3e]">
                  BEAMS: 24/24 SYNCED
                </span>
              </div>
            </div>

            {/* Sensor Diagnostics Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-[#31353e] text-[#bcc9cd] text-[10px] uppercase">
                    <th className="p-2">SENSOR ID</th>
                    <th className="p-2">TYPE & MODALITY</th>
                    <th className="p-2">TACTICAL SECTOR</th>
                    <th className="p-2 text-right">FPS / HZ</th>
                    <th className="p-2 text-right">BITRATE</th>
                    <th className="p-2 text-right">LATENCY</th>
                    <th className="p-2 text-right">PKT LOSS</th>
                    <th className="p-2">FIRMWARE</th>
                    <th className="p-2 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2a3e] text-[11px]">
                  <tr className="bg-[#1c2028] hover:bg-[#262a33] transition-colors">
                    <td className="p-2 font-bold text-[#4cd7f6]">CAM-007</td>
                    <td className="p-2 text-[#dfe2ee]">FLIR LWIR 640 Thermal</td>
                    <td className="p-2 text-[#bcc9cd]">Sector 4 Ridge</td>
                    <td className="p-2 text-right text-[#4edea3]">60 FPS</td>
                    <td className="p-2 text-right">8.2 Mbps</td>
                    <td className="p-2 text-right text-[#4edea3]">12 ms</td>
                    <td className="p-2 text-right text-[#4edea3]">0.01%</td>
                    <td className="p-2 text-[#869397]">v4.2.1-SEC</td>
                    <td className="p-2 text-center">
                      <span className="px-1.5 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold rounded">ONLINE</span>
                    </td>
                  </tr>
                  <tr className="bg-[#181c24] hover:bg-[#262a33] transition-colors">
                    <td className="p-2 font-bold text-[#4cd7f6]">CAM-012</td>
                    <td className="p-2 text-[#dfe2ee]">PTZ 4K Ultra-Starlight</td>
                    <td className="p-2 text-[#bcc9cd]">Sector 4 Zero Buffer</td>
                    <td className="p-2 text-right text-[#4edea3]">30 FPS</td>
                    <td className="p-2 text-right">14.1 Mbps</td>
                    <td className="p-2 text-right text-[#4edea3]">18 ms</td>
                    <td className="p-2 text-right text-[#4edea3]">0.00%</td>
                    <td className="p-2 text-[#869397]">v4.0.9-OPT</td>
                    <td className="p-2 text-center">
                      <span className="px-1.5 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold rounded">ONLINE</span>
                    </td>
                  </tr>
                  <tr className="bg-[#1c2028] hover:bg-[#262a33] transition-colors">
                    <td className="p-2 font-bold text-[#4cd7f6]">CAM-001</td>
                    <td className="p-2 text-[#dfe2ee]">ANPR Dual-IR Checkpoint</td>
                    <td className="p-2 text-[#bcc9cd]">Checkpost Alpha Lane 1</td>
                    <td className="p-2 text-right text-[#4edea3]">60 FPS</td>
                    <td className="p-2 text-right">6.4 Mbps</td>
                    <td className="p-2 text-right text-[#4edea3]">11 ms</td>
                    <td className="p-2 text-right text-[#4edea3]">0.00%</td>
                    <td className="p-2 text-[#869397]">OCR-v3.8-MIL</td>
                    <td className="p-2 text-center">
                      <span className="px-1.5 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold rounded">ONLINE</span>
                    </td>
                  </tr>
                  <tr className="bg-[#181c24] hover:bg-[#262a33] transition-colors">
                    <td className="p-2 font-bold text-[#4cd7f6]">CAM-009</td>
                    <td className="p-2 text-[#dfe2ee]">Sky Tracker RF Spectrum</td>
                    <td className="p-2 text-[#bcc9cd]">BOP South High Mast</td>
                    <td className="p-2 text-right text-[#4edea3]">120 Hz</td>
                    <td className="p-2 text-right">22.0 Mbps</td>
                    <td className="p-2 text-right text-[#4edea3]">9 ms</td>
                    <td className="p-2 text-right text-[#4edea3]">0.02%</td>
                    <td className="p-2 text-[#869397]">RADAR-v2.1</td>
                    <td className="p-2 text-center">
                      <span className="px-1.5 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold rounded">ONLINE</span>
                    </td>
                  </tr>
                  <tr className="bg-[#1c2028] hover:bg-[#262a33] transition-colors">
                    <td className="p-2 font-bold text-[#ffb95f]">CAM-018</td>
                    <td className="p-2 text-[#dfe2ee]">Riverine Sonar Array Node</td>
                    <td className="p-2 text-[#bcc9cd]">Tango Outpost River Line</td>
                    <td className="p-2 text-right text-[#ffb95f]">20 Hz</td>
                    <td className="p-2 text-right">1.8 Mbps</td>
                    <td className="p-2 text-right text-[#ffb95f]">42 ms</td>
                    <td className="p-2 text-right text-[#ffb95f]">1.14%</td>
                    <td className="p-2 text-[#869397]">SONAR-v1.4</td>
                    <td className="p-2 text-center">
                      <span className="px-1.5 py-0.5 bg-[#e79400]/20 text-[#ffb95f] font-bold rounded">DEGRADED PING</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sensor Health Footnote */}
            <div className="p-3 bg-[#1c2028] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] border border-[#1f2a3e]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#869397] text-[16px]">info</span>
                <span className="text-[#bcc9cd]">
                  CAM-018 packet overhead caused by Ku-Band rain fade on backup dish. Ingestion switch will auto-reroute to LTE mesh if packet loss reaches &gt;2.0%.
                </span>
              </div>
              <button
                onClick={() => showToast('Displaying full 152-node cluster diagnostics inventory')}
                className="text-[#4cd7f6] hover:underline flex items-center gap-1 shrink-0 font-bold"
                type="button"
              >
                VIEW ALL 152 NODES &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: BACKEND SERVICES, REAL-TIME PIPELINES & HARDWARE SCHEMATIC (Col 4) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* 4. BACKEND SERVICES & API HEALTH */}
          <div className="p-4 lg:p-6 bg-[#181c24] rounded flex flex-col gap-4 border border-[#1f2a3e]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">cloud_sync</span>
                <span className="font-display text-sm text-[#dfe2ee] tracking-wider uppercase font-bold">
                  Backend Microservices
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
            </div>

            <div className="space-y-2 font-mono text-xs">
              {/* Microservice 1 */}
              <div className="p-2.5 bg-[#1c2028] rounded flex items-center justify-between border border-[#1f2a3e]">
                <div className="flex flex-col">
                  <span className="font-bold text-[#dfe2ee]">Video Ingestion Gateway</span>
                  <span className="text-[10px] text-[#869397]">GStreamer / RTSP Pipeline</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] text-[10px] font-bold rounded">HEALTHY</span>
                  <span className="block text-[10px] text-[#869397] mt-0.5">148 Streams</span>
                </div>
              </div>

              {/* Microservice 2 */}
              <div className="p-2.5 bg-[#1c2028] rounded flex items-center justify-between border border-[#1f2a3e]">
                <div className="flex flex-col">
                  <span className="font-bold text-[#dfe2ee]">YOLO-v9 Threat Detector</span>
                  <span className="text-[10px] text-[#869397]">Triton Inference Server</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] text-[10px] font-bold rounded">HEALTHY</span>
                  <span className="block text-[10px] text-[#869397] mt-0.5">SLA 14.8ms</span>
                </div>
              </div>

              {/* Microservice 3 */}
              <div className="p-2.5 bg-[#1c2028] rounded flex items-center justify-between border border-[#1f2a3e]">
                <div className="flex flex-col">
                  <span className="font-bold text-[#dfe2ee]">ResNet-101 Facial Matcher</span>
                  <span className="text-[10px] text-[#869397]">CCTNS / IB Bridge Synced</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] text-[10px] font-bold rounded">HEALTHY</span>
                  <span className="block text-[10px] text-[#869397] mt-0.5">0.03% False Rej</span>
                </div>
              </div>

              {/* Microservice 4 */}
              <div className="p-2.5 bg-[#1c2028] rounded flex items-center justify-between border border-[#1f2a3e]">
                <div className="flex flex-col">
                  <span className="font-bold text-[#dfe2ee]">Geo-Spatial GIS Engine</span>
                  <span className="text-[10px] text-[#869397]">PostGIS + Leaflet Tile Server</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] text-[10px] font-bold rounded">HEALTHY</span>
                  <span className="block text-[10px] text-[#869397] mt-0.5">Sync 100%</span>
                </div>
              </div>

              {/* Microservice 5 */}
              <div className="p-2.5 bg-[#1c2028] rounded flex items-center justify-between border border-[#1f2a3e]">
                <div className="flex flex-col">
                  <span className="font-bold text-[#dfe2ee]">WebSocket Dispatcher</span>
                  <span className="text-[10px] text-[#869397]">Real-time Telemetry Push</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] text-[10px] font-bold rounded">HEALTHY</span>
                  <span className="block text-[10px] text-[#869397] mt-0.5">28 evts/sec</span>
                </div>
              </div>

              {/* Microservice 6 */}
              <div className="p-2.5 bg-[#1c2028] rounded flex items-center justify-between border border-[#1f2a3e]">
                <div className="flex flex-col">
                  <span className="font-bold text-[#dfe2ee]">SHA-256 Audit Logger</span>
                  <span className="text-[10px] text-[#869397]">Immutable SecOps Ledger</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-[#4cd7f6]/20 text-[#4cd7f6] text-[10px] font-bold rounded">VERIFIED</span>
                  <span className="block text-[10px] text-[#869397] mt-0.5">Chain Valid</span>
                </div>
              </div>
            </div>

            <div className="mt-1">
              <button
                onClick={() => showToast('Worker restart sequence issued. Zero downtime standby promoted.')}
                className="w-full py-2 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] font-mono text-xs rounded transition-colors flex items-center justify-center gap-1 border border-[#3d494c]"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">restart_alt</span>
                <span>RESTART FAILED WORKER</span>
              </button>
            </div>
          </div>

          {/* VISUAL DIAGNOSTIC WIDGET: TOPOLOGY MAP & EDGE HARDWARE SCHEMATIC */}
          <div className="p-4 lg:p-6 bg-[#181c24] rounded flex flex-col gap-4 border border-[#1f2a3e]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">schema</span>
                <span className="font-display text-sm text-[#dfe2ee] tracking-wider uppercase font-bold">
                  Tactical Node Topology
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#869397]">SECTOR-04 MESH</span>
            </div>

            {/* Inline SVG Mesh Diagram */}
            <div className="p-2 bg-[#1c2028] rounded flex items-center justify-center relative overflow-hidden border border-[#1f2a3e]">
              <svg className="w-full h-44 text-[#3d494c]" fill="none" viewBox="0 0 360 170">
                {/* Central Command Link */}
                <line stroke="currentColor" strokeDasharray="3 3" x1="180" x2="80" y1="30" y2="90" />
                <line stroke="currentColor" x1="180" x2="180" y1="30" y2="90" />
                <line stroke="currentColor" strokeDasharray="3 3" x1="180" x2="280" y1="30" y2="90" />
                <line stroke="currentColor" x1="80" x2="50" y1="90" y2="140" />
                <line stroke="currentColor" x1="80" x2="110" y1="90" y2="140" />
                <line stroke="currentColor" x1="180" x2="180" y1="90" y2="140" />
                <line stroke="currentColor" x1="280" x2="250" y1="90" y2="140" />
                <line stroke="#ffb95f" strokeDasharray="2 2" x1="280" x2="310" y1="90" y2="140" />

                {/* Command Core Node */}
                <rect className="fill-[#31353e]" height="30" rx="4" width="64" x="148" y="15" />
                <text fill="#4cd7f6" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" textAnchor="middle" x="180" y="34">
                  HQ CORE
                </text>

                {/* Cluster Nodes Tier 2 */}
                <rect className="fill-[#1c2028]" height="26" rx="3" stroke="#4edea3" strokeWidth="1.5" width="62" x="49" y="75" />
                <text fill="#dfe2ee" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" x="80" y="92">
                  BOP NORTH
                </text>
                <rect className="fill-[#1c2028]" height="26" rx="3" stroke="#4edea3" strokeWidth="1.5" width="62" x="149" y="75" />
                <text fill="#dfe2ee" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" x="180" y="92">
                  BOP SOUTH
                </text>
                <rect className="fill-[#1c2028]" height="26" rx="3" stroke="#ffb95f" strokeWidth="1.5" width="62" x="249" y="75" />
                <text fill="#dfe2ee" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" x="280" y="92">
                  GATE ALPHA
                </text>

                {/* Leaf Nodes Tier 3 */}
                <circle className="fill-[#31353e]" cx="50" cy="140" r="10" stroke="#4edea3" strokeWidth="1.5" />
                <text fill="#4edea3" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="50" y="143">C1</text>
                <circle className="fill-[#31353e]" cx="110" cy="140" r="10" stroke="#4edea3" strokeWidth="1.5" />
                <text fill="#4edea3" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="110" y="143">C2</text>
                <circle className="fill-[#31353e]" cx="180" cy="140" r="10" stroke="#4edea3" strokeWidth="1.5" />
                <text fill="#4edea3" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="180" y="143">PTZ</text>
                <circle className="fill-[#31353e]" cx="250" cy="140" r="10" stroke="#4edea3" strokeWidth="1.5" />
                <text fill="#4edea3" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="250" y="143">OCR</text>
                <circle className="fill-[#31353e]" cx="310" cy="140" r="10" stroke="#ffb95f" strokeWidth="1.5" />
                <text fill="#ffb95f" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="310" y="143">SON</text>
              </svg>
            </div>

            {/* Hardware Physical Visual Card */}
            <div className="relative rounded overflow-hidden h-36 bg-[#1c2028] border border-[#1f2a3e]">
              <img
                className="w-full h-full object-cover mix-blend-luminosity opacity-40"
                alt="Tactical Edge Rack Array"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnC426XRQwLehCrz4Md9GVr2cLYeBiREyL2CEYwlyoGTEdcraMGvIvMVTEyorJ44YbB5BbfeCHGxnvELD_OLRgM5GyhldvnVnCp9HcIv4pMbs2Tih0iEvHEcJGZSUlPUM5znpejrLv_lDpJhvdKv-D_690KMHYNI_JXU6y-AaJLpwWhkovWrmyguC3SaDsFk1BoohDGZaCYxpBgOmomHfW6xLi8TvKhrdLlZZgEBYsx3FeVfjYKWvj2A"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16] via-[#0a0e16]/60 to-transparent p-4 flex flex-col justify-end">
                <span className="font-display text-sm text-[#dfe2ee] font-bold">RACK-MOD 04-B / WATER-COOLED</span>
                <span className="font-mono text-[10px] text-[#4edea3]">
                  ENCLOSURE INGRESS: IP67 SECURE // TAMPER SEALS VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM REAL-TIME LOGS & CONSOLE STREAM */}
      <div className="p-4 lg:p-6 bg-[#0a0e16] flex flex-col gap-2 border-t border-[#1f2a3e]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#869397] text-[18px]">terminal</span>
            <span className="font-mono text-xs text-[#869397] uppercase tracking-wider">
              LIVE TELEMETRY STREAM & KERNEL AUDIT
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-[#869397]">
            <span>STDOUT [AUTONOMOUS ENGINE]</span>
            <span className="text-[#4edea3] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
              CONNECTED 127.0.0.1:9092
            </span>
          </div>
        </div>

        {/* Live Terminal Box */}
        <div className="p-3 bg-[#1c2028] rounded font-mono text-xs text-[#bcc9cd] h-32 overflow-y-auto space-y-1 border border-[#1f2a3e]">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-2">
              <span className="text-[#869397]">[{log.time}]</span>
              <span className={`${log.tagColor} font-bold`}>{log.tag}</span>
              <span>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
