import React, { useEffect } from 'react';
import { CheckCircle, Loader2, Sparkles, Video, Camera, Edit } from 'lucide-react';
import { api } from '../api';

const Node = ({ title, status, icon: Icon, delay }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'border-cyan-500/50 bg-cyan-950/30 text-cyan-400';
      case 'processing': return 'border-blue-500/50 bg-blue-900/20 text-blue-400 animate-pulse';
      case 'queued': return 'border-slate-800 bg-slate-900/30 text-slate-600';
      default: return 'border-slate-800 bg-slate-900/30 text-slate-600';
    }
  };

  return (
    <div className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${getStatusColor()}`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${status === 'completed' ? 'bg-cyan-500/20' : 'bg-slate-800/50'}`}>
          <Icon className={`w-6 h-6 ${status === 'processing' ? 'animate-spin' : ''}`} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm opacity-70">
            {status === 'completed' ? 'Done' : status === 'processing' ? 'Processing...' : 'Queued'}
          </p>
        </div>
        {status === 'completed' && <CheckCircle className="ml-auto w-6 h-6 text-cyan-400" />}
      </div>

      {/* Connector Line */}
      <div className="hidden md:block absolute -right-8 top-1/2 w-8 h-0.5 bg-slate-800 -z-10" />
    </div>
  );
};

export function ProcessingStep({ modelImage, productImages, description, onComplete }) {
  const [status, setStatus] = React.useState({
    analysis: 'processing',
    tryOn: 'queued',
    angles: 'queued',
    videos: 'queued'
  });

  const [data, setData] = React.useState({
    analysis: null,
    tryOn: null,
    angles: null,
    angleImages: null,
    scenarios: null,
    videos: null
  });

  useEffect(() => {
    let isMounted = true;

    const runPipeline = async () => {
      // Step 1: Analysis
      const analysis = await api.analyzeProduct(productImages[0].id);
      if (!isMounted) return;
      setData(prev => ({ ...prev, analysis }));
      setStatus(prev => ({ ...prev, analysis: 'completed', tryOn: 'processing' }));

      // Step 2: Try-On
      const tryOn = await api.generateTryOn(modelImage.id, productImages.map(p => p.id), description);
      if (!isMounted) return;
      setData(prev => ({ ...prev, tryOn }));
      setStatus(prev => ({ ...prev, tryOn: 'completed', angles: 'processing' }));

      // Step 3: Angles & Images
      const angles = await api.generateAngles(tryOn.imageUrl);
      const angleImages = await api.generateAngleImages(angles);
      if (!isMounted) return;
      setData(prev => ({ ...prev, angles, angleImages }));
      setStatus(prev => ({ ...prev, angles: 'completed', videos: 'processing' }));

      // Step 4: Scenarios & Videos
      const scenarios = await api.generateScenarios(angleImages);
      const videos = await api.generateVideos(scenarios);
      if (!isMounted) return;
      setData(prev => ({ ...prev, scenarios, videos }));
      setStatus(prev => ({ ...prev, videos: 'completed' }));

      setTimeout(() => onComplete({
        tryOn: tryOn.imageUrl,
        angleImages,
        videos,
        scenarios
      }), 1000);
    };

    runPipeline();

    return () => { isMounted = false; };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          AI Pipeline Active
        </h2>
        <p className="text-slate-400">Orchestrating multi-model workflow generation...</p>
      </div>

      <div className="grid gap-6 relative">
        {/* Connecting line for vertical layout on mobile */}
        <div className="md:hidden absolute left-9 top-10 bottom-10 w-0.5 bg-slate-800 -z-10" />

        <Node
          title="Product Analysis"
          status={status.analysis}
          icon={Sparkles}
        />
        <Node
          title="Virtual Try-On"
          status={status.tryOn}
          icon={Edit}
        />
        <Node
          title="Multi-Angle Generation"
          status={status.angles}
          icon={Camera}
        />
        <Node
          title="Video Production"
          status={status.videos}
          icon={Video}
        />
      </div>

      {data.analysis && (
        <div className="mt-8 p-6 bg-slate-900/50 rounded-xl border border-slate-700 animate-in slide-in-from-bottom-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Detected Attributes</h3>
            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-sm border border-cyan-900">{data.analysis.category}</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-sm border border-cyan-900">{data.analysis.style}</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-sm border border-cyan-900">{data.analysis.material}</span>
                {data.analysis.features.map(f => (
                    <span key={f} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">{f}</span>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
