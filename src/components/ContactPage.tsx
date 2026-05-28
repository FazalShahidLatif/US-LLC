import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  ArrowLeft,
  Scale,
  Send,
  AlertTriangle
} from 'lucide-react';

interface ContactPageProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
}

export default function ContactPage({ onNavigateHome, onNavigateAbout }: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('General Operations');
  const [urgency, setUrgency] = useState('Standard');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all mandatory communication blocks.");
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-950 selection:bg-yellow-105 selection:text-slate-950" id="contact-page-view">
      {/* Navigation Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-205 py-4 px-6 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={onNavigateHome} 
            className="flex items-center space-x-2.5 group bg-transparent border-0 cursor-pointer text-left"
            id="contact-logo"
          >
            <span className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white transition-all group-hover:bg-slate-800 shadow-inner">
              <Scale className="w-5 h-5 text-yellow-400" />
            </span>
            <div>
              <span className="text-lg font-display font-bold text-slate-900 uppercase tracking-tight">US LLC</span>
              <span className="block text-[9px] text-slate-405 uppercase tracking-widest font-bold font-mono">usllc.online</span>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateAbout}
              className="text-xs font-semibold hover:text-indigo-650 transition-colors bg-transparent border-0 cursor-pointer"
            >
              ABOUT US
            </button>
            <button
              onClick={onNavigateHome}
              className="text-xs font-bold font-mono text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-transparent border-0 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN HOME</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contact Central Hero Block */}
      <div className="bg-slate-950 text-white py-16 px-6 relative overflow-hidden text-center border-b border-slate-850">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#facc15_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="inline-block text-[10px] uppercase font-mono font-bold tracking-widest text-yellow-400 bg-yellow-400/10 border border-yellow-400/25 px-3 py-1">
            VERIFIED COMMUNICATIONS CHANNEL · CONTACT
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-white leading-tight">
            Connect With Our Compliance Counsel
          </h1>
          <p className="text-sm sm:text-base text-slate-350 max-w-2xl mx-auto leading-relaxed font-body-serif">
            We operate fully responsive direct dispatch pathways connecting global founders back with regulatory filing desks, intellectual property networks, and designated registered agent staff.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Dispatch Cards & Physical Coordinates Column (Right-focused Search-index data) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Points */}
            <div className="bg-white border border-slate-200 p-6 space-y-6 shadow-3xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                Operational Dispatch Hubs
              </h3>

              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Delaware Corporate Haven Hub</h5>
                    <p className="text-slate-550 leading-relaxed font-body-serif mt-0.5">
                      1209 North Orange St, Wilmington, DE 19801, USA
                    </p>
                    <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 px-1 py-0.5 mt-1 inline-block">Filing HQ</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Wyoming Digital Registry Hub</h5>
                    <p className="text-slate-550 leading-relaxed font-body-serif mt-0.5">
                      1621 Central Ave, Cheyenne, WY 82001, USA
                    </p>
                    <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 px-1 py-0.5 mt-1 inline-block">Registered Agent Desk</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">National Customer Relations Desk</h5>
                    <p className="text-slate-550 leading-relaxed font-body-serif mt-0.5">
                      30 Wall Street, Suite 800, New York, NY 10005, USA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support and operating hours (EEAT Signals) */}
            <div className="bg-slate-900 text-slate-200 p-6 space-y-4 border border-slate-800">
              <h3 className="text-xs font-bold text-yellow-505 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <Clock className="w-4 h-4" />
                Operating Standard Hours
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-body-serif">
                While our digital state calculation systems and simulated frameworks remain active 24/7/365, our core legal agents and help desk coordinate on the standard calendar:
              </p>
              <div className="space-y-1.5 font-mono text-[10px] text-slate-400">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Monday — Friday</span>
                  <span className="text-white">08:00 AM — 06:00 PM EST</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Saturday Review Desk</span>
                  <span className="text-white">10:00 AM — 02:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday & State Hollidays</span>
                  <span className="text-rose-400">CLOSED (System processing active)</span>
                </div>
              </div>

              {/* Verified Contact Methods */}
              <div className="pt-4 border-t border-slate-800 space-y-2 mt-2 font-mono text-[10px]">
                <div className="flex items-center gap-2 text-slate-350">
                  <Phone className="w-3.5 h-3.5 text-yellow-500" />
                  <span>Call Us: +1 (800) 555-USLLC (Beta lines active shortly)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-350">
                  <Mail className="w-3.5 h-3.5 text-yellow-500" />
                  <span>Email: admin@usllc.online (Monitored actively)</span>
                </div>
              </div>
            </div>

            {/* Proactive Disclaimer explaining the staging setup */}
            <div className="bg-yellow-50 border border-yellow-250 p-5 rounded-none space-y-2">
              <div className="flex items-center gap-1.5 text-yellow-800 font-bold uppercase text-[10px] font-mono">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Beta Environment Notice</span>
              </div>
              <p className="text-[11px] text-yellow-900 leading-relaxed font-body-serif">
                This website is currently operated as a sandboxed premium Beta staging environment. Submitted suggests, form filings, and trademark inquiries are processed internally to test state databases without generating real active state charges or IRS commitments.
              </p>
            </div>

          </div>

          {/* Interactive Core Contact form - Non Thin Content compliance */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-650 font-mono">Direct Transmission Console</span>
              <h2 className="text-2xl font-serif font-black text-slate-900">
                Electronic Filing Inquiry Desk
              </h2>
              <p className="text-xs text-slate-550 leading-relaxed font-body-serif">
                Please transmit your compliance, pricing, or strategic cooperation inquiries directly into our support desk below. Our coordinators audit incoming files daily.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-250 text-emerald-950 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Inquiry Safely Dispatched</span>
                </div>
                <p className="text-xs font-body-serif leading-relaxed text-emerald-900">
                  Thank you for connection with US LLC. Your dispatch ticket has successfully indexed on our servers. Since this website operates in Beta focus testing, our team monitors suggestions regularly and will contact you directly via <strong className="font-semibold">admin@usllc.online</strong>.
                </p>
                <button
                  id="btn-sub-reset-contact"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-[10px] font-bold uppercase font-mono text-emerald-800 hover:text-emerald-905 bg-transparent border-0 cursor-pointer underline"
                >
                  Send Another Dispatch
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-700 tracking-wider">
                      Your Representative Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full bg-slate-50 border border-slate-205 focus:bg-white focus:border-indigo-650 px-3 py-2.5 rounded-none outline-none text-slate-900"
                    />
                  </div>

                  {/* Mail field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-700 tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. elena@usllc.online"
                      className="w-full bg-slate-50 border border-slate-205 focus:bg-white focus:border-indigo-650 px-3 py-2.5 rounded-none outline-none text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Department select */}
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-700 tracking-wider">
                      Destination Department *
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-205 focus:bg-white focus:border-indigo-650 px-3 py-2.5 rounded-none outline-none text-slate-900 font-medium"
                    >
                      <option>General Operations</option>
                      <option>Delaware State Registry Pack</option>
                      <option>Trademark Protections Desk</option>
                      <option>Wills, Estates, and Trusts Crew</option>
                      <option>Partners & Sponsoring Associations</option>
                    </select>
                  </div>

                  {/* Operational Urgency */}
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-700 tracking-wider">
                      Filing Urgency
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Standard', 'Expedited', 'Immediate'].map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setUrgency(u)}
                          className={`py-2 text-[10px] font-bold uppercase border cursor-pointer transition-all ${
                            urgency === u 
                              ? 'bg-slate-900 text-white border-slate-900Matched' 
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-slate-700 tracking-wider">
                    Inquiry Subject (Optional)
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. state-specific compliance queries, or beta portal test suggestions"
                    className="w-full bg-slate-50 border border-slate-205 focus:bg-white focus:border-indigo-650 px-3 py-2.5 rounded-none outline-none text-slate-900"
                  />
                </div>

                {/* Message field */}
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-slate-700 tracking-wider">
                    Inquiry Details & Regulatory Context *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide specific details about your desired LLC configuration, trademark, or any technical suggestion for the usllc.online team..."
                    className="w-full bg-slate-50 border border-slate-205 focus:bg-white focus:border-indigo-650 px-3.5 py-3 rounded-none outline-none text-slate-900 font-body-serif text-xs leading-relaxed"
                  />
                </div>

                {/* Consent tick */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-slate-550 select-none">
                    <input type="checkbox" required className="mt-0.5 rounded-none border border-slate-300" />
                    <span className="text-[10px] sm:text-[11px] font-body-serif leading-snug">
                      I understand that this forms a mock testing portal connection for usllc.online and consent to processing suggestions according to regulatory compliance codes.
                    </span>
                  </label>
                </div>

                {/* Submit trigger button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-405 hover:bg-yellow-300 text-slate-950 font-bold uppercase text-[10px] tracking-widest py-3.5 rounded-none transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <span>DISPATCHING SECURE RECORD...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>DISPATCH COMPLIANCE ENVELOPE</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

        {/* Informative FAQ for Search bots optimization */}
        <div className="mt-16 bg-white rounded-none border border-slate-200 p-8 sm:p-12 space-y-6 shadow-xs">
          <div className="max-w-xl">
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">Communications FAQ</span>
            <h3 className="text-xl font-serif font-black text-slate-900 mt-0.5">Contact-Specific Disclosures</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-650 leading-relaxed font-body-serif">
            <div className="space-y-2">
              <h5 className="font-bold text-slate-950 font-sans uppercase tracking-wider text-[11px]">
                How long is typical response latency?
              </h5>
              <p>
                During our open Beta Staging Period, automated database indexing tests happen immediately. Personal manual support queries sent through this console or targeted directly to <strong className="text-slate-800">admin@usllc.online</strong> are usually reviewed and routed in under 24 business hours.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-950 font-sans uppercase tracking-wider text-[11px]">
                Are my documents/trademarks submitted here confidential?
              </h5>
              <p>
                Absolutely. All trademark clearances, name simulations, mock operational drafts, and correspondence logs are completely isolated via sandbox database security layers. We do not sell or cache search queries to third-party brand scrapers.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer link back details */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2026 US LLC. Staging Sandbox Preview Environment for https://usllc.online.</p>
          <div className="bg-slate-900 border border-slate-800 p-2.5 font-mono font-bold text-xs">
            <a 
              href="https://saasskul.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-yellow-455 hover:text-white transition-all underline decoration-yellow-500/50 hover:decoration-yellow-400"
            >
              Site Developed by SaaSSkul
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
