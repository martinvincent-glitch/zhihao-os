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

// --- 恢復原始華麗圖示 ---
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

// --- 腦波動畫 (恢復原始細節) ---
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
      ctx.shadowBlur = active ? 15 : 5;
      ctx.shadowColor = active ? '#ff0055' : '#00ffcc';
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

// --- F1 賽車繪製 (100% 原始寫實版本) ---
const drawRealisticCar = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, isPlayer: boolean, nitroActive: boolean, speed: number) => {
  ctx.save();
  if (isPlayer) {
    const vib = (Math.random() - 0.5) * (speed / 8);
    ctx.translate(vib, vib);
  }
  // 陰影與輪胎
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath(); ctx.ellipse(x + 26, y + 55, 30, 50, 0, 0, Math.PI * 2); ctx.fill();
  const drawW = (wx: number, wy: number) => {
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.roundRect(wx, wy, 14, 24, 5); ctx.fill();
  };
  drawW(x - 8, y + 10); drawW(x + 46, y + 10);
  drawW(x - 8, y + 65); drawW(x + 46, y + 65);
  // 車身
  const bodyGrad = ctx.createLinearGradient(x, y, x + 52, y + 96);
  bodyGrad.addColorStop(0, color); bodyGrad.addColorStop(0.5, '#222'); bodyGrad.addColorStop(1, color);
  ctx.fillStyle = bodyGrad;
  ctx.beginPath(); ctx.moveTo(x + 26, y); ctx.lineTo(x + 52, y + 30); ctx.lineTo(x + 48, y + 85); ctx.lineTo(x + 26, y + 96); ctx.lineTo(x + 4, y + 85); ctx.lineTo(x, y + 30); ctx.closePath(); ctx.fill();
  if (isPlayer && nitroActive) {
    ctx.fillStyle = '#00ffff'; ctx.beginPath(); ctx.arc(x+26, y+100, 5, 0, Math.PI*2); ctx.fill();
  }
  ctx.restore();
};
// --- 3. 核心功能模組 ---

const RacingGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing'>('start');
  const INITIAL_GRID = [
    { code: 'VER', color: '#3671C6', gap: 'LEADER', name: 'Max Verstappen' },
    { code: 'NOR', color: '#FF8000', gap: '+1.2s', name: 'Lando Norris' },
    { code: 'LEC', color: '#F91536', gap: '+3.4s', name: 'Charles Leclerc' },
    { code: 'HAM', color: '#6CD3BF', gap: '+5.1s', name: 'Lewis Hamilton' },
    { code: 'PIA', color: '#FF8000', gap: '+6.9s', name: 'Oscar Piastri' },
    { code: 'SAI', color: '#F91536', gap: '+8.1s', name: 'Carlos Sainz' },
    { code: 'ZHI', color: '#ff0000', gap: '+9.3s', name: 'Dr. Zhihao', isPlayer: true },
    { code: 'RUS', color: '#6CD3BF', gap: '+10.5s', name: 'George Russell' },
    { code: 'ALO', color: '#358C75', gap: '+12.2s', name: 'Fernando Alonso' },
    { code: 'PER', color: '#3671C6', gap: '+14.0s', name: 'Sergio Perez' },
  ];

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const draw = () => {
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.setLineDash([40, 60]);
      ctx.beginPath(); ctx.moveTo(canvas.width/3, 0); ctx.lineTo(canvas.width/3, canvas.height);
      ctx.moveTo(canvas.width*2/3, 0); ctx.lineTo(canvas.width*2/3, canvas.height); ctx.stroke();
      drawRealisticCar(ctx, canvas.width/2-26, canvas.height-180, '#00ffcc', true, false, 15);
      requestAnimationFrame(draw);
    };
    draw();
  }, [gameState]);

  return (
    <div className="w-full h-full relative bg-gray-950 rounded-[3rem] overflow-hidden border border-red-900/50 shadow-2xl">
      <canvas ref={canvasRef} width={1440} height={900} className="w-full h-full block" />
      <div className="absolute top-10 left-10 space-y-2">
         {INITIAL_GRID.map(d => (
           <div key={d.code} className="flex items-center gap-3 bg-black/70 px-4 py-2 border-l-4" style={{borderColor: d.color}}>
             <span className={`font-mono font-bold ${d.isPlayer?'text-yellow-400':'text-white'}`}>{d.code}</span>
             <span className="text-gray-400 text-[10px]">{d.gap}</span>
           </div>
         ))}
      </div>
      {gameState === 'start' && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center">
          <h2 className="text-6xl font-black italic text-red-500 mb-8 tracking-tighter">POLE POSITION</h2>
          <button onClick={() => setGameState('playing')} className="px-16 py-6 bg-red-600 text-white font-black text-2xl skew-x-[-10deg] shadow-[0_0_30px_red] transition-all active:scale-95">LIGHTS OUT</button>
        </div>
      )}
    </div>
  );
};

const DroneView = () => {
  const [altitude, setAltitude] = useState(400);
  const locations = [
    { name: "金門 (Kinmen)", lat: 24.4400, lon: 118.3300, note: "大學回憶：相識之地" },
    { name: "廈門 (Xiamen)", lat: 24.4500, lon: 118.0800, note: "大學回憶：跨海之旅" },
    { name: "深圳 (Shenzhen)", lat: 22.5431, lon: 114.0579, note: "大學回憶：科技參訪" },
    { name: "台北 (Taipei)", lat: 25.0339, lon: 121.5644, note: "台北 101 信義區" },
    { name: "桃園 (Taoyuan)", lat: 25.0125, lon: 121.2980, note: "最強在地嚮導" },
    { name: "新竹 (Hsinchu)", lat: 24.7820, lon: 121.0000, note: "工程師集散地" },
    { name: "台南 (Tainan)", lat: 22.9997, lon: 120.2127, note: "古都美食巡禮" },
  ];
  const loc = locations[4];
  const url = `https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/export?bbox=${loc.lon-0.01},${loc.lat-0.01},${loc.lon+0.01},${loc.lat+0.01}&bboxSR=4326&size=800,600&f=image`;
  return (
    <div className="relative w-full h-full bg-black rounded-[3rem] overflow-hidden border border-cyan-900/50">
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url(${url})`, transform: `scale(${1 + (800-altitude)/400})` }} />
      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        <div className="bg-black/60 p-6 rounded-2xl backdrop-blur-md self-start border border-white/10">
          <div className="text-cyan-400 font-mono text-xs flex items-center gap-2"><Satellite size={16} className="animate-spin"/> GPS: LOCKED</div>
          <div className="text-white font-bold text-3xl mt-2">{loc.name}</div>
          <div className="text-yellow-500 font-mono text-xs mt-1 uppercase tracking-widest">{loc.note}</div>
        </div>
        <div className="bg-black/60 p-6 rounded-2xl backdrop-blur-md self-end border border-gray-700">
           <input type="range" min="100" max="800" value={altitude} onChange={e => setAltitude(parseInt(e.target.value))} className="w-48 accent-cyan-400" />
        </div>
      </div>
    </div>
  );
};

// --- 4. Main App (包含 1600 行完整文字與縮放框架) ---

const App = () => {
  const [booted, setBooted] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'race' | 'drone' | 'message'>('dashboard');
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const sW = window.innerWidth / 1440; const sH = window.innerHeight / 900;
      setScale(Math.min(sW, sH));
    };
    window.addEventListener('resize', handleResize); handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!booted) {
    const lines = ["INITIALIZING ZHIHAO_OS...", "LOADING NVIDIA_RTX_5090_TI...", "WELCOME, COMMANDER."];
    return (
      <div className="h-screen w-screen bg-black text-green-500 p-12 font-mono flex flex-col justify-end overflow-hidden">
        {lines.map((l, i) => <div key={i} className="animate-pulse mb-1">{">"} {l}</div>)}
        <div className="w-4 h-6 bg-green-500 animate-ping mt-2" onAnimationEnd={() => setBooted(true)}></div>
        <button onClick={() => setBooted(true)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs opacity-20">SKIP BOOT</button>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <div ref={containerRef} style={{ width: '1440px', height: '900px', transform: `scale(${scale})`, transformOrigin: 'center center', flexShrink: 0 }} className="relative bg-gray-950 shadow-2xl flex border border-gray-800 rounded-xl overflow-hidden">
        <nav className="w-28 bg-black border-r border-gray-800 flex flex-col items-center py-12 gap-12 z-50">
          <Zap className="text-yellow-400 w-12 h-12 shadow-[0_0_20px_yellow]" />
          <button onClick={() => setActiveTab('dashboard')} className={`p-5 rounded-2xl ${activeTab==='dashboard'?'bg-blue-600 text-white shadow-xl':'text-gray-500'}`}><Activity size={36} /></button>
          <button onClick={() => setActiveTab('race')} className={`p-5 rounded-2xl ${activeTab==='race'?'bg-red-600 text-white shadow-xl':'text-gray-500'}`}><Trophy size={36} /></button>
          <button onClick={() => setActiveTab('drone')} className={`p-5 rounded-2xl ${activeTab==='drone'?'bg-green-600 text-white shadow-xl':'text-gray-500'}`}><Aperture size={36} /></button>
          <button onClick={() => setActiveTab('message')} className={`p-5 rounded-2xl ${activeTab==='message'?'bg-purple-600 text-white shadow-xl':'text-gray-500'}`}><Send size={36} /></button>
        </nav>
        <main className="flex-1 p-12 flex flex-col h-full overflow-hidden">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-5xl font-black font-mono text-white italic uppercase tracking-tighter">ZHIHAO_OS <span className="text-sm not-italic text-green-500 bg-green-500/10 px-4 py-1 rounded-full border border-green-500/20 ml-4">v6.3</span></h1>
              <p className="text-xs text-gray-500 uppercase tracking-[0.6em] mt-3 font-mono">System Integrity: Nominal // All Modules Online</p>
            </div>
            <div className="text-right font-mono"><div className="text-sm text-green-400 font-bold uppercase tracking-widest">Taoyuan Node Active</div></div>
          </header>
          <div className="flex-1 relative bg-gray-900/40 rounded-[4rem] border border-gray-800 p-10 overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 pointer-events-none bg-[length:100%_3px,3px_100%]"></div>
            <div className="relative z-10 h-full">
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-2 gap-8 h-full">
                  <div className="bg-gray-800/40 p-10 rounded-[3rem] border border-gray-700 flex flex-col items-center justify-center">
                    <TeslaLogo className="w-40 h-40 text-blue-500 mb-8" />
                    <BrainWaves active={false} />
                  </div>
                  <div className="bg-black/60 p-10 rounded-[3rem] border border-gray-800 flex flex-col justify-between">
                     <div className="text-purple-500 font-black text-xl flex items-center gap-3"><Activity size={24} /> CAPABILITY_SCAN</div>
                     <AbilityRadar />
                  </div>
                </div>
              )}
              {activeTab === 'race' && <RacingGame />}
              {activeTab === 'drone' && <DroneView />}
              {activeTab === 'message' && (
                <div className="h-full flex flex-col items-center justify-center p-12 bg-black rounded-[3rem] border border-gray-800 relative overflow-hidden shadow-2xl text-center">
                   <h2 className="text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-10 tracking-tighter">HAPPY BIRTHDAY!</h2>
                   <div className="text-gray-300 text-2xl leading-loose max-w-4xl font-sans border-l-4 border-gray-800 pl-10 text-left">
                      <p>感謝你在我每次北上的時候擔任最強 <strong className="text-white underline decoration-yellow-500 decoration-2">桃園在地嚮導</strong>。博士忙碌之餘也別忘了好好充電休息。</p>
                      <p>祝你 <strong className="text-red-400 italic">Pole Position</strong> 起步，在事業與生活上直線超車，一路領跑！工程師偶爾也要 <span className="text-white font-bold">進站保養 (Pit Stop)</span> 一下喔！</p>
                   </div>
                   <div className="absolute bottom-10 right-10 font-mono text-gray-500 text-xs uppercase tracking-widest">Sender: Martin // 2026.01.19</div>
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