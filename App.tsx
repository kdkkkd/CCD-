
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import PhotoFrame from './components/PhotoFrame';
import Snowflakes from './components/Snowflakes';
import { generateChristmasPortrait } from './services/geminiService';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    originalImage: null,
    generation: {
      isGenerating: false,
      progress: 0,
      error: null,
      resultUrl: null,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate progress bar movement
  useEffect(() => {
    let interval: number | undefined;
    if (state.generation.isGenerating) {
      interval = window.setInterval(() => {
        setState(prev => {
          if (prev.generation.progress >= 95) return prev;
          return {
            ...prev,
            generation: {
              ...prev.generation,
              progress: prev.generation.progress + (Math.random() * 5),
            }
          };
        });
      }, 500);
    }
    return () => window.clearInterval(interval);
  }, [state.generation.isGenerating]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setState({
          originalImage: event.target?.result as string,
          generation: {
            isGenerating: false,
            progress: 0,
            error: null,
            resultUrl: null,
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!state.originalImage) return;

    setState(prev => ({
      ...prev,
      generation: { ...prev.generation, isGenerating: true, progress: 10, error: null }
    }));

    try {
      const resultUrl = await generateChristmasPortrait(state.originalImage);
      setState(prev => ({
        ...prev,
        generation: { 
          ...prev.generation, 
          isGenerating: false, 
          progress: 100, 
          resultUrl 
        }
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        generation: { 
          ...prev.generation, 
          isGenerating: false, 
          error: "哎呀，相机胶卷卡住了。请再试一次。" 
        }
      }));
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = state.generation.resultUrl || state.originalImage || '';
    link.download = 'ccd_圣诞写真.png';
    link.click();
  };

  const handleReset = () => {
    setState({
      originalImage: null,
      generation: {
        isGenerating: false,
        progress: 0,
        error: null,
        resultUrl: null,
      }
    });
  };

  const isComplete = !!state.generation.resultUrl;

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center relative">
      <Snowflakes />
      
      <div className="max-w-2xl w-full z-10">
        <Header />

        <main className="space-y-8">
          {/* Display Area */}
          <PhotoFrame 
            image={state.generation.resultUrl || state.originalImage} 
            isGenerating={state.generation.isGenerating}
            progress={state.generation.progress}
          />

          {/* Control Area */}
          <div className="bg-[#e9e4d4] p-8 rounded-3xl border-4 border-[#cfc8b0] shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] flex flex-col items-center space-y-6">
            
            {state.generation.error && (
              <p className="text-red-700 font-bold text-center px-4 py-2 bg-red-100 rounded-lg border border-red-200 w-full">
                {state.generation.error}
              </p>
            )}

            {!isComplete && !state.generation.isGenerating && (
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#2a2a2a] text-white rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl border-b-4 border-gray-600"
                >
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {state.originalImage ? '换张照片' : '上传照片'}
                </button>
                
                {state.originalImage && (
                  <button 
                    onClick={handleGenerate}
                    className="group flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white rounded-full font-bold uppercase tracking-widest hover:bg-red-700 transition-all active:scale-95 shadow-xl border-b-4 border-red-900"
                  >
                    <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                    </svg>
                    一键生成
                  </button>
                )}
              </div>
            )}

            {isComplete && !state.generation.isGenerating && (
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button 
                  onClick={handleDownload}
                  className="px-8 py-4 bg-green-700 text-white rounded-full font-bold uppercase tracking-widest hover:bg-green-800 transition-all active:scale-95 shadow-xl border-b-4 border-green-900 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  保存写真
                </button>
                <button 
                  onClick={handleReset}
                  className="px-8 py-4 bg-gray-400 text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-500 transition-all active:scale-95 shadow-xl border-b-4 border-gray-600"
                >
                  重拍一张
                </button>
              </div>
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-[#cfc8b0] w-full justify-center">
              <p className="text-[10px] text-gray-500 italic font-mono uppercase tracking-widest">
                型号: VNTG-2400C • 序列号: 20241225-PRO
              </p>
            </div>
          </div>
        </main>

        <footer className="mt-12 text-center text-gray-400 font-handwritten text-2xl italic">
          为美好的圣诞回忆手工打造
        </footer>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
};

export default App;
