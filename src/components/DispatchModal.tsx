import React, { useState } from 'react';
import { ShieldAlert, X, Radio, AlertOctagon, CheckCircle2, Clock, MapPin, Users } from 'lucide-react';

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetSector?: string;
  incidentId?: string;
}

export const DispatchModal: React.FC<DispatchModalProps> = ({
  isOpen,
  onClose,
  targetSector = 'Sector 4-A (BOP North)',
  incidentId = 'IBVAP-2048',
}) => {
  const [selectedPlatoon, setSelectedPlatoon] = useState('ECHO-4');
  const [authorizationPin, setAuthorizationPin] = useState('8842');
  const [dispatchStatus, setDispatchStatus] = useState<'IDLE' | 'TRANSMITTING' | 'CONFIRMED'>('IDLE');

  if (!isOpen) return null;

  const handleExecute = () => {
    setDispatchStatus('TRANSMITTING');
    setTimeout(() => {
      setDispatchStatus('CONFIRMED');
      setTimeout(() => {
        setDispatchStatus('IDLE');
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0b0f17] border border-[#ef4444]/60 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.3)] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#991b1b] px-4 py-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 animate-pulse" />
            <div>
              <h3 className="font-display text-sm font-bold tracking-wider uppercase">
                TACTICAL RESPONSE UNIT DISPATCH
              </h3>
              <p className="font-mono text-[10px] text-red-200">PRIORITY INTERVENTION DIRECTIVE</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-black/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 text-xs font-mono">
          {/* Target Location Card */}
          <div className="bg-[#111827] border border-[#1f2a3e] p-3 rounded space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#869397] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#06b6d4]" /> TARGET INTERCEPT SECTOR:
              </span>
              <span className="text-[#f8fafc] font-bold">{targetSector}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#869397] flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-[#ef4444]" /> INCIDENT REF:
              </span>
              <span className="text-[#ef4444] font-bold font-mono">#{incidentId}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#869397] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#f59e0b]" /> ESTIMATED INTERCEPT:
              </span>
              <span className="text-[#10b981] font-bold font-mono">03m 12s [3.2 km]</span>
            </div>
          </div>

          {/* Select Reaction Unit */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-[#869397] uppercase tracking-wider block">
              SELECT STANDBY INTERVENTION UNIT
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'ECHO-4', name: 'QRF Team Echo-4', location: 'BOP North Forward Base', eta: '03:12' },
                { id: 'BRAVO-2', name: 'Platoon Bravo Unit', location: 'Sector 4 Ridge Outpost', eta: '04:45' },
              ].map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedPlatoon(team.id)}
                  className={`p-2.5 rounded border text-left flex flex-col transition-all ${
                    selectedPlatoon === team.id
                      ? 'bg-[#161f30] border-[#06b6d4] text-[#f8fafc]'
                      : 'bg-[#111827] border-[#1f2a3e] text-[#869397] hover:border-[#28354d]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{team.name}</span>
                    <span className="text-[10px] text-[#10b981] font-bold font-mono">ETA {team.eta}</span>
                  </div>
                  <span className="text-[10px] text-[#869397] mt-1">{team.location}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Commander Authorization Key */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#869397] uppercase tracking-wider block">
              OFFICER CLEARANCE TOKEN (BSF L4 AUTH)
            </label>
            <input
              type="password"
              value={authorizationPin}
              onChange={(e) => setAuthorizationPin(e.target.value)}
              placeholder="Enter 4-digit Tactical Key"
              className="w-full bg-[#070a0f] border border-[#1f2a3e] rounded px-3 py-2 text-xs font-mono text-[#f8fafc] focus:outline-none focus:border-[#06b6d4]"
            />
          </div>

          {/* Status feedback */}
          {dispatchStatus === 'CONFIRMED' && (
            <div className="p-3 bg-[#10b981]/20 border border-[#10b981] rounded flex items-center gap-2 text-[#10b981]">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-bold">RESPONSE UNIT ECHO-4 DISPATCHED // UNIT ACKNOWLEDGED</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#070a0f] border-t border-[#1f2a3e] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded bg-[#111827] hover:bg-[#161f30] text-[#869397] font-mono text-xs"
          >
            CANCEL
          </button>
          <button
            onClick={handleExecute}
            disabled={dispatchStatus !== 'IDLE'}
            className="flex-1 py-2.5 rounded bg-[#991b1b] hover:bg-[#ef4444] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.5)] disabled:opacity-50"
          >
            {dispatchStatus === 'TRANSMITTING' ? (
              <>
                <Radio className="w-4 h-4 animate-spin" />
                <span>TRANSMITTING DISPATCH DIRECTIVE...</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4" />
                <span>DISPATCH RESPONSE UNIT</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
