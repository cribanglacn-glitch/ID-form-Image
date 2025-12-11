import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, selectedImage, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelect(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="w-full mb-6">
      {!selectedImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
            ${isDragging 
              ? 'border-indigo-500 bg-indigo-500/10' 
              : 'border-slate-600 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500'}
          `}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className={`p-4 rounded-full mb-3 ${isDragging ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700 text-slate-400'}`}>
              <Upload className="w-8 h-8" />
            </div>
            <p className="mb-2 text-sm text-slate-300 font-medium">
              <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500">PNG, JPG or WEBP (Headshots work best)</p>
          </div>
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </div>
      ) : (
        <div className="relative w-full h-64 bg-slate-900 rounded-xl overflow-hidden group border border-slate-700">
          <img 
            src={selectedImage} 
            alt="Source" 
            className="w-full h-full object-contain" 
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
             <button
              onClick={onClear}
              className="px-4 py-2 bg-red-500/90 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors font-medium backdrop-blur-sm"
            >
              <X className="w-4 h-4" /> Remove
            </button>
             <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-indigo-500/90 hover:bg-indigo-600 text-white rounded-lg flex items-center gap-2 transition-colors font-medium backdrop-blur-sm"
            >
              <ImageIcon className="w-4 h-4" /> Change
            </button>
          </div>
           <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </div>
      )}
    </div>
  );
};