import React, { useRef, useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import FormationCalculator from './components/FormationCalculator';
import ServiceExplore from './components/ServiceExplore';
import TrademarkSearch from './components/TrademarkSearch';
import ContactForm from './components/ContactForm';
import Login from './components/Login';
import OperationsDashboard from './components/OperationsDashboard';
import UserProfile from './components/UserProfile';
import { SERVICES, TESTIMONIALS } from './data';
import { AuthSession } from './types';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  Scale, 
  ArrowUpRight,
  Sparkles,
  Inbox,
  Lock
} from 'lucide-react';

export default function App() {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  
  const [session, setSession] = useState<AuthSession | null>(() => {
    const saved = localStorage.getItem('us_llc_auth_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fail quietly
      }
    }
    return null;
  });

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigate = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Secure conditional routing rules
  useEffect(() => {
    if (currentPath === '/login' && session) {
      if (session.role === 'admin' || session.role === 'staff') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } else if (currentPath === '/admin') {
      if (!session) {
        navigate('/login');
      } else if (session.role === 'user') {
        navigate('/profile');
      }
    } else if (currentPath === '/profile') {
      if (!session) {
        navigate('/login');
      } else if (session.role === 'admin' || session.role === 'staff') {
        navigate('/admin');
      }
    }
  }, [currentPath, session]);

  const handleLoginSuccess = (newSession: AuthSession) => {
    localStorage.setItem('us_llc_auth_session', JSON.stringify(newSession));
    setSession(newSession);
  };

  const handleLogout = () => {
    localStorage.removeItem('us_llc_auth_session');
    setSession(null);
    navigate('/');
  };

  // Switch rendering based on active secure paths
  if (currentPath === '/login') {
    return (
      <Login 
        onLoginSuccess={handleLoginSuccess} 
        onNavigateHome={() => navigate('/')} 
      />
    );
  }

  if (currentPath === '/admin' && session && (session.role === 'admin' || session.role === 'staff')) {
    return (
      <OperationsDashboard 
        session={session} 
        onLogout={handleLogout} 
        onNavigateHome={() => navigate('/')} 
      />
    );
  }

  if (currentPath === '/profile' && session && session.role === 'user') {
    return (
      <UserProfile 
        session={session} 
        onLogout={handleLogout} 
        onNavigateHome={() => navigate('/')} 
        onEditDraft={() => { navigate('/'); setTimeout(scrollToCalculator, 100); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col text-slate-900 selection:bg-yellow-100 selection:text-slate-950 font-sans" id="app-root">
      
      {/* Top Banner indicating Beta status */}
      <div className="bg-yellow-400 text-slate-950 text-xs py-2 px-4 font-bold text-center border-b border-yellow-500 shadow-sm relative z-50 overflow-hidden" id="beta-test-banner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4">
          <span className="bg-slate-950 text-yellow-400 uppercase text-[9px] px-1.5 py-0.5 rounded tracking-widest font-black">Beta Test Model</span>
          <span>Staging Preview of usllc.online — Launching June 15, 2026. Custom developments by SaaSSkul.</span>
          <a 
            href="#contact" 
            className="underline hover:text-slate-800 text-[11px] font-bold inline-flex items-center gap-0.5"
          >
            <span>Provide Suggestions</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Corporate Header navbar */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-205 py-4 px-6 z-40 transition-shadow hover:shadow-xs" id="app-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo Anchor */}
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center space-x-2.5 group bg-transparent border-0 cursor-pointer text-left" 
            id="logo-branding-link"
          >
            <span className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white transition-all group-hover:bg-slate-800 shadow-inner">
              <Scale className="w-5 h-5 text-yellow-400" />
            </span>
            <div>
              <span className="text-lg font-display font-bold text-slate-900 uppercase tracking-tight">US LLC</span>
              <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-bold font-mono">usllc.online</span>
            </div>
          </button>

          {/* Nav links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-650">
            <button 
              onClick={() => navigate('/')} 
              className="hover:text-slate-900 transition-colors bg-transparent border-0 cursor-pointer font-semibold animate-none"
            >
              Home
            </button>
            <a href="#calculator" className="hover:text-slate-900 transition-colors">Formation Calculator</a>
            <a href="#verticals" className="hover:text-slate-900 transition-colors">Legal Verticals</a>
            <a href="#trademark" className="hover:text-slate-900 transition-colors">Trademark Screen</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Queries & Suggestions</a>
            <a 
              href="https://usllc.online" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-slate-900 transition-colors inline-flex items-center gap-0.5"
            >
              <span>US LLC</span>
              <ArrowUpRight className="w-2.5 h-2.5 text-slate-400" />
            </a>

            {/* Ingress Link Action Router */}
            {!session ? (
              <button 
                onClick={() => navigate('/login')}
                className="text-indigo-650 hover:text-indigo-800 transition-colors bg-transparent border-w cursor-pointer font-bold uppercase tracking-wider text-[11px] flex items-center gap-1 pl-3 border-l border-slate-200"
              >
                <Lock className="w-3 h-3" />
                <span>Portal Login</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
                <button 
                  onClick={() => navigate(session.role === 'user' ? '/profile' : '/admin')}
                  className="text-indigo-650 hover:text-indigo-850 transition-colors bg-transparent border-0 cursor-pointer font-bold uppercase tracking-wider text-[11px]"
                >
                  Workspace ({session.role.toUpperCase()})
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-rose-600 hover:text-rose-700 transition-colors bg-transparent border-0 cursor-pointer font-semibold uppercase tracking-wider text-[10px]"
                >
                  Log Out
                </button>
              </div>
            )}
          </nav>

          {/* Right launch button CTA */}
          <div className="flex items-center space-x-3">
            {!session ? (
              <button
                onClick={scrollToCalculator}
                id="top-nav-btn-quote"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Configure Draft
              </button>
            ) : (
              <button
                onClick={() => navigate(session.role === 'user' ? '/profile' : '/admin')}
                id="top-nav-btn-workspace-header"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-750 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer uppercase tracking-wider"
              >
                My Account
              </button>
            )}
            <span className="text-[10px] bg-slate-150 border border-slate-200 text-slate-650 px-2 py-1 rounded font-bold font-mono">
              BETA
            </span>
          </div>

        </div>
      </header>

      {/* Hero Block with built-in embedded video list support */}
      <section id="hero" className="border-b border-slate-200">
        <HeroSection onStartFormation={scrollToCalculator} />
      </section>

      {/* Main body layouts */}
      <main className="flex-grow space-y-16 pb-16">
        
        {/* Core Value propositions Section */}
        <section className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">Enterprise Foundation System</span>
            <h2 className="text-3xl font-display font-medium text-slate-900 tracking-tight">
              A Complete Suite of Legal & Corporate Frameworks
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto font-body-serif">
              Forming a trade setup online is more than just filling basic sheets. Designed with direct inspiration from LegalZoom corporate models, US LLC provides automated tracking engines to scale, protect, and defend your ventures. 
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12" id="props-board">
            
            <div className="bg-white border border-slate-200 p-5 rounded-none space-y-3 shadow-3xs hover:border-slate-350 transition-colors">
              <span className="p-2 bg-yellow-50 text-indigo-700 rounded-none inline-block">
                <Briefcase className="w-5 h-5" />
              </span>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-sans">Custom Formations</h4>
              <p className="text-xs text-slate-550 leading-relaxed font-body-serif">
                Step-by-step assembly of LLC Articles, C-Corp corporate ledgers, Stock option books, and conflict of interest policies in real-time.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-none space-y-3 shadow-3xs hover:border-slate-350 transition-colors">
              <span className="p-2 bg-indigo-50 text-indigo-700 rounded-none inline-block">
                <MapPin className="w-5 h-5" />
              </span>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-sans">Registered Agent</h4>
              <p className="text-xs text-slate-550 leading-relaxed font-body-serif">
                Legally mandated representation spanning all 50 states. Keep your personal private residence entirely uncoupled from administrative search databases.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-none space-y-3 shadow-3xs hover:border-slate-350 transition-colors">
              <span className="p-2 bg-indigo-50 text-indigo-700 rounded-none inline-block">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-sans">IP Protections</h4>
              <p className="text-xs text-slate-550 leading-relaxed font-body-serif">
                Verify logo registry potential, file copyright deposits with the Library of Congress, and run USPTO brand clearances instantly.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-none space-y-3 shadow-3xs hover:border-slate-350 transition-colors">
              <span className="p-2 bg-indigo-50 text-indigo-750 rounded-none inline-block">
                <FileText className="w-5 h-5" />
              </span>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-sans">Wills & Trusts</h4>
              <p className="text-xs text-slate-550 leading-relaxed font-body-serif">
                Establish revocable trust packages with pour-over testaments to secure families from costly, public state probate hearings.
              </p>
            </div>

          </div>
        </section>

        {/* Formation interactive calculator tool */}
        <section id="calculator" ref={calculatorRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <div className="mb-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">Interactive Setup Sandbox</span>
            <h3 className="text-2xl font-serif font-black text-slate-950 mt-1">Configure Domestic Formations</h3>
          </div>
          <FormationCalculator />
        </section>

        {/* Tabbed Legal zoom inspired verticals explore */}
        <section id="verticals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">Explore Verticals</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-955 tracking-tight">
              LegalZoom-Inspired Service Portfolio
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-body-serif">
              We are scaling usllc.online to accommodate all primary operations sectors. Browse our features, check estimated base costs, and explore the typical process sequence.
            </p>
          </div>

          <ServiceExplore />
        </section>

        {/* Trademark Checker Screen Block */}
        <section id="trademark" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <TrademarkSearch />
        </section>

        {/* Testimonials block */}
        <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">Domestic Feedback</span>
            <h3 className="text-2xl font-serif font-black text-slate-950">Active Founder reviews</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-slate-105 p-6 rounded-none border border-slate-200 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <p className="text-xs text-slate-650 italic leading-relaxed font-body-serif">
                  "{t.quote}"
                </p>
                <div className="flex items-center space-x-3 pt-3 border-t border-slate-200">
                  <div className="h-8 w-8 bg-slate-900 text-yellow-400 rounded-none flex items-center justify-center text-xs font-mono font-bold">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 font-sans">{t.author}</h5>
                    <p className="text-[10px] text-slate-500 font-mono">{t.role} · <span className="font-semibold text-slate-600">{t.location}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Area */}
        <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-none border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-450 font-mono">Frequently Asked Questions</span>
              <h3 className="text-xl font-serif font-black text-slate-900 mt-1">Staging Stage Specific FAQS</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
              <div className="space-y-1.5 p-4 rounded-none bg-slate-50 border border-slate-150">
                <h5 className="font-bold text-slate-900 flex items-center gap-1.5 font-sans">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  Is usllc.online affiliated with LegalZoom.com?
                </h5>
                <p className="leading-relaxed font-body-serif text-slate-550">
                  No. We are entirely independent and inspired by LegalZoom's highly recognized full-spectrum service grids to expand our domestic setup solutions for global founders.
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-none bg-slate-50 border border-slate-150">
                <h5 className="font-bold text-slate-900 flex items-center gap-1.5 font-sans">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  When is the official deployment scheduled?
                </h5>
                <p className="leading-relaxed font-body-serif text-slate-550">
                  The final public system is targeted for launch on <strong className="text-slate-800">15th June, 2026</strong>. This preview stages static responsive structures, stateful pricing simulators, and sandbox feedback tickets.
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-none bg-slate-50 border border-slate-150">
                <h5 className="font-bold text-slate-900 flex items-center gap-1.5 font-sans">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  How does the embedded media frame operate?
                </h5>
                <p className="leading-relaxed font-body-serif text-slate-550">
                  You can paste arbitrary YouTube links or direct image resources in our custom builder at the bottom of the hero block. It allows live rendering inside our unified responsive player.
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-none bg-slate-50 border border-slate-150">
                <h5 className="font-bold text-slate-900 flex items-center gap-1.5 font-sans">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  Can I submit suggestions during this Beta preview?
                </h5>
                <p className="leading-relaxed font-body-serif text-slate-550">
                  Yes, definitely. Please submit suggestions in the form below or drop directly an message email transmission targeting <strong className="text-slate-800">admin@usllc.online</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact form Queries and suggestions */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <ContactForm />
        </section>

      </main>

      {/* Corporate Footer containing the SaaSSkul citation */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 pt-12 pb-8 px-6" id="app-footer">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-850">
            {/* Col 1: Brand description snippet */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-none bg-white flex items-center justify-center">
                  <Scale className="w-4 h-4 text-slate-950" />
                </span>
                <span className="text-base font-serif font-black text-white tracking-wide">US LLC</span>
              </div>
              <p className="text-[11px] text-slate-405 leading-relaxed font-body-serif">
                Your future portal for holistic incorporation, intellectual property clearances, Wills, Trusts, and state maintenance tasks.
              </p>
              <div className="text-[10px] bg-slate-900 text-yellow-500 p-2.5 rounded-none border border-slate-800 font-mono inline-block">
                <span>⚡️ website in Beta Focus Test Model</span>
              </div>
            </div>

            {/* Col 2: Legal Zoom Verticals references */}
            <div className="space-y-3">
              <h5 className="text-[11px] font-bold tracking-wider uppercase text-yellow-500 font-mono">Corporate Verticals</h5>
              <ul className="space-y-1.5 text-xs text-slate-400 font-body-serif">
                <li><a href="#verticals" className="hover:text-yellow-400 transition-colors">LLC Formation Pack</a></li>
                <li><a href="#verticals" className="hover:text-yellow-400 transition-colors">C-Corp Multi-Shareholder</a></li>
                <li><a href="#verticals" className="hover:text-yellow-400 transition-colors">Registered Agent Services</a></li>
                <li><a href="#verticals" className="hover:text-yellow-400 transition-colors">Corporate Tax filing (S-Corp)</a></li>
              </ul>
            </div>

            {/* Col 3: Protection verticals references */}
            <div className="space-y-3">
              <h5 className="text-[11px] font-bold tracking-wider uppercase text-yellow-500 font-mono">Brand & Estate</h5>
              <ul className="space-y-1.5 text-xs text-slate-400 font-body-serif">
                <li><a href="#trademark" className="hover:text-yellow-400 transition-colors">Trademark Screen Checking</a></li>
                <li><a href="#verticals" className="hover:text-yellow-400 transition-colors">Copyright Filing Vault</a></li>
                <li><a href="#verticals" className="hover:text-yellow-400 transition-colors">Living Wills & Family Trusts</a></li>
                <li><a href="#calculator" className="hover:text-yellow-400 transition-colors">50-State Fee Lookup matrix</a></li>
              </ul>
            </div>

            {/* Col 4: Reach Info and SaaSSkul details */}
            <div className="space-y-3">
              <h5 className="text-[11px] font-bold tracking-wider uppercase text-yellow-500 font-mono">Support Communications</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed font-body-serif">
                For prompt suggestion reviews, email our core team at support:
              </p>
              <div className="space-y-1 text-slate-300 font-mono text-xs">
                <a href="mailto:admin@usllc.online" className="block text-yellow-400 hover:underline">
                  admin@usllc.online
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright line and developers detail */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            
            <div className="text-center sm:text-left space-y-1 font-body-serif">
              <p>© 2026 US LLC. Staging Sandbox Preview Environment for https://usllc.online.</p>
              <p>
                All elements represented correspond to Beta-phase specifications launching on{' '}
                <strong className="text-yellow-500 font-medium font-mono">15th June, 2026</strong>.
              </p>
            </div>

            <div className="text-center sm:text-right bg-slate-900 border border-slate-800 p-3 rounded-none font-mono font-bold">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Developer Context</p>
              <p className="text-xs text-slate-300 mt-1">
                <a 
                  href="https://saasskul.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-yellow-455 hover:text-white transition-all underline decoration-yellow-500/50 hover:decoration-yellow-400"
                >
                  Site Developed by SaaSSkul
                </a>
              </p>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}
