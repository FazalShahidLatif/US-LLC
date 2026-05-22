import React, { useState } from 'react';
import { SERVICES } from '../data';
import { ShieldCheck, BookOpen, Scale, Award, Info, Search, Sparkles } from 'lucide-react';
import { Service } from '../types';

export default function ServiceExplore() {
  const [activeTab, setActiveTab] = useState<'all' | 'formation' | 'compliance' | 'ip' | 'personal'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Filter criteria
  const filteredServices = SERVICES.filter(service => {
    const matchesTab = activeTab === 'all' || service.category === activeTab;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Verticals', icon: Scale },
    { id: 'formation', label: 'Business Formation', icon: Sparkles },
    { id: 'compliance', label: 'Compliance & Agent', icon: ShieldCheck },
    { id: 'ip', label: 'Intellectual Property', icon: Award },
    { id: 'personal', label: 'Personal & Estate Wills', icon: BookOpen }
  ];

  return (
    <div className="space-y-8" id="explore-verticals-widget">
      
      {/* Category selector and filter controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-none border border-slate-200 shadow-sm">
        
        {/* Dynamic Category Tabs */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none w-full md:w-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                id={`btn-service-tab-${cat.id}`}
                onClick={() => {
                  setActiveTab(cat.id as any);
                  setSelectedService(null);
                }}
                className={`flex items-center space-x-1.5 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-none transition-all ${
                  activeTab === cat.id
                    ? 'bg-slate-900 border border-slate-900 text-white'
                    : 'bg-slate-50 border border-slate-200 text-slate-650 hover:bg-indigo-50 hover:text-indigo-950'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Global verticals Search input */}
        <div className="relative w-full md:w-64 max-w-full">
          <input
            id="input-services-search"
            type="text"
            placeholder="Search all services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs rounded-none bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-650 transition-all pl-9 pr-3 py-2.5 focus:outline-none focus:ring-0"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
        </div>

      </div>

      {/* Main Grid display of services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid-pane">
        {filteredServices.map((service) => {
          return (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white border border-slate-200 hover:border-indigo-600 rounded-none p-5 flex flex-col justify-between transition-all hover:shadow-md relative overflow-hidden group"
            >
              <div>
                {/* Header elements with category tags */}
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase font-mono">
                    {service.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-none border border-indigo-100">
                    Est. Base Fee: ${service.basePrice}
                  </span>
                </div>

                <h4 className="text-base font-serif font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-all">
                  {service.title}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed font-body-serif">
                  {service.description}
                </p>

                {/* Bullets feature preview */}
                <div className="space-y-2 mb-4">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">Included Features</p>
                  <ul className="space-y-1">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center text-slate-655 text-xs truncate">
                        <span className="w-1.5 h-1.5 bg-indigo-600 mr-2 rounded-none flex-shrink-0"></span>
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-[10px] text-slate-400 font-bold italic font-body-serif pl-3.5">
                        + {service.features.length - 3} additional features
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Card Footer action button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                <button
                  id={`btn-service-learn-${service.id}`}
                  onClick={() => setSelectedService(service)}
                  className="text-[10px] font-bold uppercase tracking-wider text-slate-900 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-4 h-4 text-slate-400" />
                  <span>Learn Legal Process</span>
                </button>
                
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                  BETA PREPARED
                </span>
              </div>
            </div>
          );
        })}

        {filteredServices.length === 0 && (
          <div className="col-span-full bg-slate-50 p-12 text-center rounded-none border border-slate-200">
            <p className="text-sm font-bold text-slate-800 uppercase tracking-wide">No service verticals match your keyword query</p>
            <p className="text-xs text-slate-450 mt-1 font-body-serif">Try resetting the selection active tab or adjust your keyword search phrases.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="mt-4 px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-slate-900 text-white rounded-none hover:bg-slate-800 cursor-pointer"
            >
              Clear Search filters
            </button>
          </div>
        )}
      </div>

      {/* Learn Legal Process Modal / Side sheet */}
      {selectedService && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="service-detail-modal">
          <div className="bg-white rounded-none w-full max-w-2xl overflow-hidden border border-slate-905 shadow-2xl flex flex-col max-h-[85vh]">
            
            {/* Modal Heading block */}
            <div className="p-6 bg-indigo-950 text-white flex justify-between items-start border-b border-indigo-900">
              <div>
                <span className="text-[9px] font-bold tracking-widest uppercase font-mono text-indigo-300">LegalZoom-Inspired Vertical Guide</span>
                <h4 className="text-xl font-serif font-black text-white mt-1">{selectedService.title}</h4>
              </div>
              <button
                id="btn-close-service-modal"
                onClick={() => setSelectedService(null)}
                className="text-indigo-200 hover:text-white bg-indigo-900/80 hover:bg-indigo-900 border border-indigo-800 px-3 py-1.5 rounded-none text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Box Info highlight */}
              <div>
                <p className="text-sm text-slate-650 leading-relaxed italic font-body-serif">
                  "{selectedService.description}"
                </p>
                <p className="text-xs font-bold font-mono text-indigo-800 bg-indigo-50 border border-indigo-100 flex items-center justify-center mt-3 py-2 rounded-none">
                  Estimated Base Package Price: ${selectedService.basePrice} (Excludes State Administrative filings)
                </p>
              </div>

              {/* Core Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 p-4 rounded-none bg-indigo-50/20 border border-indigo-100">
                  <h5 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    Essential Legal Benefits
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-body-serif leading-relaxed">
                    {selectedService.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-indigo-600 font-bold mr-1.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 p-4 rounded-none bg-slate-50 border border-slate-200">
                  <h5 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                    <Award className="w-4 h-4 text-slate-700" />
                    Full Manifest Checklist
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-650 font-body-serif leading-relaxed">
                    {selectedService.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-slate-800 font-bold mr-1.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Process Step by Step */}
              <div className="space-y-3 pt-2">
                <h5 className="text-xs font-bold text-slate-955 uppercase tracking-widest font-mono">
                  Typical Process Journey (US LLC Framework)
                </h5>
                <div className="relative border-l border-slate-200 ml-3 pl-5 space-y-4 text-xs">
                  {selectedService.processSteps.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Numeric step ball */}
                      <span className="absolute -left-[31px] top-0 flex h-5 w-5 items-center justify-center rounded-none bg-slate-900 text-[9px] text-white font-mono font-bold">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-slate-850 pl-1 font-body-serif leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal foot controls */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 rounded-none">
              <button
                id="btn-modal-dismiss-bottom"
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-none cursor-pointer transition-all"
              >
                Go Back
              </button>
              <a
                href="#calculator"
                id="btn-modal-configure-trigger"
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-750 text-white text-[10px] font-bold uppercase tracking-widest rounded-none cursor-pointer transition-all text-center block"
              >
                Configure in Estimator
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
