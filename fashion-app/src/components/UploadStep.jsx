import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export function UploadStep({ onNext, onUploadModel, onUploadProduct, modelImage, productImages }) {
  const modelInputRef = useRef(null);
  const productInputRef = useRef(null);
  const [description, setDescription] = useState('');

  const handleModelUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUploadModel(e.target.files[0]);
    }
  };

  const handleProductUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => onUploadProduct(file));
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Model Upload */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-cyan-400 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center text-xs border border-cyan-500/30">1</span>
            Model Image
          </h2>
          <div
            onClick={() => modelInputRef.current?.click()}
            className={`
              relative h-80 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group
              ${modelImage ? 'border-cyan-500/50 bg-slate-900/50' : 'border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/50'}
            `}
          >
            {modelImage ? (
              <>
                <img src={modelImage.url} alt="Model" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">Change Image</span>
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                  <Upload className="w-8 h-8 text-cyan-400" />
                </div>
                <p className="text-lg font-medium text-slate-200">Upload Model Photo</p>
                <p className="text-sm text-slate-400 mt-2">Full body shot recommended<br/>JPG, PNG (Max 10MB)</p>
              </div>
            )}
            <input
              type="file"
              ref={modelInputRef}
              onChange={handleModelUpload}
              accept="image/png, image/jpeg"
              className="hidden"
            />
          </div>
        </div>

        {/* Product Upload */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-cyan-400 flex items-center gap-2">
             <span className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center text-xs border border-cyan-500/30">2</span>
            Product Images
          </h2>
          <div className="bg-slate-900/30 rounded-2xl border border-slate-700/50 p-6 min-h-[20rem]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {productImages.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-700 group">
                  <img src={img.url} alt="Product" className="w-full h-full object-cover" />
                  <button className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80">
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
              <div
                onClick={() => productInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/50 flex flex-col items-center justify-center cursor-pointer transition-all"
              >
                <Upload className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs text-slate-400">Add Item</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center">Upload jackets, pants, shirts, shoes...</p>
            <input
              type="file"
              ref={productInputRef}
              onChange={handleProductUpload}
              accept="image/png, image/jpeg"
              multiple
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Scene Description */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-cyan-400 flex items-center gap-2 justify-center">
            <span className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center text-xs border border-cyan-500/30">3</span>
            Scene Setting
        </h2>
        <div className="relative">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="E.g., Professional studio lighting, clean minimal background..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-6 py-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all text-center"
          />
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={() => onNext(description)}
          disabled={!modelImage || productImages.length === 0}
          className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center gap-2">
            Generate Campaign <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
}
