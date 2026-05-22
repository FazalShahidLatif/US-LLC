import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { Mail, MessageSquare, Send, CheckCircle2, History, Trash2, ArrowUpRight } from 'lucide-react';

export default function ContactForm() {
  const STORAGE_KEY = 'us_llc_contacts_v1';
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('LLC Formation Question');
  const [message, setMessage] = useState<string>('');
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        // silent fail
      }
    }
  }, []);

  const saveInquiries = (items: Inquiry[]) => {
    setInquiries(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('All fields are mandatory to place feedback/queries.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg('Please input a proper active email Address.');
      return;
    }

    const newInquiry: Inquiry = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      subject,
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newInquiry, ...inquiries];
    saveInquiries(updated);

    setName('');
    setEmail('');
    setMessage('');
    setSuccessMsg('Your support/suggestion ticket has been recorded in the local Beta sandbox!');
  };

  const handleClearSingle = (id: string) => {
    const filtered = inquiries.filter(item => item.id !== id);
    saveInquiries(filtered);
  };

  const handleClearAll = () => {
    saveInquiries([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="contact-form-widget">
      
      {/* Contact Form input sheet (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-none border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">Contact & Support Desk</span>
          <h4 className="text-xl font-serif font-black text-slate-900 mt-1">Queries & Suggestions</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed font-body-serif">
            Have questions regarding the US LLC platform architecture, our upcoming state APIs, or SaaSSkul launch protocols? Drop us a line. We also actively audit incoming requests via <strong className="text-slate-800">support@saasskul.com</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-450 mb-1">Your Full Name</label>
              <input
                id="input-contact-name"
                type="text"
                placeholder="e.g. Elena Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs rounded-none bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-650 transition-all px-3.5 py-3 focus:outline-none focus:ring-0"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-450 mb-1">Your Correspondence Email</label>
              <input
                id="input-contact-email"
                type="email"
                placeholder="e.g. elena@saasskul.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs rounded-none bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-650 transition-all px-3.5 py-3 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-450 mb-1">Subject Matter</label>
            <select
              id="select-contact-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xs rounded-none bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-650 transition-all px-3.5 py-3 focus:outline-none text-slate-800 font-semibold"
            >
              <option value="LLC Formation Question">LLC Formation Process Question</option>
              <option value="Legalzoom Vertical Comparison">Legalzoom Vertical Comparison Suggestion</option>
              <option value="SaaSSkul Partnership">SaaSSkul Partnership / Integration</option>
              <option value="Beta System Bug or Typo">Beta System Bug / Technical Typo</option>
              <option value="Other Suggestion">Other Suggestion / Feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-450 mb-1">Detailed Inquiry & suggestion Message</label>
            <textarea
              id="textarea-contact-message"
              rows={4}
              placeholder="State your feedback, question, or suggestions. We will aggregate this during the Beta phase."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-xs rounded-none bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-650 transition-all px-3.5 py-3 focus:outline-none resize-none focus:ring-0"
            ></textarea>
          </div>

          {errorMsg && (
            <p id="p-contact-error" className="text-xs text-rose-800 bg-rose-50/50 p-2.5 rounded-none border border-rose-200 font-body-serif font-bold">
              ⚠️ {errorMsg}
            </p>
          )}

          {successMsg && (
            <div id="div-contact-success" className="p-3 bg-emerald-50/50 border border-emerald-200 text-emerald-950 rounded-none text-xs flex items-center gap-2 font-body-serif">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              id="btn-submit-contact"
              type="submit"
              className="px-5 py-3 bg-slate-900 border border-slate-900 hover:bg-indigo-755 text-white text-[10px] font-bold uppercase tracking-widest rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Transmit Suggestion Desk</span>
            </button>
          </div>

        </form>
      </div>

      {/* Staged local tickets inbox tracker container (5 cols) */}
      <div className="lg:col-span-5 bg-slate-50 p-6 rounded-none border border-slate-200 flex flex-col justify-between" id="tickets-history-wrapper">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h5 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 font-mono">
              <History className="w-4 h-4 text-slate-650" />
              Beta Ticket Log (Sandbox)
            </h5>
            {inquiries.length > 0 && (
              <button
                id="btn-clear-all-tickets"
                onClick={handleClearAll}
                className="text-[9px] text-slate-400 hover:text-rose-600 hover:underline flex items-center gap-1 cursor-pointer font-bold uppercase tracking-wider"
              >
                <Trash2 className="w-3 h-3" />
                <span>Wipe Staged</span>
              </button>
            )}
          </div>

          {/* List of staged inquiries */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                id={`ticket-card-${inq.id}`}
                className="bg-white p-3.5 rounded-none border border-slate-200 relative group shadow-2xs hover:border-slate-350 transition-all text-xs"
              >
                <button
                  id={`btn-delete-ticket-${inq.id}`}
                  onClick={() => handleClearSingle(inq.id)}
                  className="absolute right-3 top-3 text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 cursor-pointer"
                  title="Remove local ticket"
                >
                  ✕
                </button>

                <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-100">
                  <span className="text-[9px] text-slate-400 font-semibold font-mono">{inq.timestamp} — {inq.name}</span>
                  <span className="text-[8px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-none uppercase font-bold">Staged</span>
                </div>

                <p className="text-xs font-bold text-slate-900 font-sans">{inq.subject}</p>
                <p className="text-[11px] text-slate-500 leading-normal mt-1 italic font-body-serif">"{inq.message}"</p>
                
                <div className="mt-2 text-[9px] text-slate-400 font-mono">
                  <span>Contact: {inq.email}</span>
                </div>
              </div>
            ))}

            {inquiries.length === 0 && (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-350" />
                <p className="text-xs font-bold uppercase tracking-wide text-slate-600">No staged inquiries</p>
                <p className="text-[10px] text-slate-450 leading-normal max-w-sm mx-auto p-1 text-center font-body-serif">
                  Fill in the feedback form on the left! It will add logs to local storage to demonstrate full sandbox state pipeline compatibility.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SaaSSkul launch banner indicator info */}
        <div className="mt-6 pt-5 border-t border-slate-200 bg-slate-100/40 p-3 rounded-none border border-slate-200">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-800 font-bold uppercase tracking-wider text-[10px] font-mono">Vercel Launch Status</span>
            <span className="text-[9px] bg-slate-900 border border-slate-800 text-white font-bold px-2 py-0.5 rounded-none font-mono">PRE-INTEGRATED</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-normal mt-1.5 font-body-serif">
            This module represents stateful form transmission. Our code contains zero back-end endpoints which guarantees simple hosting setups on standard global Vercel clusters.
          </p>
          <a
            href="https://saasskul.com"
            target="_blank"
            rel="noreferrer"
            className="text-[9px] text-slate-700 hover:text-indigo-650 font-bold block mt-2 hover:underline inline-flex items-center gap-0.5 uppercase tracking-wider font-mono"
          >
            <span>Learn about SaaSSkul Solutions</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </a>
        </div>

      </div>

    </div>
  );
}
