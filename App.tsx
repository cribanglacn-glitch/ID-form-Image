import React, { useState } from 'react';
import { Sparkles, Zap, Command, Image as ImageIcon, Camera, User, UserCheck, Briefcase, Shirt } from 'lucide-react';
import { ImageUploader } from './components/ImageUploader';
import { ResultGrid } from './components/ResultGrid';
import { generateImageEdit } from './services/gemini';
import { GeneratedImage } from './types';
import { FEMALE_PRESETS, MALE_PRESETS, FEMALE_FASHION_PRESETS, MALE_FASHION_PRESETS } from './constants';

const App: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [results, setResults] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [mode, setMode] = useState<'professional' | 'fashion'>('professional');

  // Determine which presets to use
  const getCurrentPresets = () => {
    if (gender === 'male') {
      return mode === 'professional' ? MALE_PRESETS : MALE_FASHION_PRESETS;
    } else {
      return mode === 'professional' ? FEMALE_PRESETS : FEMALE_FASHION_PRESETS;
    }
  };

  const currentPresets = getCurrentPresets();

  // Generate all 9 styles sequentially to avoid rate limits (429 errors)
  const handleGenerateAllStyles = async () => {
    if (!sourceImage) return;

    setIsGenerating(true);
    
    // Initialize results with loading state
    const initialResults: GeneratedImage[] = currentPresets.map(style => ({
      id: style.id,
      url: '',
      prompt: style.promptSuffix,
      styleName: style.name,
      loading: true
    }));
    setResults(initialResults);

    // Process sequentially instead of Promise.all to respect API rate limits
    for (const style of currentPresets) {
      try {
        const generatedUrl = await generateImageEdit(sourceImage, style.promptSuffix);
        setResults(prev => prev.map(item => 
          item.id === style.id 
            ? { ...item, url: generatedUrl, loading: false } 
            : item
        ));
      } catch (error: any) {
        console.error(`Error generating ${style.name}:`, error);
        
        const isRateLimit = error.message?.includes('429') || error.message?.includes('quota');
        const errorMessage = isRateLimit ? "Rate limit exceeded" : "Failed to generate";

        setResults(prev => prev.map(item => 
          item.id === style.id 
            ? { ...item, loading: false, error: errorMessage } 
            : item
        ));
      }
      // Small delay to be polite to the API and prevent burst limits
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsGenerating(false);
  };

  const handleCustomGenerate = async () => {
    if (!sourceImage || !customPrompt.trim()) return;

    setIsGenerating(true);
    const newId = `custom-${Date.now()}`;
    
    // Add new loading card to the BEGINNING of results
    const newResult: GeneratedImage = {
      id: newId,
      url: '',
      prompt: customPrompt,
      styleName: 'Custom Edit',
      loading: true
    };
    
    setResults(prev => [newResult, ...prev]);

    try {
      const generatedUrl = await generateImageEdit(sourceImage, customPrompt);
      setResults(prev => prev.map(item => 
        item.id === newId
          ? { ...item, url: generatedUrl, loading: false } 
          : item
      ));
    } catch (error: any) {
      setResults(prev => prev.map(item => 
        item.id === newId
          ? { ...item, loading: false, error: error.message || "Failed" } 
          : item
      ));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              NanoID Studio
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              Gemini 2.5 Flash
            </span>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-20 px-4 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional & Fashion <br/> 
            <span className="text-indigo-400">AI Photo Studio</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Create professional ID photos or explore trendy fashion styles. 
            Select your mode and gender to get started.
          </p>
        </div>

        {/* Settings Controls */}
        <div className="max-w-2xl mx-auto mb-10 flex flex-col md:flex-row gap-6">
            
            {/* Mode Selection */}
            <div className="flex-1 bg-slate-800/50 p-1.5 rounded-xl border border-slate-700 backdrop-blur-sm">
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2 px-2 text-center">Mode</div>
                <div className="flex gap-1">
                    <button
                        onClick={() => setMode('professional')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            mode === 'professional'
                            ? 'bg-slate-700 text-white shadow-md'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
                        }`}
                    >
                        <Briefcase className="w-4 h-4" />
                        Professional (ID)
                    </button>
                    <button
                        onClick={() => setMode('fashion')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            mode === 'fashion'
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
                        }`}
                    >
                        <Shirt className="w-4 h-4" />
                        Fashion & Style
                    </button>
                </div>
            </div>

            {/* Gender Selection */}
            <div className="flex-1 bg-slate-800/50 p-1.5 rounded-xl border border-slate-700 backdrop-blur-sm">
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2 px-2 text-center">Gender</div>
                <div className="flex gap-1">
                    <button
                    onClick={() => setGender('male')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        gender === 'male' 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
                    }`}
                    >
                    <UserCheck className="w-4 h-4" />
                    Male
                    </button>
                    <button
                    onClick={() => setGender('female')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        gender === 'female' 
                        ? 'bg-pink-600 text-white shadow-md' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
                    }`}
                    >
                    <Sparkles className="w-4 h-4" />
                    Female
                    </button>
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-8 items-start">
          {/* Left Column: Controls */}
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-400" />
                Upload Source
              </h3>
              
              <ImageUploader 
                selectedImage={sourceImage}
                onImageSelect={setSourceImage}
                onClear={() => {
                  setSourceImage(null);
                  setResults([]);
                }}
              />

              <div className="space-y-3">
                <button
                  onClick={handleGenerateAllStyles}
                  disabled={!sourceImage || isGenerating}
                  className={`
                    w-full py-4 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                    ${!sourceImage || isGenerating
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      : gender === 'male' 
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500'
                        : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500'
                    }
                  `}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate {mode === 'professional' ? 'ID Photos' : 'Fashion Looks'}
                    </>
                  )}
                </button>

                {!sourceImage && (
                  <p className="text-xs text-center text-slate-500">
                    Upload a photo to start generating
                  </p>
                )}
                {sourceImage && !isGenerating && (
                    <p className="text-xs text-center text-slate-400">
                        Generates 9 {mode} variations for {gender}
                    </p>
                )}
              </div>
            </div>

            {/* Custom Prompt Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <Command className="w-4 h-4 text-indigo-400" />
                Custom Edit
              </h3>
              <div className="flex flex-col gap-3">
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="E.g. Add a red bowtie, make background blue..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none h-24"
                />
                <button
                  onClick={handleCustomGenerate}
                  disabled={!sourceImage || !customPrompt.trim() || isGenerating}
                  className={`
                    py-2.5 px-4 rounded-lg text-sm font-medium transition-colors
                    ${!sourceImage || !customPrompt.trim() || isGenerating
                      ? 'bg-slate-700 text-slate-500'
                      : 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'
                    }
                  `}
                >
                  Generate Custom
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                Generated Results
                <span className="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                  {results.length}
                </span>
              </h3>
            </div>
            
            <ResultGrid results={results} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;