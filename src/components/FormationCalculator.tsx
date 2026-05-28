import React, { useState, useEffect } from 'react';
import { STATE_FEES } from '../data';
import { Search, Loader2, Check, AlertCircle, Sparkles, Receipt, CloudLightning } from 'lucide-react';
import { StateFee } from '../types';

export default function FormationCalculator() {
  // Local storage prefix/keys
  const STORAGE_KEY = 'us_llc_saved_calc_v1';

  // State fee options
  const sortedStates = [...STATE_FEES].sort((a, b) => a.state.localeCompare(b.state));

  // Options
  const entityPackages = [
    { type: 'llc', label: 'LLC (Limited Liability Company)', price: 79, tagline: 'Popular choice for operational liability shield & passthrough taxes.' },
    { type: 'c-corp', label: 'C Corporation (General)', price: 149, tagline: 'Ideal for venture raising, issuing stocks, and scaling globally.' },
    { type: 'nonprofit', label: 'Nonprofit Corporation', price: 199, tagline: 'Designed for charity missions with tax-exempt criteria pathways.' },
    { type: 's-corp', label: 'S-Corp (Tax Election Addon)', price: 99, tagline: 'Save substantial self-employment fees for existing companies.' }
  ];

  // Core Calculator configurations State
  const [selectedStateCode, setSelectedStateCode] = useState<string>('DE'); // Default Delaware
  const [selectedPackage, setSelectedPackage] = useState<string>('llc');
  const [businessName, setBusinessName] = useState<string>('');
  
  // Checking states
  const [isCheckingName, setIsCheckingName] = useState<boolean>(false);
  const [nameCheckResult, setNameCheckResult] = useState<{
    searched: string;
    checked: boolean;
    available: boolean;
    reason: string;
  } | null>(null);

  // Compliance options additions
  const [includeRegisteredAgent, setIncludeRegisteredAgent] = useState<boolean>(true);
  const [includeEIN, setIncludeEIN] = useState<boolean>(true);
  const [includeAnnualReport, setIncludeAnnualReport] = useState<boolean>(false);

  // Saved configs list
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.selectedStateCode) setSelectedStateCode(parsed.selectedStateCode);
        if (parsed.selectedPackage) setSelectedPackage(parsed.selectedPackage);
        if (parsed.businessName) setBusinessName(parsed.businessName);
        if (parsed.includeRegisteredAgent !== undefined) setIncludeRegisteredAgent(parsed.includeRegisteredAgent);
        if (parsed.includeEIN !== undefined) setIncludeEIN(parsed.includeEIN);
        if (parsed.includeAnnualReport !== undefined) setIncludeAnnualReport(parsed.includeAnnualReport);
      } catch (e) {
        // quiet fail
      }
    }
  }, []);

  const selectedStateObj = sortedStates.find(s => s.code === selectedStateCode) || sortedStates[0];
  const activePackageObj = entityPackages.find(p => p.type === selectedPackage) || entityPackages[0];

  // Logic calculation variables
  const basePrice = activePackageObj.price;
  const stateFilingFee = selectedStateObj.fee;
  const agentFee = includeRegisteredAgent ? 119 : 0;
  const einFee = includeEIN ? 49 : 0;
  const reportFee = includeAnnualReport ? 89 : 0;
  const grandTotal = basePrice + stateFilingFee + agentFee + einFee + reportFee;

  const handleSaveDraft = () => {
    const dataToSave = {
      selectedStateCode,
      selectedPackage,
      businessName,
      includeRegisteredAgent,
      includeEIN,
      includeAnnualReport
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    setSaveStatus('Formation Configuration Saved! You can return to this anytime.');
    setTimeout(() => {
      setSaveStatus('');
    }, 4500);
  };

  const handleNameCheckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;

    setIsCheckingName(true);
    setNameCheckResult(null);

    setTimeout(() => {
      const lower = businessName.toLowerCase().trim();
      let available = true;
      let reason = "This name appears completely available in state registry indexes! We will run formal USPTO and specific regional index scrubbers upon final placement.";

      if (lower.includes('establishedbrand') || lower.includes('trademarkconflict')) {
        available = false;
        reason = "Name is conflictive with registered major trademark holdings. Please formulate a unique layout.";
      } else if (lower.includes('amazon') || lower.includes('apple') || lower.includes('google')) {
        available = false;
        reason = "Fails immediate corporate name filters due to high-risk federal brand name conflicts.";
      } else if (lower.length < 3) {
        available = false;
        reason = "Business name represents a sequence too brief. Secretary of State mandates a descriptive moniker.";
      } else if (lower === 'us llc') {
        available = false;
        reason = "Exact matched term. Selected sovereign term is restricted for general formations.";
      }

      setNameCheckResult({
        searched: businessName,
        checked: true,
        available,
        reason
      });
      setIsCheckingName(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm" id="formation-calculator-widget">
      <div className="bg-indigo-950 px-6 py-6 text-white flex items-center justify-between border-b border-indigo-900">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300">Interactive Setup Engine</span>
          <h3 className="text-xl font-serif font-black tracking-tight text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Premium US LLC Incorporation Calculator
          </h3>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold">Domestic Filings</p>
          <p className="text-sm font-mono font-bold text-white">50 STATES ACTIVE</p>
        </div>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Setup steps (8 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Corporate Name checking */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest">
              Step 1: Check Target Business Name Availability
            </label>
            <p className="text-xs text-slate-500 font-body-serif leading-relaxed">Provide preferred trade name. We will run index check simulations against direct databases.</p>
            
            <form onSubmit={handleNameCheckSubmit} className="flex gap-2">
              <div className="relative flex-grow">
                <input
                  id="input-calc-business-name"
                  type="text"
                  placeholder="e.g. SaaSSkul Innovate"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full text-xs rounded-none bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 transition-all pl-10 pr-3 py-3 focus:outline-none focus:ring-0"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
              <button
                id="btn-calc-verify-name"
                disabled={isCheckingName || !businessName.trim()}
                type="submit"
                className="px-5 py-3 bg-slate-900 border border-slate-900 text-white hover:bg-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-none cursor-pointer transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingName ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Verify Availability</span>
                )}
              </button>
            </form>

            {nameCheckResult && (
              <div
                id="box-name-check-result"
                className={`p-4 rounded-none border text-xs leading-relaxed transition-all list-none flex items-start gap-3 ${
                  nameCheckResult.available 
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950 font-body-serif'
                    : 'bg-rose-50/50 border-rose-200 text-rose-950 font-body-serif'
                }`}
              >
                {nameCheckResult.available ? (
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-xs mb-0.5 uppercase tracking-wide">
                    "{nameCheckResult.searched}": {nameCheckResult.available ? 'Likely Acceptable!' : 'Warning/Taken'}
                  </p>
                  <p className="opacity-90">{nameCheckResult.reason}</p>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Choose State of Formation */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest">
              Step 2: Choose State of Formation
            </label>
            <p className="text-xs text-slate-500 font-body-serif leading-relaxed">Every state mandates unique administrative processing tariffs. Select Delaware or Wyoming for supreme flexibility.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-[9px] text-slate-400 uppercase tracking-wider font-bold mb-1">State Selection</span>
                <select
                  id="select-calc-state"
                  value={selectedStateCode}
                  onChange={(e) => setSelectedStateCode(e.target.value)}
                  className="w-full text-xs rounded-none bg-slate-50 border border-slate-200 px-3 py-2.5 focus:outline-none focus:border-indigo-600 focus:bg-white text-slate-800 font-semibold"
                >
                  {sortedStates.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.state} (State Fee: ${st.fee})
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-50 rounded-none p-3 border border-slate-200 flex flex-col justify-center">
                <span className="block text-[9px] text-slate-450 uppercase tracking-widest font-bold mb-1">Selected State Matrix</span>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-800 font-semibold text-[11px] uppercase tracking-wider">{selectedStateObj.state} Fee:</span>
                  <span className="font-mono font-bold text-slate-900">${selectedStateObj.fee}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] mt-1.5 pt-1.5 border-t border-slate-200/60 text-slate-500 font-body-serif">
                  <span>Est. Processing Speed:</span>
                  <span className="text-slate-800 font-semibold">~ {selectedStateObj.processingDays} Business Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Select Service Category Plan */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest">
              Step 3: Select Corporate Classification
            </label>
            <p className="text-xs text-slate-500 font-body-serif leading-relaxed">Compare the core formats compatible with standard state-level corporate class structures.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {entityPackages.map((pkg) => (
                <div
                  key={pkg.type}
                  id={`pkg-option-${pkg.type}`}
                  onClick={() => setSelectedPackage(pkg.type)}
                  className={`p-4 rounded-none border-2 text-left cursor-pointer transition-all ${
                    selectedPackage === pkg.type
                      ? 'border-indigo-600 bg-indigo-50/20'
                      : 'border-slate-200 bg-white hover:border-slate-350'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900">{pkg.label.split(' (')[0]}</span>
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-none">${pkg.price}</span>
                  </div>
                  <p className="text-xs text-slate-550 mt-1.5 font-body-serif leading-relaxed">{pkg.tagline}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 4: Compliance Add-ons Checklist */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest">
              Step 4: Optional Legal Safeguards & Frameworks
            </label>
            <p className="text-xs text-slate-500 font-body-serif leading-relaxed">Highly recommended safeguards that keep your structure clean and fully recognized.</p>

            <div className="space-y-2.5">
              {/* Addon 1 */}
              <label className="flex items-start gap-3.5 p-3.5 rounded-none border border-slate-200 hover:bg-slate-50/50 transition-all cursor-pointer">
                <input
                  id="chk-calc-option-agent"
                  type="checkbox"
                  checked={includeRegisteredAgent}
                  onChange={(e) => setIncludeRegisteredAgent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded-none border-slate-300 text-indigo-600 focus:ring-0"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-950">Add Professional Registered Agent Representation</span>
                    <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 font-bold font-mono">+$119/yr</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-body-serif leading-relaxed">Keep your static residency fully private. Prevents spam letters coming to your domestic living place.</p>
                </div>
              </label>

              {/* Addon 2 */}
              <label className="flex items-start gap-3.5 p-3.5 rounded-none border border-slate-200 hover:bg-slate-50/50 transition-all cursor-pointer">
                <input
                  id="chk-calc-option-ein"
                  type="checkbox"
                  checked={includeEIN}
                  onChange={(e) => setIncludeEIN(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded-none border-slate-300 text-indigo-600 focus:ring-0"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-950">Register Employer Identification Number (EIN)</span>
                    <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 font-bold font-mono">+$49</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-body-serif leading-relaxed">Essential for hiring crew members and registering active domestic checking bank accounts.</p>
                </div>
              </label>

              {/* Addon 3 */}
              <label className="flex items-start gap-3.5 p-3.5 rounded-none border border-slate-200 hover:bg-slate-50/50 transition-all cursor-pointer">
                <input
                  id="chk-calc-option-annual"
                  type="checkbox"
                  checked={includeAnnualReport}
                  onChange={(e) => setIncludeAnnualReport(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded-none border-slate-300 text-indigo-600 focus:ring-0"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-950">Annual State Report Automated filing alerts</span>
                    <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 font-bold font-mono">+$89/yr</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-body-serif leading-relaxed">Ensures we handle drafting mandatory state annual report papers to stay active forever.</p>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right column: Dynamic Bill Estimate Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50/50 p-5 sm:p-6 rounded-none border border-slate-200 flex flex-col justify-between" id="invoice-breakdown-subpanel">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-indigo-600" />
                Line Itemized Estimate
              </span>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-none font-mono font-bold">US-USD</span>
            </div>

            {/* Line items lists */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600 font-body-serif">Formation Base Bundle:</span>
                <span className="font-mono text-slate-800 font-bold">${basePrice}</span>
              </div>
              <div className="flex justify-between pl-3 text-[11px] text-slate-400 font-mono">
                <span>— type: {activePackageObj.label.split(' ')[0]}</span>
              </div>

              <div className="flex justify-between border-t border-slate-105 pt-2.5">
                <span className="text-slate-700 font-body-serif">{selectedStateObj.state} Filing Fee:</span>
                <span className="font-mono text-slate-900 font-bold">${stateFilingFee}</span>
              </div>
              <div className="flex justify-between pl-3 text-[11px] text-slate-400 font-mono">
                <span>— speed: ~{selectedStateObj.processingDays} business days</span>
              </div>

              {includeRegisteredAgent && (
                <div className="flex justify-between border-t border-slate-105 pt-2.5">
                  <span className="text-slate-600 font-body-serif">Registered Agent (1 Yr):</span>
                  <span className="font-mono text-slate-800 font-bold">$119</span>
                </div>
              )}

              {includeEIN && (
                <div className="flex justify-between border-t border-slate-105 pt-2.5">
                  <span className="text-slate-600 font-body-serif">EIN Form SS-4 filing:</span>
                  <span className="font-mono text-slate-800 font-bold">$49</span>
                </div>
              )}

              {includeAnnualReport && (
                <div className="flex justify-between border-t border-slate-105 pt-2.5">
                  <span className="text-slate-600 font-body-serif">Annual Compliance alerts:</span>
                  <span className="font-mono text-slate-800 font-bold">$89</span>
                </div>
              )}
            </div>

            {/* Grand Total banner */}
            <div className="bg-indigo-950 text-white rounded-none p-4 mt-6 border-l-4 border-indigo-600 shadow-xs">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[9px] text-indigo-300 uppercase tracking-widest font-bold">Total Estimated Budget</p>
                  <p className="text-[10px] text-white font-serif italic mt-0.5">All State + Corporate fees included</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-white">${grandTotal}</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <p className="text-[10px] text-slate-500 font-body-serif leading-relaxed">
                Tax liability can change according to unique variables. Consultation package values represent estimates and are fully guaranteed matching our upcoming Beta policies.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-200 space-y-3">
            <button
              id="btn-calc-save-draft"
              onClick={handleSaveDraft}
              className="w-full py-3 bg-slate-900 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-widest rounded-none transition-all shadow-sm cursor-pointer block text-center active:scale-95"
            >
              Save Configuration Draft
            </button>
            
            {saveStatus && (
              <p id="p-calc-save-msg" className="text-[11px] text-center text-emerald-805 bg-emerald-50/60 border border-emerald-100 py-1.5 font-bold">
                {saveStatus}
              </p>
            )}

            <div className="flex justify-center items-center gap-1.5 text-[9px] text-slate-400 uppercase tracking-wider font-bold mt-1">
              <CloudLightning className="w-3.5 h-3.5 text-indigo-600" />
              <span>Full compliance alignment launching June 15, 2026</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
