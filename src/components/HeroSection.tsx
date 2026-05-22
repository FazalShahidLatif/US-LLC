import React, { useState } from 'react';
import { Play, Image as ImageIcon, Video, Youtube, CheckCircle, ArrowRight } from 'lucide-react';
import { MediaConfig } from '../types';

interface HeroSectionProps {
  onStartFormation?: () => void;
}

export default function HeroSection({ onStartFormation }: HeroSectionProps) {
  // Demo media configs that users can select to see the capabilities
  const initialMediaList: MediaConfig[] = [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
      title: 'US LLC Premium Legal Studio'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Rickroll or sample explainer
      title: 'How to form an LLC (YouTube Video)'
    },
    {
      type: 'youtube', // Optional custom template Youtube
      url: 'https://www.youtube.com/embed/gU9H2y_Rnd0',
      title: 'Vercel Deployment Explainer'
    },
    {
      type: 'custom_url',
      url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200',
      title: 'Global Client Onboarding (Google Photos Placeholder)'
    }
  ];

  const [mediaList, setMediaList] = useState<MediaConfig[]>(initialMediaList);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [customType, setCustomType] = useState<'image' | 'youtube' | 'custom_url'>('image');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');

  const currentMedia = mediaList[activeMediaIndex];

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl) return;

    // Normalize Youtube link to embed URL if possible
    let finalUrl = customUrl;
    if (customType === 'youtube') {
      if (customUrl.includes('youtube.com/watch?v=')) {
        const videoId = customUrl.split('v=')[1]?.split('&')[0];
        if (videoId) finalUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (customUrl.includes('youtu.be/')) {
        const videoId = customUrl.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) finalUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    const newMedia: MediaConfig = {
      type: customType,
      url: finalUrl,
      title: customTitle || 'Custom Embedded Media Asset'
    };

    setMediaList([...mediaList, newMedia]);
    setActiveMediaIndex(mediaList.length);
    setCustomUrl('');
    setCustomTitle('');
    setShowEditor(false);
  };

  return (
    <div className="relative bg-white border-b border-slate-200 text-slate-900 overflow-hidden py-16 px-4 sm:px-6 lg:px-8 xl:py-24" id="hero-main">
      {/* Decorative Editorial Watermark Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-12 left-12 w-64 h-64 rounded-full bg-indigo-200 blur-3xl"></div>
        <div className="absolute bottom-12 right-12 w-80 h-80 rounded-full bg-slate-300 blur-3xl"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1e2a4a 1px, transparent 0)', backgroundSize: '32px 32px', opacity: 0.15 }}></div>
      </div>

      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-12 items-center relative z-10">
        
        {/* Hero Copy (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 py-1 px-3 w-fit text-[10px] font-bold uppercase tracking-widest text-indigo-700">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span>Beta Preview Model — Launching June 15, 2026</span>
          </div>

          <div className="text-indigo-600 font-serif italic text-lg sm:text-xl">Premium Legal Solutions</div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-slate-900 leading-[1.05]">
            US LLC <br />
            <span className="text-indigo-600 underline underline-offset-4 decoration-2 italic">
              Launch & Shield
            </span> <br />
            Your Enterprise.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl font-body-serif leading-relaxed">
            We are expanding to coordinate LLC formation, complex C-Corp cap structures, trademarks, global compliance, and trusts. Fully compatible with modern founders.
          </p>

          <ul className="space-y-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <li className="flex items-center space-x-2.5">
              <span className="h-1.5 w-6 bg-indigo-600 flex-shrink-0"></span>
              <span>Full legal zoom vertical expansion model ready for review</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <span className="h-1.5 w-6 bg-slate-300 flex-shrink-0"></span>
              <span>Interactive 50-State fee matrix and formation tool</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <span className="h-1.5 w-6 bg-slate-300 flex-shrink-0"></span>
              <span>Google Photo & YouTube digital media asset host platform</span>
            </li>
          </ul>

          <div className="flex gap-6 py-2 border-t border-b border-slate-100 max-w-md">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">Current Phase</span>
              <span className="text-xs font-bold text-slate-800">Development v0.8.4</span>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">Project Code</span>
              <span className="text-xs font-bold uppercase text-slate-800">USLLC-2026</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onStartFormation}
              id="btn-hero-launch"
              className="px-6 py-3 bg-slate-900 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 group shrink-0 active:scale-95"
            >
              <span>Build My Company</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#verticals"
              id="lnk-hero-services"
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-850 border border-slate-200 hover:border-slate-350 font-bold text-xs uppercase tracking-widest transition-all shrink-0 text-center"
            >
              Explore Legal Verticals
            </a>
          </div>
        </div>

        {/* Multi-Format Bold Host Player (7 columns) */}
        <div className="lg:col-span-7 mt-12 lg:mt-0" id="hero-media-wrapper">
          <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-md relative">
            
            {/* Header with video/photo tags and source selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-150">
              <div className="flex items-center space-x-2.5">
                <span className="p-1.5 bg-slate-100 text-indigo-600">
                  {currentMedia.type === 'youtube' && <Youtube className="w-4 h-4" />}
                  {currentMedia.type === 'image' && <ImageIcon className="w-4 h-4" />}
                  {currentMedia.type === 'custom_url' && <Video className="w-4 h-4" />}
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 line-clamp-1">
                    {currentMedia.title}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400">
                    Active Hero Media Block: {currentMedia.type.toUpperCase()} Mode
                  </p>
                </div>
              </div>

              {/* Quick Preset Selector */}
              <div className="flex flex-wrap gap-1">
                {mediaList.map((m, idx) => (
                  <button
                    key={idx}
                    id={`btn-media-preset-${idx}`}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
                      activeMediaIndex === idx
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    Preset {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Stage Display */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-50 mt-4 border border-slate-200/80">
              {currentMedia.type === 'youtube' ? (
                <iframe
                  id="iframe-youtube-player"
                  className="absolute inset-0 w-full h-full"
                  src={currentMedia.url}
                  title={currentMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  id="img-hero-photo"
                  src={currentMedia.url}
                  alt={currentMedia.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-opacity duration-500"
                  onError={(e) => {
                    // Fallback if broken url is specified
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200';
                  }}
                />
              )}
            </div>

            {/* Custom URL Input Controls for Embedding Videos and Photos */}
            <div className="mt-4 pt-4 border-t border-slate-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
              <div>
                <p className="text-xs text-slate-600 leading-relaxed font-body-serif">
                  💡 <span className="font-bold text-indigo-600 font-serif italic">Embed Demonstration:</span> Change the spotlight asset above to load custom YouTube formats.
                </p>
              </div>

              <button
                id="btn-toggle-hero-editor"
                onClick={() => setShowEditor(!showEditor)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-wider border border-slate-200 transition-all shrink-0 cursor-pointer text-center w-full sm:w-auto"
              >
                {showEditor ? 'Cancel' : 'Embed Custom Asset'}
              </button>
            </div>

            {/* Dynamic Custom Integration Panel */}
            {showEditor && (
              <form onSubmit={handleAddMedia} className="mt-4 p-4 bg-slate-50 border border-slate-200 text-slate-800 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-700">Introduce Custom Video or Image Stream</h5>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-1">Asset Category</label>
                    <select
                      id="select-media-category"
                      value={customType}
                      onChange={(e) => setCustomType(e.target.value as any)}
                      className="w-full text-xs rounded-none bg-white border border-slate-200 px-2.5 py-2 focus:outline-none focus:border-indigo-600 text-slate-800 font-semibold"
                    >
                      <option value="image">Still Photo / Banner</option>
                      <option value="youtube">Youtube Video Embed</option>
                      <option value="custom_url">Direct Video/Google Photos URL</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-1">Asset URL</label>
                    <input
                      id="input-media-url"
                      type="text"
                      placeholder={customType === 'youtube' ? 'e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ' : 'e.g., https://images.unsplash.com/photo-...'}
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="w-full text-xs rounded-none bg-white border border-slate-200 px-2.5 py-2 focus:outline-none focus:border-indigo-600 text-slate-800"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-1">Display Title / Label</label>
                  <input
                    id="input-media-title"
                    type="text"
                    placeholder="e.g., SaaSSkul Platform Tutorial"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full text-xs rounded-none bg-white border border-slate-200 px-2.5 py-2 focus:outline-none focus:border-indigo-600 text-slate-805"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    id="btn-submit-media-load"
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Apply Custom Media URL
                  </button>
                </div>
              </form>
            )}

            {/* Mock client view indicators */}
            <div className="mt-4 flex items-center justify-around text-slate-400 text-[10px] border-t border-slate-150 pt-3 uppercase tracking-wider font-bold">
              <span className="flex items-center gap-1">⚡️ Responsive Frame</span>
              <span className="hidden sm:inline text-slate-200">|</span>
              <span className="flex items-center gap-1">🎥 HD Resolution</span>
              <span className="hidden sm:inline text-slate-200">|</span>
              <span className="flex items-center gap-1">🌅 Google Photos Ready</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
