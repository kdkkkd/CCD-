
import React from 'react';

interface PhotoFrameProps {
  image: string | null;
  isGenerating: boolean;
  progress: number;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ image, isGenerating, progress }) => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-white p-4 pb-12 polaroid-shadow border-4 border-[#e5e7eb] flex flex-col items-center justify-center overflow-hidden transition-all duration-700">
      {/* Tape decoration */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-yellow-100/60 rotate-1 z-20 mix-blend-multiply border border-yellow-200/50 shadow-sm"></div>
      
      <div className="w-full h-full bg-[#1a1a1a] relative flex items-center justify-center overflow-hidden border border-gray-100 shadow-inner">
        {!image && !isGenerating && (
          <div className="text-center text-gray-500 px-8">
            <div className="mb-4">
               <svg className="w-16 h-16 mx-auto opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812-1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="font-handwritten text-2xl tracking-widest opacity-60">定格温馨瞬间</p>
          </div>
        )}

        {image && (
          <img 
            src={image} 
            alt="写真预览" 
            className={`w-full h-full object-cover transition-all duration-700 ${isGenerating ? 'opacity-30 grayscale blur-sm' : 'opacity-100'}`} 
          />
        )}

        {isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white z-10 backdrop-blur-md">
             <div className="vintage-flicker mb-6 flex flex-col items-center">
                <div className="relative">
                  <span className="bg-red-600 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-400">正在复刻面貌特征...</span>
                </div>
             </div>
             <div className="w-64 h-2.5 bg-gray-800 rounded-full overflow-hidden mb-4 border border-white/10 p-[1px]">
               <div 
                 className="h-full bg-gradient-to-r from-red-500 via-green-500 to-red-500 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                 style={{ width: `${progress}%` }}
               ></div>
             </div>
             <p className="font-handwritten text-xl tracking-widest animate-pulse opacity-80">CCD 胶卷冲洗中</p>
          </div>
        )}

        {/* Viewfinder overlay */}
        <div className="absolute top-4 left-4 border-l border-t border-white/30 w-10 h-10 pointer-events-none"></div>
        <div className="absolute top-4 right-4 border-r border-t border-white/30 w-10 h-10 pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 border-l border-b border-white/30 w-10 h-10 pointer-events-none"></div>
        <div className="absolute bottom-4 right-4 border-r border-b border-white/30 w-10 h-10 pointer-events-none"></div>
        
        {/* Date Stamp */}
        <div className="absolute bottom-3 right-5 text-[#ff8c00] font-mono text-[10px] opacity-100 pointer-events-none select-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] tracking-tighter">
          DEC 25 2024
        </div>
      </div>

      {/* Hand-written caption area removed per user request */}
    </div>
  );
};

export default PhotoFrame;
