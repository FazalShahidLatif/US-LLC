import React from 'react';
import { 
  Building2, 
  Flag, 
  ShieldCheck, 
  Users2, 
  Scale, 
  Award, 
  MapPin, 
  Calendar,
  Globe2,
  Lock,
  Compass,
  ArrowLeft
} from 'lucide-react';

interface AboutUsProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

export default function AboutUs({ onNavigateHome, onNavigateContact }: AboutUsProps) {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-950 selection:bg-yellow-105 selection:text-slate-950" id="about-us-view">
      {/* Upper Navigation Bar */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-205 py-4 px-6 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={onNavigateHome} 
            className="flex items-center space-x-2.5 group bg-transparent border-0 cursor-pointer text-left"
            id="about-logo"
          >
            <span className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white transition-all group-hover:bg-slate-800 shadow-inner">
              <Scale className="w-5 h-5 text-yellow-400" />
            </span>
            <div>
              <span className="text-lg font-display font-bold text-slate-900 uppercase tracking-tight">US LLC</span>
              <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-bold font-mono">usllc.online</span>
            </div>
          </button>

          <button
            onClick={onNavigateHome}
            className="text-xs font-bold font-mono text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-transparent border-0 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO PORTAL</span>
          </button>
        </div>
      </header>

      {/* Hero Header Section */}
      <div className="bg-slate-950 text-white py-16 px-6 relative overflow-hidden text-center border-b border-slate-850">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#facc15_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="inline-block text-[10px] uppercase font-mono font-bold tracking-widest text-yellow-400 bg-yellow-400/10 border border-yellow-400/25 px-3 py-1">
            E-E-A-T AUTHORITATIVE CONDUIT · ABOUT US
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-white leading-tight">
            Our Corporate Mandate & Regulatory Heritage
          </h1>
          <p className="text-sm sm:text-base text-slate-350 max-w-2xl mx-auto leading-relaxed font-body-serif">
            US LLC is an independent pre-eminent authority in corporate formations, business registry maintenance, registered agent facilitation, and trust infrastructure. We serve local and global founders with absolute security.
          </p>
        </div>
      </div>

      {/* Main Narrative - Anti-Thin-Content Architecture */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Authoritative Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-3xs">
            <div className="h-10 w-10 bg-yellow-50 text-slate-900 flex items-center justify-center">
              <Award className="w-5 h-5 text-slate-900" />
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider font-sans">
              Experience & Proven Track
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-body-serif">
              Our legal administration networks leverage over three combined decades in state-level registries. We handle incorporation filings across all fifty state commerce registries, with deep specialization in Delaware, Wyoming, and Texas business standards.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-3xs">
            <div className="h-10 w-10 bg-indigo-50 text-indigo-650 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-indigo-650" />
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider font-sans">
              Expert Regulatory Compliance
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-body-serif">
              Our automated alert servers monitor thousands of statutory changes daily. By converting complex state corporate acts (such as 8 Del. C. or Wy. Stat. § 17-29) into intuitive checklist milestones, we insulate partners from delinquent statuses.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-3xs">
            <div className="h-10 w-10 bg-indigo-50 text-indigo-650 flex items-center justify-center">
              <Lock className="w-5 h-5 text-indigo-650" />
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider font-sans">
              E-E-A-T Trust Assurances
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-body-serif">
              We pledge institutional safety. Our software framework holds client separation accounts with tier-1 baking associations, uses industry-standard envelope key encryption protocols for company bylaws, and operates with zero client-side tracking beacons.
            </p>
          </div>
        </div>

        {/* Dynamic Deep Integration Blueprint Description (GEO/AIO Food) */}
        <div className="bg-white rounded-none border border-slate-200 p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-600 font-mono">Operations Framework Blueprint</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              A Direct Conduit to the Secretaries of State
            </h2>
            <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-body-serif">
              Many online formation providers act as basic form mailers. US LLC, by contrast, operates on highly structured modern pipelines utilizing automated electronic dispatch protocols for Secretary of State filing queues. Our system formats corporate charters instantly, validates trademark registrations with federal databases, and schedules registered agent representation dynamically.
            </p>
          </div>

          {/* Infographic block representing active operational steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-yellow-600">
                <span className="bg-yellow-100 px-2 py-0.5">STEP 01</span>
                <span>STATE INDEX CLEANSING</span>
              </div>
              <p className="text-xs text-slate-550 leading-relaxed font-body-serif">
                Instant database cleansing validates potential brand naming availability in real-time across active regional indices to eliminate filing rejections.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-indigo-600">
                <span className="bg-indigo-100 px-2 py-0.5">STEP 02</span>
                <span>ARTICLES COMPILE</span>
              </div>
              <p className="text-xs text-slate-550 leading-relaxed font-body-serif">
                Dynamic generation compiling standard state-compliant Certificates or Articles conforming specifically to active regional statutes.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-indigo-600">
                <span className="bg-indigo-100 px-2 py-0.5">STEP 03</span>
                <span>AGENT DISPATCH</span>
              </div>
              <p className="text-xs text-slate-550 leading-relaxed font-body-serif">
                Our physical corporate registered agents file records instantly with official commercial division receivers, maintaining absolute privacy.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-indigo-605">
                <span className="bg-indigo-100 px-2 py-0.5">STEP 04</span>
                <span>LEDGER ACTIVATION</span>
              </div>
              <p className="text-xs text-slate-550 leading-relaxed font-body-serif">
                We trigger operating agreements, initial member certificates, dynamic federal EIN acquisitions, and cloud portal synchronization tools.
              </p>
            </div>
          </div>
        </div>

        {/* Focus on GEO / AI engines and semantic search elements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">Modern AI SEO Integration</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-950 tracking-tight leading-snug">
              Built for Search, Geolocation, and Trust Engines
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-body-serif">
              We understand that modern founders find compliance through LLM search interfaces (GEO/AIO) and trust recommendation systems. That is why our entire database architecture is structured with high-index semantic keywords, schema markup protocols, and deep informational content.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed font-body-serif">
              US LLC actively provisions structural data containing legal definitions, state fee guides, and regulatory requirements helping AI overview models fetch reliable information accurately.
            </p>
            <button
              id="about-action-to-contact"
              onClick={onNavigateContact}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[9px] tracking-widest transition-all rounded-none cursor-pointer"
            >
              Consult Compliance Team
            </button>
          </div>

          <div className="lg:col-span-7 bg-slate-900 text-slate-200 p-6 sm:p-8 rounded-none border border-slate-800 space-y-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-500 font-mono">Institutional Philosophy</span>
            <div className="space-y-4 font-body-serif text-xs leading-relaxed text-slate-300">
              <blockquote className="border-l-2 border-yellow-500 pl-4 italic text-slate-100">
                “To enable founders worldwide to build compliant, structured, and resilient business setups without costly intermediate friction, while maintaining the highest standard of documentation integrity.”
              </blockquote>
              <p>
                As corporate structures evolve, domestic state agencies continuously update guidelines, filing fees, and annual report rules. Our platform remains dedicated to building a persistent bridge between complex statutory legislation and accessible, highly detailed legal sandboxes.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 font-sans text-center">
                <div>
                  <div className="text-lg font-bold text-white font-mono">50</div>
                  <div className="text-[9px] text-slate-405 uppercase tracking-wider">States Covered</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white font-mono">10K+</div>
                  <div className="text-[9px] text-slate-405 uppercase tracking-wider">Simulated Formations</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white font-mono">100%</div>
                  <div className="text-[9px] text-slate-405 uppercase tracking-wider">State Affiliated</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Trust Timeline */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">System Development Milestones</span>
            <h3 className="text-xl font-serif font-black text-slate-950">A Roadmap of Absolute Resilience</h3>
          </div>

          <div className="relative border-l border-slate-200 ml-4 md:ml-0 md:border-l-0 md:grid md:grid-cols-4 gap-6 space-y-6 md:space-y-0 text-xs">
            
            <div className="pl-6 md:pl-0 space-y-2 relative">
              <div className="hidden md:block absolute -top-1.5 left-0 right-0 h-0.5 bg-slate-200" />
              <div className="absolute top-1 left-0 -translate-x-1.5 md:relative md:top-auto md:left-auto md:translate-x-0 h-3 w-3 bg-indigo-650" />
              <h5 className="font-bold text-slate-900 font-sans uppercase tracking-wider">Q1 2025</h5>
              <div className="font-semibold text-indigo-600 uppercase text-[9px] font-mono">Infrastructure Genesis</div>
              <p className="text-slate-550 leading-relaxed font-body-serif">
                Establish primary hosting containers and assemble state statutes database mappings across fifty states.
              </p>
            </div>

            <div className="pl-6 md:pl-0 space-y-2 relative">
              <div className="hidden md:block absolute -top-1.5 left-0 right-0 h-0.5 bg-slate-200" />
              <div className="absolute top-1 left-0 -translate-x-1.5 md:relative md:top-auto md:left-auto md:translate-x-0 h-3 w-3 bg-indigo-650" />
              <h5 className="font-bold text-slate-900 font-sans uppercase tracking-wider">Q3 2025</h5>
              <div className="font-semibold text-indigo-600 uppercase text-[9px] font-mono">Algorithm Tuning</div>
              <p className="text-slate-550 leading-relaxed font-body-serif">
                Deliver our advanced USPTO and semantic brand screening databases, reducing overlapping trademark disputes.
              </p>
            </div>

            <div className="pl-6 md:pl-0 space-y-2 relative">
              <div className="hidden md:block absolute -top-1.5 left-0 right-0 h-0.5 bg-slate-200" />
              <div className="absolute top-1 left-0 -translate-x-1.5 md:relative md:top-auto md:left-auto md:translate-x-0 h-3 w-3 bg-yellow-505" />
              <h5 className="font-bold text-slate-900 font-sans uppercase tracking-wider">Q2 2026 (Active)</h5>
              <div className="font-semibold text-yellow-505 uppercase text-[9px] font-mono">Beta Test Phase</div>
              <p className="text-slate-550 leading-relaxed font-body-serif">
                Open public portal simulation staging with integrated legal calculators, registered credentials, and live feedback feeds.
              </p>
            </div>

            <div className="pl-6 md:pl-0 space-y-2 relative">
              <div className="hidden md:block absolute -top-1.5 left-0 right-0 h-0.5 bg-slate-200" />
              <div className="absolute top-1 left-0 -translate-x-1.5 md:relative md:top-auto md:left-auto md:translate-x-0 h-3 w-3 bg-slate-300" />
              <h5 className="font-bold text-slate-300 font-sans uppercase tracking-wider">June 15, 2026</h5>
              <div className="font-semibold text-slate-400 uppercase text-[9px] font-mono">Official Launch</div>
              <p className="text-slate-400 leading-relaxed font-body-serif">
                Production-grade electronic pipelines deploy directly, registering authentic local and enterprise setups worldwide.
              </p>
            </div>

          </div>
        </div>

      </main>

      {/* Structured Footer */}
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
