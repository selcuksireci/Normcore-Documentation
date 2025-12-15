import React from 'react';
import { Download, Share2, Play, RefreshCw, Maximize2 } from 'lucide-react';

export function ResultsStep({ results, onReset }) {
  const [activeTab, setActiveTab] = React.useState('all');
  const [playingVideo, setPlayingVideo] = React.useState(null);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
            <h2 className="text-3xl font-bold text-white">Campaign Ready</h2>
            <p className="text-slate-400 mt-2">Generated {Object.keys(results.angleImages).length} angles and videos</p>
        </div>
        <div className="flex gap-4">
            <button onClick={onReset} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-2 transition-colors">
                <RefreshCw className="w-4 h-4" /> New Project
            </button>
            <button className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium flex items-center gap-2 transition-colors shadow-lg shadow-cyan-500/20">
                <Download className="w-4 h-4" /> Download Assets
            </button>
        </div>
      </div>

      {/* Main Try-On Result */}
      <div className="glass-card rounded-2xl overflow-hidden p-1">
        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-slate-900 group">
            <img src={results.tryOn} alt="Try On Result" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Virtual Try-On Composite</h3>
                    <p className="text-slate-300 max-w-xl">High-resolution composition preserving original lighting and anatomical details.</p>
                </div>
            </div>
        </div>
      </div>

      {/* Angles Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-8 bg-cyan-500 rounded-full"/>
            Multi-Angle Variations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(results.angleImages).map(([id, url]) => (
                <div key={id} className="group relative rounded-xl overflow-hidden bg-slate-800 aspect-[4/5] border border-slate-700 hover:border-cyan-500/50 transition-all">
                    <img src={url} alt={`Angle ${id}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                        <span className="text-cyan-400 text-xs font-bold tracking-wider uppercase mb-2">{id}</span>
                        <p className="text-white text-sm line-clamp-3">{results.scenarios[id]?.script.substring(0, 100)}...</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Video Scenarios */}
      <div className="space-y-6 pb-20">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-8 bg-purple-500 rounded-full"/>
            Generated Video Ads
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(results.videos).map(([id, video]) => (
                <div key={id} className="glass-card rounded-xl overflow-hidden border border-slate-700/50 hover:border-purple-500/30 transition-all">
                    <div className="relative aspect-video bg-slate-900 group cursor-pointer">
                        <img src={video.thumbnail} alt="Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                            </div>
                        </div>
                        <span className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-xs font-mono">
                            {results.scenarios[id]?.duration}
                        </span>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-bold text-lg text-white">{results.scenarios[id]?.title}</h4>
                                <span className="text-xs text-purple-400 font-medium px-2 py-1 rounded-full bg-purple-900/30 border border-purple-500/20 mt-2 inline-block">
                                    {results.scenarios[id]?.mood}
                                </span>
                            </div>
                            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                                <Share2 className="w-4 h-4 text-slate-400" />
                            </button>
                        </div>
                        <div className="space-y-2">
                             <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Scenario Script</div>
                             <p className="text-sm text-slate-300 font-mono bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                {results.scenarios[id]?.script.split('\n')[0]}...
                             </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
