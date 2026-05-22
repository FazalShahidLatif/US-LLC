import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  FileText, 
  CheckSquare, 
  Square,
  ArrowUpRight, 
  LogOut, 
  Home, 
  Sparkles, 
  ShieldCheck, 
  Briefcase,
  AlertCircle,
  Clock
} from 'lucide-react';
import { AuthSession } from '../types';

interface UserProfileProps {
  session: AuthSession;
  onLogout: () => void;
  onNavigateHome: () => void;
  onEditDraft: () => void;
}

export default function UserProfile({ session, onLogout, onNavigateHome, onEditDraft }: UserProfileProps) {
  const [draft, setDraft] = useState<any>(null);
  
  // Staging document checklist items state
  const [documents, setDocuments] = useState([
    { id: 'art', label: 'Draft Articles of Organization (Form US-226)', status: 'Pending Review', checked: false },
    { id: 'ein', label: 'EIN (Employer Identification Number) Dispatch', status: 'Awaiting Sign-off', checked: false },
    { id: 'agent', label: 'Designation of Registered Agent Form', status: 'In Progress', checked: false },
    { id: 'accord', label: 'Corporate Bylaws & Founder Agreement', status: 'Draft Staged', checked: false },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('us_llc_saved_calc_v1');
    if (saved) {
      try {
        setDraft(JSON.parse(saved));
      } catch (e) {
        // failed quietly
      }
    }
  }, []);

  const toggleDocChecked = (docId: string) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        const nextChecked = !doc.checked;
        return {
          ...doc,
          checked: nextChecked,
          status: nextChecked ? 'Review Complete' : 'In Progress'
        };
      }
      return doc;
    }));
  };

  // Human readable state conversion
  const getPackageName = (packageType: string) => {
    switch (packageType) {
      case 'llc': return 'LLC (Limited Liability Company)';
      case 'c-corp': return 'C Corporation (General)';
      case 'nonprofit': return 'Nonprofit Corporation';
      case 's-corp': return 'S-Corp (Tax Election Addon)';
      default: return 'Domestic LLC';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans selection:bg-yellow-100 selection:text-slate-950" id="user-profile-subsystem">
      
      {/* Top Banner indicating Staged Mode */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center border-b border-slate-950 flex flex-col sm:flex-row items-center justify-center gap-2 relative z-10" id="user-status-strip">
        <span className="bg-yellow-400 text-slate-950 uppercase text-[8.5px] px-1.5 py-0.5 rounded font-black tracking-widest leading-none font-mono">
          SECURE MEMBERSHIP DESK
        </span>
        <span>Registered Account Access Sandbox — Welcome, {session.name}</span>
      </div>

      {/* Profile Header bar */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 px-6 z-40" id="profile-header">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button 
            onClick={onNavigateHome}
            className="flex items-center space-x-2.5 hover:opacity-90 transition-all font-sans text-left bg-transparent border-0 cursor-pointer"
          >
            <span className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-inner">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
            </span>
            <div>
              <span className="text-lg font-display font-bold text-slate-900 uppercase tracking-tight">US LLC</span>
              <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-bold font-mono">My Account Portal</span>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <button 
              onClick={onNavigateHome}
              className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Homepage</span>
            </button>

            <button 
              onClick={onLogout}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main content split */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-6 sm:p-8 space-y-8">
        
        {/* Welcome Identity Card block */}
        <div className="bg-white border border-slate-200/90 p-6 rounded-none flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-yellow-400 text-xl font-mono font-black shadow-inner">
              {session.name.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">Corporate Founder Credentials</span>
              <h2 className="text-2xl font-serif font-black text-slate-900 mt-0.5">{session.name}</h2>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3.5 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {session.email}
                </span>
                <span className="flex items-center gap-1 font-mono text-[10.5px]">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Registered May 2026 Sandbox
                </span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 text-yellow-800 border border-yellow-250 py-2.5 px-4 text-xs font-bold font-mono tracking-wide uppercase">
            🚀 ACTIVE FOUNDER PILOT ACCESS
          </div>
        </div>

        {/* Core Layout Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Live Staged Formation Draft Module (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 space-y-6 shadow-sm rounded-none">
            <div className="border-b border-slate-150 pb-4">
              <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">Sandbox Snapshot</span>
              <h3 className="text-lg font-serif font-black text-slate-900 mt-0.5">My Domestic Staged Formation Draft</h3>
              <p className="text-xs text-slate-500 mt-1 font-body-serif leading-relaxed">
                This snaps key variables from your latest interactive pricing session. Adjust entity specs directly in the calculator workspace.
              </p>
            </div>

            {draft ? (
              <div className="space-y-4" id="div-user-draft-snapshot">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-none space-y-3.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold font-mono">Proposed Business Moniker</span>
                      <p className="text-base font-bold text-slate-900 mt-0.5 uppercase tracking-wide">
                        {draft.businessName ? draft.businessName : 'Unnamed Staging Setup corp'}
                      </p>
                    </div>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 font-bold font-mono border border-indigo-100 rounded-none uppercase">
                      Draft Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-medium border-t border-b border-slate-150 py-3 mt-2">
                    <div>
                      <span className="block text-[9px] uppercase text-slate-400 font-mono font-bold">State Registry Venue</span>
                      <span className="block text-slate-800 font-bold mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-550" />
                        State Code: {draft.selectedStateCode}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[9px] uppercase text-slate-400 font-mono font-bold">Corporate Entity Target</span>
                      <span className="block text-slate-800 font-bold mt-0.5 flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-indigo-555" />
                        {getPackageName(draft.selectedPackage)}
                      </span>
                    </div>
                  </div>

                  {/* Included Services Lists */}
                  <div className="space-y-2 pt-1 text-xs text-slate-650">
                    <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">Configured Platform Features</span>
                    <ul className="space-y-1 bg-white p-3 border border-slate-150 rounded-none divide-y divide-slate-100">
                      <li className="flex justify-between py-1">
                        <span>Mandated Registered Agent Representation (Term: 1 Year)</span>
                        <span className="font-bold text-slate-900 font-mono">{draft.includeRegisteredAgent ? 'INCLUDED' : 'EXCLUDED'}</span>
                      </li>
                      <li className="flex justify-between py-1">
                        <span>EIN (Federal Employer Tax ID Registration) Dispatch</span>
                        <span className="font-bold text-slate-900 font-mono">{draft.includeEIN ? 'INCLUDED' : 'EXCLUDED'}</span>
                      </li>
                      <li className="flex justify-between py-1">
                        <span>Managed Annual State Maintenance Filings Monitor</span>
                        <span className="font-bold text-slate-900 font-mono">{draft.includeAnnualReport ? 'INCLUDED' : 'EXCLUDED'}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 bg-slate-50 border border-slate-200 p-4 rounded-none">
                  <div>
                    <span className="block text-[9px] uppercase text-slate-400 font-mono font-black">Estimated Staging Cost Total</span>
                    <span className="block text-xs text-slate-400 font-body-serif italic">(Excludes individual State Administrative filing fees)</span>
                  </div>
                  <button 
                    onClick={onEditDraft}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-none shadow-md transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Analyze in Calculator</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-yellow-400" />
                  </button>
                </div>
              </div>
            ) : (
              // Empty draft placeholder view
              <div className="p-10 border border-dashed border-slate-300 text-center space-y-4" id="div-user-draft-empty">
                <AlertCircle className="w-10 h-10 text-slate-350 mx-auto" />
                <div className="space-y-1">
                  <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wide">No saved draft configuration detected</h5>
                  <p className="text-xs text-slate-450 leading-relaxed max-w-sm mx-auto font-body-serif text-center">
                    Navigate back to the domestic legal setup calc at the homepage to store your first corporate article draft simulation!
                  </p>
                </div>
                <button 
                  onClick={onEditDraft}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-none shadow-md transition-all cursor-pointer"
                >
                  Configure My First Formation Draft
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Founder Security Verification & Checklist (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 space-y-6 shadow-sm rounded-none">
            
            <div className="border-b border-slate-150 pb-4">
              <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">Pre-Clearance Protocol</span>
              <h3 className="text-lg font-serif font-black text-slate-900 mt-0.5">Compliance Assembly Checklist</h3>
              <p className="text-xs text-slate-500 mt-1 font-body-serif leading-relaxed">
                Tackle required regulatory documents. Tap actions to change document evaluation status locally.
              </p>
            </div>

            {/* Simulated Live Checklists */}
            <div className="space-y-3">
              {documents.map((doc) => (
                <div 
                  key={doc.id}
                  onClick={() => toggleDocChecked(doc.id)}
                  id={`doc-card-${doc.id}`}
                  className="p-3.5 border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-stone-50 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-slate-500 group-hover:text-indigo-650 flex-shrink-0 mt-0.5">
                      {doc.checked ? (
                        <CheckSquare className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800 font-sans group-hover:text-slate-900">
                        {doc.label}
                      </p>
                      <span className={`inline-block text-[9px] font-mono uppercase tracking-wider font-bold mt-1 ${
                        doc.checked ? 'text-emerald-600 font-bold' : 'text-slate-400'
                      }`}>
                        Current Status: {doc.status}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-350 select-none">✦</span>
                </div>
              ))}
            </div>

            {/* Notice information */}
            <div className="p-4 bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-2 leading-relaxed font-body-serif">
              <div className="flex items-center gap-1.5 text-slate-800 font-bold uppercase tracking-wider text-[10px] font-sans">
                <Sparkles className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                State Seal Verification
              </div>
              <p>
                Once state seals are signed off by the state secretary, they appear download-ready here. All document checklists persist in client memory storage.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 bg-white border-t border-slate-200 text-[10px] text-slate-500 font-mono">
        <p>© 2026 US LLC Client Services Desk. Registered and pre-integrated by SaaSSkul.</p>
      </footer>

    </div>
  );
}
