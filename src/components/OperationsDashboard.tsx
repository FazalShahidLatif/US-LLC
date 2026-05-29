import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  ShieldCheck, 
  Lock, 
  User, 
  LogOut, 
  Home, 
  RefreshCw, 
  Database, 
  Users, 
  FileText, 
  AlertTriangle,
  Settings,
  ShieldAlert,
  Sliders,
  BellRing,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { AuthSession } from '../types';

interface OperationsDashboardProps {
  session: AuthSession;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export default function OperationsDashboard({ session, onLogout, onNavigateHome }: OperationsDashboardProps) {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Simulated interactive chief admin state widgets 
  const [bypassUSPTO, setBypassUSPTO] = useState(false);
  const [firewallStrict, setFirewallStrict] = useState(true);
  const [activeFilerWorker, setActiveFilerWorker] = useState(true);
  const [maintenanceLock, setMaintenanceLock] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);
  const [successStatus, setSuccessStatus] = useState('');

  const fetchMetrics = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('/api/admin/metrics', {
        headers: {
          'Authorization': `Bearer ${session.token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to authenticate and fetch legal operations metrics.');
      }
      setMetrics(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred connecting to security operations endpoint.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [session.token]);

  // Handle administrator simulation toggles
  const handleAdminToggleTrigger = (settingLabel: string) => {
    if (session.role !== 'admin') {
      // Just double safety check in case
      return;
    }
    setTriggerCount(prev => prev + 1);
    setSuccessStatus(`System Alignment Logged: Modified "${settingLabel}" state at UTC time successfully.`);
    setTimeout(() => setSuccessStatus(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-white flex flex-col font-sans selection:bg-indigo-600/35 selection:text-white" id="ops-panel">
      
      {/* Editorial aesthetic background blur shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-indigo-600/5 blur-3xl"></div>
      </div>

      {/* Operations Navbar */}
      <nav className="relative z-10 bg-[#0b0f19] border-b border-indigo-950 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="h-8.5 w-8.5 rounded-none bg-indigo-900/40 border border-indigo-800 flex items-center justify-center text-white">
            <Scale className="w-5 h-5 text-indigo-400" />
          </span>
          <div>
            <span className="text-base font-serif font-black text-white uppercase tracking-tight flex items-center gap-1.5">
              US LLC Operations Workspace
            </span>
            <div className="flex items-center gap-2">
              <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-mono font-bold">Secure Back-office Mode</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
          </div>
        </div>

        {/* User Identity and Session Controls */}
        <div className="flex flex-wrap items-center gap-3.5">
          <div className="px-3.5 py-1.5 bg-[#0e1424] border border-indigo-900/60 flex items-center gap-2.5">
            <User className="w-4 h-4 text-indigo-400" />
            <div className="text-left">
              <span className="block text-[10px] font-sans font-bold text-white leading-tight">{session.name}</span>
              <span className="block text-[9px] font-mono text-indigo-300 uppercase font-black tracking-widest leading-none mt-0.5">
                Role: {session.role}
              </span>
            </div>
          </div>

          <button 
            onClick={onNavigateHome}
            className="px-3.5 py-2 border border-indigo-900 bg-indigo-950/40 hover:bg-indigo-950 text-white text-[10px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Public Home</span>
          </button>

          <button 
            onClick={onLogout}
            className="px-3.5 py-2 bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 text-[10px] font-bold uppercase tracking-wider border border-rose-900 cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Workspace</span>
          </button>
        </div>
      </nav>

      {/* Main Container Layout */}
      <main className="relative z-10 flex-grow max-w-7xl mx-auto w-full p-6 sm:p-8 space-y-8">
        
        {/* Upper Banner Status */}
        <div className="p-4 bg-indigo-950/45 border-l-4 border-indigo-505 border border-indigo-900/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300 font-mono">Current Clearance Level</span>
            <p className="text-sm text-slate-200 font-body-serif leading-relaxed">
              Authorized access as <strong className="text-white uppercase tracking-wider">[{session.role}]</strong> coordinates state system diagnostics below.
            </p>
          </div>
          <button 
            onClick={fetchMetrics}
            disabled={isLoading}
            className="px-4 py-2 border border-indigo-900 hover:bg-indigo-950 text-white text-[10px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync Diagnostic Core</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-950/85 border border-rose-900 text-rose-200 text-xs flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold block uppercase tracking-wider mb-0.5">Telemetry Ingress Fault</span>
              <p>{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Dynamic Bento-Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-[#0e1424] border border-indigo-900/50 p-5 space-y-3 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-5 text-indigo-305">
              <Database className="w-16 h-16" />
            </div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">Total Submitted Filings</span>
            <p className="text-3xl font-mono font-black text-white">
              {metrics ? metrics.totalFilingsSubmitted : '...'}
            </p>
            <div className="text-[9px] text-indigo-300 uppercase tracking-widest font-bold">50 States Active</div>
          </div>

          <div className="bg-[#0e1424] border border-indigo-900/50 p-5 space-y-3 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-5 text-indigo-305">
              <Users className="w-16 h-16" />
            </div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">Active Reservations</span>
            <p className="text-3xl font-mono font-black text-white">
              {metrics ? metrics.activeReservations : '...'}
            </p>
            <div className="text-[9px] text-emerald-400 uppercase tracking-widest font-bold">Live Subscriptions</div>
          </div>

          <div className="bg-[#0e1424] border border-indigo-900/50 p-5 space-y-3 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-5 text-indigo-350">
              <FileText className="w-16 h-16" />
            </div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">USPTO Trademark Warnings</span>
            <p className="text-3xl font-mono font-black text-rose-455">
              {metrics ? metrics.usptoClearanceWarnings : '...'}
            </p>
            <div className="text-[9px] text-rose-400 uppercase tracking-widest font-bold">Needs Immediate Action</div>
          </div>

          <div className="bg-[#0e1424] border border-indigo-900/50 p-5 space-y-3 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-5 text-indigo-305">
              <ShieldCheck className="w-16 h-16" />
            </div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">Security Node Status</span>
            <p className="text-xl font-mono font-black text-emerald-400 uppercase tracking-tight pt-1">
              {metrics ? metrics.securityStatus : '...'}
            </p>
            <div className="text-[9px] text-indigo-300 uppercase tracking-widest font-mono">Ingress Loaded: {metrics ? metrics.systemLoad : 'OK'}</div>
          </div>

        </div>

        {/* Workspace Core Splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Live State Filings Pending Review (7 cols) */}
          <div className="lg:col-span-8 bg-[#0b0f19]/70 border border-indigo-950/80 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-300 font-mono">Operations Pipeline</span>
                <h3 className="text-lg font-serif font-black text-white">Pending US LLC Filings Queue</h3>
              </div>
              <span className="text-[9px] uppercase tracking-widest bg-indigo-950 border border-indigo-900 px-3 py-1 font-mono text-indigo-400 font-bold">
                Real-time Sync
              </span>
            </div>

            {/* Simulated Live Table datatable list */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[10px] uppercase font-mono bg-indigo-950/50 text-indigo-300 border-b border-indigo-950">
                  <tr>
                    <th className="p-3.5">Target Business Entity</th>
                    <th className="p-3.5">State</th>
                    <th className="p-3.5">Filing Type</th>
                    <th className="p-3.5">Submission Date</th>
                    <th className="p-3.5 text-right">Filing Integrity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-950/40">
                  {metrics?.latestFilings?.map((f: any, idx: number) => (
                    <tr key={idx} className="hover:bg-indigo-950/20 transition-colors">
                      <td className="p-3.5 font-bold text-white">{f.company}</td>
                      <td className="p-3.5 font-mono">{f.state}</td>
                      <td className="p-3.5 uppercase tracking-wider text-[10px] font-bold">{f.type}</td>
                      <td className="p-3.5 text-slate-400">{f.date}</td>
                      <td className="p-3.5 text-right">
                        <span className={`px-2.5 py-1 text-[9px] uppercase font-bold tracking-wider font-mono ${
                          f.status.includes('Pending') 
                            ? 'bg-amber-950 text-amber-400 border border-amber-900' 
                            : 'bg-[#0f1d19] text-emerald-400 border border-emerald-950'
                        }`}>
                          {f.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Empty state protection */}
                  {!metrics && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500 font-body-serif italic">
                        Loading staging files telemetry matrix...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Operational Instructions manual details */}
            <div className="p-4 bg-indigo-950/20 border border-indigo-950 text-slate-400 text-xs space-y-1 font-body-serif leading-relaxed h-fit">
              <span className="font-bold block text-white uppercase text-[10px] tracking-wider font-sans mb-1 flex items-center gap-1.5 text-indigo-300">
                <Sliders className="w-3.5 h-3.5" />
                Staff Workflow Standard Operating Procedures (SOP)
              </span>
              <p>1. Analyze whether target entities are submitted with pre-vetted trade name screening states.</p>
              <p>2. Verify State Filing Fees line-up against the newly registered state rules database.</p>
              <p>3. Dispatched items will register with the state registry API. For administrative overrides, contact Chief Administators.</p>
            </div>
          </div>

          {/* Right Column: Roles Conditional System Controls & Diagnostics (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Security Simulation Dashboard */}
            <div className="bg-[#0e1424] border border-indigo-900/60 p-6 space-y-5">
              <div className="border-b border-indigo-950 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-300 font-mono">Access Controls</span>
                  <h4 className="text-sm font-serif font-black text-white">Simulator Overrides</h4>
                </div>
                <Settings className="w-4 h-4 text-indigo-400" />
              </div>

              {successStatus && (
                <div id="p-admin-success-state" className="p-3 bg-emerald-950/60 border border-emerald-900 text-emerald-300 text-[10.5px] font-bold">
                  {successStatus}
                </div>
              )}

              {/* ROLE RESTRICTION VISUALS DETAILED RULES */}
              {(session.role === 'admin' || session.role === 'superadmin') ? (
                // Administrator Unlocked controls
                <div className="space-y-4" id="div-admin-unlocked-controls">
                  <div className="inline-flex items-center space-x-2 bg-emerald-950 text-emerald-450 border border-emerald-900 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{session.role === 'superadmin' ? 'Super Admin System Governance Logged' : 'Administrator Override Access Logged'}</span>
                  </div>

                  {/* Toggle 1 */}
                  <div className="p-3.5 bg-indigo-950/45 border border-indigo-900/50 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-white uppercase">Bypass USPTO Index</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Permits conflict listings bypass.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={bypassUSPTO} 
                        onChange={(e) => {
                          setBypassUSPTO(e.target.checked);
                          handleAdminToggleTrigger('Bypass USPTO Index');
                        }}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-indigo-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-650"></div>
                    </label>
                  </div>

                  {/* Toggle 2 */}
                  <div className="p-3.5 bg-indigo-950/45 border border-indigo-900/50 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-white uppercase">Strict Firewall Mode</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Filters anonymous request streams.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={firewallStrict} 
                        onChange={(e) => {
                          setFirewallStrict(e.target.checked);
                          handleAdminToggleTrigger('Strict Firewall Mode');
                        }}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-indigo-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-650"></div>
                    </label>
                  </div>

                  {/* Toggle 3 */}
                  <div className="p-3.5 bg-indigo-950/45 border border-indigo-900/50 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-white uppercase">Auto-Filer Worker</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Polls real state API dispatches.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={activeFilerWorker} 
                        onChange={(e) => {
                          setActiveFilerWorker(e.target.checked);
                          handleAdminToggleTrigger('Auto-Filer Worker Pool');
                        }}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-indigo-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-650"></div>
                    </label>
                  </div>

                  {/* Super Admin Exclusive Governance suite */}
                  {session.role === 'superadmin' && (
                    <div id="div-superadmin-exclusive-controls" className="pt-4 border-t border-indigo-950 space-y-3.5">
                      <span className="block text-[10px] text-yellow-500 font-mono uppercase font-black tracking-widest flex items-center gap-1">
                        <span>★</span> Super Admin Governance Actions
                      </span>
                      
                      {/* State Registry Maintenance Mode */}
                      <div className="p-3.5 bg-yellow-950/20 border border-yellow-900/40 flex items-center justify-between">
                        <div>
                          <span className="block text-xs font-bold text-yellow-500 uppercase">Global Maintenance Lock</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">Locks form registries for updates.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={maintenanceLock} 
                            onChange={(e) => {
                              setMaintenanceLock(e.target.checked);
                              handleAdminToggleTrigger('Global Maintenance Mode');
                            }}
                            className="sr-only peer" 
                          />
                          <div className="w-9 h-5 bg-indigo-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-450 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-600"></div>
                        </label>
                      </div>

                      {/* Clear Cache Staging */}
                      <button 
                        type="button"
                        onClick={() => {
                          setTriggerCount(prev => prev + 1);
                          setSuccessStatus('DATABASE FLUSH EXECUTED: Staging system caches purged successfully.');
                          setTimeout(() => setSuccessStatus(''), 4500);
                        }}
                        className="w-full py-2.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-900 text-rose-250 text-[10px] font-black uppercase tracking-widest transition-all duration-150 cursor-pointer text-center"
                      >
                        Flush Cached Entity Registries
                      </button>
                    </div>
                  )}

                  <div className="text-[10px] text-[#070a13] bg-indigo-305 text-center p-2.5 font-bold uppercase tracking-wider font-mono">
                    System Override Changes Logged: {triggerCount}
                  </div>
                </div>
              ) : (
                // Staff Restricted view - disable controls & display clear warning panel
                <div className="space-y-4" id="div-staff-restricted-warning">
                  <div className="p-4 bg-[#1f1712] border border-amber-900/80 rounded-none flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block font-sans">
                        Control Lockout
                      </span>
                      <p className="text-[11px] text-amber-250 mt-1 font-body-serif leading-relaxed">
                        Your operational account access is verified as <strong className="text-white">["STAFF"]</strong>. Active controls, bypass directives, and system overrides require explicit Master Administrator credentials.
                      </p>
                    </div>
                  </div>

                  {/* Disabled Placeholders to show what admins have access to */}
                  <div className="opacity-40 select-none space-y-3">
                    <div className="p-3 bg-[#0a0d17] border border-indigo-950 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bypass USPTO Index</span>
                      <span className="text-[9px] bg-red-950 text-red-400/80 px-1.5 py-0.5 font-mono">LOCKED</span>
                    </div>
                    <div className="p-3 bg-[#0a0d17] border border-indigo-950 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Strict Firewall Mode</span>
                      <span className="text-[9px] bg-red-950 text-red-400/80 px-1.5 py-0.5 font-mono">LOCKED</span>
                    </div>
                    <div className="p-3 bg-[#0a0d17] border border-indigo-950 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Auto-Filer Worker</span>
                      <span className="text-[9px] bg-red-950 text-red-400/80 px-1.5 py-0.5 font-mono">LOCKED</span>
                    </div>
                  </div>

                  <button 
                    disabled
                    className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-indigo-950/40 border border-indigo-950/80 rounded-none cursor-not-allowed text-center"
                  >
                    Insufficient Credentials Level
                  </button>
                </div>
              )}

            </div>

            {/* Ingress Logs Module */}
            <div className="bg-[#0e1424] border border-indigo-900/60 p-6 space-y-4 text-xs">
              <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-300 font-mono flex items-center gap-1.5">
                <BellRing className="w-3.5 h-3.5 text-indigo-550 shrink-0" />
                Active Security Ingress Logs
              </span>
              <ul className="space-y-2 font-mono text-[10px] text-slate-400 leading-normal">
                <li className="p-2.5 bg-[#0a0d17] border border-indigo-950 leading-relaxed">
                  <span className="text-indigo-400">[2026-05-22T21:20:05Z]</span> INGRESS: Token validation challenge success - Account: {session.email}
                </li>
                <li className="p-2.5 bg-[#0a0d17] border border-indigo-950 leading-relaxed">
                  <span className="text-indigo-400">[2026-05-22T21:18:11Z]</span> AUDIT: Loaded sorted State Filing Fee matrices for active 50 States.
                </li>
                <li className="p-2.5 bg-[#0a0d17] border border-indigo-950 leading-relaxed">
                  <span className="text-indigo-400">[2026-05-22T21:15:23Z]</span> FIREWALL: Port 3000 Ingress verified backend SSL check.
                </li>
              </ul>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 bg-[#0b0f19] border-t border-indigo-950 text-[10px] text-slate-500 font-mono">
        <p>© 2026 US LLC Workspace. Custom staging modules developed in collaboration with SaaSSkul.</p>
      </footer>

    </div>
  );
}
