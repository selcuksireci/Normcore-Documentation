import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { UploadStep } from './components/UploadStep';
import { ProcessingStep } from './components/ProcessingStep';
import { ResultsStep } from './components/ResultsStep';
import { api } from './api';

function App() {
  const [step, setStep] = useState('upload'); // upload, processing, results
  const [modelImage, setModelImage] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [sceneDescription, setSceneDescription] = useState('');
  const [results, setResults] = useState(null);

  const handleUploadModel = async (file) => {
    const uploaded = await api.uploadImage(file);
    setModelImage(uploaded);
  };

  const handleUploadProduct = async (file) => {
    const uploaded = await api.uploadImage(file);
    setProductImages(prev => [...prev, uploaded]);
  };

  const handleStartWorkflow = (description) => {
    setSceneDescription(description);
    setStep('processing');
  };

  const handleProcessingComplete = (data) => {
    setResults(data);
    setStep('results');
  };

  const handleReset = () => {
    setStep('upload');
    setModelImage(null);
    setProductImages([]);
    setSceneDescription('');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

      <header className="fixed top-0 w-full z-50 glass-card border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStep('upload')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Fashion<span className="text-cyan-400">AI</span> Studio</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <div className={`flex items-center gap-2 transition-colors ${step === 'upload' ? 'text-white' : ''}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step === 'upload' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-slate-700'}`}>1</span>
                Upload
            </div>
            <div className="w-8 h-px bg-slate-800"></div>
            <div className={`flex items-center gap-2 transition-colors ${step === 'processing' ? 'text-white' : ''}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step === 'processing' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-slate-700'}`}>2</span>
                Process
            </div>
            <div className="w-8 h-px bg-slate-800"></div>
            <div className={`flex items-center gap-2 transition-colors ${step === 'results' ? 'text-white' : ''}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step === 'results' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-slate-700'}`}>3</span>
                Results
            </div>
          </nav>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
      </header>

      <main className="relative z-10 pt-28 pb-12 px-6 max-w-7xl mx-auto min-h-screen flex flex-col">
        {step === 'upload' && (
             <UploadStep
                modelImage={modelImage}
                productImages={productImages}
                onUploadModel={handleUploadModel}
                onUploadProduct={handleUploadProduct}
                onNext={handleStartWorkflow}
             />
        )}

        {step === 'processing' && (
            <ProcessingStep
                modelImage={modelImage}
                productImages={productImages}
                description={sceneDescription}
                onComplete={handleProcessingComplete}
            />
        )}

        {step === 'results' && results && (
            <ResultsStep
                results={results}
                onReset={handleReset}
            />
        )}
      </main>
    </div>
  );
}

export default App;
