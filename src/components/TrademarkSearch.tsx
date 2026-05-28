import React, { useState } from 'react';
import { MOCK_TRADEMARKS } from '../data';
import { Search, ShieldAlert, Sparkles, AlertCircle, CheckCircle2, ShieldEllipsis } from 'lucide-react';

export default function TrademarkSearch() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [diagnosticProgress, setDiagnosticProgress] = useState<string>('');
  const [result, setResult] = useState<{
    query: string;
    status: string;
    registerability: string;
    comments: string;
  } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setResult(null);

    // Simulated staggered step diagnostics
    const steps = [
      'Querying Federal USPTO trademark indices...',
      'Comparing with registered general brand labels...',
      'Scanning class 35, 42 software & compliance codes...',
      'Compiling final legal feasibility scores...'
    ];

    let currentStep = 0;
    setDiagnosticProgress(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setDiagnosticProgress(steps[currentStep]);
      } else {
        clearInterval(interval);
        
        // Lookup matches
        const lowerSearch = searchTerm.toLowerCase().replace(/\s+/g, '');
        const matched = MOCK_TRADEMARKS.find(item => 
          item.name.toLowerCase().replace(/\s+/g, '') === lowerSearch
        );

        if (matched) {
          setResult({
            query: searchTerm,
            status: matched.status,
            registerability: matched.registerability,
            comments: matched.comments
          });
        } else {
          // Generate customized diagnostic report heuristics
          let regStatus = 'High - Likely Registerable';
          let commentText = 'No conflicting phonetic phonetic equivalents found in Classes 35 & 42. Excellent candidate for federal protection once we launch!';
          
          if (searchTerm.length < 4) {
            regStatus = 'Low - Descriptive Generic';
            commentText = 'Too short. Abbreviation lists face generic resistance at USPTO screening levels. We suggest introducing descriptive qualifiers.';
          } else if (lowerSearch.includes('llc') || lowerSearch.includes('inc') || lowerSearch.includes('corp')) {
            regStatus = 'Medium - Suffix Warning';
            commentText = 'US trade suffixes like LLC, Incorporation, or Corp are non-distinguishable suffixes under USPTO guidelines. Focus trademark claims strictly on the preceding terms.';
          }

          setResult({
            query: searchTerm,
            status: 'Available',
            registerability: regStatus,
            comments: commentText
          });
        }
        setIsSearching(false);
      }
    }, 700);
  };

  return (
    <div className="bg-[#0b0f19] text-white rounded-none border border-indigo-950 p-6 sm:p-8 relative overflow-hidden" id="trademark-checker-subsystem">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-indigo-500 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-block text-[9px] uppercase font-bold tracking-widest text-indigo-300 bg-indigo-950 border border-indigo-900 px-3 py-1 rounded-none">
            Federal USPTO Screening Subsystem
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
            Brand Protection Clearance Simulator
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-body-serif">
            Powered by our proprietary USPTO-aligned semantic parsing algorithms, our scanning tools help you check if your proposed trade mark stands alone or conflicts with active federal registries.
          </p>
        </div>

        {/* Input box */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
          <div className="relative flex-grow">
            <input
              id="input-trademark-query"
              type="text"
              placeholder="e.g. SaaSSkul, ApexCorp, Apple, MyBrand"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs rounded-none bg-indigo-950/60 border border-indigo-900 focus:bg-indigo-950 focus:border-indigo-505 transition-all pl-10 pr-3 py-3.5 focus:outline-none text-slate-200 uppercase tracking-wider font-semibold"
              required
            />
            <Search className="w-4 h-4 text-slate-550 absolute left-3.5 top-4" />
          </div>
          <button
            id="btn-trademark-scan"
            disabled={isSearching || !searchTerm.trim()}
            type="submit"
            className="px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-950 text-[10px] font-bold uppercase tracking-widest rounded-none shadow-md transition-all shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isSearching ? 'Scanning...' : 'Run Diagnostics'}
          </button>
        </form>

        {/* progress diagnostics loading indicator */}
        {isSearching && (
          <div className="text-center space-y-2.5" id="div-trademark-progress">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-indigo-300">
              <ShieldEllipsis className="w-4 h-4 animate-pulse text-indigo-400" />
              <span>{diagnosticProgress}</span>
            </div>
            {/* progress line bar */}
            <div className="w-full max-w-md mx-auto h-1.5 bg-indigo-950 rounded-none overflow-hidden border border-indigo-900/60">
              <div className="h-full bg-indigo-500 animate-[pulse_1s_infinite] w-3/4"></div>
            </div>
          </div>
        )}

        {/* Diagnostic Results pane */}
        {result && (
          <div id="div-trademark-result" className="max-w-xl mx-auto bg-[#0e1424] rounded-none border border-indigo-900/60 p-5 space-y-4">
            <div className="flex items-start justify-between border-b border-indigo-950 pb-3">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono font-bold">Searched Trade Mark Mark</span>
                <p className="text-sm font-bold font-mono text-white uppercase tracking-wider">{result.query}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-none uppercase tracking-wider ${
                result.status === 'Available'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900'
                  : 'bg-rose-950/80 text-rose-400 border border-rose-900'
              }`}>
                {result.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
              <div className="p-3.5 rounded-none bg-indigo-950/60 border border-indigo-900/40 space-y-1">
                <span className="text-[9px] uppercase text-slate-400 font-bold font-mono">Registerability Rating</span>
                <p className={`text-xs font-bold ${
                  result.registerability.includes('High') || result.registerability.includes('Excellent')
                    ? 'text-emerald-400'
                    : 'text-rose-450'
                }`}>
                  {result.registerability}
                </p>
              </div>

              <div className="p-3.5 rounded-none bg-indigo-950/60 border border-indigo-900/40 space-y-1">
                <span className="text-[9px] uppercase text-slate-400 font-bold font-mono">Heuristic Screening Code</span>
                <p className="text-xs text-slate-300 font-mono">Class 42 / SaaS Standard</p>
              </div>
            </div>

            <div className="p-4 rounded-none bg-indigo-950/80 border border-indigo-900/50 text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed font-body-serif">
              {result.status === 'Available' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              )}
              <p>{result.comments}</p>
            </div>

            <div className="text-center pt-2">
              <p className="text-[10px] text-slate-500 leading-normal font-body-serif">
                Trademark clear scores are generated using mock clearances. Formal registrations require direct lawyer reviews before filing with the USPTO.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
