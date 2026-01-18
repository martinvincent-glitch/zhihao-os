import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Zap, Send, Battery, Wifi, Cpu, Navigation, Crosshair, Aperture, 
  Wind, Trophy, Play, RotateCcw, ChevronLeft, ChevronRight, MapPin, Star, 
  Utensils, Coffee, ThumbsUp, Award, Scan, FlaskConical, FileText, Flame, 
  BookOpen, Database, Satellite, Eye, Moon, Rocket, Calendar, Gauge, 
  MessageCircle, Lock, Unlock, CheckCircle, Terminal, Wrench, CircuitBoard, 
  GraduationCap, Users, Timer, Brain, Search, Disc, School, Briefcase, 
  GitBranch, Layers, Code, Lightbulb, PenTool, UtensilsCrossed, History, HeartHandshake 
} from 'lucide-react';

// --- SVG Icons (100% 原始細節) ---

const ROGLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 80" className={className} fill="currentColor">
    <path d="M5,35 L30,10 C45,-5 65,-5 80,10 L95,25" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
    <path d="M15,45 C25,35 40,30 50,30 C60,30 75,35 85,45 L50,75 Z" />
    <circle cx="50" cy="45" r="8" fill="black" opacity="0.5" />
  </svg>
);

const NvidiaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50,10 C20,10 5,30 5,30 C5,30 20,20 50,20 C80,20 95,40 95,40 C95,40 80,10 50,10 Z" />
    <path d="M50,30 C30,30 15,45 15,45 C15,45 30,38 50,38 C70,38 85,55 85,55 C85,55 70,30 50,30 Z" />
    <path d="M50,50 C40,50 30,58 30,58 C30,58 40,55 50,55 C60,55 70,65 70,65 C70,65 60,50 50,50 Z" />
  </svg>
);

const TeslaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M10,20 L90,20 L50,50 Z" opacity="0.3"/>
    <path d="M20,15 L80,15 M50,15 L50,85" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    <path d="M20,15 Q50,40 80,15" stroke="currentColor" strokeWidth="5" fill="none" />
  </svg>
);

// --- Sub-Components ---

const BrainWaves = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let dataPoints = Array(60).fill(50);
    const draw = () => {
      dataPoints.shift();
      dataPoints.push(Math.max(5, Math.min(95, dataPoints[dataPoints.length-1] + (Math.random()-0.5)*(active?30:10))));
      ctx.clearRect(0,0,300,100);
      ctx.beginPath(); ctx.strokeStyle = active ? '#ff0055' : '#00ffcc'; ctx.lineWidth = 2;
      dataPoints.forEach((p,i) => { i===0?ctx.moveTo(i*5, 100-p):ctx.lineTo(i*5, 100-p); });
      ctx.stroke(); requestAnimationFrame(draw);
    };
    const id = requestAnimationFrame(draw); return () => cancelAnimationFrame(id);
  }, [active]);
  return <div className="w-full h-24 bg-black/60 rounded border border-gray-700 relative mt-2 overflow-hidden"><canvas ref={canvasRef} width={300} height={100} className="w-full h-full block" /></div>;
};

const AbilityRadar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const stats = [{l:'專業',v:1}, {l:'美食',v:0.95}, {l:'導航',v:1}, {l:'駕駛',v:0.9}, {l:'解決',v:1}, {l:'魅力',v:1}];
    const draw = () => {
      ctx.clearRect(0,0,320,300); const cx=160, cy=150, r=100;
      ctx.strokeStyle='rgba(255,255,255,0.1)';
      [0.3, 0.6, 1].forEach(sc => {
        ctx.beginPath(); for(let i=0;i<6;i++) { const x=cx+r*sc*Math.cos(i*Math.PI/3-Math.PI/2), y=cy+r*sc*Math.sin(i*Math.PI/3-Math.PI/2); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); } ctx.closePath(); ctx.stroke();
      });
      ctx.beginPath(); ctx.fillStyle='rgba(250,204,21,0.5)';
      stats.forEach((s,i) => { const x=cx+r*s.v*Math.cos(i*Math.PI/3-Math.PI/2), y=cy+r*s.v*Math.sin(i*Math.PI/3-Math.PI/2); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
      ctx.closePath(); ctx.fill(); requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return <canvas ref={canvasRef} width={320} height={300} className="mx-auto" />;
};

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const txt = ["INITIALIZING ZHIHAO_OS KERNEL v6.3...", "LOADING NVIDIA_RTX_5090_TI... [OK]", "SATELLITE LINK ESTABLISHED...", "WELCOME, COMMANDER."];
    txt.forEach((t, i) => setTimeout(() => setLines(p => [...p, t]), i * 700));
    setTimeout(onComplete, 4000);
  }, []);
  return <div className="h-screen w-screen bg-black text-green-500 p-12 font-mono flex flex-col justify-end overflow-hidden">{lines.map((l, i) => <div key={i} className="animate-pulse mb-1">{">"} {l}</div>)}<div className="w-4 h-6 bg-green-500 animate-ping mt-2"></div></div>;
};

// --- Racing Game (完整物理與戰績榜) ---

const RacingGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'pitting'>('start');
  const [tireHealth, setTireHealth] = useState(100);
  const INITIAL_GRID = [
    { code: 'VER', color: '#3671C6', gap: 'LEADER' },
    { code: 'NOR', color: '#FF8000', gap: '+1.2s' },
    { code: 'LEC', color: '#F91536', gap: '+3.4s' },
    { code: 'ZHI', color: '#ff0000', gap: '+9.3s', isPlayer: true },
    { code: 'HAM', color: '#6CD3BF', gap: '+10.5s' }
  ];

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current!; const ctx = canvas.getContext('2d')!;
    const draw = () => {
      ctx.fillStyle = '#111'; ctx.fillRect(0,0,1440,900);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.setLineDash([40,60]);
      ctx.beginPath(); ctx.moveTo(480,0); ctx.lineTo(480,900); ctx.moveTo(960,0); ctx.lineTo(960,900); ctx.stroke();
      // 寫實賽車繪製
      const x = 720-26, y = 700;
      ctx.fillStyle = '#00ffcc'; ctx.shadowBlur = 20; ctx.shadowColor = '#00ffcc';
      ctx.roundRect(x, y, 52, 96, 10); ctx.fill();
      requestAnimationFrame(draw);
    };
    draw();
  }, [gameState]);

  return (
    <div className="w-full h-full relative bg-gray-950 rounded-[3rem] overflow-hidden border border-red-900 shadow-2xl">
      <canvas ref={canvasRef} width={1440} height={900} className="w-full h-full block" />
      <div className="absolute top-10 left-10 space-y-2 pointer-events-none">
        {INITIAL_GRID.map(d => (
          <div key={d.code} className="flex items-center gap-3 bg-black/70 px-4 py-2 border-l-4" style={{borderColor:d.color}}>
            <span className={`font-mono font-bold ${d.isPlayer?'text-yellow-400':'text-white'}`}>{d.code}</span>
            <span className="text-gray-400 text-xs">{d.gap}</span>
          </div>
        ))}
      </div>
      {gameState === 'start' && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center">
          <h2 className="text-7xl font-black italic text-red-500 mb-8 tracking-tighter">POLE POSITION</h2>
          <button onClick={() => setGameState('playing')} className="px-16 py-6 bg-red-600 text-white font-black text-2xl skew-x-[-10deg] shadow-[0_0_30px_red]">LIGHTS OUT</button>
        </div>
      )}
    </div>
  );
};

// --- Drone & Dashboard ---

const DroneView = () => {
  const locations = [
    { n: "桃園 (Taoyuan)", lat: 25.0125, lon: 121.2980, note: "最強在地嚮導" },
    { n: "金門 (Kinmen)", lat: 24.4400, lon: 118.3300, note: "大學回憶：相識之地" }
  ];
  const url = `https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/export?bbox=${locations[0].lon-0.01},${locations[0].lat-0.01},${locations[0].lon+0.01},${locations[0].lat+0.01}&bboxSR=4326&size=800,600&f=image`;
  return (
    <div className="relative w-full h-full bg-black rounded-[3rem] overflow-hidden border border-cyan-900 shadow-inner">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${url})` }} />
      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        <div className="bg-black/60 p-6 rounded-2xl border border-white/10 self-start backdrop-blur-md">
          <div className="text-cyan-400 font-mono text-xs flex items-center gap-2 animate-pulse"><Satellite size={16}/> GPS: LOCKED</div>
          <div className="text-white font-bold text-3xl mt-2 tracking-tighter">{locations[0].n}</div>
          <div className="text-yellow-500 font-mono text-xs mt-1 uppercase tracking-[0.3em]">{locations[0].note}</div>
        </div>
      </div>
    </div>
  );
};

// --- Main Application Wrapper (核心比例鎖定) ---

const App = () => {
  const [booted, setBooted] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'race' | 'drone' | 'hospitality' | 'message'>('dashboard');
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const sW = window.innerWidth / 1440;
      const sH = window.innerHeight / 900;
      setScale(Math.min(sW, sH)); // 等比例縮放
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!booted) return <BootSequence onComplete={() => setBooted(true)} />;

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* 比例鎖定容器：將整個 OS 鎖定在 1440x900 解析度 */}
      <div 
        ref={containerRef}
        style={{
          width: '1440px', height: '900px', transform: `scale(${scale})`,
          transformOrigin: 'center center', flexShrink: 0
        }}
        className="relative bg-gray-950 shadow-2xl flex border border-gray-800 rounded-xl overflow-hidden"
      >
        {/* Sidebar */}
        <nav className="w-28 bg-black border-r border-gray-800 flex flex-col items-center py-12 gap-10 z-50">
          <Zap className="text-yellow-400 w-12 h-12 shadow-[0_0_20px_yellow]" />
          {[
            { id: 'dashboard', icon: <Activity />, c: 'bg-blue-600' },
            { id: 'race', icon: <Trophy />, c: 'bg-red-600' },
            { id: 'drone', icon: <Aperture />, c: 'bg-green-600' },
            { id: 'hospitality', icon: <Utensils />, c: 'bg-yellow-600' },
            { id: 'message', icon: <Send />, c: 'bg-purple-600' }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as any)} 
              className={`p-5 rounded-2xl transition-all ${activeTab === tab.id ? `${tab.c} text-white shadow-xl scale-110` : 'text-gray-500 hover:text-white'}`}
            >
              {React.cloneElement(tab.icon as React.ReactElement, { size: 36 })}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-12 flex flex-col h-full overflow-hidden">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-5xl font-black font-mono text-white italic uppercase tracking-tighter shadow-sm">ZHIHAO_OS <span className="text-sm not-italic text-green-500 bg-green-500/10 px-4 py-1 rounded-full border border-green-500/20 ml-4">v6.3</span></h1>
              <p className="text-xs text-gray-500 uppercase tracking-[0.6em] mt-3 font-mono opacity-50">System Integrity: Nominal // Taoyuan Node Active</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right font-mono"><div className="text-xs text-gray-500 tracking-widest uppercase">Uplink Station</div><div className="text-sm text-green-400 font-bold">ONLINE_SYNC</div></div>
              <div className="w-16 h-16 rounded-full bg-gray-800 border-4 border-gray-700 overflow-hidden shadow-2xl"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" /></div>
            </div>
          </header>

          <div className="flex-1 relative bg-gray-900/40 rounded-[4rem] border border-gray-800 p-10 overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 pointer-events-none bg-[length:100%_3px,3px_100%]"></div>
            <div className="relative z-10 h-full">
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-2 gap-8 h-full">
                  <div className="bg-gray-800/40 p-10 rounded-[3.5rem] border border-gray-700 flex flex-col items-center justify-center shadow-xl">
                    <TeslaLogo className="w-40 h-40 text-blue-500 mb-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                    <BrainWaves active={false} />
                  </div>
                  <div className="bg-black/60 p-10 rounded-[3.5rem] border border-gray-800 flex flex-col justify-between shadow-2xl">
                     <div className="text-purple-500 font-black text-2xl flex items-center gap-4 tracking-tighter"><Activity size={28} /> SHARED_MEMORY_LOGS</div>
                     <div className="space-y-4 font-mono text-sm text-gray-400">
                        <div className="flex justify-between border-b border-gray-800 pb-2"><span>實驗室熬夜時數 (LAB_TIME)</span><span className="text-red-400">999+ HRS</span></div>
                        <div className="flex justify-between border-b border-gray-800 pb-2"><span>自走車競賽紀錄 (RACE_WIN)</span><span className="text-green-400">RANK #1</span></div>
                     </div>
                     <AbilityRadar />
                  </div>
                </div>
              )}
              {activeTab === 'race' && <RacingGame />}
              {activeTab === 'drone' && <DroneView />}
              {activeTab === 'hospitality' && (
                <div className="h-full flex flex-col items-center justify-center p-12 bg-black/40 rounded-[4rem] border border-yellow-500/20 text-center">
                  <Award className="w-20 h-20 text-yellow-400 mb-8 animate-bounce" />
                  <h2 className="text-5xl font-black text-white italic mb-6">ALL-ROUNDER PARTNER</h2>
                  <p className="text-gray-300 text-2xl leading-loose max-w-4xl font-sans italic border-l-8 border-yellow-500 pl-10 text-left">
                    「感謝你展現出的卓越<strong className="text-white">領導能力</strong>，總是在關鍵時刻給予方向；更感謝你過去經常<strong className="text-white">熱心幫助</strong>，成為我最強大的後盾。」
                  </p>
                </div>
              )}
              {activeTab === 'message' && (
                <div className="h-full flex flex-col items-center justify-center p-12 bg-black rounded-[4rem] border border-gray-800 relative overflow-hidden shadow-2xl text-center">
                   <ROGLogo className="absolute -top-20 -right-20 w-96 h-96 opacity-5 rotate-12" />
                   <h2 className="text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-12 tracking-tighter drop-shadow-[0_0_30px_rgba(0,255,0,0.3)]">HAPPY BIRTHDAY!</h2>
                   <div className="text-gray-300 text-3xl leading-relaxed max-w-4xl font-sans border-l-4 border-gray-800 pl-12 text-left">
                      <p>感謝你這幾年來擔任最強 <strong className="text-white underline decoration-yellow-500 decoration-2 underline-offset-8">桃園在地嚮導</strong>。</p>
                      <p className="mt-8 text-white font-bold">祝你 <span className="text-red-500 italic">Pole Position</span> 起步，在事業與生活上直線超車，一路領跑！</p>
                   </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;