import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Map, 
  Battery, 
  Cpu, 
  Wifi, 
  Zap, 
  Navigation, 
  Activity, 
  Trophy, 
  Aperture,
  Crosshair,
  Settings,
  Monitor
} from 'lucide-react';

const BirthdayApp = () => {
  const [stage, setStage] = useState('boot'); // boot, hud
  const [typedText, setTypedText] = useState('');
  const [rpm, setRpm] = useState(0);
  const [speed, setSpeed] = useState(0);

  const fullText = `Dr. 志豪\n生日快樂！\n\n感謝你在我每次北上的時候\n擔任最強「桃園在地嚮導」\n\n博士忙碌之餘\n也別忘了好好充電休息\n\n祝你 Pole Position 起步\n在事業與生活上直線超車\n一路領跑！\n\n平常高強度運轉，真的辛苦了\n工程師偶爾也要\n進站保養 (Pit Stop) 一下喔！\n\nBest regards,\nMartin`;

  // Boot Sequence Simulation
  useEffect(() => {
    if (stage === 'boot') {
      const timer = setTimeout(() => {
        setStage('hud');
      }, 3800);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Typing Effect for Message & Dashboard simulation
  useEffect(() => {
    if (stage === 'hud') {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);

      // Simulate RPM revving and Speed fluctuation
      const rpmInterval = setInterval(() => {
        setRpm(prev => (prev < 12000 ? prev + 150 : 11500 + Math.random() * 500));
        setSpeed(prev => (prev < 320 ? prev + 2 : 318 + Math.random() * 4));
      }, 50);

      return () => {
        clearInterval(typeInterval);
        clearInterval(rpmInterval);
      };
    }
  }, [stage]);

  // ROG Eye SVG Component (Simplified)
  const RogEye = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M10,30 L40,10 L90,30 L90,70 L60,90 L10,70 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M30,40 C30,40 50,30 70,40 C70,40 60,60 50,65 C40,60 30,40 30,40" />
      <circle cx="50" cy="45" r="5" />
    </svg>
  );

  // Nvidia Logo approximation
  const NvidiaLogo = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeLinecap="round" />
      <path d="M2 12c0-5.5 4.5-10 10-10s10 4.5 10 10" strokeLinecap="round" opacity="0.5" />
      <path d="M12 12v6" />
      <path d="M8 16l4 4 4-4" />
    </svg>
  );

  const BootScreen = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-green-500 font-mono text-sm sm:text-base p-4 selection:bg-green-900">
      <div className="w-full max-w-md space-y-2">
        <div className="flex justify-between items-center border-b border-green-800 pb-2 mb-4">
          <span>SYSTEM_BOOT // V.2025.1.17</span>
          <span className="animate-pulse">LOADING...</span>
        </div>
        <p className="opacity-0 animate-fadeIn" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>{'>'} DETECTING HARDWARE...</p>
        <p className="opacity-0 animate-fadeIn text-green-300" style={{animationDelay: '1s', animationFillMode: 'forwards'}}>{'>'} GPU: NVIDIA RTX 4090 [ONLINE]</p>
        <p className="opacity-0 animate-fadeIn text-red-500" style={{animationDelay: '1.5s', animationFillMode: 'forwards'}}>{'>'} MOBO: ASUS ROG CROSSHAIR [SYNCED]</p>
        <p className="opacity-0 animate-fadeIn text-blue-400" style={{animationDelay: '2s', animationFillMode: 'forwards'}}>{'>'} PERIPHERALS: LOGITECH G29 [CALIBRATED]</p>
        <p className="opacity-0 animate-fadeIn text-purple-400" style={{animationDelay: '2.5s', animationFillMode: 'forwards'}}>{'>'} DRONE LINK: DJI MAVIC 3 [CONNECTED]</p>
        <p className="opacity-0 animate-fadeIn" style={{animationDelay: '3s', animationFillMode: 'forwards'}}>{'>'} LOADING MAP DATA: TAOYUAN CITY...</p>
        
        <div className="w-full bg-gray-900 h-2 mt-8 rounded overflow-hidden border border-green-700 relative">
          <div className="absolute top-0 left-0 h-full bg-green-500 animate-loadingBar"></div>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden font-mono text-white selection:bg-red-500 selection:text-white">
      {/* Background Map Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)_translateY(-100px)_translateZ(-200px)] animate-gridMove"></div>
      </div>

      {/* Top HUD: DJI Drone View */}
      <div className="absolute top-0 left-0 w-full p-2 sm:p-4 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent z-10 border-b border-white/10">
        <div className="flex items-center gap-4 text-xs sm:text-sm text-yellow-400">
          <div className="border border-yellow-400 px-2 py-1 rounded bg-black/50 animate-pulse flex items-center gap-2 shadow-[0_0_10px_rgba(250,204,21,0.3)]">
            <Aperture size={14} /> DJI AIR LINK
          </div>
          <div className="flex items-center gap-1"><Battery size={14} /> 89%</div>
          <div className="hidden sm:flex items-center gap-1"><Wifi size={14} /> RC STRONG</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-red-600 px-3 py-0.5 rounded-sm text-xs font-bold animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]">REC ●</div>
          <div className="text-xs text-white/70 mt-1 font-mono">ALT: 120m | SPD: 14m/s</div>
        </div>
        <div className="text-right text-xs sm:text-sm text-cyan-400">
          <div className="border border-cyan-400 px-2 py-1 rounded bg-black/50 flex items-center gap-2 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            <Map size={14} /> LOC: TAOYUAN
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-0 flex flex-col lg:flex-row h-screen pt-20 pb-24 px-4 gap-4 overflow-y-auto lg:overflow-hidden">
        
        {/* Left Panel: Apple Health & Bio */}
        <div className="flex flex-col w-full lg:w-72 gap-4 shrink-0">
          <div className="bg-black/60 border border-gray-700 rounded-lg p-4 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-2 text-pink-500 mb-3 border-b border-gray-800 pb-2">
              <Activity size={18} />
              <span className="font-bold tracking-wider">BIO-METRICS</span>
            </div>
            {/* Apple Rings Simulation */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="60" stroke="#1a1a1a" strokeWidth="12" fill="none" />
                <circle cx="64" cy="64" r="60" stroke="#fa114f" strokeWidth="12" fill="none" strokeDasharray="377" strokeDashoffset="40" strokeLinecap="round" />
                <circle cx="64" cy="64" r="45" stroke="#1a1a1a" strokeWidth="12" fill="none" />
                <circle cx="64" cy="64" r="45" stroke="#9cfc35" strokeWidth="12" fill="none" strokeDasharray="282" strokeDashoffset="60" strokeLinecap="round" />
                <circle cx="64" cy="64" r="30" stroke="#1a1a1a" strokeWidth="12" fill="none" />
                <circle cx="64" cy="64" r="30" stroke="#00d7fa" strokeWidth="12" fill="none" strokeDasharray="188" strokeDashoffset="30" strokeLinecap="round" />
              </svg>
              <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 animate-pulse w-6 h-6" />
            </div>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex justify-between items-center bg-gray-900/50 p-1 rounded"><span>HR</span> <span className="text-red-400 font-bold font-mono">72 BPM</span></div>
              <div className="flex justify-between items-center bg-gray-900/50 p-1 rounded"><span>ENERGY</span> <span className="text-green-400 font-bold">OPTIMAL</span></div>
              <div className="flex justify-between items-center bg-gray-900/50 p-1 rounded"><span>STATUS</span> <span className="text-blue-400 font-bold">RACE READY</span></div>
            </div>
          </div>

          <div className="bg-black/60 border border-gray-700 rounded-lg p-4 backdrop-blur-sm flex-1 shadow-lg">
             <div className="flex items-center gap-2 text-purple-400 mb-3 border-b border-gray-800 pb-2">
              <Navigation size={18} />
              <span className="font-bold tracking-wider">GUIDE LOG</span>
            </div>
            <div className="text-xs text-gray-400 space-y-3 font-mono">
              <p className="flex items-center gap-2"><span className="text-purple-500">{'>'}</span> DESTINATION: TAOYUAN</p>
              <p className="flex items-center gap-2"><span className="text-purple-500">{'>'}</span> GUIDE CLASS: <span className="text-yellow-400 font-bold">SSR</span></p>
              <p className="flex items-center gap-2"><span className="text-purple-500">{'>'}</span> RATING: ★★★★★</p>
              <div className="mt-4 border border-purple-500/30 bg-purple-900/10 p-3 rounded text-center italic text-purple-200">
                "Best Local Guide"
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel: Mission Briefing */}
        <div className="flex-1 flex flex-col justify-center items-center relative min-h-[400px]">
          
          {/* F1 Halo / Target Graphic */}
          <div className="absolute inset-0 border-[1px] border-white/5 rounded-3xl pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)]"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-red-500"></div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-20 bg-white/10"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-20 bg-white/10"></div>
            
            {/* Corner Markers */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red-500/50"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red-500/50"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red-500/50"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red-500/50"></div>
          </div>

          {/* Message Box */}
          <div className="bg-black/80 border border-red-600/50 p-6 sm:p-8 rounded-xl max-w-2xl w-full shadow-[0_0_50px_rgba(220,38,38,0.15)] backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_10px_#ef4444]"></div>
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-[0.2em] uppercase">Mission: Birthday</h1>
              </div>
              <div className="flex gap-4 opacity-80">
                <div className="text-red-500 flex items-center gap-1 text-xs"><RogEye className="w-5 h-5" /> ROG_SYNC</div>
                <div className="text-green-500 flex items-center gap-1 text-xs"><NvidiaLogo className="w-5 h-5" /> RTX_ON</div>
              </div>
            </div>

            {/* Typewriter Text */}
            <div className="font-sans text-base sm:text-lg leading-loose text-gray-100 whitespace-pre-line min-h-[320px] tracking-wide relative z-10">
              {typedText}
              <span className="inline-block w-2 h-5 bg-red-500 ml-1 animate-pulse align-middle"></span>
            </div>
            
            {/* Subtle background icon */}
             <Trophy className="absolute bottom-4 right-4 w-32 h-32 text-yellow-500/5 rotate-12 pointer-events-none" />

          </div>
        </div>

        {/* Right Panel: Hardware Stats */}
        <div className="flex flex-col w-full lg:w-72 gap-4 shrink-0">
          <div className="bg-black/60 border border-green-800 rounded-lg p-4 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-2 text-green-500 mb-3 border-b border-gray-800 pb-2">
              <Cpu size={18} />
              <span className="font-bold tracking-wider">SYSTEM SPECS</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-gray-400">GPU LOAD (RTX 4090)</span>
                  <span className="text-green-400">98%</span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[98%] shadow-[0_0_10px_#22c55e] animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-gray-400">ROG AURA SYNC</span>
                  <span className="text-red-500">ACTIVE</span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 w-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-gray-400">LOGITECH G29</span>
                  <span className="text-blue-400">FFB: 100%</span>
                </div>
                 <div className="flex items-center justify-center py-2 bg-gray-900/30 rounded border border-gray-800">
                    <Settings className="animate-spin-slow text-blue-500 w-6 h-6 mr-2" />
                    <span className="text-xs text-blue-300">CALIBRATING...</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD: F1 + Tesla Dashboard */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/95 to-transparent pt-8 pb-4 border-t border-gray-800 z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-end justify-between gap-6">
          
          {/* Tesla Autopilot Viz */}
          <div className="flex-1 w-full md:w-auto bg-gray-900/80 rounded-lg p-3 border-l-4 border-blue-500 flex items-center gap-4 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <div className="flex-1">
               <div className="text-[10px] text-blue-400 font-bold tracking-[0.2em] mb-1">TESLA AUTOPILOT</div>
               <div className="text-xs text-white/50 font-mono">PATH PLANNING: OPTIMAL</div>
               <div className="flex gap-1 mt-2">
                 <div className="w-8 h-1 bg-blue-500/30"></div>
                 <div className="w-8 h-1 bg-blue-500/60"></div>
                 <div className="w-8 h-1 bg-blue-500"></div>
                 <div className="w-12 h-1 bg-white animate-pulse shadow-[0_0_8px_white]"></div>
               </div>
            </div>
            <div className="text-right">
                <span className="text-3xl font-bold text-white font-mono tabular-nums">{speed}</span>
                <span className="text-[10px] text-gray-400 block tracking-wider">KM/H</span>
            </div>
          </div>

          {/* F1 Steering Wheel Center - The "Heart" of the display */}
          <div className="hidden md:flex flex-col items-center flex-shrink-0 transform translate-y-2">
             <div className="bg-gray-800 rounded-t-[3rem] border-4 border-gray-700 px-10 py-4 w-80 text-center relative shadow-[0_-5px_30px_rgba(0,0,0,0.8)]">
                {/* RPM Lights */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/50 p-1.5 rounded-full border border-gray-600">
                   {[...Array(5)].map((_, i) => (
                     <div key={`g-${i}`} className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" style={{animationDelay: `${i * 0.1}s`}}></div>
                   ))}
                   {[...Array(5)].map((_, i) => (
                     <div key={`r-${i}`} className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" style={{animationDelay: `${0.5 + i * 0.1}s`}}></div>
                   ))}
                    {[...Array(5)].map((_, i) => (
                     <div key={`b-${i}`} className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" style={{animationDelay: `${1.0 + i * 0.1}s`}}></div>
                   ))}
                </div>
                
                <div className="text-5xl font-bold text-white font-mono tracking-widest tabular-nums mt-2">{Math.floor(rpm)}</div>
                <div className="flex justify-between items-center mt-1 px-4">
                    <span className="text-[10px] text-gray-400">GEAR <span className="text-xl text-white font-bold ml-1">8</span></span>
                    <span className="text-[10px] text-gray-400">RPM x 1000</span>
                </div>
                
                <div className="mt-3 text-yellow-400 font-bold border border-yellow-400/50 rounded px-2 py-0.5 text-sm bg-yellow-900/20 shadow-[0_0_15px_rgba(250,204,21,0.2)] animate-pulse">
                    POLE POSITION
                </div>
             </div>
          </div>

          {/* Pedals/Controls */}
          <div className="flex-1 flex justify-end items-center gap-4 text-gray-500">
             <div className="text-right hidden sm:block bg-gray-900/80 p-2 rounded border border-gray-800">
               <div className="text-[10px] text-gray-400 tracking-wider mb-1">LATERAL G-FORCE</div>
               <div className="flex items-center gap-2 justify-end">
                  <div className="w-24 h-2 bg-gray-700 rounded overflow-hidden relative">
                     <div className="absolute right-0 h-full bg-red-500 w-3/4 animate-pulse shadow-[0_0_10px_#ef4444]"></div>
                  </div>
                  <span className="text-white font-mono text-sm font-bold">1.8G</span>
               </div>
             </div>
             <Crosshair className="text-red-500 w-10 h-10 opacity-80 animate-spin-slow" />
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loadingBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes gridMove {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0) translateZ(-200px); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(40px) translateZ(-200px); }
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        /* Custom scrollbar for webkit */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0f172a; 
        }
        ::-webkit-scrollbar-thumb {
          background: #334155; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #475569; 
        }
      `}</style>
    </div>
  );

  return (
    <>
      {stage === 'boot' ? <BootScreen /> : <Dashboard />}
    </>
  );
};

export default BirthdayApp;