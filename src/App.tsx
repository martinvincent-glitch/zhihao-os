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

// --- 1. SVG Icons ---
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

// --- 2. Sub-Components ---

const BrainWaves = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let dataPoints: number[] = Array(60).fill(50);
    const draw = () => {
      dataPoints.shift();
      const volatility = active ? 30 : 10;
      let next = dataPoints[dataPoints.length - 1] + (Math.random() - 0.5) * volatility;
      next = Math.max(5, Math.min(95, next));
      dataPoints.push(next);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = active ? '#ff0055' : '#00ffcc';
      ctx.lineWidth = 2;
      for (let i = 0; i < dataPoints.length - 1; i++) {
        const x1 = (i / (dataPoints.length - 1)) * canvas.width;
        const y1 = canvas.height - (dataPoints[i] / 100) * canvas.height;
        const x2 = ((i + 1) / (dataPoints.length - 1)) * canvas.width;
        const y2 = canvas.height - (dataPoints[i+1] / 100) * canvas.height;
        if (i === 0) ctx.moveTo(x1, y1); else ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      requestAnimationFrame(draw);
    };
    const id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, [active]);
  return (
    <div className="w-full h-24 bg-black/60 rounded border border-gray-700 overflow-hidden relative mt-2">
      <canvas ref={canvasRef} width={300} height={100} className="w-full h-full block" />
      <div className="absolute top-1 left-2 text-[10px] text-gray-400 font-mono">BRAIN_ACTIVITY_LOG</div>
    </div>
  );
};

const AbilityRadar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const stats = [{ label: '專業技術', v: 1.0 }, { label: '美食雷達', v: 0.95 }, { label: '人體導航', v: 1.0 }, { label: '極限駕駛', v: 0.9 }, { label: '問題解決', v: 1.0 }, { label: '領導魅力', v: 1.0 }];
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2; const centerY = canvas.height / 2; const size = 100;
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      for (let j = 1; j <= 3; j++) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const r = (size / 3) * j;
          const x = centerX + r * Math.cos(i * Math.PI / 3 - Math.PI / 2);
          const y = centerY + r * Math.sin(i * Math.PI / 3 - Math.PI / 2);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.stroke();
      }
      ctx.beginPath(); ctx.fillStyle = 'rgba(250,204,21,0.4)';
      stats.forEach((s, i) => {
        const r = size * s.v;
        const x = centerX + r * Math.cos(i * Math.PI / 3 - Math.PI / 2);
        const y = centerY + r * Math.sin(i * Math.PI / 3 - Math.PI / 2);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath(); ctx.fill();
    };
    draw();
  }, []);
  return <canvas ref={canvasRef} width={320} height={300} className="max-w-full mx-auto" />;
};

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const texts = ["INITIALIZING ZHIHAO_OS KERNEL v6.3...", "LOADING NVIDIA_RTX_5090_TI...", "SATELLITE LINK ESTABLISHED...", "WELCOME, COMMANDER."];
    texts.forEach((t, i) => setTimeout(() => setLines(p => [...p, t]), i * 600));
    setTimeout(onComplete, 3500);
  }, []);
  return <div className="h-screen w-screen bg-black text-green-500 p-12 font-mono flex flex-col justify-end overflow-hidden">{lines.map((l, i) => <div key={i} className="animate-pulse mb-1">{">"} {l}</div>)}<div className="w-4 h-6 bg-green-500 animate-ping mt-2"></div></div>;
};

// --- 3. Racing Game ---

const RacingGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing'>('start');
  const INITIAL_GRID = [
    { code: 'VER', color: '#3671C6', gap: 'LEADER' },
    { code: 'NOR', color: '#FF8000', gap: '+1.2s' },
    { code: 'ZHI', color: '#ff0000', gap: '+9.3s', isPlayer: true },
    { code: 'HAM', color: '#6CD3BF', gap: '+5.1s' },
    { code: 'ALO', color: '#358C75', gap: '+12.2s' }
  ];

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const draw = () => {
      ctx.fillStyle = '#111'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      // 繪製賽道
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.setLineDash([40, 60]);
      ctx.beginPath(); ctx.moveTo(canvas.width/3, 0); ctx.lineTo(canvas.width/3, canvas.height);
      ctx.moveTo(canvas.width*2/3, 0); ctx.lineTo(canvas.width*2/3, canvas.height); ctx.stroke();
      // 繪製寫實賽車 (簡化版繪製邏輯，確保效能)
      ctx.fillStyle = '#00ffcc'; ctx.roundRect(canvas.width/2-26, canvas.height-180, 52, 96, 10); ctx.fill();
      requestAnimationFrame(draw);
    };
    draw();
  }, [gameState]);

  return (
    <div className="w-full h-full relative bg-gray-950 rounded-[3rem] overflow-hidden border border-red-900/50 shadow-2xl">
      <canvas ref={canvasRef} width={1440} height={900} className="w-full h-full block" />
      <div className="absolute top-10 left-10 space-y-2 pointer-events-none">
         {INITIAL_GRID.map(d => (
           <div key={d.code} className="flex items-center gap-3 bg-black/70 px-4 py-2 border-l-4" style={{borderColor: d.color}}>
             <span className={`font-mono font-bold ${d.isPlayer?'text-yellow-400':'text-white'}`}>{d.code}</span>
             <span className="text-gray-400 text-xs">{d.gap}</span>
           </div>
         ))}
      </div>
      {gameState === 'start' && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
          <h2 className="text-6xl font-black italic text-red-500 mb-8 tracking-tighter">POLE POSITION</h2>
          <button onClick={() => setGameState('playing')} className="px-16 py-6 bg-red-600 text-white font-black text-2xl skew-x-[-10deg] shadow-[0_0_30px_red]">LIGHTS OUT</button>
        </div>
      )}
    </div>
  );
};

// --- 4. Drone & Dashboard ---

const DroneView = () => {
  const [altitude, setAltitude] = useState(400);
  const locations = [
    { name: "桃園 (Taoyuan)", lat: 25.0125, lon: 121.2980, note: "最強在地嚮導" },
    { name: "金門 (Kinmen)", lat: 24.4400, lon: 118.3300, note: "大學回憶：相識之地" }
  ];
  const loc = locations[0];
  const url = `https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/export?bbox=${loc.lon-0.01},${loc.lat-0.01},${loc.lon+0.01},${loc.lat+0.01}&bboxSR=4326&size=800,600&f=image`;
  return (
    <div className="relative w-full h-full bg-black rounded-[3rem] overflow-hidden border border-cyan-900/50">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700" style={{ backgroundImage: `url(${url})`, transform: `scale(${1 + (800-altitude)/400})` }} />
      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        <div className="bg-black/60 p-6 rounded-2xl backdrop-blur-md self-start border border-white/10">
          <div className="text-cyan-400 font-mono text-xs flex items-center gap-2 animate-pulse"><Satellite size={16}/> GPS: LOCKED</div>
          <div className="text-white font-bold text-3xl mt-2 tracking-tight">{loc.name}</div>
          <div className="text-yellow-500 font-mono text-xs mt-1 uppercase tracking-widest">{loc.note}</div>
        </div>
        <div className="bg-black/60 p-6 rounded-2xl backdrop-blur-md self-end border border-gray-700 flex items-center gap-6">
           <div className="text-white font-mono">ALT: <span className="text-cyan-400 font-bold">{altitude}M</span></div>
           <input type="range" min="100" max="800" value={altitude} onChange={e => setAltitude(parseInt(e.target.value))} className="w-48 accent-cyan-400" />
        </div>
      </div>
    </div>
  );
};

const StatsDashboard = () => {
  const [overclocked, setOverclocked] = useState(false);
  return (
    <div className="grid grid-cols-2 gap-8 h-full overflow-y-auto p-4 custom-scrollbar">
      <div className={`rounded-[3rem] p-10 border transition-all duration-500 ${overclocked ? 'bg-red-900/20 border-red-500 shadow-[0_0_50px_rgba(255,0,0,0.3)]' : 'bg-gray-800/40 border-gray-700'}`}>
        <TeslaLogo className={`w-40 h-40 mx-auto mb-8 ${overclocked ? 'text-red-500 animate-pulse' : 'text-blue-500'}`} />
        <div className="grid grid-cols-2 text-center text-white mb-10">
          <div><div className="text-5xl font-black">{overclocked ? '98.5°' : '36.8°'}</div><div className="text-xs text-gray-500 mt-2 tracking-widest uppercase">Core Temp</div></div>
          <div><div className="text-5xl font-black">100%</div><div className="text-xs text-gray-500 mt-2 tracking-widest uppercase">Passion</div></div>
        </div>
        <BrainWaves active={overclocked} />
        <button onClick={() => setOverclocked(!overclocked)} className={`w-full mt-10 py-5 rounded-2xl font-black text-white transition-all ${overclocked?'bg-red-600 shadow-lg':'bg-gray-700 hover:bg-red-600/50'}`}>
            {overclocked ? 'COOLDOWN_INITIATED' : 'SYSTEM_OVERCLOCK'}
        </button>
      </div>
      <div className="bg-black/60 rounded-[3rem] p-10 border border-gray-800 flex flex-col justify-between">
        <div className="text-purple-500 font-black text-xl flex items-center gap-3 mb-8 tracking-tighter"><Activity size={24} /> SHARED_MEMORY // SINCE_2018</div>
        <div className="space-y-4 font-mono text-sm mb-8">
           <div className="flex justify-between border-b border-gray-800 pb-2"><span>實驗室熬夜 (LAB_TIME)</span><span className="text-red-400">999+ HRS</span></div>
           <div className="flex justify-between border-b border-gray-800 pb-2"><span>自走車競賽 (CAR_RACE)</span><span className="text-green-400">RANK #1</span></div>
           <div className="flex justify-between border-b border-gray-800 pb-2"><span>專案結案數 (PROJECT_X)</span><span className="text-blue-400">INFINITE</span></div>
        </div>
        <AbilityRadar />
      </div>
    </div>
  );
};

// --- 5. Main App Wrapper (Scaling logic) ---

const App = () => {
  const [booted, setBooted] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'race' | 'drone' | 'hospitality' | 'message'>('dashboard');
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const scaleW = window.innerWidth / 1440;
      const scaleH = window.innerHeight / 900;
      setScale(Math.min(scaleW, scaleH));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!booted) return <BootSequence onComplete={() => setBooted(true)} />;

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <div 
        ref={containerRef}
        style={{
          width: '1440px', height: '900px', transform: `scale(${scale})`,
          transformOrigin: 'center center', flexShrink: 0
        }}
        className="relative bg-gray-950 shadow-2xl flex border border-gray-800 rounded-xl overflow-hidden"
      >
        <nav className="w-28 bg-black border-r border-gray-800 flex flex-col items-center py-12 gap-12 z-50">
          <Zap className="text-yellow-400 w-12 h-12 shadow-[0_0_20px_yellow]" />
          {[
            { id: 'dashboard', icon: <Activity /> },
            { id: 'race', icon: <Trophy /> },
            { id: 'drone', icon: <Aperture /> },
            { id: 'hospitality', icon: <Utensils /> },
            { id: 'message', icon: <Send /> }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`p-5 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl scale-110' : 'text-gray-500 hover:text-white'}`}>
                {React.cloneElement(tab.icon as React.ReactElement, { size: 36 })}
            </button>
          ))}
        </nav>

        <main className="flex-1 p-12 flex flex-col h-full overflow-hidden">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-5xl font-black font-mono text-white italic uppercase tracking-tighter">ZHIHAO_OS <span className="text-sm not-italic text-green-500 bg-green-500/10 px-4 py-1 rounded-full border border-green-500/20 ml-4">v6.3</span></h1>
              <p className="text-xs text-gray-500 uppercase tracking-[0.6em] mt-3 font-mono">System Integrity: Nominal // All Modules Online</p>
            </div>
            <div className="text-right font-mono"><div className="text-sm text-green-400 font-bold">TAOYUAN_NODE_ACTIVE</div></div>
          </header>
          <div className="flex-1 relative bg-gray-900/40 rounded-[4rem] border border-gray-800 p-10 overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 pointer-events-none bg-[length:100%_3px,3px_100%]"></div>
            <div className="relative z-10 h-full">
              {activeTab === 'dashboard' && <StatsDashboard />}
              {activeTab === 'race' && <RacingGame />}
              {activeTab === 'drone' && <DroneView />}
              {activeTab === 'hospitality' && <div className="p-10 text-gray-300 italic text-2xl">「感謝你展現出的卓越領導能力，總是在關鍵時刻給予方向；更感謝你過去經常熱心幫助，成為我最強大的後盾。」</div>}
              {activeTab === 'message' && (
                <div className="h-full flex flex-col items-center justify-center p-12 bg-black rounded-[3rem] border border-gray-800 overflow-hidden">
                   <h2 className="text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 mb-8">HAPPY BIRTHDAY!</h2>
                   <p className="text-gray-300 text-2xl leading-loose max-w-3xl text-center">祝你 Pole Position 起步，在事業與生活上直線超超車，一路領跑！</p>
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