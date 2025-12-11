import React from 'react';
import { Download, Share2, Maximize2 } from 'lucide-react';
import { GeneratedImage } from '../types';

interface ResultGridProps {
  results: GeneratedImage[];
}

export const ResultGrid: React.FC<ResultGridProps> = ({ results }) => {
  const handleDownload = (url: string, style: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `nano-id-${style.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((item) => (
        <div 
          key={item.id} 
          className="relative group bg-slate-800 rounded-xl overflow-hidden aspect-square border border-slate-700 shadow-xl"
        >
          {item.loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/80 backdrop-blur-sm z-10 p-6 text-center">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-indigo-400 font-medium animate-pulse">Generating...</p>
              <p className="text-xs text-slate-500 mt-2">{item.styleName}</p>
            </div>
          ) : item.error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-900">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-3">
                 <span className="text-xl">!</span>
              </div>
              <p className="text-red-400 font-medium mb-1">Failed to generate</p>
              <p className="text-xs text-slate-500">{item.error}</p>
            </div>
          ) : (
            <>
              <img 
                src={item.url} 
                alt={item.styleName} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white font-semibold text-sm mb-1">{item.styleName}</p>
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => handleDownload(item.url, item.styleName)}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => window.open(item.url, '_blank')}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-colors"
                    title="Open Full Size"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
      
      {/* Empty State Placeholders to maintain grid look if empty */}
      {results.length === 0 && Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-slate-700/50 flex items-center justify-center">
           <div className="w-8 h-8 rounded-full bg-slate-800/50"></div>
        </div>
      ))}
    </div>
  );
};