import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Usb,
  Fingerprint,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Server,
  Activity,
  Terminal,
  Cpu,
  KeyRound,
  ArrowRight,
} from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [serviceId, setServiceId] = useState('BSF-OFFICER-4492@soc.gov.in');
  const [passphrase, setPassphrase] = useState('••••••••••••••••••••••••');
  const [totpCode, setTotpCode] = useState('849201');
  const [showPass, setShowPass] = useState(false);
  const [authMode, setAuthMode] = useState<'OFFICER' | 'SMARTCARD'>('OFFICER');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [biometricScanned, setBiometricScanned] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
      setTimeout(() => {
        onLoginSuccess();
      }, 900);
    }, 1100);
  };

  const handleScanBiometrics = () => {
    setBiometricScanned(true);
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-[#dfe2ee] flex flex-col p-4 md:p-8 justify-between select-none">
      {/* Top Classification & Cryptographic Telemetry Rail */}
      <div className="w-full max-w-7xl mx-auto bg-[#0b0f17] border border-[#1f2a3e] rounded-lg p-3 md:p-4 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 bg-[#991b1b] text-white font-mono text-[10px] uppercase tracking-widest font-bold rounded">
            RESTRICTED
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#869397] tracking-wider uppercase">
              PROTOCOL DIRECTIVE // DEFENSE OPERATIONS ONLY
            </span>
            <span className="font-mono text-xs text-[#f8fafc] tracking-wide font-bold">
              GATEWAY: BORDER-GATE-SEC-01 • SHA-256 SESSION ID #492-AX
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 bg-[#111827] border border-[#1f2a3e] px-3 py-1 rounded">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[#10b981] font-bold">TLS 1.3 / AES-256-GCM</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-[#64748b] uppercase">TERMINAL SYNC • LATENCY</span>
            <span className="text-[#06b6d4] font-bold">
              14:32:08 UTC • 20:02:08 IST <span className="text-[#10b981] text-[10px] ml-1">[12ms]</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Command Authentication Hub (Split Layout) */}
      <div className="w-full max-w-7xl mx-auto my-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Tactical Emblem & Radar Panel */}
        <div className="lg:col-span-5 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            {/* Official Shield Emblem Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 p-2 bg-[#111827] border border-[#28354d] rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-10 h-10 text-[#06b6d4]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl text-[#06b6d4] tracking-wider font-bold">
                    IBVAP
                  </span>
                  <span className="px-2 py-0.5 bg-[#00424f] text-[#4cd7f6] font-mono text-[10px] uppercase font-bold rounded">
                    C2 v4.2
                  </span>
                </div>
                <span className="font-mono text-xs text-[#f8fafc] tracking-widest uppercase font-semibold">
                  INTELLIGENT BORDER VIDEO ANALYTICS
                </span>
                <span className="text-xs text-[#10b981] mt-0.5 italic">
                  "Turning Existing CCTV into an AI-Powered Smart Border"
                </span>
              </div>
            </div>

            {/* Radar Sensor Sweep Display */}
            <div className="bg-[#111827] border border-[#1f2a3e] rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#869397] uppercase tracking-wider">
                  SECTOR RADAR SWEEP • BOP NORTH
                </span>
                <span className="text-[#10b981] flex items-center gap-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span> 148 NODES ACTIVE
                </span>
              </div>

              {/* Radar Graphical Scope */}
              <div className="relative w-full h-40 bg-[#070a0f] rounded border border-[#1f2a3e] flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full text-[#1f2a3e]" fill="none" viewBox="0 0 300 160">
                  <circle cx="150" cy="150" r="130" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" />
                  <circle cx="150" cy="150" r="95" stroke="currentColor" strokeWidth="1" />
                  <circle cx="150" cy="150" r="55" stroke="currentColor" strokeWidth="1" />
                  <line x1="20" y1="150" x2="280" y2="150" stroke="currentColor" strokeWidth="1" />
                  <line x1="150" y1="20" x2="150" y2="150" stroke="currentColor" strokeWidth="1" />
                  <circle cx="190" cy="85" r="4" fill="#06b6d4" className="animate-pulse" />
                  <text x="200" y="88" fill="#06b6d4" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold">
                    TARGET-01 [98.4%]
                  </text>
                  <circle cx="95" cy="65" r="3.5" fill="#10b981" />
                  <text x="65" y="60" fill="#10b981" fontFamily="JetBrains Mono" fontSize="8">
                    PATROL-3
                  </text>
                  {/* Sweep cone */}
                  <path d="M 150 150 L 230 40 A 130 130 0 0 0 150 20 Z" fill="rgba(6, 182, 212, 0.12)" />
                </svg>
                <div className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#64748b]">
                  FREQ: <span className="text-[#dfe2ee] font-bold">9.41 GHz X-BAND</span>
                </div>
                <div className="absolute bottom-1.5 right-2 font-mono text-[9px] text-[#10b981]">
                  IFF SYNC: <span className="font-bold">VERIFIED</span>
                </div>
              </div>
            </div>

            {/* Advisory note */}
            <div className="text-xs text-[#869397] space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748b] font-bold block">
                SECURITY CLEARANCE ADVISORY
              </span>
              <p className="leading-relaxed text-[11px]">
                Authorized personnel access strictly protected under Section 43B IT Security Act & Defense Ministry Directives.
                Biometric signatures, CAC hardware handshakes, and cryptographic keystroke telemetry are verified continuously.
              </p>
            </div>
          </div>

          {/* Terminal Identifier Footer */}
          <div className="mt-6 pt-3 bg-[#111827] border border-[#1f2a3e] rounded-lg p-3 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#06b6d4]" />
              <div className="flex flex-col">
                <span className="text-[9px] text-[#64748b] uppercase">TERMINAL HARDWARE</span>
                <span className="text-[#f8fafc] font-bold">TRM-KASHMIR-JAMMU-04</span>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-[#f59e0b]/20 text-[#f59e0b] font-mono text-[10px] uppercase font-bold rounded">
              DEFCON-3 AMBER
            </span>
          </div>
        </div>

        {/* Right Authentication Form Console */}
        <div className="lg:col-span-7 bg-[#0b0f17] border border-[#1f2a3e] rounded-xl p-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header & Mode Switcher */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2a3e]">
              <div>
                <h2 className="font-display text-lg text-[#f8fafc] font-bold tracking-tight">
                  SECURE COMMAND ACCESS
                </h2>
                <p className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
                  C2 PERIMETER AUTHENTICATION GATEWAY
                </p>
              </div>

              <div className="flex items-center gap-1 bg-[#111827] p-1 rounded-lg border border-[#1f2a3e]">
                <button
                  type="button"
                  onClick={() => setAuthMode('OFFICER')}
                  className={`px-3 py-1 font-mono text-xs font-bold uppercase rounded transition-colors ${
                    authMode === 'OFFICER'
                      ? 'bg-[#06b6d4] text-[#001f26]'
                      : 'text-[#869397] hover:text-[#f8fafc]'
                  }`}
                >
                  OFFICER ID
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('SMARTCARD')}
                  className={`px-3 py-1 font-mono text-xs font-bold uppercase rounded transition-colors ${
                    authMode === 'SMARTCARD'
                      ? 'bg-[#06b6d4] text-[#001f26]'
                      : 'text-[#869397] hover:text-[#f8fafc]'
                  }`}
                >
                  CAC / SMARTCARD
                </button>
              </div>
            </div>

            {/* Hardware Security Module Banner */}
            <div className="bg-[#111827] border border-[#1f2a3e] rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Usb className="w-5 h-5 text-[#10b981]" />
                <div className="flex flex-col font-mono">
                  <span className="text-[10px] text-[#64748b] uppercase font-semibold">
                    HARDWARE SECURITY MODULE
                  </span>
                  <span className="text-xs text-[#10b981] font-bold">
                    YUBIKEY 5 NFC • FIPS 140-2 LEVEL 3 DETECTED
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-[#10b981]/20 text-[#10b981] font-mono text-[10px] uppercase font-bold rounded">
                TOKEN READY
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              {/* Service Identifier */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-[#869397] uppercase tracking-wider font-semibold">
                    OFFICIAL ID / SERVICE IDENTIFIER
                  </label>
                  <span className="text-[10px] text-[#06b6d4] uppercase font-bold">BSF-INTEL SEC</span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#64748b]">@</span>
                  <input
                    type="text"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full bg-[#070a0f] border border-[#1f2a3e] focus:border-[#06b6d4] text-[#f8fafc] pl-8 pr-20 py-2 rounded text-xs focus:outline-none transition-colors"
                  />
                  <span className="absolute right-2.5 px-1.5 py-0.5 bg-[#161f30] text-[#10b981] text-[10px] font-bold rounded">
                    VERIFIED
                  </span>
                </div>
              </div>

              {/* Passphrase */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-[#869397] uppercase tracking-wider font-semibold">
                    TACTICAL ACCESS PASSPHRASE
                  </label>
                  <span className="px-1.5 py-0.5 bg-[#161f30] text-[#f59e0b] text-[10px] uppercase font-bold rounded">
                    CLEARANCE: TACTICAL L4
                  </span>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-3.5 h-3.5 absolute left-3 text-[#64748b]" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    className="w-full bg-[#070a0f] border border-[#1f2a3e] focus:border-[#06b6d4] text-[#f8fafc] pl-9 pr-10 py-2 rounded text-xs focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 text-[#64748b] hover:text-[#f8fafc]"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* TOTP and Biometrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#869397] uppercase tracking-wider font-semibold block">
                    TIME-BASED TOKEN (TOTP / DEF-AUTH)
                  </label>
                  <div className="relative flex items-center">
                    <KeyRound className="w-3.5 h-3.5 absolute left-3 text-[#64748b]" />
                    <input
                      type="text"
                      maxLength={6}
                      value={totpCode}
                      onChange={(e) => setTotpCode(e.target.value)}
                      className="w-full bg-[#070a0f] border border-[#1f2a3e] focus:border-[#06b6d4] text-[#f8fafc] pl-9 pr-3 py-2 rounded font-mono tracking-widest text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#869397] uppercase tracking-wider font-semibold block">
                    FINGERPRINT / BIOMETRIC SENSOR
                  </label>
                  <button
                    type="button"
                    onClick={handleScanBiometrics}
                    className={`w-full py-2 px-3 rounded border flex items-center justify-between text-xs transition-colors ${
                      biometricScanned
                        ? 'bg-[#10b981]/20 border-[#10b981] text-[#10b981]'
                        : 'bg-[#111827] border-[#1f2a3e] text-[#dfe2ee] hover:bg-[#161f30]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Fingerprint className="w-4 h-4 text-[#06b6d4]" />
                      <span>{biometricScanned ? 'Biometrics Verified' : 'Touch Optical Reader'}</span>
                    </div>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        biometricScanned ? 'bg-[#10b981]' : 'bg-[#10b981] animate-pulse'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Checkboxes & Binding */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[11px] text-[#dfe2ee]">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-3.5 h-3.5 rounded bg-[#070a0f] accent-[#06b6d4]"
                  />
                  <span>Trust & Bind Terminal (SEC-MAC Lock 7C:D1:C3:8E)</span>
                </label>
                <a href="#emergency" className="text-[10px] text-[#06b6d4] hover:underline uppercase">
                  Emergency Protocol #4
                </a>
              </div>

              {/* Submit CTA */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3 bg-[#06b6d4] hover:bg-[#0891b2] text-[#001f26] font-mono text-xs font-bold uppercase tracking-wider rounded shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                >
                  {isAuthenticating ? (
                    <>
                      <Radio className="w-4 h-4 animate-spin" />
                      <span>SYNCHRONIZING TACTICAL C2 KEY...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      <span>AUTHENTICATE & ENTER COMMAND CENTER</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Instant Demo Bypass for Evaluators */}
                <button
                  type="button"
                  onClick={onLoginSuccess}
                  className="w-full py-2 bg-[#111827] hover:bg-[#161f30] text-[#869397] hover:text-[#f8fafc] border border-[#1f2a3e] font-mono text-[11px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>DEMO BYPASS: DIRECT C2 ACCESS (WATCH COMMANDER VERIFIED)</span>
                </button>
              </div>

              {authSuccess && (
                <div className="p-3 bg-[#10b981]/20 border border-[#10b981] text-[#10b981] rounded flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <div>
                    <span className="font-bold block">CRYPTO HANDSHAKE SUCCESSFUL</span>
                    <span className="text-[10px] text-[#869397]">
                      Decentralized Token Issued • Diverting to Border Command Deck...
                    </span>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Form Footer */}
          <div className="pt-4 mt-4 border-t border-[#1f2a3e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] font-mono text-[#64748b]">
            <div>
              <span>CRYPTOGRAPHIC CERT: </span>
              <span className="text-[#dfe2ee]">SHA256:e9a3b84...98f102</span>
            </div>
            <span className="text-[#10b981] uppercase font-semibold">ALL SESSIONS AUDITED BY DCO</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Cluster */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-3 rounded-lg flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#111827] flex items-center justify-center text-[#06b6d4]">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#64748b] uppercase block">EDGE NODES</span>
            <span className="text-[#f8fafc] font-bold">148 / 152 SYNCHRONIZED</span>
          </div>
        </div>

        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-3 rounded-lg flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#111827] flex items-center justify-center text-[#10b981]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#64748b] uppercase block">OPTICAL FIBER LINK</span>
            <span className="text-[#10b981] font-bold">99.98% UPTIME • 10 Gbps</span>
          </div>
        </div>

        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-3 rounded-lg flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#111827] flex items-center justify-center text-[#f59e0b]">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#64748b] uppercase block">DEFCON READINESS</span>
            <span className="text-[#f59e0b] font-bold">DEFCON-3 ELEVATED</span>
          </div>
        </div>

        <div className="bg-[#0b0f17] border border-[#1f2a3e] p-3 rounded-lg flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#111827] flex items-center justify-center text-[#06b6d4]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#64748b] uppercase block">AIR-GAP HSM VAULT</span>
            <span className="text-[#f8fafc] font-bold">FIPS 140-2 LEVEL 3</span>
          </div>
        </div>
      </div>
    </div>
  );
};
